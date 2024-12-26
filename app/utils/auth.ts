import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: `"Faturly Support" <${process.env.EMAIL_FROM}>`,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { host } = new URL(url);

        // Extract user information
        const userName = "User"; // Replace with actual username if available
        const userEmail = identifier; // Email address
        const verificationLink = url; // Verification link

        const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sign-In Verification</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333333;
                margin: 0;
                padding: 0;
                background-color: #f4f7f9;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 40px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                max-width: auto;
                height: auto;
            }
            .content {
                padding: 20px 0;
            }
            h2 {
                color: #2c3e50;
                margin: 0;
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .gif {
                width: 50px;
            }
            .verification-details {
                background-color: #f8f9fa;
                border-radius: 6px;
                padding: 20px;
                margin-bottom: 30px;
                text-align: center;
            }
            .verification-details p {
                margin: 10px 0;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #3498db;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                margin: 20px 0;
                transition: background-color 0.3s ease;
                cursor: pointer;
            }
            .button:hover {
                background-color: #2980b9;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #7f8c8d;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="https://mailsend-email-assets.mailtrap.io/4nq2re3bfj13hbsab7m4v5sji3k8.png" alt="Company Logo" class="logo">
            </div>
            <div class="content">
                <h2>
                    <img src="https://mailsend-email-assets.mailtrap.io/bpyekdkzh2odup7exlfg1k495x8h.gif" class="gif" alt="Icon">
                    Sign-In Verification
                </h2>
                <p>Dear ${userName},</p>

                <p>
                    We received a request to sign in to your account. Please click the button below to verify your email and complete the sign-in process.
                </p>

                <div class="verification-details">
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="{{verificationLink}}" class="button">Sign In</a>
                </div>

                <p>
                    If you encounter any issues, feel free to contact our support team.
                </p>

                <p>Thank you for using our service!</p>
            </div>
            <div class="footer">
                <p>© 2024 Faturly. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

        const emailText = `
    Dear ${userName},

    We received a request to sign in to your account. Please use the following link to verify your email and complete the sign-in process:
    ${verificationLink}

    If you did not request this, please ignore this email.

    Thank you for using our service!
    © 2024 Faturly. All rights reserved.
  `;

        const message = {
          from: provider.from,
          to: identifier,
          subject: `Sign-In Verification for ${host}`,
          text: emailText,
          html: emailHtml,
        };

        const nodemailer = require("nodemailer");
        const transporter = nodemailer.createTransport(provider.server);
        await transporter.sendMail(message);
      },
    }),
  ],
  pages: {
    verifyRequest: "/verify", // Customize the page for verification request
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      baseUrl = "https://faturly.online";
      if (url === "/verify") {
        return baseUrl + "/dashboard"; // Redirect after verification
      }
      return url;
    },
  },
});

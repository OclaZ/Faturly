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

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
                }
                .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                  background-color: #12052b;
                  color: white;
                  text-align: center;
                  padding: 20px;
                }
                .email-body {
                  padding: 20px;
                  text-align: center;
                }
                .email-body p {
                  line-height: 1.6;
                  margin: 0 0 20px;
                }
                .email-footer {
                  font-size: 12px;
                  text-align: center;
                  color: #888;
                  margin-top: 20px;
                  padding: 10px 20px;
                  background-color: #f9f9f9;
                }
                .button {
                  display: inline-block;
                  background-color: #12052b;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 12px 20px;
                  border-radius: 6px;
                  font-size: 16px;
                  font-weight: bold;
                  margin: 20px 0;
                }
                .button:hover {
                  background-color: #341568;
                }
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="email-header">
                  <h1>Welcome to ${host}</h1>
                </div>
                <div class="email-body">
                  <p>Hello,</p>
                  <p>Click the button below to verify your email address and sign in:</p>
                  <a href="${url}" class="button">Sign In</a>
                  <p>If you did not request this email, please ignore it.</p>
                </div>
                <div class="email-footer">
                  <p>© ${new Date().getFullYear()} ${host}. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `;

        const emailText = `
          Welcome to ${host}

          Hello,

          Click the link below to verify your email address and sign in:
          ${url}

          If you did not request this email, please ignore it.

          © ${new Date().getFullYear()} ${host}. All rights reserved.
        `;

        const message = {
          from: provider.from,
          to: identifier,
          subject: `Sign in to ${host}`,
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
      // Redirect to /dashboard if email is verified
      if (url === "/verify") {
        return baseUrl + "/dashboard"; // Redirect after verification
      }
      return url; // Otherwise, return the default URL
    },
  },
});

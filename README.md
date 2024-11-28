<div align="center">
<br />
<a>
<img src="public/logo.svg" alt="https://github.com/Oclaz/faturly.git">
</a>
<br />
<div>
<img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="Next.js" />
<img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logoColor=white&logo=postgresql&color=336791" alt="PostgreSQL" />
<img src="https://img.shields.io/badge/-Prisma_ORM-black?style=for-the-badge&logoColor=white&logo=prisma&color=2D3748" alt="Prisma ORM" />
<img src="https://img.shields.io/badge/-TailwindCSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="TailwindCSS" />
<img src="https://img.shields.io/badge/-Vercel-black?style=for-the-badge&logoColor=white&logo=vercel&color=000000" alt="Vercel" />
</div>

# Faturly - Invoice Management Application

**Faturly** is a professional invoice application tailored for Moroccan businesses, developed with **Next.js**. It enables businesses to streamline their invoicing processes, generate PDF invoices, and send them via email with ease.

## 🖥️ Tech Stack

- **Next.js**: Framework for fast and dynamic web applications.
- **PostgreSQL**: Relational database for managing invoices and user data.
- **Prisma ORM**: Type-safe database interaction with PostgreSQL.
- **TailwindCSS**: Modern styling for responsive and clean UI.
- **Vercel**: Cloud platform for serverless deployment.

## 📋 Features

- **Authentication**: Secure login using Auth.js with Magic Links.
- **PDF Invoicing**: Generate professional invoices as PDFs with JsPDF.
- **Email Integration**: Send invoices and updates to clients using Mailtrap.
- **Database Management**: Store and manage all invoice-related data in PostgreSQL.
- **Overdue Reminders**: Automate email reminders for overdue payments.
- **Mobile-Responsive Design**: Optimized for all screen sizes and devices.

## 🚀 Quick Start

### Prerequisites

Ensure the following are installed:

- Git
- Node.js
- PostgreSQL

### Installation Steps

1. **Clone the Repository**:

```bash
git clone https://github.com/Oclaz/faturly.git
cd faturly
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the following:

```bash
DATABASE_URL=your_postgres_database_url
MAILTRAP_API_KEY=your_mailtrap_api_key
NEXTAUTH_SECRET=your_auth_secret
```

4. **Run Database Migrations**:

```bash
npx prisma migrate dev
```

5. **Start the Development Server**:

```bash
npm run dev
```

Visit http://localhost:3000 to access the app.

## 📁 Folder Structure

```
├── components       # Reusable UI components
├── pages           # Next.js pages and API routes
├── prisma          # Database schema and migrations
├── public          # Static assets (e.g., logo.svg)
├── styles          # TailwindCSS global styles
└── utils           # Helper functions (e.g., email services)
```

## 📱 Contact

For inquiries or support, feel free to reach out to **Oclaz** or open an issue in the repository.

Built with ❤️ by **Oclaz**

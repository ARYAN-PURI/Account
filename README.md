# Puri Cloth House — Account Management System

A web-based account management system for **Puri Cloth House** built with **Next.js 14**, **MongoDB**, and **Tailwind CSS**. It allows tracking of customer accounts, credit/cash entries, and daily transaction records.

---

## Features

- **Dashboard** — Overview of total users, total sale, cash collected, and lend money
- **User Management** — Add, search, update, and delete customer profiles
- **Transaction Entries** — Log items purchased or cash payments against a customer account
- **Balance Tracking** — Running balance per customer updated on every entry
- **Record History** — Date-grouped transaction history per customer and across all customers
- **Responsive UI** — Mobile-first design with hamburger navigation on small screens

---

## Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Framework  | Next.js 14 (App Router)           |
| Language   | TypeScript                        |
| Database   | MongoDB (via Mongoose)            |
| Styling    | Tailwind CSS                      |
| HTTP       | Axios                             |
| Font       | Inter (Google Fonts via next/font)|

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── addUser/page.tsx      # Add new customer
│   ├── display/page.tsx      # Search & list all customers
│   ├── display/[id]/page.tsx # Customer detail + transaction entries
│   ├── records/page.tsx      # Daily records across all customers
│   ├── update/[id]/page.tsx  # Edit customer details
│   └── api/users/            # REST API routes
│       ├── addUser/
│       ├── getAllUsers/
│       ├── getUser/
│       ├── updateUser/
│       ├── deleteUser/
│       ├── addItem/
│       ├── deleteItem/
│       ├── getRecords/
│       └── getNumbers/
├── Components/
│   └── NavBar.tsx            # Responsive navigation bar
├── dbConfig/
│   └── connect.ts            # MongoDB connection
└── models/
    └── userModel.ts          # Mongoose user schema
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally or a MongoDB Atlas URI

### 1. Clone the repository

```bash
git clone https://github.com/ARYAN-PURI/Account.git
cd Account
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project:

```env
MONGO_URL=mongodb://localhost:27017/account
```

> For MongoDB Atlas, replace the value with your connection string:
> `MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/account`

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start development server           |
| `npm run build`   | Build for production               |
| `npm run start`   | Start production server            |
| `npm run lint`    | Run ESLint checks                  |

---

## Data Model

### User (`users` collection)

| Field          | Type     | Required | Description                          |
|----------------|----------|----------|--------------------------------------|
| `userName`     | String   | ✅       | Customer full name                   |
| `mobileNo`     | Number   |          | Contact number                       |
| `relativeName` | String   |          | Name of a relative                   |
| `relation`     | String   |          | Relation type (e.g. Father, Brother) |
| `address`      | String   | ✅       | Customer address                     |
| `itemsDetails` | Array    |          | Array of transaction entries         |
| `balance`      | Number   |          | Running outstanding balance          |
| `createdDate`  | Date     |          | Account creation date                |
| `modifyDate`   | Date     |          | Last modified date                   |

Each entry in `itemsDetails` contains:
- `name` — item name or `"cash"` for a payment
- `price` — amount (positive = sale/credit, `"cash"` entries reduce the balance)
- `date` — timestamp of the entry

---

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add the `MONGO_URL` environment variable in the Vercel dashboard
4. Deploy

### Self-hosted

```bash
npm run build
npm run start
```

Ensure `MONGO_URL` is set in your server environment before starting.

---

## License

This project is private and maintained by **Puri Cloth House**.

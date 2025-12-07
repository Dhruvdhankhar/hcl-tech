# 🚀 Hackathon Submission: Pizza Delivery App

## Project Overview

This is a full-stack pizza delivery application built for rapid ordering, real-time inventory management, and seamless user experience. It features authentication, cart, orders, coupons, and a robust backend with MongoDB Atlas.

---

## 🔥 Demo Instructions

1. **Clone & Install:**
	- `git clone <repo-url>`
	- `cd hcl-tech`
	- `npm install --prefix backend`
	- `npm install --prefix frontend`

2. **Environment Setup:**
	- Backend: Create `backend/.env` (see below)
	- Frontend: Create `frontend/.env.local` (see below)

3. **Seed Database:**
	- `cd backend && npm run seed`

4. **Run Servers:**
	- Backend: `npm run dev` (port 5001)
	- Frontend: `npm run dev` (port 3000)

5. **Access App:**
	- Open [http://localhost:3000](http://localhost:3000)

---

## 🎯 Judging Highlights

- **Inventory System:** 100 units per product, auto-deduct on order, daily reset at 11:59 PM
- **Coupon System:** 4 active codes, 50% off, validation logic
- **Authentication:** JWT, secure password hashing
- **Order Flow:** Cart, checkout, address, order status
- **API:** 31 REST endpoints, error handling, validation
- **Tech Stack:** Next.js, Express, MongoDB Atlas, TypeScript
- **Code Quality:** Modular, commented, scalable
- **README:** Full setup, architecture, and demo guide

---

## 🏗️ System Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
│   Port: 3000    │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│   Backend       │
│   (Express.js)  │
│   Port: 5001    │
└────────┬────────┘
         │
         │ Mongoose ODM
         │
┌────────▼────────┐
│   MongoDB       │
│   (Atlas Cloud) │
└─────────────────┘
```

**Architecture Flow:**
1. **Frontend Layer**: Next.js with React components and Jotai state management
2. **API Layer**: RESTful Express.js server with JWT authentication
3. **Business Logic**: Inventory management, order processing, coupon validation
4. **Data Layer**: MongoDB with Mongoose schemas
5. **Scheduled Tasks**: Node-cron for daily inventory reset at 11:59 PM

---

## 📁 Folder Structure

```
hcl-tech/
├── backend/                          # Backend Express application
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── middleware/
│   │   │   └── auth.ts              # JWT authentication
│   │   ├── models/
│   │   │   ├── User.ts              # User schema
│   │   │   ├── Product.ts           # Product with inventory
│   │   │   ├── Cart.ts              # Shopping cart
│   │   │   ├── Order.ts             # Order schema
│   │   │   └── Coupon.ts            # Coupon schema
│   │   ├── routes/
│   │   │   ├── auth.ts              # Auth endpoints
│   │   │   ├── products.ts          # Product CRUD
│   │   │   ├── cart.ts              # Cart management
│   │   │   ├── orders.ts            # Order processing
│   │   │   ├── coupons.ts           # Coupon validation
│   │   │   └── users.ts             # User profile
│   │   ├── scripts/
│   │   │   └── seedProducts.ts      # DB seeding
│   │   ├── utils/
│   │   │   └── scheduler.ts         # Inventory reset cron
│   │   └── server.ts                # Express app
│   ├── .env                         # Environment vars
│   ├── package.json                 # Dependencies
│   └── tsconfig.json                # TypeScript config
│
├── frontend/                         # Frontend Next.js app
│   ├── src/
│   │   ├── app/                     # Next.js 14 app directory
│   │   │   ├── (auth)/              # Auth pages
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   ├── cart/                # Cart page
│   │   │   ├── checkout/            # Checkout page
│   │   │   ├── menu/                # Products page
│   │   │   ├── orders/              # Order history
│   │   │   ├── profile/             # User profile
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/              # React components
│   │   │   ├── cart/
│   │   │   ├── layout/
│   │   │   ├── order/
│   │   │   ├── product/
│   │   │   └── ui/
│   │   ├── hooks/                   # Custom hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   └── useProducts.ts
│   │   ├── lib/
│   │   │   ├── api.ts               # Axios config
│   │   │   ├── utils.ts
│   │   │   └── validations.ts
│   │   ├── store/
│   │   │   └── atoms/               # Jotai state
│   │   └── types/
│   │       └── index.ts
│   ├── .env.local                   # Frontend env vars
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14.2.7 (App Router)
- **Language**: TypeScript 5
- **UI Library**: React 18
- **State Management**: Jotai 2.10.3
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Axios 1.7.9
- **Form Handling**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js
- **Framework**: Express 4.21.2
- **Language**: TypeScript 5.7.2
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose 8.8.4
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 2.4.3
- **Task Scheduling**: node-cron 3.0.3
- **CORS**: cors 2.8.5
- **Validation**: express-validator

### Development Tools
- **Backend Dev Server**: ts-node-dev 2.0.0
- **Environment Variables**: dotenv 16.4.7
- **Linting**: ESLint
- **Version Control**: Git

---

## ✨ Features

- User registration/login/profile
- Product browsing & filtering
- Cart management
- Order placement & tracking
- Coupon validation & discount
- Inventory management (auto-deduct, daily reset)
- RESTful API integration

---

## 🧪 API Routes for Testing (Postman)

**Authentication**
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Get user info

**Products**
- `GET /api/products` — All products
- `GET /api/products/:id` — Product by ID
- `GET /api/products/category/:category` — By category

**Cart** (JWT required)
- `GET /api/cart` — Get cart
- `POST /api/cart/add` — Add item
- `PUT /api/cart/update/:itemId` — Update quantity
- `DELETE /api/cart/remove/:itemId` — Remove item
- `DELETE /api/cart/clear` — Clear cart

**Orders** (JWT required)
- `POST /api/orders` — Place order
- `GET /api/orders` — Order history
- `GET /api/orders/:id` — Order details

**Coupons**
- `GET /api/coupons` — All coupons
- `POST /api/coupons/validate` — Validate code

**Users** (JWT required)
- `GET /api/users/profile` — Profile
- `PUT /api/users/profile` — Update profile
- `POST /api/users/address` — Add address
- `PUT /api/users/address/:id` — Update address
- `DELETE /api/users/address/:id` — Delete address

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas account
- Git

### Step-by-Step Setup

**1. Clone the repository:**
```bash
git clone <repository-url>
cd hcl-tech
```

**2. Backend setup:**
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizza_delivery
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

**3. Frontend setup:**
```bash
cd ../frontend
npm install
```

Create `frontend/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

**4. Seed the database:**
```bash
cd ../backend
npm run seed
```

This will populate:
- 32 products (8 pizzas, 8 beverages, 8 desserts, 8 sides)
- 4 active coupons with 50% discount

**5. Start servers:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```
Backend starts on: `http://localhost:5001`

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```
Frontend starts on: `http://localhost:3000`

**6. Access the application:**
- Open browser: [http://localhost:3000](http://localhost:3000)
- Register a new account or use test credentials
- Browse products, add to cart, place orders

---

## 📧 Email Confirmation (Google App Password)

...existing code...

---

## 🎯 Coupon Codes

...existing code...

---

## 🔄 Inventory Reset

...existing code...

---

## 🐛 Troubleshooting

...existing code...
# 🍕 Pizza Delivery Application

A full-stack pizza delivery application built with Next.js, Node.js, Express, and MongoDB. This application features real-time inventory management, order tracking, coupon system, and user authentication.

## 📋 Table of Contents

- [System Architecture](#system-architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Installation & Setup](#installation--setup)
- [Running the Project Locally](#running-the-project-locally)
- [Email Configuration (Optional)](#email-configuration-optional)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Current Capabilities](#current-capabilities)
- [Future Enhancements](#future-enhancements)

---

## 🏗️ System Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
│   Port: 3000    │
└────────┬────────┘
			│
			│ HTTP/REST API
			│
┌────────▼────────┐
│   Backend       │
│   (Express.js)  │
│   Port: 5001    │
└────────┬────────┘
			│
			│ Mongoose ODM
			│
┌────────▼────────┐
│   MongoDB       │
│   (Atlas Cloud) │
└─────────────────┘
```

---

## 📁 Folder Structure

```
hcl-tech/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── utils/
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── store/
│   │   └── types/
│   ├── .env.local
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

---

## 🛠️ Technology Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS, Jotai, Axios
**Backend:** Node.js, Express, TypeScript, MongoDB (Atlas), Mongoose, JWT, bcryptjs, node-cron
**Dev Tools:** ESLint, dotenv, ts-node-dev, Git

---

## ✨ Features

- User registration & JWT authentication
- Product listing & filtering
- Real-time inventory management (100 units per product)
- Cart management (add, update, remove, clear)
- Order placement & tracking
- Coupon system (4 active coupons, 50% off)
- Daily inventory reset at 11:59 PM
- RESTful API (31 endpoints)

---

## 🚀 Running the Project Locally

**1. Clone the repository:**
```bash
git clone <repository-url>
cd hcl-tech
```

**2. Backend setup:**
```bash
cd backend
npm install
# Create .env file with MongoDB URI, JWT secret, etc.
```

**3. Frontend setup:**
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL
```

**4. Seed the database:**
```bash
cd backend
npm run seed
```

**5. Start servers:**
```bash
# Terminal 1
cd backend
npm run dev
# Terminal 2
cd frontend
npm run dev
```

---

## 📧 Email Confirmation (Google App Password)

### Setup Instructions

**1. Enable Google 2-Step Verification:**
- Go to [Google Account Security](https://myaccount.google.com/security)
- Enable 2-Step Verification

**2. Generate App Password:**
- Navigate to **Security** → **App passwords**
- Select **Mail** and **Other (Custom name)**
- Copy the 16-character password

**3. Install Dependencies:**
```bash
cd backend
npm install nodemailer @types/nodemailer
```

**4. Update Environment Variables:**

Add to `backend/.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

**5. Create Email Service:**

Create `backend/src/utils/email.ts`:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendOrderConfirmation = async (
  to: string,
  orderDetails: any
) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Order Confirmation',
    html: `
      <h1>Order Confirmed!</h1>
      <p>Order ID: ${orderDetails.orderId}</p>
      <p>Total: ₹${orderDetails.total}</p>
    `,
  });
};
```

**6. Integrate in Routes:**

In `backend/src/routes/orders.ts`:
```typescript
import { sendOrderConfirmation } from '../utils/email';

// After order creation
await sendOrderConfirmation(user.email, orderData);
```

---

## 🎯 Coupon Codes

| Code        | Discount   | Min Order |
|-------------|------------|-----------|
| MEGA50      | 50% OFF    | ₹500      |
| WELCOME50   | 50% OFF    | ₹300      |
| SUPER50     | 50% OFF    | ₹1000     |
| FLAT250     | ₹250 OFF   | ₹800      |

---

## 🔄 Inventory Reset

- All products reset to 100 units daily at 11:59 PM (node-cron)

---

## 🐛 Troubleshooting

- **MongoDB not connected?** Check your .env and Atlas IP whitelist.
- **Port in use?** Kill process using port 5001 or 3000.
- **Frontend not connecting?** Check NEXT_PUBLIC_API_URL in .env.local.


# ReSell Hub – Second-Hand Marketplace

## Project Overview

ReSell Hub is a modern second-hand marketplace web application where users can browse, search, filter, and purchase pre-owned products. The platform supports buyer, seller, and admin dashboards with role-based access. Sellers can list and manage products, buyers can place orders and make payments, and admins can monitor users, products, orders, and payments.

## Live Project Links

Live Client: https://resell-hub-client-gamma.vercel.app/  
Live Server/API: https://resell-hub-server-rewt.onrender.com





## Technologies Used

- Next.js
- React.js
- Tailwind CSS
- Axios
- TanStack Query
- Better Auth
- React Hook Form
- React Hot Toast
- Framer Motion
- Lucide React
- Recharts
- ImgBB Image Upload
- Stripe Payment Flow
- Vercel Deployment

## Core Features

- Public homepage with featured products, categories, marketplace stats, and trusted sellers.
- Product listing page with search, category filter, condition filter, location filter, price range filter, sorting, and pagination.
- Product details page with image gallery, seller information, product status, stock, price, and buy option.
- Email/password authentication using Better Auth.
- Google login integration.
- Protected dashboard routes for authenticated users.
- Role-based dashboard access for buyer, seller, and admin.
- Buyer dashboard with order, wishlist, and payment summary.
- Seller dashboard with product, order, sales, revenue, and pending order summary.
- Admin dashboard with user, product, order, revenue, and user growth overview.
- Sellers can add, update, and delete their own products.
- Product image upload using ImgBB.
- Buyers can add products to wishlist.
- Buyers can create orders and complete checkout using Stripe payment flow.
- Payment success and cancel pages.
- Buyers can view order history and payment history.
- Sellers can manage received orders.
- Admin can manage users, products, orders, and payments.
- Dark and light theme toggle.
- Fully responsive design for mobile, tablet, and desktop.

## Dependencies Used

### Main Dependencies

```json
{
  "@tanstack/react-query": "^5.62.7",
  "axios": "^1.7.9",
  "better-auth": "^1.6.8",
  "framer-motion": "^11.15.0",
  "lucide-react": "^0.468.0",
  "next": "^15.1.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.1",
  "recharts": "^2.15.0"
}
```

### Development Dependencies

```json
{
  "@tailwindcss/postcss": "^4.0.0",
  "eslint": "^9.17.0",
  "eslint-config-next": "^15.1.0",
  "tailwindcss": "^4.0.0"
}
```

## How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone your-client-repository-link
cd resell-hub-client-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env.local` file in the root folder and add the following environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=your-imgbb-api-key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

If you want to use the deployed backend instead of a local server, use:

```env
NEXT_PUBLIC_API_URL=https://resell-hub-server-rewt.onrender.com
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Open the Project in Browser

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Runs the project in development mode.

```bash
npm run build
```

Builds the project for production.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs lint checking.

## Environment Variables

| Variable Name | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend server/API URL |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB API key for product image upload |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key for payment flow |

## Relevant Resources

Live Client: https://resell-hub-client-gamma.vercel.app/  
Live Server/API: https://resell-hub-server-rewt.onrender.com  


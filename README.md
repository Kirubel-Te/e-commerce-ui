# e-commerce-ui

A modern e-commerce storefront built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Zustand.

## Overview

This project is a UI-focused e-commerce web application featuring:
- Homepage product showcase with featured image
- Category-based product browsing
- Search UI and navigation bar
- Product detail page with color/size selection and quantity controls
- Persistent cart state using `zustand` and `localStorage`
- Toast notifications for cart actions

The app currently uses static sample product data in `src/components/ProductsList.tsx` and renders product details via a temporary product object in `src/app/products/[id]/page.tsx`.

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Zustand (state management)
- React Hook Form
- React Toastify
- Lucide React icons
- Zod

## Installation

From the `e-commerce-ui` folder:

```bash
pnpm install
pnpm dev
```

If you prefer npm:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

## Project Structure

- `src/app/` - application pages and routes
  - `page.tsx` - homepage with featured banner and product grid
  - `products/page.tsx` - products listing page
  - `products/[id]/page.tsx` - product detail page
- `src/components/` - reusable UI components
  - `NavBar.tsx`, `SearchBar.tsx`, `ProductCard.tsx`, `ProductInteraction.tsx`, `ShopingCartIcon.tsx`
  - `ProductsList.tsx` - product grid and filter wrapper
- `src/stores/CartStore.ts` - persisted cart store using Zustand
- `public/` - static image assets for products, logos, and payment badges
- `src/types.ts` - shared TypeScript types

## Key Features

- Responsive product grid layout
- Product card with size and color selectors
- Product detail page with add-to-cart and quantity controls
- Cart badge count in the navbar
- Local storage cart persistence across refreshes
- Toast feedback using `react-toastify`

## Notes

- Product data is currently hard-coded for demo purposes.
- The product detail page metadata is temporary and expected to be replaced by real product data.
- The search bar is present in the UI and may be wired up later.

## Future Improvements

- Connect to a real products API or backend
- Add full cart page and checkout flow
- Enable search and category filtering from live data
- Add authentication and user account support
- Improve product detail routing with dynamic data fetching

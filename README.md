# shopify-code-snippets

# Shopify Headed + Headless Commerce Example

This project demonstrates modern Shopify development patterns across both **headed (Liquid theme development)** and **headless (React + GraphQL Storefront API)** architectures.

It is designed to showcase practical Shopify engineering skills including:

- Liquid theme customization
- Tailwind CSS styling
- Shopify Storefront GraphQL API usage
- React component-driven architecture
- API abstraction and secure token handling

---

## 🚀 Overview

This repository contains:

- A custom **Shopify theme section** built with Liquid
- A **GraphQL query** for fetching collection products
- A **React component** rendering Shopify commerce data
- An example **API proxy** for secure Storefront API access

The project demonstrates how traditional Shopify themes and modern headless storefronts can coexist or be implemented independently.

---

## 📂 Project Structure
---
    shopify-commerce-example/
    │
    ├── theme/
    │ └── sections/
    │ └── featured-products.liquid
    │
    ├── graphql/
    │ └── getProducts.graphql
    │
    ├── frontend/
    │ └── components/
    │ └── ProductGrid.jsx
    │
    ├── pages/
    │ └── api/
    │ └── shopify.js
    │
    └── README.md

---

## 🛍 Headed Shopify (Liquid Theme)

The `featured-products.liquid` section demonstrates:

- Shopify **Liquid templating**
- Section schema configuration
- Collection-based product rendering
- Tailwind CSS responsive layouts
- Image optimization using `image_url`
- Clean component-style structure within a theme

### Installing the Section

1. Go to **Shopify Admin → Online Store → Themes**
2. Click **Edit Code**
3. Add a new section under `/sections`
4. Paste the `featured-products.liquid` file
5. Add the section via the Theme Customizer

---

## 🧠 Headless Shopify (React + GraphQL)

The headless implementation uses:

- Shopify **Storefront API**
- **GraphQL queries**
- React functional components
- Tailwind CSS utility styling
- API proxy for secure token usage

### Example GraphQL Query

Saved as `getProducts.graphql`:

```graphql
query GetProducts($handle: String!) {
  collection(handle: $handle) {
    title
    products(first: 6) {
      edges {
        node {
          id
          title
          handle
          featuredImage { url }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
}
```
Recommended file extension: .graphql

### ⚙️ Environment Variables

For headless setup:
```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
```

Create a Storefront API token via:

Shopify Admin → Settings → Apps and Sales Channels → Develop Apps

### 🔐 Example API Proxy (Node / Next.js)

```
export default async function handler(req, res) {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify(req.body),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
```

### 🎯 Concepts Demonstrated
- Shopify Liquid theme development
- Component-driven UI architecture
- Tailwind CSS utility-first styling
- Headless commerce architecture
- Shopify Storefront GraphQL API integration
- API abstraction layer
- Secure environment configuration
- Product data rendering (title, image, pricing)
- Responsive commerce UI patterns

### 🧩 Possible Extensions
- Shopify Functions (custom discount logic)
- Checkout UI Extensions
- Cart drawer with AJAX updates
- Search and filtering
- SEO structured data
- Performance optimization (Lighthouse)
- Shopify Hydrogen integration
- Server-side rendering (Next.js)

### 🛠 Tech Stack

- Shopify (Themes + Storefront API)
- Liquid
- React
- GraphQL
- Tailwind CSS
- Node.js

### 📌 Purpose

This project is intended to demonstrate:
- Production-grade Shopify theme development
- Modern headless storefront implementation
- Clean, scalable frontend architecture
- Real-world Shopify integration patterns
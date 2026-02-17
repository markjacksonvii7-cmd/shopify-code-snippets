import React, { useEffect, useState } from "react";

export default function ProductGrid({ handle }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/shopify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              collection(handle: "${handle}") {
                products(first: 6) {
                  edges {
                    node {
                      id
                      title
                      handle
                      featuredImage { url }
                      priceRange {
                        minVariantPrice { amount }
                      }
                    }
                  }
                }
              }
            }
          `
        })
      });

      const json = await res.json();
      setProducts(
        json.data.collection.products.edges.map(edge => edge.node)
      );
    }

    fetchProducts();
  }, [handle]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded p-4">
          <img
            src={product.featuredImage?.url}
            alt={product.title}
            className="mb-4"
          />
          <h3 className="font-semibold">{product.title}</h3>
          <p>${product.priceRange.minVariantPrice.amount}</p>
        </div>
      ))}
    </div>
  );
}

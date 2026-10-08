"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch {
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section id="products" className="px-4 py-6 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-gray-900">
            সব পণ্য
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const isUp = product.change?.dir === "up";

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-green-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
                      {product.categoryIcon || product.image}
                    </div>

                    <div>
                      <h3 className="text-[19px] font-bold text-gray-900">
                        {product.nameBn}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        প্রতি {product.unit}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      আজকের দাম
                    </p>

                    <p className="mt-1 text-[17px] font-extrabold text-gray-900">
                      {product.today} টাকা
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"} {product.change?.pct}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
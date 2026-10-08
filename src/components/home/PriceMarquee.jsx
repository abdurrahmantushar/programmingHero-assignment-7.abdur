"use client";

import { getUnitName } from "@/lib/formatUnit";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PriceMarquee() {
  const [products, setProducts] = useState([]);

  const formatNumber = new Intl.NumberFormat("bn-BD");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
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

  if (!products.length) {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className=" w-full overflow-hidden border border-gray-100 bg-white">
      <div className="price-marquee">
        <div className="flex w-max">
          {items.map((product, index) => {
            const isUp = product.change?.dir === "up";

            return (
              <Link
                key={`${product.id}-${index}`}
                href={`/product/${product.slug}`}
                className="flex shrink-0 items-center gap-2 border-r border-green-200 px-6 py-3 transition hover:bg-green-100"
              >
                <span className="text-lg">
                  {product.categoryIcon || product.image}
                </span>

                <span className="whitespace-nowrap text-sm font-semibold text-gray-800">
                  {product.nameBn}
                </span>

                <span className="whitespace-nowrap text-sm font-bold text-green-700">
                  ৳{formatNumber.format(product.today)}
                </span>

                <span className="whitespace-nowrap text-xs text-gray-500">
                  / {getUnitName(product.unit)}
                </span>

                <span
                  className={`whitespace-nowrap text-xs font-semibold ${
                    isUp ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {isUp ? "▲" : "▼"}{" "}
                  {formatNumber.format(product.change?.pct)}%
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
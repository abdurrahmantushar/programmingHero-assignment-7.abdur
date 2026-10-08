"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function CategoryPage({ params }) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  const formatNumber = new Intl.NumberFormat("bn-BD");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { slug } = await params;

        const response = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const categoryProducts = Array.isArray(data)
          ? data.filter((product) => product.category === slug)
          : [];

        setProducts(categoryProducts);

        if (categoryProducts.length > 0) {
          setCategoryName(categoryProducts[0].categoryNameBn);
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-high") {
      return a.today - b.today;
    }

    if (sortOrder === "high-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <main className="min-h-screen bg-[#f3f7f3]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600"
        >
          <ArrowLeft size={17} />
          হোমে ফিরে যান
        </Link>

        <div className="mb-7 rounded-3xl bg-white px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="shrink-0 text-3xl sm:text-4xl">
              {products[0]?.categoryIcon || "📦"}
            </span>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {categoryName || "পণ্য"}
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {formatNumber.format(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-gray-500">
            পণ্য লোড হচ্ছে...
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center">
            <p className="font-semibold text-gray-700">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5 flex flex-col gap-3 rounded-3xl bg-white px-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-6 lg:px-6 lg:py-6">
              <h2 className="text-lg font-bold text-gray-900">
                পণ্যসমূহ
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  সাজান
                </span>

                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  <option value="default">ডিফল্ট</option>
                  <option value="low-high">দাম: কম থেকে বেশি</option>
                  <option value="high-low">দাম: বেশি থেকে কম</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => {
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
                          {formatNumber.format(product.today)} টাকা
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                          isUp
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {isUp ? "▲" : "▼"}{" "}
                        {formatNumber.format(product.change?.pct)}%
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
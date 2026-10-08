"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getUnitName } from "@/lib/formatUnit";

export default function CategoryPage({ params }) {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [categoryFound, setCategoryFound] = useState(true);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  const formatNumber = new Intl.NumberFormat("bn-BD");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { slug } = await params;

        const categoryResponse = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/categories"
        );

        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categories = await categoryResponse.json();

        const category = Array.isArray(categories)
          ? categories.find((item) => item.slug === slug)
          : null;

        if (!category) {
          setCategoryFound(false);
          return;
        }

        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const categoryProducts = Array.isArray(data)
          ? data.filter((product) => product.category === slug)
          : [];

        setProducts(categoryProducts);
        setCategoryName(category.nameBn);
        setCategoryIcon(category.icon);
      } catch {
        setProducts([]);
        setCategoryFound(false);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-high") {
      return Number(a.today) - Number(b.today);
    }

    if (sortOrder === "high-low") {
      return Number(b.today) - Number(a.today);
    }

    return 0;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f7f3]">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6 h-5 w-36 animate-pulse rounded bg-gray-200" />

          <div className="mb-7 rounded-3xl bg-white px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-12 w-12 animate-pulse rounded-xl bg-green-50 sm:h-14 sm:w-14" />

              <div className="flex-1">
                <div className="h-7 w-40 animate-pulse rounded bg-gray-200 sm:h-8" />
                <div className="mt-2 h-4 w-52 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="mb-5 flex flex-col gap-3 rounded-3xl bg-white px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-green-50" />

                  <div className="flex-1">
                    <div className="h-5 w-32 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-20 rounded bg-gray-200" />
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <div className="h-3 w-16 rounded bg-gray-200" />
                    <div className="mt-2 h-5 w-24 rounded bg-gray-200" />
                  </div>

                  <div className="h-6 w-14 rounded-full bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!categoryFound) {
    return (
      <main className="min-h-screen bg-[#f3f7f3]">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
              🔍
            </div>

            <p className="mt-6 text-6xl font-extrabold text-green-600">
              404
            </p>

            <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
              ক্যাটাগরি পাওয়া যায়নি
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <ArrowLeft size={17} />
              হোমে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
              {categoryIcon || "📦"}
            </span>

            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {categoryName || "পণ্য"}
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                {formatNumber.format(products.length)}টি পণ্যের আজকের দাম ও
                পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
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
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-2xl">
                          {product.categoryIcon || product.image}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-[19px] font-bold text-gray-900">
                            {product.nameBn}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            প্রতি {getUnitName(product.unit)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          আজকের দাম
                        </p>

                        <p className="mt-1 text-[17px] font-extrabold text-gray-900">
                          {formatNumber.format(product.today)} টাকা
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
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
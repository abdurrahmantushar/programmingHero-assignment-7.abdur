"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { getUnitName } from "@/lib/formatUnit";

export default function ProductDetailsPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatNumber = new Intl.NumberFormat("bn-BD");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { slug } = await params;

        const response = await fetch(
          "https://api.abcz.workers.dev/api/bazardor/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const foundProduct = Array.isArray(data)
          ? data.find((item) => item.slug === slug)
          : null;

        setProduct(foundProduct);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f3f7f3]">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <p className="text-sm text-gray-500">
            পণ্যের তথ্য লোড হচ্ছে...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f3f7f3]">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-green-600"
          >
            <ArrowLeft size={17} />
            হোমে ফিরে যান
          </Link>

          <div className="mx-auto mt-8 max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
              🔍
            </div>

            <p className="mt-6 text-6xl font-extrabold text-green-600">
              404
            </p>

            <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
              পণ্য পাওয়া যায়নি
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
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

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => Number(market.min)))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => Number(market.max)))
      : product.today;

  const marketAverages = markets.map((market) => {
    return (Number(market.min) + Number(market.max)) / 2;
  });

  const averagePrice =
    marketAverages.length > 0
      ? marketAverages.reduce((sum, price) => sum + price, 0) /
        marketAverages.length
      : Number(product.today);

  const roundedAverage = Number(averagePrice.toFixed(2));

  const isUp = product.change?.dir === "up";

  const priceDifference = Math.abs(
    Number(product.today) - Number(product.yesterday)
  );

  const formatPrice = (price) => {
    const number = Number(price);

    return Number.isInteger(number)
      ? formatNumber.format(number)
      : formatNumber.format(Number(number.toFixed(2)));
  };

  return (
    <main className="min-h-screen bg-[#f3f7f3]">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link
            href="/"
            className="transition hover:text-green-600"
          >
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-700">
            {product.nameBn}
          </span>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-7 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
            <div className="flex min-h-[240px] items-center justify-center rounded-3xl bg-green-50 sm:min-h-[280px]">
              <span className="text-[100px] sm:text-[120px]">
                {product.categoryIcon || product.image}
              </span>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                  {product.categoryNameBn}
                </span>

                <span className="text-sm text-gray-500">
                  প্রতি {getUnitName(product.unit)}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {product.nameBn}
              </h1>

              <div className="mt-7">
                <p className="text-sm font-medium text-gray-500">
                  আজকের দাম
                </p>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                    {formatNumber.format(product.today)}
                  </span>

                  <span className="mb-1 text-sm text-gray-500">
                    টাকা / {getUnitName(product.unit)}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"}{" "}
                    {formatNumber.format(product.change?.pct)}%
                  </span>

                  <p className="text-sm text-gray-500">
                    গতকালের তুলনায় আজ দাম{" "}
                    <span
                      className={`font-bold ${
                        isUp ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {isUp ? "বেড়েছে" : "কমেছে"}
                    </span>{" "}
                    · {formatNumber.format(priceDifference)} টাকা
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              দামের সারসংক্ষেপ
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  সর্বনিম্ন দাম
                </p>

                <p className="mt-2 text-2xl font-extrabold text-green-600">
                  {formatPrice(minPrice)}{" "}
                  <span className="text-sm font-medium text-gray-500">
                    টাকা
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  সর্বাধিক দাম
                </p>

                <p className="mt-2 text-2xl font-extrabold text-red-600">
                  {formatPrice(maxPrice)}{" "}
                  <span className="text-sm font-medium text-gray-500">
                    টাকা
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm text-gray-500">
                  গড় দাম
                </p>

                <p className="mt-2 text-2xl font-extrabold text-green-600">
                  {formatPrice(roundedAverage)}{" "}
                  <span className="text-sm font-medium text-gray-500">
                    টাকা
                  </span>
                </p>

                <p className="text-sm text-gray-500">
                  প্রতি {getUnitName(product.unit)}-এর হিসাবে
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-5 py-4 text-left text-sm font-bold text-gray-700">
                        বাজার
                      </th>

                      <th className="px-5 py-4 text-left text-sm font-bold text-gray-700">
                        বিভাগ
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-bold text-gray-700">
                        সর্বনিম্ন
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-bold text-gray-700">
                        সর্বাধিক
                      </th>

                      <th className="px-5 py-4 text-right text-sm font-bold text-gray-700">
                        গড়
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {markets.map((market, index) => {
                      const marketAverage =
                        (Number(market.min) + Number(market.max)) / 2;

                      return (
                        <tr
                          key={`${market.market}-${index}`}
                          className={`border-t border-gray-200 ${
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-green-100/50"
                          }`}
                        >
                          <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                            {market.market}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {market.division}
                          </td>

                          <td className="px-5 py-4 text-right text-sm text-gray-700">
                            {formatPrice(market.min)} টাকা
                          </td>

                          <td className="px-5 py-4 text-right text-sm text-gray-700">
                            {formatPrice(market.max)} টাকা
                          </td>

                          <td className="px-5 py-4 text-right text-sm font-bold text-gray-900">
                            {formatPrice(marketAverage)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
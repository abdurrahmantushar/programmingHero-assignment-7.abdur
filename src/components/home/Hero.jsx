"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setCurrentDate(date);
  }, []);

  return (
    <section className="px-4 py-8 sm:py-10">
<div className="flex items-center max-w-7xl m-auto justify-between gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:px-10 lg:py-8 bg-white rounded-3xl">
  <div className="flex-1">
    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
      <CalendarDays size={16} />
      <span>{currentDate}</span>
    </div>

    <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-3xl">
      আজকের বাজারের দাম এক নজরে
    </h1>

    <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
      চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
      বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
    </p>

    <Link
      href="#products"
      className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
    >
      সব পণ্য দেখুন
      <ArrowRight size={17} />
    </Link>
  </div>

  <div className="flex shrink-0 items-center justify-end">
    <img
      src="/bazar-hero 1.png"
      alt="বাজারের পণ্য"
      className="h-auto w-[315px] object-contain"
    />
  </div>
</div>
    </section>
  );
}
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f3f7f3]">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center sm:px-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <SearchX size={30} />
          </div>

          <p className="mt-6 text-6xl font-extrabold text-green-600">
            404
          </p>

          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
            পেজটি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি অথবা এটি আর উপলব্ধ নেই।
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
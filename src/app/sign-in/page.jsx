"use client";

import Link from "next/link";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("ইমেইল এবং পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
    }
  } catch {
    toast.error("কিছু একটা সমস্যা হয়েছে");
  }
  };
  const handleGithubSignIn = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
    }
  } catch {
    toast.error("কিছু একটা সমস্যা হয়েছে");
  }
  };
  return (
    <main className="min-h-screen bg-[#f3f7f3] px-4 py-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col items-center justify-center">
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-extrabold text-gray-900">
              সাইন ইন করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                ইমেইল
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="আপনার পাসওয়ার্ড"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-20 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-600"
                >
                  {showPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-green-600 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            এখনো অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-green-600 transition hover:text-green-700"
            >
              সাইন আপ করুন
            </Link>
          </p>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="flex h-11 w-full items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <FaGoogle className="mb-1 text-[13.6px]" />
              Google দিয়ে চালিয়ে দিন
            </button>

            <button
              onClick={handleGithubSignIn}
              type="button"
              className="flex h-11 w-full items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <FaGithub className="mb-1 text-[13.6px]" />
              GitHub দিয়ে চালিয়ে দিন
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-600"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
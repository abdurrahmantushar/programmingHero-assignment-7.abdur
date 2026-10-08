"use client";

import Link from "next/link";
import {
  ArrowLeft,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit =async (e) =>{
    e.preventDefault()

      if (!name || !email || !password || !confirmPassword) {
        toast.error("সব তথ্য পূরণ করুন");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("পাসওয়ার্ড মিলছে না");
        return;
}
    setLoading(true)

    try {
      const {data , error } = await authClient.signUp.email({
        name,
        email,
        password
      })
      if (error) {
        console.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে");
      router.push("/sign-in");
    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }
  const handleGoogleSignUp = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google দিয়ে সাইন আপ করা যায়নি");
    }
  } catch {
    toast.error("কিছু একটা সমস্যা হয়েছে");
  }
  };
  const handleGithubSignUp = async () => {
  try {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub দিয়ে সাইন আপ করা যায়নি");
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
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              বাজার দর-এর সাথে যুক্ত হতে সাইন আপ করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                নাম
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

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
                  placeholder="একটি পাসওয়ার্ড দিন"
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

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-20 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-green-600"
                >
                  {showConfirmPassword ? "লুকান" : "দেখুন"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-green-600 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            আগে থেকেই অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-bold text-green-600 transition hover:text-green-700"
            >
              সাইন ইন করুন
            </Link>
          </p>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">অথবা</span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="flex h-11 w-full items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <FaGoogle className="mb-1 text-[13.6px]" />
              Google দিয়ে চালিয়ে দিন
            </button>

            <button
              onClick={handleGithubSignUp}
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
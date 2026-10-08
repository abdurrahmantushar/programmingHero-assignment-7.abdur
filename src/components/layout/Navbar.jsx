"use client";

import Link from "next/link";
import { ChevronDown, LogOut, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const date = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    setCurrentDate(date);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি");
        return;
      }

      setOpenDropdown(false);
      toast.success("সফলভাবে লগআউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    }
  };

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex min-h-[82px] items-center justify-between gap-6">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
              <ShoppingCart size={22} strokeWidth={2.3} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold leading-tight text-gray-900">
                বাজার দর
              </h1>

              <p className="mt-0.5 text-xs text-gray-500">
                {currentDate}
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            {isPending ? null : session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
                    {session.user.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <span className="max-w-[140px] truncate">
                    {session.user.name}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown && (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {session.user.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setOpenDropdown(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                      >
                        <User size={17} />
                        প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={17} />
                        লগআউট
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700"
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
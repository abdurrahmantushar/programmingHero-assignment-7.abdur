"use client";

import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম দিন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f7f3] px-4 py-10">
        <div className="mx-auto max-w-5xl py-20 text-center text-sm text-gray-500">
          প্রোফাইল লোড হচ্ছে...
        </div>
      </main>
    );
  }



  const userInitial = session.user.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#f3f7f3] px-4 py-8 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div>
<div className="flex items-center gap-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 text-3xl font-extrabold text-green-700">
    {session.user.image ? (
      <img
        src={session.user.image}
        alt={session.user.name || "Profile"}
        className="h-full w-full object-cover"
      />
    ) : (
      userInitial
    )}
  </div>

  <div className="min-w-0 flex-1">
    <h2 className="text-xl font-extrabold text-gray-900">
      {session.user.name}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      {session.user.email}
    </p>

  </div>
    <button
      type="button"
      onClick={handleLogout}
      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
    >
      <LogOut size={17} />
      সাইন আউট
    </button>
</div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 mt-5">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-gray-900">
                  তথ্য
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  আপনার অ্যাকাউন্টের তথ্য আপডেট করুন।
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  নাম
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>


              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
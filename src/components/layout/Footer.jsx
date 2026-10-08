export default function Footer() {
  return (
    <footer className="border-t border-green-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-6 text-sm text-gray-900 sm:flex-row sm:items-center">
        <p>
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        <p className="sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
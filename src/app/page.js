
import AllProducts from "@/components/home/AllProducts";
import Hero from "@/components/home/Hero";
import TodayPriceDecrease from "@/components/home/TodayPriceDecrease";
import TodayPriceIncrease from "@/components/home/TodayPriceIncrease";



export default function Home() {
  return (
    <main className="min-h-screen">


      <Hero/>
      <div className="mx-auto max-w-7xl px-4 py-10 bg-green-100/10">
        <h1 className="text-3xl font-bold text-gray-900">
          <TodayPriceIncrease/>
          <TodayPriceDecrease/>
          <AllProducts/>
        </h1>
      </div>

    </main>
  );
}
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import Pricing from "@/components/Pricing";
import CompanySearch from "@/components/CompanySearch";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Journey />
      <Pricing />
      <CompanySearch />
      <Footer />
    </main>
  );
}
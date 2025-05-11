import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ROICalculator from "@/components/features/ROICalculator";
import Features from "@/components/features/Features";
import BenefitsSection from "@/components/features/BenefitsSection";
import CaseStudy from "@/components/features/CaseStudy";
import HubSpotForm from "@/components/features/HubSpotForm";
import { useEffect } from "react";

export default function Home() {
  // Add scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* ROI Calculator Section - Main focus as requested */}
      <section id="calculator" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 text-center mb-8">
          <h1 className="font-rem font-semibold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-blackened">
            Discover Your IAM Cost Savings Potential
          </h1>
          <p className="font-lato text-lg md:text-xl mb-8 text-midnight max-w-3xl mx-auto">
            Calculate how much your organisation can save with Identum's cloud-based Identity and Access Management solution.
          </p>
        </div>
        <ROICalculator />
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-drizzle">
        <Features />
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-shroom">
        <BenefitsSection />
      </section>
      
      {/* Case Study Section */}
      <section className="py-16 bg-white">
        <CaseStudy />
      </section>
      
      {/* Contact Form / HubSpot Form */}
      <section className="py-16 gradient-bg text-white">
        <HubSpotForm />
      </section>
      
      <Footer />
    </div>
  );
}

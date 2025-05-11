import { Card, CardContent } from "@/components/ui/card";
import { Shield, TrendingUp, RefreshCw } from "lucide-react";

export default function Features() {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-rem font-semibold text-3xl md:text-4xl text-blackened text-center mb-12">
        Why Organisations Choose Identum
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-cherry rounded-full flex items-center justify-center mb-6">
              <Shield className="text-white text-2xl" size={28} />
            </div>
            <h3 className="font-rem font-semibold text-xl mb-4 text-blackened">
              Enhanced Security
            </h3>
            <p className="font-lato text-midnight">
              Protect your digital assets with enterprise-grade identity management and access controls.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-cherry rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="text-white text-2xl" size={28} />
            </div>
            <h3 className="font-rem font-semibold text-xl mb-4 text-blackened">
              Operational Efficiency
            </h3>
            <p className="font-lato text-midnight">
              Automate identity lifecycles to reduce manual effort and eliminate costly errors.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-cherry rounded-full flex items-center justify-center mb-6">
              <RefreshCw className="text-white text-2xl" size={28} />
            </div>
            <h3 className="font-rem font-semibold text-xl mb-4 text-blackened">
              Seamless Transitions
            </h3>
            <p className="font-lato text-midnight">
              Smoothly handle onboarding, role changes, and offboarding across your organisation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

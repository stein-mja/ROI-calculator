import { Card, CardContent } from "@/components/ui/card";
import { UserCheck, Gauge, Lock } from "lucide-react";

export default function BenefitsSection() {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="font-rem font-semibold text-3xl text-blackened text-center mb-12">
        Beyond Cost Savings
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-cherry rounded-full flex items-center justify-center mr-4 shrink-0">
                <UserCheck className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-rem font-semibold text-xl mb-2 text-blackened">
                  Improved Compliance
                </h3>
                <p className="font-lato text-midnight">
                  Meet regulatory requirements with automated access controls and comprehensive audit trails.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-cherry rounded-full flex items-center justify-center mr-4 shrink-0">
                <Gauge className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-rem font-semibold text-xl mb-2 text-blackened">
                  Increased Productivity
                </h3>
                <p className="font-lato text-midnight">
                  Reduce wait times for access requests and streamline onboarding processes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-cherry rounded-full flex items-center justify-center mr-4 shrink-0">
                <Lock className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-rem font-semibold text-xl mb-2 text-blackened">
                  Reduced Security Risks
                </h3>
                <p className="font-lato text-midnight">
                  Minimize unauthorized access and enforce least privilege principles throughout your organisation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

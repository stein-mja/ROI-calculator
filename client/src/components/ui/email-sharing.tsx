import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { CurrencyCode, formatCurrency } from "@/lib/currency";

const emailSchema = z.string().email("Please enter a valid email address");

interface ROIData {
  employees: number;
  newHires: number;
  roleChanges: number;
  departures: number;
  adminCost: number;
  annualSavings: number;
  fiveYearSavings: number;
  timeSaved: number;
  securityImprovement: number;
  currency: CurrencyCode;
}

interface EmailSharingProps {
  data: ROIData;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function EmailSharing({ data, onSuccess, onError }: EmailSharingProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };
  
  const validateEmail = () => {
    try {
      emailSchema.parse(email);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message);
      } else {
        setError("Invalid email address");
      }
      return false;
    }
  };
  
  const handleShareViaEmail = async () => {
    if (!validateEmail()) return;
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/share/email", {
        recipientEmail: email,
        data
      });
      
      setEmail("");
      onSuccess();
      
      // Track successful email share for HubSpot analytics
      import('@/lib/hubspot-integration').then(module => {
        module.trackEmailSharing(true);
      }).catch(err => {
        console.error('Failed to load HubSpot integration:', err);
      });
    } catch (error) {
      console.error("Error sharing results:", error);
      onError("Failed to send the report. Please try again.");
      
      // Track failed email share for HubSpot analytics
      import('@/lib/hubspot-integration').then(module => {
        module.trackEmailSharing(false);
      }).catch(err => {
        console.error('Failed to load HubSpot integration:', err);
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const generateShareMessage = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      employees: data.employees.toString(),
      newHires: data.newHires.toString(),
      roleChanges: data.roleChanges.toString(),
      departures: data.departures.toString(),
      adminCost: data.adminCost.toString(),
      currency: data.currency
    });
    
    return {
      url: `${baseUrl}?${params.toString()}`,
      text: `Check out how much your organisation can save with Identum's IAM solution. Annual savings potential: ${formatCurrency(data.annualSavings, data.currency)}`
    };
  };
  
  const handleShareOnLinkedIn = () => {
    const { url, text } = generateShareMessage();
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`, '_blank');
  };
  
  const handleShareOnTwitter = () => {
    const { url, text } = generateShareMessage();
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
  };
  
  const handleShareViaMailto = () => {
    const { url, text } = generateShareMessage();
    const subject = "Identum IAM ROI Calculator Results";
    const body = `${text}\n\nView the calculator: ${url}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email address"
          className="flex-grow border border-bergen-sky rounded px-4 py-2 focus:outline-none focus:border-cherry"
          aria-label="Email to share results"
        />
        <Button
          onClick={handleShareViaEmail}
          disabled={isSubmitting}
          className="bg-cherry text-white font-lato font-medium px-6 py-2 rounded hover:bg-currant transition form-button whitespace-nowrap"
        >
          {isSubmitting ? "Sending..." : "Send Report"}
        </Button>
      </div>
      {error && <p className="text-destructive text-sm mb-4">{error}</p>}
      
      <div className="flex justify-center space-x-4">
        <Button
          variant="ghost"
          onClick={handleShareOnLinkedIn}
          className="text-midnight hover:text-cherry transition"
          size="icon"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={22} />
        </Button>
        <Button
          variant="ghost"
          onClick={handleShareOnTwitter}
          className="text-midnight hover:text-cherry transition"
          size="icon"
          aria-label="Share on Twitter"
        >
          <Twitter size={22} />
        </Button>
        <Button
          variant="ghost"
          onClick={handleShareViaMailto}
          className="text-midnight hover:text-cherry transition"
          size="icon"
          aria-label="Share via email"
        >
          <Mail size={22} />
        </Button>
      </div>
    </div>
  );
}

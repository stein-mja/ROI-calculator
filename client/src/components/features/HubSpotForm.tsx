import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  organisation: z.string().min(1, "Organisation name is required"),
  role: z.string().min(1, "Please select your role")
});

type FormValues = z.infer<typeof formSchema>;

export default function HubSpotForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      organisation: "",
      role: ""
    }
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/hubspot/contact", values);
      
      toast({
        title: "Success!",
        description: "Your ROI report has been sent to your email.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="font-rem font-semibold text-3xl md:text-4xl mb-4">
          Get Your Detailed ROI Report
        </h2>
        <p className="font-lato text-lg text-drizzle">
          Receive a comprehensive report with detailed analysis of your potential savings and implementation roadmap.
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <CardContent className="p-8">
          <h3 className="font-rem font-semibold text-2xl text-blackened mb-6">
            Contact Information
          </h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lato font-medium text-blackened">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your first name" 
                          className="w-full border border-bergen-sky rounded px-4 py-2 focus:outline-none focus:border-cherry"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-lato font-medium text-blackened">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your last name" 
                          className="w-full border border-bergen-sky rounded px-4 py-2 focus:outline-none focus:border-cherry"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato font-medium text-blackened">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="w-full border border-bergen-sky rounded px-4 py-2 focus:outline-none focus:border-cherry"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="organisation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato font-medium text-blackened">
                      Organisation Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your organisation name" 
                        className="w-full border border-bergen-sky rounded px-4 py-2 focus:outline-none focus:border-cherry"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lato font-medium text-blackened">
                      Your Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border border-bergen-sky focus:border-cherry">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="IT Director">IT Director</SelectItem>
                        <SelectItem value="CIO/CISO">CIO/CISO</SelectItem>
                        <SelectItem value="IT Manager">IT Manager</SelectItem>
                        <SelectItem value="Security Specialist">Security Specialist</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-cherry text-white font-lato font-medium px-8 py-3 rounded text-lg hover:bg-currant transition form-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Get My ROI Report"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

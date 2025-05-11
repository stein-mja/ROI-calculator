import { useState } from "react";
import { 
  Landmark, Stethoscope, GraduationCap, Building, 
  ShoppingBag, Factory, Cpu, Heart, 
  Check, Info
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IndustryTemplate, industryTemplates } from "@/lib/industry-templates";

// Map of icon names to icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  Landmark,
  Stethoscope,
  GraduationCap,
  Building,
  ShoppingBag,
  Factory,
  Cpu,
  Heart
};

interface IndustryTemplateSelectorProps {
  onSelectTemplate: (template: IndustryTemplate) => void;
  selectedTemplateId: string | null;
}

export default function IndustryTemplateSelector({
  onSelectTemplate,
  selectedTemplateId
}: IndustryTemplateSelectorProps) {
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  
  // Limit to 4 templates when not showing all
  const visibleTemplates = showAllTemplates ? industryTemplates : industryTemplates.slice(0, 4);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="font-rem font-semibold text-xl text-blackened mb-1">
            Select an Industry Template
          </h3>
          <p className="text-midnight text-sm">
            Choose an industry to pre-fill the calculator with typical values for your sector
          </p>
        </div>
        {!showAllTemplates && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAllTemplates(true)}
            className="self-start"
          >
            Show All Industries
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleTemplates.map((template) => {
          const Icon = iconMap[template.icon];
          const isSelected = selectedTemplateId === template.id;
          
          return (
            <Card 
              key={template.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-cherry border-transparent' : 'hover:border-cherry'
              }`}
              onClick={() => onSelectTemplate(template)}
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div className={`p-2 rounded-full ${isSelected ? 'bg-cherry/10' : 'bg-midnight/5'}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? 'text-cherry' : 'text-midnight'}`} />
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="bg-cherry hover:bg-cherry text-xs">
                      <Check className="w-3 h-3 mr-1" /> Selected
                    </Badge>
                  )}
                </div>
                
                <h4 className="font-rem font-medium text-lg mt-3 mb-1 text-blackened">
                  {template.name}
                </h4>
                
                <div className="flex items-start mt-1 text-sm text-bergen-sky group">
                  <p className="line-clamp-2">{template.description}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex shrink-0 ml-1 text-bergen-sky">
                          <Info className="w-3.5 h-3.5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Pre-fills values for an average {template.name.toLowerCase()} organization 
                          with {template.defaults.employees.toLocaleString()} employees.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
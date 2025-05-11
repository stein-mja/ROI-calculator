import { CheckCircle, ArrowRight } from "lucide-react";

export default function CaseStudy() {
  return (
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
            alt="Modern organization office with team members collaborating" 
            className="rounded-xl shadow-lg"
          />
        </div>
        <div>
          <div className="text-sm text-cherry font-lato font-medium mb-2">CASE STUDY</div>
          <h2 className="font-rem font-semibold text-3xl text-blackened mb-4">
            How City of Metropolis Saved $425,000 Annually
          </h2>
          <p className="font-lato text-midnight mb-6">
            The City of Metropolis, with 2,700 employees across 14 departments, was struggling with manual identity 
            management processes. After implementing Identum's IAM solution:
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <CheckCircle className="text-cherry mt-1 mr-3 flex-shrink-0" size={20} />
              <p className="font-lato text-midnight">Reduced onboarding time from 2 days to 2 hours</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-cherry mt-1 mr-3 flex-shrink-0" size={20} />
              <p className="font-lato text-midnight">Cut help desk tickets related to access issues by 73%</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="text-cherry mt-1 mr-3 flex-shrink-0" size={20} />
              <p className="font-lato text-midnight">Achieved 100% compliance with access review requirements</p>
            </div>
          </div>
          
          <a 
            href="#" 
            className="inline-flex items-center font-lato font-medium text-cherry hover:text-currant transition"
          >
            Read Full Case Study
            <ArrowRight className="ml-2" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

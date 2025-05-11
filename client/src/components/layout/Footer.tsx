import { Facebook, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blackened text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-rem font-semibold text-xl mb-4">Identum</h3>
            <p className="font-lato text-bergen-sky mb-4">
              Secure identity management solutions for modern organisations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-cherry transition" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-white hover:text-cherry transition" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-white hover:text-cherry transition" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-rem font-semibold mb-4">Solutions</h4>
            <ul className="font-lato space-y-2 text-bergen-sky">
              <li><a href="#" className="hover:text-cherry transition">Identity Governance</a></li>
              <li><a href="#" className="hover:text-cherry transition">Access Management</a></li>
              <li><a href="#" className="hover:text-cherry transition">Privileged Access</a></li>
              <li><a href="#" className="hover:text-cherry transition">Directory Services</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-rem font-semibold mb-4">Resources</h4>
            <ul className="font-lato space-y-2 text-bergen-sky">
              <li><a href="#" className="hover:text-cherry transition">Blog</a></li>
              <li><a href="#" className="hover:text-cherry transition">Case Studies</a></li>
              <li><a href="#" className="hover:text-cherry transition">Whitepapers</a></li>
              <li><a href="#" className="hover:text-cherry transition">Webinars</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-rem font-semibold mb-4">Contact</h4>
            <ul className="font-lato space-y-2 text-bergen-sky">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-cherry" /> 
                <span>info@identum.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-cherry" /> 
                <span>+1 (800) 555-1234</span>
              </li>
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 text-cherry mt-1" /> 
                <span>123 Security Ave<br />Enterprise, CA 94105</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* ROI Calculation Methodology Section */}
        <div className="border-t border-midnight pt-8 pb-8">
          <h4 className="font-rem font-semibold text-lg mb-4 text-white">ROI Calculation Methodology</h4>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-lato text-sm text-bergen-sky mb-3">
                Our ROI calculator uses a comprehensive model that accounts for the following value drivers:
              </p>
              <ul className="font-lato text-sm space-y-2 text-bergen-sky list-disc pl-5">
                <li><span className="font-medium text-white">Direct time savings</span> from automating employee onboarding, role changes, and offboarding processes</li>
                <li><span className="font-medium text-white">Access request optimization</span> through streamlined self-service workflows and automated approvals</li>
                <li><span className="font-medium text-white">Security incident reduction</span> from improved access controls and reduced standing privileges</li>
                <li><span className="font-medium text-white">Compliance and audit efficiency</span> through automated reporting and access certification</li>
                <li><span className="font-medium text-white">License cost optimization</span> from improved visibility into unused accounts and licenses</li>
              </ul>
            </div>
            <div>
              <p className="font-lato text-sm text-bergen-sky mb-3">
                The calculation incorporates industry benchmarks for:
              </p>
              <ul className="font-lato text-sm space-y-2 text-bergen-sky list-disc pl-5">
                <li>Time required for manual identity management tasks</li>
                <li>Frequency of access-related security incidents</li>
                <li>Hours spent on compliance reporting and audits</li>
                <li>Typical excess license costs in organizations</li>
                <li>Implementation timelines and adoption curves</li>
              </ul>
              <p className="font-lato text-xs text-bergen-sky italic mt-4">
                <strong className="text-cherry">Disclaimer:</strong> Results will vary based on your organisation's specific circumstances, 
                implementation approach, and existing processes. The figures presented are estimates based on industry 
                averages and Identum's customer experience. Your actual results may differ. For a detailed and 
                personalized assessment, please contact our team.
              </p>
            </div>
          </div>
        </div>
        
        {/* Copyright and Links */}
        <div className="border-t border-midnight pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-lato text-bergen-sky text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Identum, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="font-lato text-bergen-sky text-sm hover:text-cherry transition">
              Privacy Policy
            </a>
            <a href="#" className="font-lato text-bergen-sky text-sm hover:text-cherry transition">
              Terms of Service
            </a>
            <a href="#" className="font-lato text-bergen-sky text-sm hover:text-cherry transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Suspense, lazy, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface FooterProps {
  language: string;
}

const PrivacyPolicyDialogContent = lazy(() => import("./PrivacyPolicyDialogContent"));
const TermsDialogContent = lazy(() => import("./TermsDialogContent"));

const Footer = ({ language }: FooterProps) => {
  const isHindi = language === "hi";
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/advanced_solutions_network/", label: "Instagram" },
    { icon: FaWhatsapp, href: "https://wa.me/919381617904?text=Hello!%20I'm%20interested%20in%20your%20digital%20services.%20Can%20we%20discuss%20my%20project?", label: "WhatsApp" },
  ];

  const legalLinks = [
    { name: isHindi ? "गोपनीयता नीति" : "Privacy Policy", path: "/privacy" },
    { name: isHindi ? "सेवा की शर्तें" : "Terms of Service", path: "/terms" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="asn-container asn-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="asn-headline text-3xl text-background">
              ASN CREATIVE AGENCY
            </h3>
            <p className="asn-body text-background/80 max-w-md leading-relaxed">
              {isHindi 
                ? "आपका डिजिटल साम्राज्य यहाँ शुरू होता है। अंतर्राष्ट्रीय स्तर पर विश्वसनीय व्यापारिक भागीदार।"
                : "Your digital empire starts here. International trusted business partner delivering excellence worldwide."
              }
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 border border-background/20 hover:border-background hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="asn-headline text-xl text-background">
              {isHindi ? "संपर्क करें" : "GET IN TOUCH"}
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-background/60 flex-shrink-0" />
                <a href="mailto:contact@asncreativeagency.com" className="asn-body text-background/80 hover:text-background transition-colors break-all">
                  contact@asncreativeagency.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-background/60" />
                <a href="https://wa.me/919381617904?text=Hi%21%20I%20want%20to%20call%20you%20on%20WhatsApp.%20Are%20you%20available%3F" target="_blank" rel="noopener noreferrer" className="asn-body text-background/80 hover:text-background transition-colors">
                  +91 93816 17904
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-background/60" />
                <span className="asn-body text-background/80">
                  ASN Agency, Balaji Nagar, Hyderabad, India - 500087
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="asn-headline text-xl text-background">
              {isHindi ? "त्वरित लिंक" : "QUICK LINKS"}
            </h4>
            
            <div className="space-y-3">
              <Link to="/services" className="block asn-body text-background/80 hover:text-background transition-colors">
                {isHindi ? "सेवाएं" : "Services"}
              </Link>
              <Link to="/portfolio" className="block asn-body text-background/80 hover:text-background transition-colors">
                {isHindi ? "पोर्टफोलियो" : "Portfolio"}
              </Link>
              <Link to="/contact" className="block asn-body text-background/80 hover:text-background transition-colors">
                {isHindi ? "संपर्क" : "Contact"}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="asn-body text-background/60 text-sm">
            © 2025 ASN Creative Agency. {isHindi ? "सभी अधिकार सुरक्षित।" : "All rights reserved."}
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => setShowPrivacy(true)} className="asn-body text-background/60 hover:text-background transition-colors text-sm underline">
              {isHindi ? "गोपनीयता नीति" : "Privacy Policy"}
            </button>
            <button onClick={() => setShowTerms(true)} className="asn-body text-background/60 hover:text-background transition-colors text-sm underline">
              {isHindi ? "सेवा की शर्तें" : "Terms of Service"}
            </button>
            {legalLinks.filter(link => link.name !== (isHindi ? "गोपनीयता नीति" : "Privacy Policy") && link.name !== (isHindi ? "सेवा की शर्तें" : "Terms of Service")).map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="asn-body text-background/60 hover:text-background transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Privacy Policy Modal */}
        <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
          <Suspense fallback={<div className="flex justify-center items-center min-h-[20vh] text-lg">Loading...</div>}>
            <PrivacyPolicyDialogContent />
          </Suspense>
        </Dialog>
        {/* Terms of Service Modal */}
        <Dialog open={showTerms} onOpenChange={setShowTerms}>
          <Suspense fallback={<div className="flex justify-center items-center min-h-[20vh] text-lg">Loading...</div>}>
            <TermsDialogContent />
          </Suspense>
        </Dialog>
      </div>
    </footer>
  );
};

export default Footer;
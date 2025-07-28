import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FooterProps {
  language: string;
}

const Footer = ({ language }: FooterProps) => {
  const isHindi = language === "hi";
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/asncreativeagency/", label: "Instagram" },
    { icon: FaWhatsapp, href: "https://wa.me/919381617904?text=Hello!%20I'm%20interested%20in%20your%20digital%20services.%20Can%20we%20discuss%20my%20project?", label: "WhatsApp" },
  ];

  const legalLinks = [
    { name: isHindi ? "गोपनीयता नीति" : "Privacy Policy", path: "/privacy" },
    { name: isHindi ? "सेवा की शर्तें" : "Terms of Service", path: "/terms" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="asn-container asn-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Privacy Policy</DialogTitle>
            </DialogHeader>
            <div className="asn-body space-y-4 text-left text-sm">
              <p><strong>Last updated:</strong> 27 July 2025</p>
              <p>This privacy notice for ASN Creative Agency (doing business as ASN) ("Company," "we," "us," or "our") describes how and why we collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:</p>
              <ul className="list-disc pl-6">
                <li>Visit our website at https://asncreativeagency.in, or any website of ours that links to this privacy notice</li>
                <li>Engage with us in other related ways, including sales, marketing, or events</li>
              </ul>
              <h4 className="font-bold mt-4">Information We Collect</h4>
              <p>We collect personal information that you provide to us, including but not limited to:</p>
              <ul className="list-disc pl-6">
                <li>Name, contact details (email, phone), company name</li>
                <li>Project details, service inquiries</li>
                <li>Communication content (messages, attachments)</li>
              </ul>
              <p>We also collect information automatically (via cookies and tracking technologies):</p>
              <ul className="list-disc pl-6">
                <li>IP address, browser/device info, usage data</li>
                <li>Analytics on how you interact with our site/services</li>
              </ul>
              <h4 className="font-bold mt-4">How We Use Your Information</h4>
              <ul className="list-disc pl-6">
                <li>To provide, operate, and maintain our website and services</li>
                <li>To respond to inquiries, provide customer support, and improve client experience</li>
                <li>For analytics, security, and compliance purposes</li>
                <li>To process client projects/communications as per your requests</li>
              </ul>
              <h4 className="font-bold mt-4">How We Share Information</h4>
              <ul className="list-disc pl-6">
                <li>With third-party vendors and partners who help us operate the site and deliver services (e.g., CRM, hosting, analytics providers)</li>
                <li>When required by law, legal process, or to protect rights and safety</li>
              </ul>
              <h4 className="font-bold mt-4">Data Security</h4>
              <p>We use industry-standard measures (encryption, secure hosting, access controls) to protect your information. However, no online system is 100% secure.</p>
              <h4 className="font-bold mt-4">International Data Transfers</h4>
              <p>Your data may be processed and stored in countries outside your own, including India and other countries where our partners operate.</p>
              <h4 className="font-bold mt-4">Your Rights</h4>
              <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal information, or restrict its processing. Contact us to make such requests.</p>
              <h4 className="font-bold mt-4">Cookies and Tracking</h4>
              <p>We use cookies for analytics, personalization, and service improvement. You can adjust your browser settings to manage or block cookies.</p>
              <h4 className="font-bold mt-4">Updates to This Policy</h4>
              <p>We may update this notice from time to time. The revised version will be indicated by an updated "Last updated" date and will be effective when accessible.</p>
              <h4 className="font-bold mt-4">Contact Us</h4>
              <p>For any questions or concerns, contact: <a href="mailto:contact@asncreativeagency.com" className="underline">contact@asncreativeagency.com</a></p>
            </div>
          </DialogContent>
        </Dialog>
        {/* Terms of Service Modal */}
        <Dialog open={showTerms} onOpenChange={setShowTerms}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
            </DialogHeader>
            <div className="asn-body space-y-4 text-left text-sm">
              <p><strong>Last updated:</strong> 27 July 2025</p>
              <h4 className="font-bold mt-4">AGREEMENT TO TERMS</h4>
              <p>These Terms and Conditions constitute a legally binding agreement between you ("User," "you") and ASN Creative Agency ("we," "us," or "our"), governing your access to and use of https://asncreativeagency.in and any related services ("Site").</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Use of Site</strong><br />
                  By accessing this Site, you agree to be bound by all terms herein. If you do not agree, do not use the Site.
                </li>
                <li>
                  <strong>Services & Client Accounts</strong><br />
                  You may use our contact or client portal features to engage our services. You agree to provide accurate information and keep your login credentials secure.
                </li>
                <li>
                  <strong>Acceptable Use</strong><br />
                  You must not use this Site to:
                  <ul className="list-disc pl-6">
                    <li>Violate any law/regulation</li>
                    <li>Circumvent security or attempt to access restricted content</li>
                    <li>Post, upload, or transmit any unlawful, harmful, or infringing content</li>
                  </ul>
                </li>
                <li>
                  <strong>Intellectual Property</strong><br />
                  All content, trademarks, and site materials are owned by ASN Creative Agency or its licensors. Do not copy, reproduce, or distribute without permission.
                </li>
                <li>
                  <strong>Payments & Fees</strong><br />
                  Service fees, billing, and payment terms will be governed by the specific service agreement provided upon engagement. Any late fees or penalties will be assessed as outlined in your contract.
                </li>
                <li>
                  <strong>Limitation of Liability</strong><br />
                  ASN Creative Agency is not liable for indirect, incidental, or consequential damages arising from your use of the site or services.
                </li>
                <li>
                  <strong>Termination</strong><br />
                  We reserve the right to suspend or terminate your account or access for violations of these Terms or our policies.
                </li>
                <li>
                  <strong>Changes to Terms</strong><br />
                  ASN Creative Agency reserves the right to update these Terms. Continued use after changes constitutes acceptance.
                </li>
                <li>
                  <strong>Governing Law</strong><br />
                  These terms shall be governed by the laws of India (or your jurisdiction as mutually agreed in project contracts).
                </li>
                <li>
                  <strong>Contact</strong><br />
                  Questions about these Terms? Email: <a href="mailto:contact@asncreativeagency.com" className="underline">contact@asncreativeagency.com</a>
                </li>
              </ol>
              <p className="text-xs text-muted-foreground mt-4">This is a sample. Consult a lawyer for further customization, especially for complex international projects.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  );
};

export default Footer;
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

interface SitemapProps {
  language: string;
}

const Sitemap = ({ language }: SitemapProps) => {
  const isHindi = language === "hi";

  const mainPages = [
    { name: isHindi ? "होम" : "Home", path: "/", description: isHindi ? "मुख्य पृष्ठ" : "Main page" },
    { name: isHindi ? "सेवाएं" : "Services", path: "/services", description: isHindi ? "हमारी सेवाएं" : "Our services" },
    { name: isHindi ? "पोर्टफोलियो" : "Portfolio", path: "/portfolio", description: isHindi ? "हमारे प्रोजेक्ट्स" : "Our projects" },
    { name: isHindi ? "संपर्क" : "Contact", path: "/contact", description: isHindi ? "संपर्क करें" : "Get in touch" },
  ];

  const services = [
    { name: isHindi ? "वेब डेवलपमेंट" : "Web Development", description: isHindi ? "आधुनिक वेबसाइटें" : "Modern websites" },
    { name: isHindi ? "डिजिटल मार्केटिंग" : "Digital Marketing", description: isHindi ? "Meta Ads और Google Ads" : "Meta Ads and Google Ads" },
    { name: isHindi ? "ड्रॉपशिपिंग" : "Dropshipping", description: isHindi ? "ई-कॉमर्स समाधान" : "E-commerce solutions" },
    { name: isHindi ? "व्यापार निष्पादन" : "Business Execution", description: isHindi ? "विचार से लॉन्च तक" : "From idea to launch" },
  ];

  const clientPortal = [
    { name: isHindi ? "डैशबोर्ड" : "Dashboard", path: "/client-portal", description: isHindi ? "ग्राहक पोर्टल" : "Client portal" },
    { name: isHindi ? "प्रोजेक्ट्स" : "Projects", path: "/client-portal/projects", description: isHindi ? "आपके प्रोजेक्ट्स" : "Your projects" },
    { name: isHindi ? "संदेश" : "Messages", path: "/client-portal/messages", description: isHindi ? "संचार" : "Communication" },
    { name: isHindi ? "फाइल्स" : "Files", path: "/client-portal/files", description: isHindi ? "फाइल प्रबंधन" : "File management" },
  ];

  const legalPages = [
    { name: isHindi ? "गोपनीयता नीति" : "Privacy Policy", description: isHindi ? "गोपनीयता जानकारी" : "Privacy information" },
    { name: isHindi ? "सेवा की शर्तें" : "Terms of Service", description: isHindi ? "उपयोग की शर्तें" : "Terms of use" },
  ];

  const externalLinks = [
    { name: "Instagram", href: "https://www.instagram.com/advanced_solutions_network/", description: "Social media" },
    { name: "WhatsApp", href: "https://wa.me/919381617904", description: "Direct messaging" },
    { name: "Email", href: "mailto:contact@asncreativeagency.com", description: "Email contact" },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <motion.section className="asn-section bg-surface"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h1 className="asn-headline text-4xl md:text-6xl">
              {isHindi ? "साइटमैप" : "Sitemap"}
            </h1>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "ASN Creative Agency की वेबसाइट का पूरा नक्शा। सभी पृष्ठों और सेवाओं का विवरण।"
                : "Complete map of ASN Creative Agency website. Overview of all pages and services."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Main Pages */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="asn-headline text-2xl text-foreground">
                {isHindi ? "मुख्य पृष्ठ" : "Main Pages"}
              </h2>
              <div className="space-y-4">
                {mainPages.map((page, index) => (
                  <motion.div
                    key={index}
                    className="group border border-border hover:border-foreground transition-all duration-300 p-4 rounded-lg bg-background"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link to={page.path} className="flex items-center justify-between group">
                      <div>
                        <h3 className="asn-headline text-lg text-foreground group-hover:text-accent transition-colors">
                          {page.name}
                        </h3>
                        <p className="asn-body text-sm text-muted-foreground">
                          {page.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="asn-headline text-2xl text-foreground">
                {isHindi ? "सेवाएं" : "Services"}
              </h2>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="group border border-border hover:border-foreground transition-all duration-300 p-4 rounded-lg bg-background"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link to="/services" className="flex items-center justify-between group">
                      <div>
                        <h3 className="asn-headline text-lg text-foreground group-hover:text-accent transition-colors">
                          {service.name}
                        </h3>
                        <p className="asn-body text-sm text-muted-foreground">
                          {service.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Client Portal */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h2 className="asn-headline text-2xl text-foreground">
                {isHindi ? "ग्राहक पोर्टल" : "Client Portal"}
              </h2>
              <div className="space-y-4">
                {clientPortal.map((page, index) => (
                  <motion.div
                    key={index}
                    className="group border border-border hover:border-foreground transition-all duration-300 p-4 rounded-lg bg-background"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link to={page.path} className="flex items-center justify-between group">
                      <div>
                        <h3 className="asn-headline text-lg text-foreground group-hover:text-accent transition-colors">
                          {page.name}
                        </h3>
                        <p className="asn-body text-sm text-muted-foreground">
                          {page.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* External Links */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className="asn-headline text-2xl text-foreground">
                {isHindi ? "बाहरी लिंक" : "External Links"}
              </h2>
              <div className="space-y-4">
                {externalLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    className="group border border-border hover:border-foreground transition-all duration-300 p-4 rounded-lg bg-background"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group"
                    >
                      <div>
                        <h3 className="asn-headline text-lg text-foreground group-hover:text-accent transition-colors">
                          {link.name}
                        </h3>
                        <p className="asn-body text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Back to Home */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link to="/">
              <button className="asn-button-primary">
                {isHindi ? "होम पर वापस जाएं" : "Back to Home"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Sitemap; 
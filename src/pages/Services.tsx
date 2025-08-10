import { useState } from "react";
import { Check, Globe, IndianRupee, DollarSign, Code, ShoppingCart, Megaphone, Paintbrush, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ServicesProps {
  language: string;
}

const Services = ({ language }: ServicesProps) => {
  const [selectedMarket, setSelectedMarket] = useState<"domestic" | "international">("domestic");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const isHindi = language === "hi";

  const domesticPlans = [
    {
      name: "Lite",
      price: "₹7,999",
      description: isHindi ? "स्टार्टअप और छोटे व्यवसायों के लिए" : "Perfect for startups and small businesses",
      features: [
        isHindi ? "5-पेज वेबसाइट" : "5-Page Website",
        isHindi ? "बेसिक SEO" : "Basic SEO",
        isHindi ? "मोबाइल अनुकूलन" : "Mobile Optimization",
        isHindi ? "1 महीने का समर्थन" : "1 Month Support",
        isHindi ? "सामाजिक मीडिया सेटअप" : "Social Media Setup"
      ],
      popular: false,
      cta: isHindi ? "अपने प्रोजेक्ट के बारे में बात करें!" : "Let's Talk About Your Project!",
      category: "development"
    },
    {
      name: "Standard",
      price: "₹19,999",
      description: isHindi ? "बढ़ते व्यवसायों के लिए आदर्श" : "Ideal for growing businesses",
      features: [
        isHindi ? "10-पेज वेबसाइट" : "10-Page Website",
        isHindi ? "एडवांस्ड SEO" : "Advanced SEO",
        isHindi ? "Meta Ads सेटअप" : "Meta Ads Setup",
        isHindi ? "3 महीने का समर्थन" : "3 Months Support",
        isHindi ? "ई-कॉमर्स एकीकरण" : "E-commerce Integration",
        isHindi ? "एनालिटिक्स सेटअप" : "Analytics Setup"
      ],
      popular: true,
      cta: isHindi ? "लोकप्रिय चुनें" : "Most Popular",
      category: "ecommerce"
    },
    {
      name: "Premium",
      price: "₹39,999",
      description: isHindi ? "स्थापित व्यवसायों के लिए" : "For established businesses",
      features: [
        isHindi ? "अनलिमिटेड पेज" : "Unlimited Pages",
        isHindi ? "प्रीमियम SEO" : "Premium SEO",
        isHindi ? "Meta + Google Ads" : "Meta + Google Ads",
        isHindi ? "6 महीने का समर्थन" : "6 Months Support",
        isHindi ? "कस्टम फीचर्स" : "Custom Features",
        isHindi ? "ब्रांडिंग सामग्री" : "Branding Materials",
        isHindi ? "फुल ड्रॉपशिपिंग सेटअप" : "Full Dropshipping Setup"
      ],
      popular: false,
      cta: isHindi ? "प्रीमियम चुनें" : "Go Premium",
      category: "marketing"
    },
    {
      name: "Enterprise",
      price: "₹1,50,000",
      description: isHindi ? "बड़े उद्यमों के लिए" : "For large enterprises",
      features: [
        isHindi ? "संपूर्ण डिजिटल रणनीति" : "Complete Digital Strategy",
        isHindi ? "मल्टी-चैनल मार्केटिंग" : "Multi-channel Marketing",
        isHindi ? "समर्पित खाता प्रबंधक" : "Dedicated Account Manager",
        isHindi ? "12 महीने का समर्थन" : "12 Months Support",
        isHindi ? "कस्टम एकीकरण" : "Custom Integrations",
        isHindi ? "प्राथमिकता समर्थन" : "Priority Support",
        isHindi ? "पूर्ण व्यापार निष्पादन" : "Complete Business Execution"
      ],
      popular: false,
      cta: isHindi ? "एंटरप्राइज़ चुनें" : "Choose Enterprise",
      category: "security"
    }
  ];

  const internationalPlans = [
    {
      name: "Lite",
      price: "$199",
      description: "Perfect for startups and small businesses",
      features: [
        "5-Page Website",
        "Basic SEO",
        "Mobile Optimization", 
        "1 Month Support",
        "Social Media Setup"
      ],
      popular: false,
      cta: "Let's Talk About Your Project!",
      category: "development"
    },
    {
      name: "Standard", 
      price: "$449",
      description: "Ideal for growing businesses",
      features: [
        "10-Page Website",
        "Advanced SEO",
        "Meta Ads Setup",
        "3 Months Support",
        "E-commerce Integration",
        "Analytics Setup"
      ],
      popular: true,
      cta: "Most Popular",
      category: "ecommerce"
    },
    {
      name: "Premium",
      price: "$1,299", 
      description: "For established businesses",
      features: [
        "Unlimited Pages",
        "Premium SEO",
        "Meta + Google Ads",
        "6 Months Support",
        "Custom Features",
        "Branding Materials",
        "Full Dropshipping Setup"
      ],
      popular: false,
      cta: "Go Premium",
      category: "marketing"
    },
    {
      name: "Enterprise",
      price: "$3,499",
      description: "For large enterprises",
      features: [
        "Complete Digital Strategy",
        "Multi-channel Marketing", 
        "Dedicated Account Manager",
        "12 Months Support",
        "Custom Integrations",
        "Priority Support",
        "Complete Business Execution"
      ],
      popular: false,
      cta: "Choose Enterprise",
      category: "security"
    }
  ];

  const currentPlans = selectedMarket === "domestic" ? domesticPlans : internationalPlans;
  const filteredPlans = selectedCategory === "all" ? currentPlans : currentPlans.filter(plan => plan.category === selectedCategory);

  // Digital marketing and design services with categories
  const allServices = [
    // Development
    {
      title: isHindi ? "वेब डेवलपमेंट" : "Web Development",
      subtitle: "Web",
      description: isHindi ? "आधुनिक, तेज़ और उत्तरदायी वेबसाइटें" : "Modern, fast, and responsive websites",
      features: [
        isHindi ? "कस्टम डिज़ाइन" : "Custom Design",
        isHindi ? "फास्ट लोडिंग" : "Fast Loading",
        isHindi ? "CMS इंटीग्रेशन" : "CMS Integration"
      ],
      category: "development"
    },
    {
      title: isHindi ? "मोबाइल ऐप डेवलपमेंट" : "Mobile App Development",
      subtitle: "Mobile",
      description: isHindi ? "एंड्रॉइड और iOS के लिए ऐप्स" : "Apps for Android and iOS",
      features: [
        isHindi ? "क्रॉस-प्लेटफॉर्म ऐप्स" : "Cross-platform Apps",
        isHindi ? "यूआई/यूएक्स डिज़ाइन" : "UI/UX Design",
        isHindi ? "एप्लिकेशन मेंटेनेंस" : "App Maintenance"
      ],
      category: "development"
    },
    {
      title: isHindi ? "वेबसाइट मेंटेनेंस" : "Website Maintenance",
      subtitle: "Maintenance",
      description: isHindi ? "निरंतर अपडेट और समर्थन" : "Continuous updates and support",
      features: [
        isHindi ? "सुरक्षा अपडेट्स" : "Security Updates",
        isHindi ? "बैकअप और रिकवरी" : "Backup & Recovery",
        isHindi ? "कंटेंट अपडेट्स" : "Content Updates"
      ],
      category: "development"
    },
    // E-commerce
    {
      title: isHindi ? "ई-कॉमर्स स्टोर सेटअप" : "E-commerce Store Setup",
      subtitle: "Store",
      description: isHindi ? "ऑनलाइन स्टोर की पूरी स्थापना" : "Complete online store setup",
      features: [
        isHindi ? "शॉपिंग कार्ट" : "Shopping Cart",
        isHindi ? "प्रोडक्ट मैनेजमेंट" : "Product Management",
        isHindi ? "ऑर्डर ट्रैकिंग" : "Order Tracking"
      ],
      category: "ecommerce"
    },
    {
      title: isHindi ? "पेमेंट गेटवे इंटीग्रेशन" : "Payment Gateway Integration",
      subtitle: "Payments",
      description: isHindi ? "सुरक्षित ऑनलाइन भुगतान समाधान" : "Secure online payment solutions",
      features: [
        isHindi ? "UPI/क्रेडिट कार्ड" : "UPI/Credit Card",
        isHindi ? "COD सेटअप" : "COD Setup",
        isHindi ? "इंवॉइसिंग" : "Invoicing"
      ],
      category: "ecommerce"
    },
    {
      title: isHindi ? "ड्रॉपशिपिंग समाधान" : "Dropshipping Solutions",
      subtitle: "Dropshipping",
      description: isHindi ? "स्टोर के लिए फुलफिलमेंट और सप्लायर इंटीग्रेशन" : "Fulfillment and supplier integration for stores",
      features: [
        isHindi ? "स्वचालित ऑर्डर प्रोसेसिंग" : "Automated Order Processing",
        isHindi ? "सप्लायर इंटीग्रेशन" : "Supplier Integration",
        isHindi ? "रियल-टाइम स्टॉक अपडेट्स" : "Real-time Stock Updates"
      ],
      category: "ecommerce"
    },
    // Security
    {
      title: isHindi ? "एसएसएल सेटअप" : "SSL Setup",
      subtitle: "SSL",
      description: isHindi ? "वेबसाइट सुरक्षा के लिए SSL प्रमाणपत्र" : "SSL certificates for website security",
      features: [
        isHindi ? "इंस्टॉलेशन" : "Installation",
        isHindi ? "रिन्यूअल" : "Renewal",
        isHindi ? "HTTPS माइग्रेशन" : "HTTPS Migration"
      ],
      category: "security"
    },
    {
      title: isHindi ? "सुरक्षा ऑडिट" : "Security Audit",
      subtitle: "Audit",
      description: isHindi ? "वेबसाइट की सुरक्षा की पूरी जांच" : "Comprehensive website security check",
      features: [
        isHindi ? "वल्नरेबिलिटी स्कैनिंग" : "Vulnerability Scanning",
        isHindi ? "पेन टेस्टिंग" : "Pen Testing",
        isHindi ? "रिपोर्टिंग" : "Reporting"
      ],
      category: "security"
    },
    {
      title: isHindi ? "मैलवेयर हटाना" : "Malware Removal",
      subtitle: "Malware",
      description: isHindi ? "संक्रमित वेबसाइटों के लिए त्वरित समाधान" : "Quick solutions for infected websites",
      features: [
        isHindi ? "मैलवेयर स्कैनिंग" : "Malware Scanning",
        isHindi ? "क्लीनअप" : "Cleanup",
        isHindi ? "सुरक्षा सख्तीकरण" : "Security Hardening"
      ],
      category: "security"
    },
    // Marketing
    {
      title: isHindi ? "सर्च इंजन ऑप्टिमाइजेशन" : "Search Engine Optimization",
      subtitle: "SEO",
      description: isHindi ? "Google पर टॉप रैंकिंग के लिए" : "For top rankings on Google",
      features: [
        isHindi ? "कीवर्ड अनुसंधान" : "Keyword Research",
        isHindi ? "ऑन-पेज SEO" : "On-Page SEO",
        isHindi ? "तकनीकी SEO" : "Technical SEO"
      ],
      category: "marketing"
    },
    {
      title: isHindi ? "गूगल विज्ञापन" : "Google Ads",
      subtitle: "PPC",
      description: isHindi ? "तुरंत दिखाई देने वाले परिणाम" : "Immediate visible results",
      features: [
        isHindi ? "सर्च अभियान" : "Search Campaigns",
        isHindi ? "डिस्प्ले अभियान" : "Display Campaigns",
        isHindi ? "शॉपिंग अभियान" : "Shopping Campaigns"
      ],
      category: "marketing"
    },
    {
      title: isHindi ? "मेटा विज्ञापन" : "Meta Ads",
      subtitle: "Facebook & Instagram",
      description: isHindi ? "सामाजिक मीडिया पर ब्रांड निर्माण" : "Brand building on social media",
      features: [
        isHindi ? "इमेज अभियान" : "Image Campaigns",
        isHindi ? "वीडियो अभियान" : "Video Campaigns",
        isHindi ? "कैरोसेल अभियान" : "Carousel Campaigns"
      ],
      category: "marketing"
    },
    {
      title: isHindi ? "सामाजिक मीडिया मार्केटिंग" : "Social Media Marketing",
      subtitle: "SMM",
      description: isHindi ? "ऑर्गेनिक फॉलोअर वृद्धि" : "Organic follower growth",
      features: [
        isHindi ? "कंटेंट निर्माण" : "Content Creation",
        isHindi ? "कम्युनिटी प्रबंधन" : "Community Management",
        isHindi ? "प्रभावशाली सहयोग" : "Influencer Collaborations"
      ],
      category: "marketing"
    },
    {
      title: isHindi ? "ईमेल मार्केटिंग" : "Email Marketing",
      subtitle: "CRM",
      description: isHindi ? "ग्राहक संबंध प्रबंधन" : "Customer relationship management",
      features: [
        isHindi ? "न्यूजलेटर डिजाइन" : "Newsletter Design",
        isHindi ? "स्वचालन सेटअप" : "Automation Setup",
        isHindi ? "प्रदर्शन ट्रैकिंग" : "Performance Tracking"
      ],
      category: "marketing"
    },
    {
      title: isHindi ? "कंटेंट मार्केटिंग" : "Content Marketing",
      subtitle: "Strategy",
      description: isHindi ? "मूल्यवान कंटेंट निर्माण" : "Valuable content creation",
      features: [
        isHindi ? "ब्लॉग लेखन" : "Blog Writing",
        isHindi ? "वीडियो प्रोडक्शन" : "Video Production",
        isHindi ? "इन्फोग्राफिक्स" : "Infographics"
      ],
      category: "marketing"
    },
    // Business Execution
    {
      title: isHindi ? "व्यापार निष्पादन" : "Business Execution",
      subtitle: "Strategy",
      description: isHindi ? "रणनीतिक योजनाओं को कार्यान्वित करने और परिणाम प्राप्त करने के लिए" : "Transform strategic plans into actionable results through systematic implementation",
      features: [
        isHindi ? "रणनीतिक योजना और संरेखण" : "Strategic Planning & Alignment",
        isHindi ? "कार्यान्वयन और निष्पादन" : "Implementation & Execution",
        isHindi ? "निगरानी और नियंत्रण" : "Monitoring & Control"
      ],
      category: "strategy"
    },
    // Design
    {
      title: isHindi ? "यूआई/यूएक्स डिज़ाइन" : "UI/UX Design",
      subtitle: "UI/UX",
      description: isHindi ? "आकर्षक और उपयोगकर्ता-अनुकूल इंटरफेस डिज़ाइन करें" : "Create engaging and user-friendly interfaces",
      features: [
        isHindi ? "वेबसाइट UI डिज़ाइन" : "Website UI Design",
        isHindi ? "मोबाइल ऐप UI" : "Mobile App UI",
        isHindi ? "प्रोटोटाइपिंग" : "Prototyping"
      ],
      category: "design"
    },
    {
      title: isHindi ? "लोगो और ब्रांडिंग" : "Logo & Branding",
      subtitle: "Branding",
      description: isHindi ? "ब्रांड पहचान और लोगो डिज़ाइन" : "Brand identity and logo design",
      features: [
        isHindi ? "लोगो डिज़ाइन" : "Logo Design",
        isHindi ? "ब्रांड गाइडलाइंस" : "Brand Guidelines",
        isHindi ? "विजुअल आइडेंटिटी" : "Visual Identity"
      ],
      category: "design"
    },
    {
      title: isHindi ? "ग्राफिक डिज़ाइन" : "Graphic Design",
      subtitle: "Graphics",
      description: isHindi ? "प्रभावशाली ग्राफिक्स और विजुअल्स" : "Impactful graphics and visuals",
      features: [
        isHindi ? "सोशल मीडिया ग्राफिक्स" : "Social Media Graphics",
        isHindi ? "ब्रोशर और पोस्टर" : "Brochures & Posters",
        isHindi ? "इन्फोग्राफिक्स" : "Infographics"
      ],
      category: "design"
    }
  ];

  const filteredServices = selectedCategory === "all"
    ? allServices
    : allServices.filter(service => service.category === selectedCategory);

  // Helper: benefits and strategic role per service
  const getServiceBenefits = (title: string, subtitle: string, category: string): string => {
    const t = title.toLowerCase();
    if (t.includes("search engine") || subtitle === "SEO") {
      return isHindi ? "ऑर्गेनिक विज़िबिलिटी बढ़ती है, स्थिर ट्रैफिक आता है और CAC कम होता है।" : "Boosts organic visibility, brings compounding traffic, and lowers CAC.";
    }
    if (t.includes("google ads") || subtitle === "PPC") {
      return isHindi ? "तुरंत लीड/सेल्स, सटीक टार्गेटिंग और स्पष्ट ट्रैकिंग।" : "Immediate leads/sales with precise targeting and clear tracking.";
    }
    if (t.includes("meta ads") || subtitle.toLowerCase().includes("facebook")) {
      return isHindi ? "नए दर्शकों तक पहुँच, UGC और वीडियो से बेहतर ROAS।" : "Reach new audiences; UGC and video creatives improve ROAS.";
    }
    if (t.includes("social media") || subtitle === "SMM") {
      return isHindi ? "ब्रांड अवेयरनेस, एंगेजमेंट और विश्वसनीयता बढ़ती है।" : "Builds brand awareness, engagement, and trust.";
    }
    if (t.includes("email marketing") || subtitle === "CRM") {
      return isHindi ? "दोबारा खरीद और LTV में वृद्धि, ऑटो‑फ्लोज़ से स्थिर राजस्व।" : "Increases repeat purchases and LTV via automated flows.";
    }
    if (t.includes("content marketing") || subtitle === "Strategy") {
      return isHindi ? "थॉट‑लीडरशिप और SEO का आधार; निरंतर इनबाउंड ट्रैफिक।" : "Builds authority and fuels SEO with steady inbound traffic.";
    }
    if (category === "development") {
      return isHindi ? "तेज़, उत्तरदायी और स्केलेबल अनुभव; बेहतर कन्वर्ज़न।" : "Fast, responsive, scalable experiences that convert.";
    }
    if (category === "ecommerce") {
      return isHindi ? "सुविधाजनक खरीद प्रक्रिया, सुरक्षित भुगतान, उच्च AOV।" : "Streamlined buying, secure payments, and higher AOV.";
    }
    if (category === "security") {
      return isHindi ? "अपटाइम और डेटा सुरक्षा—यूज़र भरोसा कायम रहता है।" : "Protects uptime and data—maintains user trust.";
    }
    if (category === "strategy") {
      return isHindi ? "रणनीति-कार्यान्वयन अंतर को समाप्त करता है, तेज़ परिणाम और स्केलेबल विकास।" : "Eliminates strategy-execution gap, faster results, and scalable growth.";
    }
    if (category === "design") {
      return isHindi ? "स्पष्टता और भरोसा; ब्रांड यादगार बनता है।" : "Improves clarity and trust; makes your brand memorable.";
    }
    return isHindi ? "व्यवसाय के लक्ष्य के अनुरूप मापने योग्य लाभ।" : "Measurable benefits aligned to your goals.";
  };

  const getServiceStrategicRole = (title: string, subtitle: string, category: string): string => {
    const t = title.toLowerCase();
    if (t.includes("search engine") || subtitle === "SEO") {
      return isHindi ? "लॉन्ग‑टर्म डिमांड कैप्चर—हर चैनल का CAC कम करता है।" : "Long‑term demand capture that lowers CAC across channels.";
    }
    if (t.includes("google ads") || subtitle === "PPC") {
      return isHindi ? "हाई‑इंटेंट डिमांड कैप्चर और ऑफर/मैसेजिंग को जल्दी वैलिडेट करना।" : "Captures high‑intent demand and validates offers fast.";
    }
    if (t.includes("meta ads") || subtitle.toLowerCase().includes("facebook")) {
      return isHindi ? "टॉप‑/मिड‑फनल डिमांड क्रिएट; SEO/ईमेल को फीड करता है।" : "Creates top/mid‑funnel demand and feeds SEO/email.";
    }
    if (t.includes("social media") || subtitle === "SMM") {
      return isHindi ? "कम्युनिटी और ब्रांड प्रेम—अन्य चैनलों की कन्वर्ज़न बढ़ती है।" : "Community and brand affinity that lifts other channels.";
    }
    if (t.includes("email marketing") || subtitle === "CRM") {
      return isHindi ? "लाइफ‑साइकिल नर्चरिंग—एड स्पेंड की वैल्यू अधिक बनती है।" : "Lifecycle nurturing that maximizes paid media value.";
    }
    if (t.includes("content marketing") || subtitle === "Strategy") {
      return isHindi ? "SEO, सोशल और ईमेल के लिए हमेशा‑चालू फ्यूल।" : "Always‑on fuel for SEO, social, and email.";
    }
    if (category === "development") {
      return isHindi ? "मार्केटिंग का मूल इंफ्रास्ट्रक्चर—स्पीड, ट्रैकिंग और कन्वर्ज़न।" : "Core marketing infrastructure—speed, tracking, conversion.";
    }
    if (category === "ecommerce") {
      return isHindi ? "रेवेन्यू इंजिन—एड्स/SEO से आने वाले ट्रैफिक को सेल्स में बदले।" : "Revenue engine—turns traffic from ads/SEO into sales.";
    }
    if (category === "strategy") {
      return isHindi ? "रणनीतिक दिशा और कार्यान्वयन के बीच का सेतु; सभी सेवाओं को एकीकृत करता है।" : "Bridge between strategic direction and implementation; integrates all services.";
    }
    if (category === "security") {
      return isHindi ? "जोखिम घटाकर ग्रोथ को सुरक्षित करता है; SEO में भी मदद।" : "De‑risks growth and supports SEO with trust signals.";
    }
    if (category === "design") {
      return isHindi ? "हर चैनल की कन्वर्ज़न और ब्रांड रिकॉल मजबूत होती है।" : "Strengthens conversion and brand recall across channels.";
    }
    return isHindi ? "समग्र रणनीति के साथ सीधा तालमेल।" : "Directly supports your overall strategy.";
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="asn-section bg-background">
        <div className="asn-container text-center space-y-6">
          <h1 className="asn-headline text-4xl md:text-6xl">
            {isHindi ? "हमारी सेवाएं" : "Our Services"}
          </h1>
          <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
            {isHindi 
              ? "Discover How We Can Elevate Your Business! दो बाजारों के लिए विशेष रूप से डिज़ाइन किए गए पैकेज। आपकी आवश्यकताओं के लिए सही समाधान चुनें।"
              : "Discover How We Can Elevate Your Business! Specialized packages designed for two markets. Choose the perfect solution for your needs."
            }
          </p>
        </div>
      </section>

      {/* Service Categories Selector */}
      <section className="asn-section bg-background">
        <div className="asn-container flex flex-wrap gap-4 justify-center my-8">
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "all" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("all")}
          >
            <Globe className={`h-5 w-5 ${selectedCategory === "all" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "सभी सेवाएं" : "All Services"}
          </Button>
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "development" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("development")}
          >
            <Code className={`h-5 w-5 ${selectedCategory === "development" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "डेवलपमेंट" : "Development"}
          </Button>
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "ecommerce" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("ecommerce")}
          >
            <ShoppingCart className={`h-5 w-5 ${selectedCategory === "ecommerce" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "ई-कॉमर्स" : "E-commerce"}
          </Button>
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "marketing" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("marketing")}
          >
            <Megaphone className={`h-5 w-5 ${selectedCategory === "marketing" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "मार्केटिंग" : "Marketing"}
          </Button>
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "strategy" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("strategy")}
          >
            <Shield className={`h-5 w-5 ${selectedCategory === "strategy" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "रणनीति" : "Strategy"}
          </Button>
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "design" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("design")}
          >
            <Paintbrush className={`h-5 w-5 ${selectedCategory === "design" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "डिज़ाइन" : "Design"}
          </Button>
          <Button
            className={`rounded-full px-6 py-3 flex items-center gap-2 text-lg font-medium border transition-colors duration-200 ${selectedCategory === "security" ? "bg-black text-white border-black hover:bg-black hover:text-white" : "bg-white text-black border-black hover:bg-black hover:text-white"}`}
            onClick={() => setSelectedCategory("security")}
          >
            <Shield className={`h-5 w-5 ${selectedCategory === "security" ? "text-white" : "text-black group-hover:text-white"}`} />
            {isHindi ? "सुरक्षा" : "Security"}
          </Button>
        </div>
      </section>

      {/* Digital Marketing & Design Services */}
      <section className="asn-section bg-surface">
        <div className="asn-container text-center space-y-12">
          <h2 className="asn-headline text-3xl md:text-5xl">
            {selectedCategory === "design"
              ? (isHindi ? "डिज़ाइन सेवाएं" : "Design Services")
              : selectedCategory === "development"
                ? (isHindi ? "डेवलपमेंट सेवाएं" : "Development Services")
                : selectedCategory === "ecommerce"
                  ? (isHindi ? "ई-कॉमर्स सेवाएं" : "E-commerce Services")
                  : selectedCategory === "security"
                    ? (isHindi ? "सुरक्षा सेवाएं" : "Security Services")
                    : (isHindi ? "डिजिटल मार्केटिंग सेवाएं" : "Digital Marketing Services")}
          </h2>
          <p className="asn-body text-lg text-muted-foreground max-w-3xl mx-auto">
            {selectedCategory === "design"
              ? (isHindi
                ? "Discover How We Can Elevate Your Business! रचनात्मक डिज़ाइन समाधान जो आपके ब्रांड को अलग बनाते हैं"
                : "Discover How We Can Elevate Your Business! Creative design solutions that set your brand apart")
              : selectedCategory === "development"
                ? (isHindi
                  ? "Discover How We Can Elevate Your Business! आधुनिक विकास सेवाएं जो आपके व्यापार को डिजिटल बनाती हैं"
                  : "Discover How We Can Elevate Your Business! Modern development services to digitize your business")
                : selectedCategory === "ecommerce"
                  ? (isHindi
                    ? "Discover How We Can Elevate Your Business! ई-कॉमर्स के लिए संपूर्ण समाधान"
                    : "Discover How We Can Elevate Your Business! Comprehensive solutions for e-commerce")
                  : selectedCategory === "security"
                    ? (isHindi
                      ? "Discover How We Can Elevate Your Business! वेबसाइट और डेटा सुरक्षा के लिए सेवाएं"
                      : "Discover How We Can Elevate Your Business! Services for website and data security")
                    : (isHindi
                      ? "Discover How We Can Elevate Your Business! व्यापक डिजिटल मार्केटिंग समाधान जो आपके व्यापार को नई ऊंचाइयों तक पहुंचाते हैं"
                      : "Discover How We Can Elevate Your Business! Comprehensive digital marketing solutions that take your business to new heights")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <Card key={index} className="border-2 border-border bg-background hover:border-foreground transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="text-center space-y-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs font-bold">
                      {service.subtitle}
                    </Badge>
                    <CardTitle className="asn-headline text-xl">
                      {service.title}
                    </CardTitle>
                  </div>
                  <p className="asn-body text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-left">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-foreground flex-shrink-0" />
                        <span className="asn-body text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-left space-y-2">
                    <h4 className="asn-body font-bold">{isHindi ? "लाभ" : "Benefits"}</h4>
                    <p className="asn-body text-sm text-muted-foreground">
                      {getServiceBenefits(service.title, service.subtitle, service.category)}
                    </p>
                    <h4 className="asn-body font-bold">{isHindi ? "रणनीतिक भूमिका" : "Strategic Role"}</h4>
                    <p className="asn-body text-sm text-muted-foreground">
                      {getServiceStrategicRole(service.title, service.subtitle, service.category)}
                    </p>
                  </div>
                  <Link to="/contact" className="block">
                    <Button className="w-full asn-button-primary">
                      {isHindi ? "विवरण पूछें" : "Learn More"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Playbooks */}
      <section className="asn-section bg-background">
        <div className="asn-container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "सेवाओं का विस्तृत विवरण" : "Detailed Service Playbooks"}
            </h2>
            <p className="asn-body text-muted-foreground max-w-3xl mx-auto">
              {isHindi
                ? "Discover How We Can Elevate Your Business! हर सेवा के अंदर क्या मिलता है, क्या लाभ हैं और आप क्या परिणाम उम्मीद कर सकते हैं—सब कुछ नीचे समझाया गया है।"
                : "Discover How We Can Elevate Your Business! Explore what's included, the benefits, and the outcomes you can expect for every service area."}
            </p>
          </div>

          {/* Digital Marketing */}
          <div className="space-y-6">
            <h3 className="asn-headline text-2xl">{isHindi ? "डिजिटल मार्केटिंग" : "Digital Marketing"}</h3>
            <Accordion type="multiple" className="bg-surface border border-border rounded-xl p-4">
              <AccordionItem value="seo">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "SEO (सर्च इंजन ऑप्टिमाइजेशन)" : "SEO (Search Engine Optimization)"}</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="asn-body text-muted-foreground">
                    {isHindi
                      ? "कीवर्ड रिसर्च, ऑन‑पेज और टेक्निकल SEO के साथ आपके पेज Google में ऊपर आते हैं।"
                      : "Rank higher with keyword research, on‑page improvements, and technical SEO fixes."}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "लाभ: अधिक ऑर्गेनिक ट्रैफ़िक, कम CAC" : "Benefits: More organic traffic, lower CAC"}</li>
                    <li>{isHindi ? "परिणाम: 3–6 महीनों में स्थिर रैंकिंग वृद्धि" : "Outcome: Steady ranking gains in 3–6 months"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ppc">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "PPC/Google Ads" : "PPC / Google Ads"}</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="asn-body text-muted-foreground">
                    {isHindi
                      ? "हाई‑इंटेंट कीवर्ड्स पर स्मार्ट बिडिंग, कन्वर्ज़न ट्रैकिंग और A/B विज्ञापन।"
                      : "Smart bidding on high‑intent keywords, robust conversion tracking, and ad A/B tests."}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "लाभ: तुरंत लीड/सेल्स" : "Benefits: Immediate leads/sales"}</li>
                    <li>{isHindi ? "परिणाम: 2–4x ROAS लक्ष्य अनुसार" : "Outcome: 2–4x ROAS depending on targets"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="social">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "सोशल मीडिया मार्केटिंग" : "Social Media Marketing"}</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="asn-body text-muted-foreground">
                    {isHindi
                      ? "UGC क्रिएटिव, रील्स/वीडियो और रिटार्गेटिंग से ब्रांड रीच और बिक्री बढ़ाएँ।"
                      : "Grow reach and sales with UGC creatives, short‑form video, and retargeting."}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "लाभ: ब्रांड अवेयरनेस और ROAS" : "Benefits: Brand awareness and ROAS"}</li>
                    <li>{isHindi ? "परिणाम: 3–5x ROAS, तेज़ क्रिएटिव टेस्टिंग" : "Outcome: 3–5x ROAS, fast creative testing"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="email">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "ईमेल और CRM" : "Email & CRM"}</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="asn-body text-muted-foreground">
                    {isHindi
                      ? "वेलकम, कार्ट‑अबैन्डन और विन‑बैक जैसे ऑटो‑फ्लोज़ से दोबारा खरीद बढ़ाएँ।"
                      : "Increase repeat purchases using automated flows like welcome, cart‑abandon, and win‑back."}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "लाभ: LTV वृद्धि" : "Benefits: Higher LTV"}</li>
                    <li>{isHindi ? "परिणाम: 15–30% राजस्व ईमेल से" : "Outcome: 15–30% revenue from email"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Case studies */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{
                title: isHindi ? "ई‑कॉमर्स फैशन" : "E‑commerce Fashion",
                metric: "+5.2× ROAS",
                desc: isHindi ? "UGC + रिटार्गेटिंग से 90 दिनों में" : "UGC + retargeting in 90 days"
              },{
                title: isHindi ? "B2B SaaS" : "B2B SaaS",
                metric: "+220% organic",
                desc: isHindi ? "टेक्निकल SEO और कंटेंट से" : "Technical SEO + content"
              },{
                title: isHindi ? "स्थानीय सेवाएँ" : "Local Services",
                metric: "−38% CPA",
                desc: isHindi ? "PPC स्मार्ट बिडिंग से" : "PPC smart bidding"
              }].map((cs, i) => (
                <Card key={i} className="border bg-surface">
                  <CardHeader>
                    <CardTitle className="asn-headline text-lg">{cs.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="asn-headline text-2xl">{cs.metric}</p>
                    <p className="asn-body text-muted-foreground">{cs.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Development */}
          <div className="space-y-6">
            <h3 className="asn-headline text-2xl">{isHindi ? "वेब डेवलपमेंट" : "Web Development"}</h3>
            <Accordion type="multiple" className="bg-surface border border-border rounded-xl p-4">
              <AccordionItem value="stack">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "आधुनिक टेक‑स्टैक" : "Modern Tech Stack"}</AccordionTrigger>
                <AccordionContent className="asn-body text-muted-foreground">
                  {isHindi ? "React, Node और क्लाउड‑होस्टिंग—तेज़, सुरक्षित और स्केलेबल वेबसाइटें।" : "React, Node and cloud hosting for fast, secure and scalable websites."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="benefits-dev">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "लाभ और परिणाम" : "Benefits & Outcomes"}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "90+ Lighthouse स्कोर" : "90+ Lighthouse scores"}</li>
                    <li>{isHindi ? "बेहतर कन्वर्ज़न" : "Improved conversion rates"}</li>
                    <li>{isHindi ? "कम रखरखाव लागत" : "Lower maintenance costs"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* E‑commerce */}
          <div className="space-y-6">
            <h3 className="asn-headline text-2xl">{isHindi ? "ई‑कॉमर्स" : "E‑commerce"}</h3>
            <Accordion type="multiple" className="bg-surface border border-border rounded-xl p-4">
              <AccordionItem value="catalog">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "स्टोर और कैटलॉग" : "Store & Catalog"}</AccordionTrigger>
                <AccordionContent className="asn-body text-muted-foreground">
                  {isHindi ? "प्रोडक्ट, भुगतान और शिपिंग का पूरा सेटअप।" : "Complete setup for products, payments and shipping."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="outcomes-ecom">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "लाभ और परिणाम" : "Benefits & Outcomes"}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "तेज़ चेकआउट" : "Faster checkout"}</li>
                    <li>{isHindi ? "AOV वृद्धि" : "Higher AOV"}</li>
                    <li>{isHindi ? "दोबारा खरीद" : "Higher repeat purchases"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Security */}
          <div className="space-y-6">
            <h3 className="asn-headline text-2xl">{isHindi ? "सुरक्षा" : "Security"}</h3>
            <Accordion type="multiple" className="bg-surface border border-border rounded-xl p-4">
              <AccordionItem value="hardening">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "हार्डनिंग और मॉनिटरिंग" : "Hardening & Monitoring"}</AccordionTrigger>
                <AccordionContent className="asn-body text-muted-foreground">
                  {isHindi ? "SSL, बैकअप, फायरवॉल और 24/7 मॉनिटरिंग।" : "SSL, backups, firewalls, and 24/7 monitoring."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="outcomes-sec">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "लाभ और परिणाम" : "Benefits & Outcomes"}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "कम डाउनटाइम" : "Reduced downtime"}</li>
                    <li>{isHindi ? "डेटा सुरक्षा" : "Data protection"}</li>
                    <li>{isHindi ? "विश्वसनीयता" : "Higher reliability"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Design */}
          <div className="space-y-6">
            <h3 className="asn-headline text-2xl">{isHindi ? "डिज़ाइन" : "Design"}</h3>
            <Accordion type="multiple" className="bg-surface border border-border rounded-xl p-4">
              <AccordionItem value="brand">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "ब्रांड पहचान" : "Brand Identity"}</AccordionTrigger>
                <AccordionContent className="asn-body text-muted-foreground">
                  {isHindi ? "लोगो, रंग और टाइपोग्राफी जो ब्रांड को पहचान देती है।" : "Logo, color and typography systems that define your brand."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="outcomes-design">
                <AccordionTrigger className="asn-body text-left">{isHindi ? "लाभ और परिणाम" : "Benefits & Outcomes"}</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-1 asn-body">
                    <li>{isHindi ? "बेहतर विश्वास" : "Higher trust"}</li>
                    <li>{isHindi ? "ज़्यादा कन्वर्ज़न" : "More conversions"}</li>
                    <li>{isHindi ? "ब्रांड यादगार" : "Memorable branding"}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Business Execution Detailed Explanation */}
      <section className="asn-section bg-surface">
        <div className="asn-container">
          <div className="text-center mb-12">
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "व्यापार निष्पादन क्या है?" : "What is Business Execution?"}
            </h2>
            <p className="asn-body text-lg text-muted-foreground max-w-4xl mx-auto">
              {isHindi 
                ? "हमारी डिजिटल मार्केटिंग एजेंसी व्यापार निष्पादन में उत्कृष्टता प्राप्त करती है, यह सुनिश्चित करती है कि आपकी मार्केटिंग रणनीतियां न केवल योजनाबद्ध हों बल्कि प्रभावी ढंग से कार्यान्वित भी हों।"
                : "Our digital marketing agency excels in business execution, ensuring your marketing strategies are not only planned but effectively implemented."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center p-6 bg-background border border-border rounded-lg">
              <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="asn-headline text-xl mb-3">
                {isHindi ? "रणनीतिक योजना" : "Strategic Planning"}
              </h3>
              <p className="asn-body text-sm text-muted-foreground">
                {isHindi 
                  ? "लक्ष्य निर्धारण, KPI परिभाषा, संसाधन आवंटन और जोखिम मूल्यांकन"
                  : "Goal setting, KPI definition, resource allocation, and risk assessment"
                }
              </p>
            </div>

            <div className="text-center p-6 bg-background border border-border rounded-lg">
              <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="asn-headline text-xl mb-3">
                {isHindi ? "कार्यान्वयन" : "Implementation"}
              </h3>
              <p className="asn-body text-sm text-muted-foreground">
                {isHindi 
                  ? "प्रक्रिया डिज़ाइन, टीम समन्वय, प्रौद्योगिकी एकीकरण और परिवर्तन प्रबंधन"
                  : "Process design, team coordination, technology integration, and change management"
                }
              </p>
            </div>

            <div className="text-center p-6 bg-background border border-border rounded-lg">
              <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="asn-headline text-xl mb-3">
                {isHindi ? "निगरानी" : "Monitoring"}
              </h3>
              <p className="asn-body text-sm text-muted-foreground">
                {isHindi 
                  ? "प्रदर्शन ट्रैकिंग, रीयल-टाइम रिपोर्टिंग, विचलन विश्लेषण और सुधार"
                  : "Performance tracking, real-time reporting, variance analysis, and improvement"
                }
              </p>
            </div>

            <div className="text-center p-6 bg-background border border-border rounded-lg">
              <div className="w-16 h-16 bg-foreground text-background rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="asn-headline text-xl mb-3">
                {isHindi ? "परिणाम" : "Results"}
              </h3>
              <p className="asn-body text-sm text-muted-foreground">
                {isHindi 
                  ? "परिणाम मापन, ROI गणना, सबक सीखना और प्रक्रिया परिष्करण"
                  : "Outcome measurement, ROI calculation, lessons learned, and process refinement"
                }
              </p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-8 text-center">
            <h3 className="asn-headline text-2xl mb-4">
              {isHindi ? "आपके व्यवसाय के लिए क्यों महत्वपूर्ण है?" : "Why It Matters for Your Business"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <ul className="space-y-2 asn-body text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0" />
                    <span>{isHindi ? "रणनीति-कार्यान्वयन अंतर को समाप्त करता है" : "Eliminates the Strategy-Execution Gap"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0" />
                    <span>{isHindi ? "समय-से-मूल्य को तेज करता है" : "Accelerates Time-to-Value"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0" />
                    <span>{isHindi ? "संचालनात्मक जोखिम को कम करता है" : "Reduces Operational Risk"}</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 asn-body text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0" />
                    <span>{isHindi ? "संसाधन दक्षता में सुधार करता है" : "Improves Resource Efficiency"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0" />
                    <span>{isHindi ? "स्केलेबल विकास को सक्षम करता है" : "Enables Scalable Growth"}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="h-5 w-5 mt-0.5 text-foreground flex-shrink-0" />
                    <span>{isHindi ? "मापने योग्य ROI प्रदान करता है" : "Delivers Measurable ROI"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Selection */}
      <section className="asn-section bg-surface">
        <div className="asn-container">
          <div className="flex justify-center mb-12">
            <div className="flex border border-border rounded-lg overflow-hidden bg-background">
              <button
                onClick={() => setSelectedMarket("domestic")}
                className={`flex items-center space-x-2 px-8 py-4 transition-all duration-300 ${
                  selectedMarket === "domestic"
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <IndianRupee className="h-5 w-5" />
                <span className="font-bold">
                  {isHindi ? "भारतीय बाजार" : "Domestic (India)"}
                </span>
              </button>
              <button
                onClick={() => setSelectedMarket("international")}
                className={`flex items-center space-x-2 px-8 py-4 transition-all duration-300 ${
                  selectedMarket === "international"
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Globe className="h-5 w-5" />
                <span className="font-bold">
                  {isHindi ? "अंतर्राष्ट्रीय बाजार" : "International (Global)"}
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPlans.map((plan, index) => (
              <Card
                key={plan.name}
                className={`relative border-2 transition-all duration-300 hover:scale-105 animate-fade-in ${
                  plan.popular
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background hover:border-foreground"
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background text-foreground">
                    {isHindi ? "सबसे लोकप्रिय" : "Most Popular"}
                  </Badge>
                )}
                
                <CardHeader className="text-center space-y-4">
                  <CardTitle className={`asn-headline text-2xl ${plan.popular ? "text-background" : "text-foreground"}`}>
                    {plan.name}
                  </CardTitle>
                  <div className={`asn-headline asn-price-apple ${plan.popular ? "text-background" : "text-foreground"}`}>
                    <span className={`asn-price-currency ${plan.popular ? 'text-background/80' : ''}`}>{plan.price[0]}</span>
                    <span className={`asn-price-numbers ${plan.popular ? 'text-background' : ''}`}>{plan.price.slice(1)}</span>
                  </div>
                  <p className={`asn-body text-sm ${plan.popular ? "text-background/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-background" : "text-foreground"}`} />
                        <span className={`asn-body text-sm ${plan.popular ? "text-background/90" : "text-foreground"}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="block">
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-background text-foreground hover:bg-background/90"
                          : "asn-button-primary"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="asn-section bg-foreground text-background">
        <div className="asn-container space-y-12">
          <div className="text-center space-y-6">
            <h2 className="asn-headline text-3xl md:text-5xl text-background">
              {isHindi ? "अतिरिक्त सेवाएं" : "Additional Services"}
            </h2>
            <p className="asn-body text-lg text-background/80 max-w-3xl mx-auto">
              {isHindi 
                ? "आपके व्यापार की सम्पूर्ण डिजिटल जरूरतों को पूरा करने वाली अतिरिक्त सेवाएं"
                : "Additional services to meet all your business's comprehensive digital needs"
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 border border-background/20 rounded-lg hover:bg-background/5 transition-all duration-300">
              <h3 className="asn-headline text-xl text-background">
                {isHindi ? "रणनीतिक परामर्श" : "Strategy Consulting"}
              </h3>
              <p className="asn-body text-background/80">
                {isHindi 
                  ? "व्यापारिक रणनीति और बाजार विश्लेषण के साथ आपके व्यापार को सफलता की राह दिखाना"
                  : "Guiding your business to success with business strategy and market analysis"
                }
              </p>
            </div>

            <div className="text-center space-y-4 p-6 border border-background/20 rounded-lg hover:bg-background/5 transition-all duration-300">
              <h3 className="asn-headline text-xl text-background">
                {isHindi ? "ब्रांड विकास" : "Brand Development"}
              </h3>
              <p className="asn-body text-background/80">
                {isHindi 
                  ? "लोगो, ब्रांडिंग और विजुअल पहचान के साथ आपके ब्रांड को अलग पहचान दिलाना"
                  : "Creating unique brand identity with logo, branding, and visual identity"
                }
              </p>
            </div>

            <div className="text-center space-y-4 p-6 border border-background/20 rounded-lg hover:bg-background/5 transition-all duration-300">
              <h3 className="asn-headline text-xl text-background">
                {isHindi ? "निरंतर समर्थन" : "Ongoing Support"}
              </h3>
              <p className="asn-body text-background/80">
                {isHindi 
                  ? "24/7 तकनीकी सहायता और रखरखाव के साथ आपके व्यापार को हमेशा चालू रखना"
                  : "Keeping your business always running with 24/7 technical support and maintenance"
                }
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link to="/contact">
              <Button className="bg-background text-foreground hover:bg-background/90 px-12 py-6 text-lg font-bold tracking-wide uppercase">
                {isHindi ? "कस्टम क्वोट प्राप्त करें" : "Get Custom Quote"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
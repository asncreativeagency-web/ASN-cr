import { useState } from "react";
import { Check, Globe, IndianRupee, DollarSign, Code, ShoppingCart, Megaphone, Paintbrush, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
      cta: isHindi ? "शुरू करें" : "Get Started",
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
      cta: "Get Started",
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
              ? "दो बाजारों के लिए विशेष रूप से डिज़ाइन किए गए पैकेज। आपकी आवश्यकताओं के लिए सही समाधान चुनें।"
              : "Specialized packages designed for two markets. Choose the perfect solution for your needs."
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
                ? "रचनात्मक डिज़ाइन समाधान जो आपके ब्रांड को अलग बनाते हैं"
                : "Creative design solutions that set your brand apart")
              : selectedCategory === "development"
                ? (isHindi
                  ? "आधुनिक विकास सेवाएं जो आपके व्यापार को डिजिटल बनाती हैं"
                  : "Modern development services to digitize your business")
                : selectedCategory === "ecommerce"
                  ? (isHindi
                    ? "ई-कॉमर्स के लिए संपूर्ण समाधान"
                    : "Comprehensive solutions for e-commerce")
                  : selectedCategory === "security"
                    ? (isHindi
                      ? "वेबसाइट और डेटा सुरक्षा के लिए सेवाएं"
                      : "Services for website and data security")
                    : (isHindi
                      ? "व्यापक डिजिटल मार्केटिंग समाधान जो आपके व्यापार को नई ऊंचाइयों तक पहुंचाते हैं"
                      : "Comprehensive digital marketing solutions that take your business to new heights")}
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
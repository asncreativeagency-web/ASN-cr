import { useState } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";

interface PortfolioProps {
  language: string;
}

const Portfolio = ({ language }: PortfolioProps) => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const isHindi = language === "hi";

  const caseStudies = [
    {
      id: 1,
      title: isHindi ? "फ़ैशन ई-कॉमर्स स्टार्टअप" : "Fashion E-commerce Startup",
      client: "StyleHub India",
      category: isHindi ? "ई-कॉमर्स" : "E-commerce",
      description: isHindi 
        ? "एक नए फ़ैशन ब्रांड को 6 महीने में प्रॉफ़िटेबल बिज़नेस बनाया"
        : "Transformed a new fashion brand into a profitable business in 6 months",
      challenge: isHindi
        ? "शून्य से शुरुआत करके ऑनलाइन उपस्थिति बनाना और ग्राहक आधार विकसित करना"
        : "Building online presence from scratch and developing customer base",
      solution: isHindi
        ? "कस्टम ई-कॉमर्स प्लेटफॉर्म, टारगेटेड Meta Ads कैंपेन और ब्रांड स्ट्रैटेजी"
        : "Custom e-commerce platform, targeted Meta Ads campaigns, and brand strategy",
      results: [
        isHindi ? "₹25 लाख मासिक रेवेन्यू" : "₹25L monthly revenue",
        isHindi ? "8.5× ROAS" : "8.5× ROAS", 
        isHindi ? "15,000+ ग्राहक" : "15,000+ customers",
        isHindi ? "3 महीने में ब्रेक-ईवन" : "Break-even in 3 months"
      ],
      image: "/lovable-uploads/fashion-ecommerce.jpg",
      tags: ["E-commerce", "Meta Ads", "Branding"]
    },
    {
      id: 2,
      title: isHindi ? "टेक स्टार्टअप लॉन्च" : "Tech Startup Launch",
      client: "InnovateTech Solutions",
      category: isHindi ? "टेक्नोलॉजी" : "Technology",
      description: isHindi 
        ? "B2B SaaS प्लेटफॉर्म का सफल लॉन्च और स्केलिंग"
        : "Successful launch and scaling of B2B SaaS platform",
      challenge: isHindi
        ? "टेक्निकल प्रोडक्ट को व्यापारिक दर्शकों के लिए मार्केट करना"
        : "Marketing technical product to business audiences",
      solution: isHindi
        ? "लीड जेनरेशन फ़नल, कंटेंट मार्केटिंग और LinkedIn Ads स्ट्रैटेजी"
        : "Lead generation funnel, content marketing, and LinkedIn Ads strategy",
      results: [
        isHindi ? "500+ B2B लीड्स" : "500+ B2B leads",
        isHindi ? "12% कन्वर्शन रेट" : "12% conversion rate",
        isHindi ? "$50K ARR" : "$50K ARR",
        isHindi ? "25+ एंटरप्राइज़ क्लाइंट्स" : "25+ enterprise clients"
      ],
      image: "/lovable-uploads/saas-technology.jpg",
      tags: ["SaaS", "B2B", "Lead Gen"]
    },
    {
      id: 3,
      title: isHindi ? "रेस्टोरेंट चेन विस्तार" : "Restaurant Chain Expansion", 
      client: "Spice Garden",
      category: isHindi ? "खाद्य सेवा" : "Food Service",
      description: isHindi
        ? "स्थानीय रेस्टोरेंट को मल्टी-लोकेशन चेन में बदला"
        : "Transformed local restaurant into multi-location chain",
      challenge: isHindi
        ? "ऑनलाइन ऑर्डरिंग सिस्टम और डिलीवरी नेटवर्क स्थापित करना"
        : "Establishing online ordering system and delivery network",
      solution: isHindi
        ? "कस्टम ऑर्डरिंग प्लेटफॉर्म, जियो-टारगेटेड मार्केटिंग और ऑपरेशनल स्ट्रैटेजी"
        : "Custom ordering platform, geo-targeted marketing, and operational strategy",
      results: [
        isHindi ? "300% ऑर्डर बढ़ोतरी" : "300% order increase",
        isHindi ? "5 नए आउटलेट्स" : "5 new outlets",
        isHindi ? "₹1 करोड़ सालाना" : "₹1Cr annual revenue",
        isHindi ? "40% ऑनलाइन ऑर्डर्स" : "40% online orders"
      ],
      image: "/lovable-uploads/restaurant-food.jpg",
      tags: ["Food Tech", "Local Business", "Operations"]
    },
    {
      id: 4,
      title: isHindi ? "इंटरनेशनल ड्रॉपशिपिंग" : "International Dropshipping",
      client: "Global Gadgets Co.",
      category: isHindi ? "ड्रॉपशिपिंग" : "Dropshipping", 
      description: isHindi
        ? "यूएस और यूके मार्केट में इलेक्ट्रॉनिक्स ड्रॉपशिपिंग बिज़नेस"
        : "Electronics dropshipping business in US and UK markets",
      challenge: isHindi
        ? "अंतर्राष्ट्रीय कंप्लायंस और सप्लाई चेन मैनेजमेंट"
        : "International compliance and supply chain management",
      solution: isHindi
        ? "ऑटोमेटेड ऑर्डर फुलफिलमेंट, मल्टी-करेंसी स्टोर और Google Ads"
        : "Automated order fulfillment, multi-currency store, and Google Ads",
      results: [
        isHindi ? "$200K+ रेवेन्यू" : "$200K+ revenue",
        isHindi ? "6.2× ROAS" : "6.2× ROAS",
        isHindi ? "35 देशों में सेल्स" : "Sales in 35 countries", 
        isHindi ? "95% ऑटोमेशन" : "95% automation"
      ],
      image: "/lovable-uploads/dropshipping-business.jpg",
      tags: ["Dropshipping", "International", "Automation"]
    },
    {
      id: 5,
      title: isHindi ? "एजुकेशन प्लेटफॉर्म" : "Education Platform",
      client: "SkillMaster Academy", 
      category: isHindi ? "शिक्षा" : "Education",
      description: isHindi
        ? "ऑनलाइन कोर्स प्लेटफॉर्म का डेवलपमेंट और मार्केटिंग"
        : "Development and marketing of online course platform",
      challenge: isHindi
        ? "शिक्षार्थियों के लिए एंगेजिंग ऑनलाइन एक्सपीरियंस बनाना"
        : "Creating engaging online learning experience for students",
      solution: isHindi
        ? "LMS प्लेटफॉर्म, इंटरैक्टिव कंटेंट और सोशल मीडिया मार्केटिंग"
        : "LMS platform, interactive content, and social media marketing",
      results: [
        isHindi ? "10,000+ स्टूडेंट्स" : "10,000+ students",
        isHindi ? "85% कोर्स कंप्लीशन" : "85% course completion",
        isHindi ? "₹50 लाख रेवेन्यू" : "₹50L revenue",
        isHindi ? "4.8/5 रेटिंग" : "4.8/5 rating"
      ],
      image: "/lovable-uploads/education-platform.jpg",
      tags: ["EdTech", "LMS", "Content"]
    },
    {
      id: 6,
      title: isHindi ? "हेल्थकेयर डिजिटलाइज़ेशन" : "Healthcare Digitalization",
      client: "MediCare Plus",
      category: isHindi ? "स्वास्थ्य सेवा" : "Healthcare",
      description: isHindi
        ? "क्लिनिक मैनेजमेंट सिस्टम और पेशेंट पोर्टल डेवलपमेंट"
        : "Clinic management system and patient portal development",
      challenge: isHindi
        ? "सिक्यूरिटी और कंप्लायंस के साथ डिजिटल हेल्थ सोल्यूशन"
        : "Digital health solution with security and compliance",
      solution: isHindi
        ? "HIPAA कंप्लायंट सिस्टम, टेली-कंसल्टेशन और अपॉइंटमेंट बुकिंग"
        : "HIPAA compliant system, tele-consultation, and appointment booking",
      results: [
        isHindi ? "75% पेपरवर्क रिडक्शन" : "75% paperwork reduction",
        isHindi ? "200+ डॉक्टर्स" : "200+ doctors",
        isHindi ? "5,000+ पेशेंट्स" : "5,000+ patients",
        isHindi ? "98% अपटाइम" : "98% uptime"
      ],
      image: "/lovable-uploads/healthcare-digital.jpg",
      tags: ["HealthTech", "SaaS", "Compliance"]
    }
  ];

  const categories = [
    isHindi ? "सभी" : "All",
    isHindi ? "ई-कॉमर्स" : "E-commerce", 
    isHindi ? "टेक्नोलॉजी" : "Technology",
    isHindi ? "खाद्य सेवा" : "Food Service",
    isHindi ? "शिक्षा" : "Education",
    isHindi ? "स्वास्थ्य सेवा" : "Healthcare"
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const filteredCases = selectedCategory === (isHindi ? "सभी" : "All") 
    ? caseStudies 
    : caseStudies.filter(study => study.category === selectedCategory);

  const CaseStudyDialogContent = lazy(() => import("../components/CaseStudyDialogContent"));

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="asn-section bg-background">
        <div className="asn-container text-center space-y-6">
          <h1 className="asn-headline text-4xl md:text-6xl">
            {isHindi ? "हमारा पोर्टफोलियो" : "Our Portfolio"}
          </h1>
          <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
            {isHindi
              ? "सफलता की कहानियां जो हमारी विशेषज्ञता और प्रतिबद्धता को दर्शाती हैं।"
              : "Success stories that showcase our expertise and commitment to excellence."
            }
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="asn-section bg-surface">
        <div className="asn-container">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "asn-button-primary" : "asn-button-secondary"}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((study, index) => (
              <Card
                key={study.id}
                className="group cursor-pointer border-border hover:border-foreground transition-all duration-300 hover:scale-105 animate-fade-in bg-background"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => setSelectedCase(study.id)}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 filter grayscale"
                  />
                  <div className="absolute inset-0 bg-foreground/60 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-background opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="asn-headline text-xl group-hover:text-muted-foreground transition-colors">
                    {study.title}
                  </h3>
                  
                  <p className="asn-body text-muted-foreground text-sm line-clamp-2">
                    {study.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="asn-body text-xs text-muted-foreground font-bold uppercase tracking-wide">
                      {study.client}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selectedCase && (
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <Suspense fallback={<div className="flex justify-center items-center min-h-[20vh] text-lg">Loading...</div>}>
            <CaseStudyDialogContent caseId={selectedCase} caseStudies={caseStudies} />
          </Suspense>
        </Dialog>
      )}

      {/* CTA Section */}
      <section className="asn-section bg-foreground text-background">
        <div className="asn-container text-center space-y-12">
          <h2 className="asn-headline text-3xl md:text-5xl text-background">
            {isHindi ? "अगली सफलता की कहानी आपकी हो सकती है" : "Your Success Story Could Be Next"}
          </h2>
          <p className="asn-body text-xl text-background/80 max-w-2xl mx-auto">
            {isHindi
              ? "आज ही हमसे जुड़ें और अपने व्यापार को नई ऊंचाइयों पर ले जाने की यात्रा शुरू करें।"
              : "Join us today and start your journey to take your business to new heights."
            }
          </p>
          <div className="pt-8">
            <Link to="/contact">
              <Button className="asn-button-primary px-10 py-5 text-lg font-bold tracking-wide uppercase shadow-lg hover:shadow-xl">
                {isHindi ? "अपना प्रोजेक्ट शुरू करें" : "Start Your Project"}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
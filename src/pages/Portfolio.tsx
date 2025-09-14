import { useState, Suspense, lazy } from "react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface PortfolioProps {
  language: string;
}

const Portfolio = ({ language }: PortfolioProps) => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const isHindi = language === "hi";

  const caseStudies = [
    {
      id: 6,
      title: isHindi ? "ईस्ट एज ई-कॉमर्स प्लेटफॉर्म" : "EastEdge E-commerce Platform",
      client: "EastEdge - Timeless Essentials",
      category: isHindi ? "ई-कॉमर्स" : "E-commerce",
      description: isHindi 
        ? "आधुनिक और रेस्पॉन्सिव ई-कॉमर्स प्लेटफॉर्म का विकास"
        : "Modern and responsive e-commerce platform development",
      challenge: isHindi
        ? "यूजर-फ्रेंडली ऑनलाइन शॉपिंग एक्सपीरियंस बनाना"
        : "Creating user-friendly online shopping experience",
      solution: isHindi
        ? "फुल-स्टैक ई-कॉमर्स सोल्यूशन, मोबाइल ऑप्टिमाइज़ेशन और सिक्योर पेमेंट गेटवे"
        : "Full-stack e-commerce solution, mobile optimization, and secure payment gateway",
      results: [
        isHindi ? "100% रेस्पॉन्सिव डिज़ाइन" : "100% responsive design",
        isHindi ? "सिक्योर चेकआउट" : "Secure checkout process", 
        isHindi ? "फास्ट लोडिंग स्पीड" : "Fast loading speed",
        isHindi ? "मॉडर्न UI/UX" : "Modern UI/UX design"
      ],
      image: "/lovable-uploads/eastedge.png",
      tags: ["E-commerce", "React", "Modern Design"],
      websiteUrl: "https://eastedge.onrender.com/"
    },
    {
      id: 7,
      title: isHindi ? "BIM आर्काना - इनोवेटिव BIM सर्विसेज" : "BIM Arcana - Innovative BIM Services",
      client: "BIM Arcana",
      category: isHindi ? "कंस्ट्रक्शन टेक" : "Construction Tech",
      description: isHindi 
        ? "निर्माण उद्योग के लिए उन्नत BIM समाधान और डिजिटल कंस्ट्रक्शन सेवाएं"
        : "Advanced BIM solutions and digital construction services for the building industry",
      challenge: isHindi
        ? "पारंपरिक निर्माण प्रक्रियाओं को डिजिटल बनाना"
        : "Digitalizing traditional construction processes",
      solution: isHindi
        ? "3D BIM मॉडलिंग, प्रोजेक्ट मैनेजमेंट और डिजिटल कंस्ट्रक्शन वर्कफ़्लो"
        : "3D BIM modeling, project management, and digital construction workflows",
      results: [
        isHindi ? "उन्नत BIM समाधान" : "Advanced BIM solutions",
        isHindi ? "प्रोजेक्ट एफिशिएंसी" : "Project efficiency boost", 
        isHindi ? "डिजिटल वर्कफ़्लो" : "Digital workflows",
        isHindi ? "3D विज़ुअलाइज़ेशन" : "3D visualization"
      ],
      image: "/lovable-uploads/bim.png",
      tags: ["BIM", "Construction", "3D Modeling"],
      websiteUrl: "https://innovativebim.netlify.app/"
    }
  ];

  const categories = [
    isHindi ? "सभी" : "All",
    isHindi ? "ई-कॉमर्स" : "E-commerce",
    isHindi ? "कंस्ट्रक्शन टेक" : "Construction Tech"
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
              ? "Discover How We Can Elevate Your Business! सफलता की कहानियां जो हमारी विशेषज्ञता और प्रतिबद्धता को दर्शाती हैं।"
              : "Discover How We Can Elevate Your Business! Success stories that showcase our expertise and commitment to excellence."
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
                onClick={() => {
                  if (study.websiteUrl) {
                    window.open(study.websiteUrl, '_blank');
                  } else {
                    setSelectedCase(study.id);
                  }
                }}
              >
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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
              : "Ready to create your own success story? Join us today and start your journey to take your business to new heights."
            }
          </p>
          <div className="pt-8">
            <Link to="/contact">
              <Button className="asn-button-primary px-10 py-5 text-lg font-bold tracking-wide uppercase shadow-lg hover:shadow-xl">
                {isHindi ? "अपने प्रोजेक्ट के बारे में बात करें!" : "Discover How We Can Elevate Your Business!"}
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
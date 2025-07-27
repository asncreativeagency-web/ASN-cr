import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Globe, Users, Zap } from "lucide-react";

interface HomeProps {
  language: string;
}

const Home = ({ language }: HomeProps) => {
  const [userLocation, setUserLocation] = useState<string>("");
  const isHindi = language === "hi";

  useEffect(() => {
    // Detect user location (simplified)
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserLocation(data.country_name || "");
      } catch (error) {
        console.log("Location detection failed");
      }
    };
    detectLocation();
  }, []);

  const metrics = [
    {
      number: "40+",
      label: isHindi ? "व्यवसाय लॉन्च किए गए" : "Businesses Launched",
      icon: Zap
    },
    {
      number: "5.2×",
      label: isHindi ? "औसत ROAS" : "Average ROAS",
      icon: BarChart3
    },
    {
      number: "97%+",
      label: isHindi ? "क्लाइंट संतुष्टि" : "Client Satisfaction",
      icon: Users
    },
    {
      number: "15+",
      label: isHindi ? "देश सेवित" : "Countries Served",
      icon: Globe
    }
  ];

  const services = [
    {
      title: isHindi ? "वेब डेवलपमेंट" : "Web Development",
      description: isHindi ? "आधुनिक, तेज़ और उत्तरदायी वेबसाइटें" : "Modern, fast, and responsive websites"
    },
    {
      title: isHindi ? "डिजिटल मार्केटिंग" : "Digital Marketing", 
      description: isHindi ? "Meta Ads और Google Ads में विशेषज्ञता" : "Expert Meta Ads and Google Ads management"
    },
    {
      title: isHindi ? "ड्रॉपशिपिंग" : "Dropshipping",
      description: isHindi ? "संपूर्ण ई-कॉमर्स समाधान" : "Complete e-commerce solutions"
    },
    {
      title: isHindi ? "व्यापार निष्पादन" : "Business Execution",
      description: isHindi ? "विचार से लॉन्च तक" : "From idea to launch"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="asn-hero bg-gradient-to-br from-background to-surface">
        <div className="asn-container text-center space-y-8 animate-fade-in">
          {/* Personalized Greeting */}
          {userLocation && (
            <p className="asn-body text-muted-foreground text-lg">
              {isHindi 
                ? `${userLocation} से नमस्कार! आपका स्वागत है।`
                : `Welcome from ${userLocation}! We're ready to serve you globally.`
              }
            </p>
          )}

          {/* Main Headline */}
          <h1 className="text-responsive-header leading-tight break-words max-w-full">
            {isHindi ? (
              <>
                आपका डिजिटल<br />
                <span className="text-muted-foreground">साम्राज्य</span><br />
                यहाँ शुरू होता है
              </>
            ) : (
              <>
                Your Digital<br />
                <span className="text-muted-foreground">Empire</span><br />
                Starts Here
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-responsive-large text-muted-foreground max-w-4xl mx-auto leading-relaxed break-words">
            {isHindi 
              ? "संपूर्ण व्यापारिक निष्पादन और अंतर्राष्ट्रीय पहुंच के साथ आपके सपनों को साकार करते हैं। प्रीमियम डिजिटल समाधान जो परिणाम देते हैं।"
              : "Complete business execution and international reach. We transform ideas into thriving digital empires with premium solutions that deliver results."
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 w-full max-w-lg mx-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button className="asn-button-primary group w-full sm:w-auto">
                {isHindi ? "शुरू करें" : "Get Started"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/client-portal" className="w-full sm:w-auto">
              <Button variant="outline" className="asn-button-secondary w-full sm:w-auto">
                {isHindi ? "क्लाइंट पोर्टल" : "Client Portal"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="asn-section bg-foreground text-background">
        <div className="asn-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div key={index} className="text-center space-y-4 animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <metric.icon className="h-12 w-12 mx-auto text-background/80" />
                <div className="asn-headline text-3xl md:text-4xl text-background">
                  {metric.number}
                </div>
                <p className="asn-body text-background/80 text-sm font-bold tracking-wide uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="asn-section bg-background">
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "हमारी विशेषज्ञता" : "Our Expertise"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "वैश्विक मानकों के साथ स्थानीय समझ। हर समाधान आपकी सफलता के लिए तैयार किया गया।"
                : "Global standards with local understanding. Every solution crafted for your success."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group border border-border hover:border-foreground transition-all duration-300 p-8 bg-surface hover:bg-foreground hover:text-background animate-fade-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <h3 className="asn-headline text-xl mb-4 group-hover:text-background">
                  {service.title}
                </h3>
                <p className="asn-body text-muted-foreground group-hover:text-background/80">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="asn-button-primary">
                {isHindi ? "सभी सेवाएं देखें" : "View All Services"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="asn-section bg-foreground text-background">
        <div className="asn-container text-center space-y-8">
          <h2 className="asn-headline text-3xl md:text-5xl text-background">
            {isHindi ? "अपना साम्राज्य बनाने के लिए तैयार हैं?" : "Ready to Build Your Empire?"}
          </h2>
          <p className="asn-body text-xl text-background/80 max-w-2xl mx-auto">
            {isHindi 
              ? "आज ही हमसे जुड़ें और अपने व्यापार को नई ऊंचाइयों पर ले जाएं।"
              : "Join us today and take your business to unprecedented heights."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Link to="/contact">
              <Button className="bg-background text-foreground hover:bg-background/90 px-6 py-3 font-bold tracking-wide uppercase w-full sm:w-auto">
                {isHindi ? "निःशुल्क परामर्श बुक करें" : "Book Free Consultation"}
              </Button>
            </Link>
            <a 
              href="https://www.instagram.com/asncreativeagency/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/80 hover:text-background transition-colors underline text-sm"
            >
              {isHindi ? "Instagram फॉलो करें" : "Follow on Instagram"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
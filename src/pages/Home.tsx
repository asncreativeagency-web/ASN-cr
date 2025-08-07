import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Globe, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HomeProps {
  language: string;
}

function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    window.addEventListener('classChange', check);
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      window.removeEventListener('classChange', check);
      observer.disconnect();
    };
  }, []);
  return isDark;
}

const Home = ({ language }: HomeProps) => {
  const [userLocation, setUserLocation] = useState<string>("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const isHindi = language === "hi";
  const isDark = useIsDarkMode();

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

  const featuredServices = [
    {
      tier: isHindi ? "घरेलू" : "Domestic",
      subtitle: isHindi ? "स्थानीय बाजार के लिए" : "For Local Markets",
      icon: "",
      features: [
        isHindi ? "हिंदी में पूर्ण समर्थन" : "Full Hindi Support",
        isHindi ? "स्थानीय भुगतान गेटवे" : "Local Payment Gateways",
        isHindi ? "भारतीय SEO अनुकूलन" : "Indian SEO Optimization",
        isHindi ? "24/7 हिंदी कस्टमर सपोर्ट" : "24/7 Hindi Customer Support"
      ],
      price: isHindi ? "₹25,000 से शुरू" : "Starting ₹25,000",
      cta: isHindi ? "घरेलू पैकेज देखें" : "View Domestic Package"
    },
    {
      tier: isHindi ? "अंतर्राष्ट्रीय" : "International",
      subtitle: isHindi ? "वैश्विक बाजार के लिए" : "For Global Markets",
      icon: "",
      features: [
        isHindi ? "बहुभाषी समर्थन" : "Multi-language Support",
        isHindi ? "अंतर्राष्ट्रीय भुगतान" : "International Payments",
        isHindi ? "वैश्विक SEO रणनीति" : "Global SEO Strategy",
        isHindi ? "24/7 अंग्रेजी सपोर्ट" : "24/7 English Support"
      ],
      price: isHindi ? "$500 से शुरू" : "Starting $500",
      cta: isHindi ? "अंतर्राष्ट्रीय पैकेज देखें" : "View International Package"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: isHindi ? "परामर्श" : "Consult",
      subtitle: isHindi ? "हम आपकी आवश्यकताओं को समझते हैं" : "We understand your needs",
      description: isHindi 
        ? "हम आपके व्यवसाय, लक्ष्यों और चुनौतियों का विश्लेषण करते हैं।"
        : "We analyze your business, goals, and challenges.",
      icon: "",
      color: "bg-blue-50 dark:bg-blue-950"
    },
    {
      step: 2,
      title: isHindi ? "निष्पादन" : "Execute",
      subtitle: isHindi ? "हम आपकी रणनीति को कार्यान्वित करते हैं" : "We implement your strategy",
      description: isHindi 
        ? "हमारी विशेषज्ञ टीम आपकी योजना को जीवन में लाती है।"
        : "Our expert team brings your plan to life.",
      icon: "",
      color: "bg-green-50 dark:bg-green-950"
    },
    {
      step: 3,
      title: isHindi ? "विकास" : "Grow",
      subtitle: isHindi ? "हम आपके व्यवसाय को बढ़ाते हैं" : "We grow your business",
      description: isHindi 
        ? "हम आपके परिणामों को ट्रैक करते हैं और निरंतर सुधार करते हैं।"
        : "We track your results and continuously improve.",
      icon: "",
      color: "bg-purple-50 dark:bg-purple-950"
    }
  ];

  const testimonials = [
    {
      name: isHindi ? "राहुल शर्मा" : "Rahul Sharma",
      role: isHindi ? "फैशन ई-कॉमर्स के संस्थापक" : "Founder, Fashion E-commerce",
      quote: isHindi 
        ? "ASN ने हमारे ब्रांड को पूरी तरह से बदल दिया। 3 महीनों में 400% बिक्री वृद्धि!"
        : "ASN completely transformed our brand. 400% sales increase in just 3 months!",
      photo: "/lovable-uploads/fashion-ecommerce.jpg"
    },
    {
      name: isHindi ? "प्रिया पटेल" : "Priya Patel",
      role: isHindi ? "हेल्थकेयर स्टार्टअप CEO" : "CEO, Healthcare Startup",
      quote: isHindi 
        ? "उनकी डिजिटल मार्केटिंग रणनीति ने हमें 5.2x ROAS दिया। अद्भुत टीम!"
        : "Their digital marketing strategy gave us 5.2x ROAS. Amazing team!",
      photo: "/lovable-uploads/healthcare-digital.jpg"
    },
    {
      name: isHindi ? "अमित कुमार" : "Amit Kumar",
      role: isHindi ? "रेस्टोरेंट चेन मालिक" : "Restaurant Chain Owner",
      quote: isHindi 
        ? "ड्रॉपशिपिंग सेटअप ने हमारी ऑनलाइन उपस्थिति को बदल दिया। राजस्व 300% बढ़ा।"
        : "The dropshipping setup transformed our online presence. Revenue increased by 300%.",
      photo: "/lovable-uploads/restaurant-food.jpg"
    },
    {
      name: isHindi ? "सुनीता वर्मा" : "Sunita Verma",
      role: isHindi ? "एजुकेशन प्लेटफॉर्म डायरेक्टर" : "Director, Education Platform",
      quote: isHindi 
        ? "उनकी वेब डेवलपमेंट सेवाओं ने हमारे प्लेटफॉर्म को पूरी तरह से बदल दिया।"
        : "Their web development services completely transformed our platform.",
      photo: "/lovable-uploads/education-platform.jpg"
    },
    {
      name: isHindi ? "राजेश मल्होत्रा" : "Rajesh Malhotra",
      role: isHindi ? "SaaS टेक्नोलॉजी CEO" : "CEO, SaaS Technology",
      quote: isHindi 
        ? "ASN की टीम ने हमारे SaaS प्रोडक्ट को अगले लेवल पर ले गया।"
        : "ASN's team took our SaaS product to the next level.",
      photo: "/lovable-uploads/saas-technology.jpg"
    }
  ];

  const portfolioProjects = [
    {
      id: 1,
      title: isHindi ? "फैशन ई-कॉमर्स प्लेटफॉर्म" : "Fashion E-commerce Platform",
      category: isHindi ? "वेब डेवलपमेंट" : "Web Development",
      image: "/lovable-uploads/fashion-ecommerce.jpg",
      outcome: isHindi ? "+120% क्लिक-थ्रू रेट" : "+120% Click-through Rate",
      description: isHindi 
        ? "एक आधुनिक ई-कॉमर्स प्लेटफॉर्म जो 3 महीनों में 400% बिक्री वृद्धि दर्ज की।"
        : "A modern e-commerce platform that achieved 400% sales growth in 3 months.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      duration: isHindi ? "3 महीने" : "3 Months",
      results: [
        isHindi ? "400% बिक्री वृद्धि" : "400% Sales Growth",
        isHindi ? "120% क्लिक-थ्रू रेट" : "120% Click-through Rate",
        isHindi ? "50% कार्ट एबैंडन में कमी" : "50% Cart Abandonment Reduction"
      ]
    },
    {
      id: 2,
      title: isHindi ? "हेल्थकेयर डिजिटल मार्केटिंग" : "Healthcare Digital Marketing",
      category: isHindi ? "डिजिटल मार्केटिंग" : "Digital Marketing",
      image: "/lovable-uploads/healthcare-digital.jpg",
      outcome: isHindi ? "5.2× ROAS" : "5.2× ROAS",
      description: isHindi 
        ? "Meta Ads और Google Ads अभियान जो 5.2x ROAS प्राप्त किया।"
        : "Meta Ads and Google Ads campaigns that achieved 5.2x ROAS.",
      technologies: ["Meta Ads", "Google Ads", "Analytics", "CRM"],
      duration: isHindi ? "6 महीने" : "6 Months",
      results: [
        isHindi ? "5.2× ROAS" : "5.2× ROAS",
        isHindi ? "300% लीड वृद्धि" : "300% Lead Growth",
        isHindi ? "80% कॉन्वर्जन रेट" : "80% Conversion Rate"
      ]
    },
    {
      id: 3,
      title: isHindi ? "रेस्टोरेंट ड्रॉपशिपिंग" : "Restaurant Dropshipping",
      category: isHindi ? "ड्रॉपशिपिंग" : "Dropshipping",
      image: "/lovable-uploads/restaurant-food.jpg",
      outcome: isHindi ? "\u20B950L+ राजस्व" : "\u20B950L+ Revenue",
      description: isHindi 
        ? "पूर्ण ड्रॉपशिपिंग सेटअप जो ₹50L+ राजस्व उत्पन्न किया।"
        : "Complete dropshipping setup that generated ₹50L+ revenue.",
      technologies: ["Shopify", "Oberlo", "Facebook Ads", "Instagram"],
      duration: isHindi ? "4 महीने" : "4 Months",
      results: [
        isHindi ? "₹50L+ राजस्व" : "₹50L+ Revenue",
        isHindi ? "300% बिक्री वृद्धि" : "300% Sales Growth",
        isHindi ? "90% ग्राहक संतुष्टि" : "90% Customer Satisfaction"
      ]
    },
    {
      id: 4,
      title: isHindi ? "एजुकेशन प्लेटफॉर्म" : "Education Platform",
      category: isHindi ? "वेब डेवलपमेंट" : "Web Development",
      image: "/lovable-uploads/education-platform.jpg",
      outcome: isHindi ? "+200% यूजर एंगेजमेंट" : "+200% User Engagement",
      description: isHindi 
        ? "एक इंटरैक्टिव शिक्षण प्लेटफॉर्म जो 200% यूजर एंगेजमेंट बढ़ाया।"
        : "An interactive learning platform that increased user engagement by 200%.",
      technologies: ["React", "Firebase", "Stripe", "AWS"],
      duration: isHindi ? "5 महीने" : "5 Months",
      results: [
        isHindi ? "200% यूजर एंगेजमेंट" : "200% User Engagement",
        isHindi ? "150% कोर्स एनरोलमेंट" : "150% Course Enrollment",
        isHindi ? "95% पास रेट" : "95% Pass Rate"
      ]
    },
    {
      id: 5,
      title: isHindi ? "SaaS टेक्नोलॉजी प्लेटफॉर्म" : "SaaS Technology Platform",
      category: isHindi ? "वेब डेवलपमेंट" : "Web Development",
      image: "/lovable-uploads/saas-technology.jpg",
      outcome: isHindi ? "+180% सब्सक्राइबर ग्रोथ" : "+180% Subscriber Growth",
      description: isHindi 
        ? "एक स्केलेबल SaaS प्लेटफॉर्म जो 180% सब्सक्राइबर ग्रोथ हासिल किया।"
        : "A scalable SaaS platform that achieved 180% subscriber growth.",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "Vercel"],
      duration: isHindi ? "8 महीने" : "8 Months",
      results: [
        isHindi ? "180% सब्सक्राइबर ग्रोथ" : "180% Subscriber Growth",
        isHindi ? "90% रिटेंशन रेट" : "90% Retention Rate",
        isHindi ? "₹2Cr+ MRR" : "₹2Cr+ MRR"
      ]
    }
  ];

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const successStories = [
    {
      title: isHindi ? "5.2× ROAS" : "5.2× ROAS",
      subtitle: isHindi ? "हेल्थकेयर ब्रांड" : "Healthcare Brand",
      description: isHindi ? "Meta Ads अभियान" : "Meta Ads Campaign",
      icon: "📈",
      color: "bg-green-500"
    },
    {
      title: isHindi ? "400% बिक्री वृद्धि" : "400% Sales Growth",
      subtitle: isHindi ? "फैशन ई-कॉमर्स" : "Fashion E-commerce",
      description: isHindi ? "3 महीने में" : "In 3 Months",
      icon: "🚀",
      color: "bg-blue-500"
    },
    {
      title: isHindi ? "₹50L+ राजस्व" : "₹50L+ Revenue",
      subtitle: isHindi ? "रेस्टोरेंट चेन" : "Restaurant Chain",
      description: isHindi ? "ड्रॉपशिपिंग सेटअप" : "Dropshipping Setup",
      icon: "💰",
      color: "bg-purple-500"
    }
  ];

  // Enhanced animated SVG background for hero
  const HeroAnimatedBG = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      {/* Background Image */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: 'url("/lovable-uploads/bghero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: isDark ? 0.3 : 0.5,
        filter: 'grayscale(100%)'
      }} />
      {/* SVG and dots are now controlled by CSS for responsiveness */}
      <div className="hidden md:block">
        <div style={{ opacity: isDark ? 0.25 : 0.25 }}>
          <svg viewBox="0 0 2000 500" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '200vw', height: '100%', display: 'block', animation: 'waveMove 18s linear infinite' }}>
            <path d="M0 250 Q 500 100 1000 250 T 2000 250" stroke={isDark ? '#fff' : '#000'} strokeWidth="2" fill="none" opacity={isDark ? 0.18 : 0.18}/>
            <path d="M0 350 Q 500 200 1000 350 T 2000 350" stroke={isDark ? '#eee' : '#111'} strokeWidth="1.5" fill="none" opacity={isDark ? 0.18 : 0.18}/>
            <path d="M0 450 Q 500 300 1000 450 T 2000 450" stroke={isDark ? '#ccc' : '#222'} strokeWidth="1" fill="none" opacity={isDark ? 0.18 : 0.18}/>
            <path d="M0 150 Q 500 300 1000 150 T 2000 150" stroke={isDark ? '#bbb' : '#333'} strokeWidth="1.5" fill="none" opacity={isDark ? 0.18 : 0.18}/>
          </svg>
        </div>
        <div style={{ opacity: isDark ? 0.15 : 0.15, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <svg viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" opacity={isDark ? 0.18 : 0.18}/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <line x1="0" y1="0" x2="1200" y2="600" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" opacity={isDark ? 0.18 : 0.18}/>
            <line x1="1200" y1="0" x2="0" y2="600" stroke={isDark ? '#fff' : '#000'} strokeWidth="0.5" opacity={isDark ? 0.18 : 0.18}/>
          </svg>
        </div>
        <div style={{ opacity: isDark ? 0.18 : 0.18, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {[
            { left: '10%', top: '20%', size: 3, delay: 0, duration: 3 },
            { left: '85%', top: '15%', size: 4, delay: 0.5, duration: 4 },
            { left: '20%', top: '80%', size: 2, delay: 1, duration: 2.5 },
            { left: '75%', top: '70%', size: 3, delay: 1.5, duration: 3.5 },
            { left: '50%', top: '30%', size: 4, delay: 0.2, duration: 3.2 },
            { left: '30%', top: '60%', size: 2, delay: 0.8, duration: 2.8 },
            { left: '90%', top: '50%', size: 3, delay: 1.2, duration: 3.8 },
            { left: '15%', top: '40%', size: 4, delay: 0.3, duration: 4.2 },
            { left: '60%', top: '85%', size: 2, delay: 0.7, duration: 2.3 },
            { left: '40%', top: '10%', size: 3, delay: 1.1, duration: 3.1 },
            { left: '80%', top: '25%', size: 4, delay: 0.4, duration: 3.6 },
            { left: '25%', top: '90%', size: 2, delay: 0.9, duration: 2.7 },
            { left: '70%', top: '35%', size: 3, delay: 1.3, duration: 3.3 },
            { left: '5%', top: '65%', size: 4, delay: 0.1, duration: 4.1 },
            { left: '95%', top: '80%', size: 2, delay: 0.6, duration: 2.4 },
            { left: '45%', top: '75%', size: 3, delay: 1.4, duration: 3.4 },
            { left: '55%', top: '20%', size: 4, delay: 0.8, duration: 3.9 },
            { left: '35%', top: '50%', size: 2, delay: 1.0, duration: 2.6 },
            { left: '65%', top: '10%', size: 3, delay: 0.5, duration: 3.7 },
            { left: '10%', top: '70%', size: 4, delay: 1.1, duration: 4.0 }
          ].map((dot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: dot.left,
                top: dot.top,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                backgroundColor: isDark ? '#fff' : '#000',
                borderRadius: '50%',
                opacity: 1,
                animation: `float ${dot.duration}s ease-in-out infinite`,
                animationDelay: `${dot.delay}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Animated dots section divider
  const SectionDivider = () => (
    <motion.div
      className="flex justify-between items-center py-6 w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      aria-hidden="true"
      style={{ gap: 0 }}
    >
      {[...Array(32)].map((_, i) => (
        <motion.span
          key={i}
          className="inline-block rounded-full bg-black"
          style={{ width: 7, height: 7, opacity: i % 2 === 0 ? 0.7 : 0.3 }}
          animate={{
            scale: [1, 1.25, 1],
            y: [0, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            delay: i * 0.04,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );

  return (
    <motion.div className="min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero Section */}
      <motion.section className="asn-hero bg-gradient-to-br from-background to-surface"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <HeroAnimatedBG />
        <motion.div className="asn-container text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {/* Personalized Greeting */}
          {userLocation && (
            <p className="asn-body text-foreground text-lg font-semibold" style={{ 
              textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 1px 2px, rgba(255,255,255,0.8) 0px 1px 2px'
            }}>
              {isHindi 
                ? `${userLocation} से नमस्कार! आपका स्वागत है।`
                : `Welcome from ${userLocation}! We're ready to serve you globally.`
              }
            </p>
          )}

          {/* Main Headline */}
          <h1 className="text-responsive-header leading-tight break-words max-w-full text-foreground" style={{ 
            textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 2px 4px, rgba(255,255,255,0.9) 0px 2px 4px'
          }}>
            {isHindi ? (
              <>
                आपका डिजिटल<br />
                <span className="text-muted-foreground" style={{ 
                  textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 2px 4px, rgba(255,255,255,0.9) 0px 2px 4px'
                }}>साम्राज्य</span><br />
                यहाँ शुरू होता है
              </>
            ) : (
              <>
                Your Digital<br />
                <span className="text-muted-foreground" style={{ 
                  textShadow: 'var(--tw-shadow-color, 0 0 0) 0px 2px 4px, rgba(255,255,255,0.9) 0px 2px 4px'
                }}>Empire</span><br />
                Starts Here
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-responsive-large max-w-4xl mx-auto leading-relaxed break-words font-semibold text-foreground/90" style={{ 
            textShadow: '0 2px 8px rgba(0,0,0,0.12)',
            letterSpacing: '0.01em',
            fontWeight: 600,
          }}>
            {isHindi 
              ? "संपूर्ण व्यापारिक निष्पादन और अंतर्राष्ट्रीय पहुंच के साथ आपके सपनों को साकार करते हैं। प्रीमियम डिजिटल समाधान जो परिणाम देते हैं।"
              : "Complete business execution and international reach. We transform ideas into thriving digital empires with premium solutions that deliver results."
            }
          </p>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 mb-2">
            {metrics.map((metric, i) => (
              <div key={i} className="flex flex-col items-center bg-background/80 rounded-xl p-3 shadow-sm border border-border">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
                  <metric.icon className="inline-block h-5 w-5 sm:h-6 sm:w-6 text-accent" /> {metric.number}
                </span>
                <span className="text-xs font-medium text-muted-foreground mt-1 text-center uppercase tracking-wider">{metric.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/contact">
              <Button className="bg-white text-black font-bold px-8 py-4 rounded-full shadow-lg hover:bg-black hover:text-white border border-black transition-all duration-300 text-lg">
                {isHindi ? "शुरू करें" : "Get Started"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* Optionally, keep a secondary CTA here if needed */}
          </div>
        </motion.div>
      </motion.section>
      <SectionDivider />

      {/* Metrics Section */}
      <motion.section className="asn-section bg-foreground text-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4 group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.07 }}
              >
                <motion.span
                  whileHover={{ scale: 1.18, rotate: [0, 8, -8, 0] }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                  className="inline-block"
                >
                  <metric.icon className="h-12 w-12 mx-auto text-background/80" />
                </motion.span>
                <div className="asn-headline text-3xl md:text-4xl text-background">
                  {metric.number}
                </div>
                <p className="asn-body text-background/80 text-sm font-bold tracking-wide uppercase">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <SectionDivider />

      {/* Services Preview */}
      <motion.section className="asn-section bg-surface"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group border border-border hover:border-foreground transition-all duration-300 p-8 bg-background hover:bg-foreground hover:text-background"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <h3 className="asn-headline text-xl mb-4 group-hover:text-background">
                  {service.title}
                </h3>
                <p className="asn-body text-muted-foreground group-hover:text-background/80">
                  {service.description}
                </p>
              </motion.div>
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
      </motion.section>
      <SectionDivider />

      {/* Featured Services */}
      <motion.section className="asn-section bg-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "प्रमुख सेवाएं" : "Featured Services"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "स्थानीय और वैश्विक बाजारों के लिए विशेष रूप से तैयार किए गए समाधान।"
                : "Solutions specifically crafted for local and global markets."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {featuredServices.map((service, index) => (
              <motion.div
                key={index}
                className="group border-2 border-border hover:border-foreground transition-all duration-300 p-8 bg-surface hover:bg-foreground hover:text-background rounded-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="asn-headline text-2xl mb-2 group-hover:text-background">
                      {service.tier}
                    </h3>
                    <p className="asn-body text-muted-foreground group-hover:text-background/80">
                      {service.subtitle}
                    </p>
                  </div>
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm group-hover:text-background/90">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3 group-hover:bg-background"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="asn-headline text-xl mb-4 group-hover:text-background">
                    {service.price}
                  </p>
                  <Link to="/services">
                    <Button className="w-full asn-button-primary group-hover:bg-background group-hover:text-foreground">
                      {service.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="asn-button-secondary">
                {isHindi ? "सभी सेवाएं और कीमतें देखें" : "View All Services & Pricing"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
      <SectionDivider />

      {/* How It Works Section */}
      <motion.section className="asn-section bg-surface"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "हमारा कार्य प्रक्रिया" : "How It Works"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "हमारी सरल और स्पष्ट कार्य प्रक्रिया हमारे ग्राहकों को अपने व्यवसाय के लिए उपयुक्त समाधानों के साथ जोड़ती है।"
                : "Our simple and transparent process connects you with suitable solutions for your business."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="group border border-border hover:border-foreground transition-all duration-300 p-8 bg-background hover:bg-foreground hover:text-background rounded-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="asn-headline text-2xl mb-2 group-hover:text-background">
                      {step.title}
                    </h3>
                    <p className="asn-body text-muted-foreground group-hover:text-background/80">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <p className="asn-body text-muted-foreground group-hover:text-background/80">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <SectionDivider />

      {/* Success Stories */}
      <motion.section className="asn-section bg-surface"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-12">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "सफलता की कहानियां" : "Success Stories"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "हमारे ग्राहकों के साथ हासिल किए गए असाधारण परिणाम।"
                : "Extraordinary results achieved with our clients."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                className="group bg-background border-2 border-border hover:border-foreground transition-all duration-300 p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${story.color} flex items-center justify-center text-2xl`}>
                  {story.icon}
                </div>
                <h3 className="asn-headline text-2xl mb-2 text-foreground">
                  {story.title}
                </h3>
                <p className="asn-body text-lg font-semibold text-muted-foreground mb-2">
                  {story.subtitle}
                </p>
                <p className="asn-body text-sm text-muted-foreground">
                  {story.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <SectionDivider />

      {/* Client Testimonials Marquee */}
      <motion.section className="asn-section bg-background/50 backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "ग्राहकों की राय" : "Client Testimonials"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "हमारे ग्राहकों का विश्वास हमारी सबसे बड़ी उपलब्धि है।"
                : "Our clients' trust is our greatest achievement."
              }
            </p>
          </div>

          {/* Continuous Scrolling Marquee */}
          <div className="relative overflow-hidden group">
            <div className="flex animate-marquee group-hover:pause">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[90vw] sm:w-[45vw] md:w-[30vw] lg:w-[25vw] mx-4">
                  <div className="bg-background/30 backdrop-blur-md border border-border/50 hover:border-foreground/30 transition-all duration-300 p-6 rounded-xl h-full shadow-sm">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.photo} 
                          alt={`${testimonial.name} - ${testimonial.role} - ASN Creative Agency client testimonial`}
                          className="w-12 h-12 rounded-full object-cover border border-accent/50 shadow-sm"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='24' fill='%236b7280' text-anchor='middle' dy='.3em'%3E👤%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="asn-headline text-lg text-foreground truncate">
                          {testimonial.name}
                        </h3>
                        <p className="asn-body text-sm text-muted-foreground truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <blockquote className="asn-body text-sm italic text-foreground/80 leading-relaxed line-clamp-3">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      <SectionDivider />
      

      {/* Portfolio Section */}
      <motion.section className="asn-section bg-surface"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="asn-container">
          <div className="text-center space-y-6 mb-16">
            <h2 className="asn-headline text-3xl md:text-5xl">
              {isHindi ? "हमारा पोर्टफोलियो" : "Our Portfolio"}
            </h2>
            <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
              {isHindi 
                ? "विभिन्न उद्योगों में हमारे सफल प्रोजेक्ट्स।"
                : "Our successful projects across various industries."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden bg-background border border-border hover:border-foreground transition-all duration-300 rounded-xl cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - ${project.category} project showcase - ASN Creative Agency portfolio`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EProject Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  
                  {/* Hover Overlay with Outcome */}
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <div className="text-center p-4">
                      <p className="font-extrabold text-white text-lg mb-2" style={{textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0px 1px #000'}}>
                        {project.outcome}
                      </p>
                      <p className="text-white text-base font-semibold" style={{textShadow: '0 2px 8px rgba(0,0,0,0.7), 0 0px 1px #000'}}>
                        {isHindi ? "क्लिक करें विवरण देखने के लिए" : "Click to view details"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project.duration}
                    </span>
                  </div>
                  
                  <h3 className="asn-headline text-xl mb-3 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="asn-body text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/portfolio">
              <Button className="asn-button-secondary">
                {isHindi ? "सभी प्रोजेक्ट्स देखें" : "View All Projects"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            className="bg-background border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Project Image */}
              <div className="relative h-64 overflow-hidden rounded-t-xl">
                <img 
                  src={selectedProject.image} 
                  alt={`${selectedProject.title} - ${selectedProject.category} project detailed view - ASN Creative Agency case study`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EProject Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>

              {/* Project Details */}
              <div className="p-4 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                  <span className="text-sm font-bold text-accent uppercase tracking-wider mb-2 sm:mb-0">
                    {selectedProject.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {selectedProject.duration}
                  </span>
                </div>

                <h2 className="asn-headline text-xl sm:text-2xl mb-4 text-foreground">
                  {selectedProject.title}
                </h2>

                <p className="asn-body text-muted-foreground mb-6">
                  {selectedProject.description}
                </p>

                {/* Key Results */}
                <div className="mb-6">
                  <h3 className="asn-headline text-lg mb-3 text-foreground">
                    {isHindi ? "मुख्य परिणाम" : "Key Results"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedProject.results.map((result, index) => (
                      <div key={index} className="bg-surface border border-border rounded-lg p-3 text-center">
                        <p className="asn-body text-sm font-semibold text-foreground">
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="asn-headline text-lg mb-3 text-foreground">
                    {isHindi ? "प्रयुक्त तकनीकें" : "Technologies Used"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="asn-button-primary flex-1"
                    onClick={() => {
                      setIsModalOpen(false);
                      // Navigate to contact page with project info
                      window.location.href = `/contact?project=${encodeURIComponent(selectedProject.title)}&category=${encodeURIComponent(selectedProject.category)}`;
                    }}
                  >
                    {isHindi ? "इसी तरह का प्रोजेक्ट शुरू करें" : "Start Similar Project"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setIsModalOpen(false);
                      // Navigate to portfolio page for more details
                      window.location.href = `/portfolio?project=${encodeURIComponent(selectedProject.title)}`;
                    }}
                  >
                    {isHindi ? "और जानकारी" : "Learn More"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <SectionDivider />

      {/* CTA Section */}
      <motion.section className="asn-section bg-foreground text-background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
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
              href="https://www.instagram.com/advanced_solutions_network/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-background/80 hover:text-background transition-colors underline text-sm"
            >
              {isHindi ? "Instagram फॉलो करें" : "Follow on Instagram"}
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;
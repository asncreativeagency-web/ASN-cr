import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Clock, 
  Award, 
  Briefcase, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  ChevronDown,
  ChevronUp,
  Upload,
  Send,
  Star,
  Heart,
  Zap,
  Target,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface CareersProps {
  language: string;
}

interface InternshipOpening {
  id: string;
  title: string;
  responsibilities: string[];
  requirements: string[];
  duration: string;
  location: string;
  type: "remote" | "hybrid" | "onsite";
}

const Careers = ({ language }: CareersProps) => {
  const isHindi = language === "hi";
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const internshipOpenings: InternshipOpening[] = [
    {
      id: "web-dev",
      title: isHindi ? "वेब डेवलपमेंट इंटर्न" : "Web Development Intern",
      responsibilities: [
        isHindi ? "React और TypeScript का उपयोग करके वेब एप्लिकेशन विकसित करें" : "Develop web applications using React and TypeScript",
        isHindi ? "UI/UX डिज़ाइन के साथ काम करें" : "Work with UI/UX designs",
        isHindi ? "कोड रिव्यू और टेस्टिंग में भाग लें" : "Participate in code reviews and testing",
        isHindi ? "क्लाइंट प्रोजेक्ट्स पर सहयोग करें" : "Collaborate on client projects"
      ],
      requirements: [
        isHindi ? "JavaScript/TypeScript में मजबूत नींव" : "Strong foundation in JavaScript/TypeScript",
        isHindi ? "React या समान फ्रंटएंड फ्रेमवर्क का ज्ञान" : "Knowledge of React or similar frontend frameworks",
        isHindi ? "HTML, CSS, और Git का अनुभव" : "Experience with HTML, CSS, and Git",
        isHindi ? "समस्या-समाधान और टीमवर्क कौशल" : "Problem-solving and teamwork skills"
      ],
      duration: isHindi ? "3-6 महीने" : "3-6 months",
      location: isHindi ? "हैदराबाद, भारत" : "Hyderabad, India",
      type: "hybrid"
    },
    {
      id: "digital-marketing",
      title: isHindi ? "डिजिटल मार्केटिंग इंटर्न" : "Digital Marketing Intern",
      responsibilities: [
        isHindi ? "सोशल मीडिया मार्केटिंग अभियान बनाएं और प्रबंधित करें" : "Create and manage social media marketing campaigns",
        isHindi ? "SEO और PPC रणनीतियों में सहायता करें" : "Assist with SEO and PPC strategies",
        isHindi ? "कंटेंट क्रिएशन और कंटेंट कैलेंडर में योगदान दें" : "Contribute to content creation and content calendar",
        isHindi ? "मार्केटिंग एनालिटिक्स और रिपोर्टिंग" : "Marketing analytics and reporting"
      ],
      requirements: [
        isHindi ? "मार्केटिंग या संबंधित क्षेत्र में पढ़ाई" : "Studying marketing or related field",
        isHindi ? "सोशल मीडिया प्लेटफॉर्म्स का ज्ञान" : "Knowledge of social media platforms",
        isHindi ? "क्रिएटिव थिंकिंग और कम्युनिकेशन स्किल्स" : "Creative thinking and communication skills",
        isHindi ? "Google Analytics और Ads का बुनियादी ज्ञान" : "Basic knowledge of Google Analytics and Ads"
      ],
      duration: isHindi ? "3-6 महीने" : "3-6 months",
      location: isHindi ? "हैदराबाद, भारत" : "Hyderabad, India",
      type: "hybrid"
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: isHindi ? "लचीले घंटे" : "Flexible Hours",
      description: isHindi ? "अपनी पढ़ाई के साथ काम को संतुलित करें" : "Balance work with your studies"
    },
    {
      icon: Users,
      title: isHindi ? "मेंटरशिप" : "Mentorship",
      description: isHindi ? "अनुभवी पेशेवरों से सीखें" : "Learn from experienced professionals"
    },
    {
      icon: Briefcase,
      title: isHindi ? "वास्तविक प्रोजेक्ट्स" : "Real Projects",
      description: isHindi ? "वास्तविक क्लाइंट प्रोजेक्ट्स पर काम करें" : "Work on real client projects"
    },
    {
      icon: Award,
      title: isHindi ? "प्रमाणपत्र" : "Certificate",
      description: isHindi ? "इंटर्नशिप पूरा होने पर प्रमाणपत्र" : "Certificate upon completion"
    },
    {
      icon: Star,
      title: isHindi ? "LinkedIn सिफारिश" : "LinkedIn Recommendation",
      description: isHindi ? "पेशेवर प्रोफाइल के लिए सिफारिश" : "Recommendation for professional profile"
    },
    {
      icon: Target,
      title: isHindi ? "पूर्णकालिक अवसर" : "Full-time Opportunity",
      description: isHindi ? "भविष्य में पूर्णकालिक भूमिका की संभावना" : "Potential for full-time role in future"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: isHindi ? "पूर्व वेब डेवलपमेंट इंटर्न" : "Former Web Development Intern",
      quote: isHindi 
        ? "ASN में मेरी इंटर्नशिप ने मुझे वास्तविक प्रोजेक्ट्स पर काम करने का मौका दिया। टीम बहुत सहायक थी और मैंने बहुत कुछ सीखा।"
        : "My internship at ASN gave me the opportunity to work on real projects. The team was very helpful and I learned so much.",
      image: "/placeholder-avatar.jpg"
    },
    {
      name: "Rahul Kumar",
      role: isHindi ? "पूर्व डिजिटल मार्केटिंग इंटर्न" : "Former Digital Marketing Intern",
      quote: isHindi
        ? "ASN में मैंने न केवल डिजिटल मार्केटिंग के बारे में सीखा, बल्कि क्लाइंट के साथ काम करने का भी अनुभव प्राप्त किया।"
        : "At ASN, I not only learned about digital marketing but also gained experience working with clients.",
      image: "/placeholder-avatar.jpg"
    }
  ];

  const faqs = [
    {
      question: isHindi ? "क्या इंटर्नशिप पेड है?" : "Are the internships paid?",
      answer: isHindi 
        ? "हमारी इंटर्नशिप स्टाइपेंड के साथ आती हैं। विवरण के लिए हमसे संपर्क करें।"
        : "Our internships come with stipends. Contact us for details."
    },
    {
      question: isHindi ? "क्या मैं रिमोट से इंटर्नशिप कर सकता हूं?" : "Can I do the internship remotely?",
      answer: isHindi
        ? "हां, हम हाइब्रिड और रिमोट विकल्प प्रदान करते हैं।"
        : "Yes, we offer hybrid and remote options."
    },
    {
      question: isHindi ? "इंटर्नशिप की अवधि क्या है?" : "What is the duration of the internship?",
      answer: isHindi
        ? "इंटर्नशिप 3-6 महीने की होती है, आपकी उपलब्धता के अनुसार।"
        : "Internships are 3-6 months, depending on your availability."
    },
    {
      question: isHindi ? "क्या मुझे पूर्णकालिक नौकरी मिल सकती है?" : "Can I get a full-time job?",
      answer: isHindi
        ? "हां, उत्कृष्ट प्रदर्शन के साथ पूर्णकालिक भूमिका की संभावना है।"
        : "Yes, there's potential for a full-time role with excellent performance."
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: null
    });
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-foreground text-background py-20 lg:py-32 overflow-hidden">
        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="asn-headline text-4xl md:text-6xl lg:text-7xl mb-6">
              {isHindi 
                ? "ASN Creative Agency में इंटर्न के रूप में शामिल हों और अपना डिजिटल करियर शुरू करें!"
                : "Join ASN Creative Agency as an Intern and kickstart your digital career!"
              }
            </h1>
            <p className="asn-body text-xl md:text-2xl text-background/80 mb-8 max-w-3xl mx-auto">
              {isHindi
                ? "वास्तविक प्रोजेक्ट्स, रचनात्मक स्वतंत्रता, और एक वैश्विक रूप से मान्यता प्राप्त एजेंसी में मेंटरशिप का अनुभव करें।"
                : "Experience real projects, creative freedom, and mentorship in a globally recognized agency."
              }
            </p>
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6"
              onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {isHindi ? "उपलब्ध पदों को देखें" : "View Available Positions"}
            </Button>
          </motion.div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-background/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
        </div>
      </section>

      {/* About ASN & Culture */}
      <section className="py-20 bg-background">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "ASN के बारे में" : "About ASN"}
            </h2>
            <p className="asn-body text-lg text-muted-foreground max-w-3xl mx-auto">
              {isHindi
                ? "ASN Creative Agency एक वैश्विक रचनात्मक एजेंसी है जो डिजिटल नवाचार और रचनात्मक उत्कृष्टता में विश्वास करती है। हमारी टीम विविध, समावेशी और सीखने के लिए तैयार है।"
                : "ASN Creative Agency is a global creative agency that believes in digital innovation and creative excellence. Our team is diverse, inclusive, and driven to learn."
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-background" />
              </div>
              <h3 className="asn-headline text-xl mb-2">
                {isHindi ? "समावेशी संस्कृति" : "Inclusive Culture"}
              </h3>
              <p className="asn-body text-muted-foreground">
                {isHindi ? "हर कोई स्वागत योग्य है" : "Everyone is welcome here"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-background" />
              </div>
              <h3 className="asn-headline text-xl mb-2">
                {isHindi ? "रचनात्मक स्वतंत्रता" : "Creative Freedom"}
              </h3>
              <p className="asn-body text-muted-foreground">
                {isHindi ? "अपने विचारों को व्यक्त करें" : "Express your ideas freely"}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-background" />
              </div>
              <h3 className="asn-headline text-xl mb-2">
                {isHindi ? "निरंतर सीखना" : "Continuous Learning"}
              </h3>
              <p className="asn-body text-muted-foreground">
                {isHindi ? "हमेशा नई चीजें सीखें" : "Always learning new things"}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-20 bg-muted/30">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "लाभ और सुविधाएं" : "Benefits & Perks"}
            </h2>
            <p className="asn-body text-lg text-muted-foreground max-w-3xl mx-auto">
              {isHindi
                ? "हमारे इंटर्नशिप कार्यक्रम के साथ आने वाले विशेष लाभ देखें"
                : "Discover the special benefits that come with our internship program"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 hover:border-foreground transition-colors">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-background" />
                    </div>
                    <CardTitle className="asn-headline text-xl">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="asn-body text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "हमारे इंटर्न क्या कहते हैं" : "What Our Interns Say"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-muted rounded-full mr-4 flex items-center justify-center">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="asn-headline font-semibold">{testimonial.name}</h4>
                        <p className="asn-body text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="asn-body text-muted-foreground italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Internship Openings */}
      <section id="openings" className="py-20 bg-muted/30">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "वर्तमान इंटर्नशिप पद" : "Current Internship Openings"}
            </h2>
            <p className="asn-body text-lg text-muted-foreground max-w-3xl mx-auto">
              {isHindi
                ? "हमारे वर्तमान इंटर्नशिप अवसरों को देखें और अपने सपनों की भूमिका के लिए आवेदन करें"
                : "Browse our current internship opportunities and apply for your dream role"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {internshipOpenings.map((opening, index) => (
              <motion.div
                key={opening.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 hover:border-foreground transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <CardTitle className="asn-headline text-2xl">{opening.title}</CardTitle>
                      <Badge variant={opening.type === "remote" ? "secondary" : "default"}>
                        {opening.type === "remote" ? "Remote" : opening.type === "hybrid" ? "Hybrid" : "On-site"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="mr-4">{opening.duration}</span>
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{opening.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="asn-headline font-semibold mb-3">
                        {isHindi ? "जिम्मेदारियां" : "Responsibilities"}
                      </h4>
                      <ul className="space-y-2">
                        {opening.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-foreground rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="asn-body text-muted-foreground">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="asn-headline font-semibold mb-3">
                        {isHindi ? "आवश्यकताएं" : "Requirements"}
                      </h4>
                      <ul className="space-y-2">
                        {opening.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-foreground rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="asn-body text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => {
                        setSelectedRole(opening.id);
                        document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {isHindi ? "अभी आवेदन करें" : "Apply Now"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-background">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "आवेदन प्रक्रिया" : "Application Process"}
            </h2>
            <p className="asn-body text-lg text-muted-foreground max-w-3xl mx-auto">
              {isHindi
                ? "हमारी सरल और पारदर्शी आवेदन प्रक्रिया के बारे में जानें"
                : "Learn about our simple and transparent application process"
              }
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: isHindi ? "आवेदन जमा करें" : "Submit Application",
                description: isHindi ? "फॉर्म भरें और अपना रिज्यूमे अपलोड करें" : "Fill out the form and upload your resume"
              },
              {
                step: "2",
                title: isHindi ? "समीक्षा" : "Review",
                description: isHindi ? "हमारी टीम आपके आवेदन की समीक्षा करेगी" : "Our team will review your application"
              },
              {
                step: "3",
                title: isHindi ? "साक्षात्कार" : "Interview",
                description: isHindi ? "सफल आवेदकों के साथ साक्षात्कार" : "Interview with successful applicants"
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="asn-headline text-2xl text-background">{process.step}</span>
                </div>
                <h3 className="asn-headline text-xl mb-2">{process.title}</h3>
                <p className="asn-body text-muted-foreground">{process.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="asn-body text-muted-foreground">
              {isHindi
                ? "हम आवेदन जमा होने के दो सप्ताह के भीतर आपसे संपर्क करेंगे"
                : "We'll get back to you within two weeks after submission"
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={`item-${index}`} className="border-2 rounded-lg mb-4">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="asn-headline text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="asn-body text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-background">
        <div className="asn-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="asn-headline text-3xl md:text-4xl mb-6">
              {isHindi ? "आवेदन फॉर्म" : "Application Form"}
            </h2>
            <p className="asn-body text-lg text-muted-foreground max-w-3xl mx-auto">
              {isHindi
                ? "अपना इंटर्नशिप आवेदन जमा करें और ASN टीम का हिस्सा बनें"
                : "Submit your internship application and become part of the ASN team"
              }
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2">
              <CardContent className="p-8">
                {showSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="asn-headline text-2xl mb-2 text-green-600">
                      {isHindi ? "आवेदन सफलतापूर्वक जमा!" : "Application Submitted Successfully!"}
                    </h3>
                    <p className="asn-body text-muted-foreground">
                      {isHindi
                        ? "हम जल्द ही आपसे संपर्क करेंगे"
                        : "We'll get back to you soon"
                      }
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="asn-body font-medium mb-2 block">
                          {isHindi ? "पूरा नाम" : "Full Name"} *
                        </label>
                        <Input
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={isHindi ? "अपना पूरा नाम दर्ज करें" : "Enter your full name"}
                        />
                      </div>
                      
                      <div>
                        <label className="asn-body font-medium mb-2 block">
                          {isHindi ? "ईमेल" : "Email"} *
                        </label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={isHindi ? "अपना ईमेल दर्ज करें" : "Enter your email"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="asn-body font-medium mb-2 block">
                        {isHindi ? "फोन नंबर" : "Phone Number"} ({isHindi ? "वैकल्पिक" : "Optional"})
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={isHindi ? "अपना फोन नंबर दर्ज करें" : "Enter your phone number"}
                      />
                    </div>

                    <div>
                      <label className="asn-body font-medium mb-2 block">
                        {isHindi ? "इंटर्नशिप भूमिका" : "Internship Role"} *
                      </label>
                      <Select
                        required
                        value={selectedRole}
                        onValueChange={setSelectedRole}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isHindi ? "एक भूमिका चुनें" : "Choose a role"} />
                        </SelectTrigger>
                        <SelectContent>
                          {internshipOpenings.map((opening) => (
                            <SelectItem key={opening.id} value={opening.id}>
                              {opening.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="asn-body font-medium mb-2 block">
                        {isHindi ? "रिज्यूमे अपलोड करें" : "Upload Resume"} *
                      </label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                          required
                        />
                        <label htmlFor="resume-upload" className="cursor-pointer">
                          <span className="asn-body text-muted-foreground">
                            {formData.resume 
                              ? formData.resume.name 
                              : isHindi 
                                ? "PDF या DOC फाइल चुनें" 
                                : "Choose PDF or DOC file"
                            }
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="asn-body font-medium mb-2 block">
                        {isHindi ? "कवर लेटर" : "Cover Letter"} *
                      </label>
                      <Textarea
                        required
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        placeholder={
                          isHindi 
                            ? "आप ASN में इंटर्नशिप क्यों करना चाहते हैं? अपने लक्ष्यों और आकांक्षाओं के बारे में बताएं।"
                            : "Why do you want to intern at ASN? Tell us about your goals and aspirations."
                        }
                        rows={5}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-foreground text-background hover:bg-foreground/90 py-6 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-background mr-2"></div>
                          {isHindi ? "जमा हो रहा है..." : "Submitting..."}
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-5 h-5 mr-2" />
                          {isHindi ? "आवेदन जमा करें" : "Submit Application"}
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers; 
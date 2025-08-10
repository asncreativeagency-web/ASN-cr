import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
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
  TrendingUp,
  Sparkles,
  Rocket,
  GraduationCap,
  Coffee,
  Wifi,
  Calendar,
  DollarSign,
  Shield,
  Globe2,
  Palette,
  Code,
  Camera,
  ClipboardList,
  FileText,
  Search,
  HelpCircle
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
    resume: null as File | null,
    positionApplied: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [resumeUploadStatus, setResumeUploadStatus] = useState<string>("");
  const [showDatabaseError, setShowDatabaseError] = useState(false);
  const [databaseErrorMessage, setDatabaseErrorMessage] = useState("");

  // Enhanced data arrays
  const benefits = [
    {
      icon: Coffee,
      title: isHindi ? "फ्री कॉफी और स्नैक्स" : "Free Coffee & Snacks",
      description: isHindi ? "हमारे कार्यालय में 24/7 कॉफी और स्वादिष्ट स्नैक्स" : "24/7 coffee and delicious snacks in our office"
    },
    {
      icon: Wifi,
      title: isHindi ? "फ्लेक्सिबल वर्किंग" : "Flexible Working",
      description: isHindi ? "हाइब्रिड और रिमोट वर्किंग विकल्प" : "Hybrid and remote working options"
    },
    {
      icon: Calendar,
      title: isHindi ? "पेड टाइम ऑफ" : "Paid Time Off",
      description: isHindi ? "20 दिन का पेड वार्षिक अवकाश" : "20 days of paid annual leave"
    },
    {
      icon: DollarSign,
      title: isHindi ? "कॉम्पिटिटिव सैलरी" : "Competitive Salary",
      description: isHindi ? "उद्योग मानकों के अनुसार प्रतिस्पर्धी वेतन" : "Competitive salary according to industry standards"
    },
    {
      icon: Shield,
      title: isHindi ? "हेल्थ इंश्योरेंस" : "Health Insurance",
      description: isHindi ? "पूर्ण स्वास्थ्य बीमा कवरेज" : "Comprehensive health insurance coverage"
    },
    {
      icon: Globe2,
      title: isHindi ? "ग्लोबल नेटवर्क" : "Global Network",
      description: isHindi ? "दुनिया भर के क्लाइंट्स के साथ काम करें" : "Work with clients worldwide"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: isHindi ? "पूर्व वेब डेवलपमेंट इंटर्न" : "Former Web Development Intern",
      quote: isHindi 
        ? "ASN में मेरा इंटर्नशिप मेरे करियर को आकार देने में मदद किया। मुझे वास्तविक प्रोजेक्ट्स पर काम करने का मौका मिला और अब मैं एक सीनियर डेवलपर हूं।"
        : "My internship at ASN helped shape my career. I got to work on real projects and now I'm a senior developer."
    },
    {
      name: "Rahul Patel",
      role: isHindi ? "पूर्व डिजिटल मार्केटिंग इंटर्न" : "Former Digital Marketing Intern",
      quote: isHindi
        ? "ASN की टीम ने मुझे सिखाया कि कैसे रचनात्मक और रणनीतिक सोचें। यह अनुभव अमूल्य था।"
        : "The ASN team taught me how to think creatively and strategically. This experience was invaluable."
    }
  ];

  const faqs = [
    {
      question: isHindi ? "इंटर्नशिप की अवधि क्या है?" : "What is the duration of the internship?",
      answer: isHindi ? "हमारे इंटर्नशिप 3-6 महीने के होते हैं, जो आपकी उपलब्धता और प्रदर्शन के आधार पर बढ़ाए जा सकते हैं।" : "Our internships are 3-6 months long and can be extended based on your availability and performance."
    },
    {
      question: isHindi ? "क्या यह पेड इंटर्नशिप है?" : "Is this a paid internship?",
      answer: isHindi ? "हां, हमारे सभी इंटर्नशिप पेड हैं और उद्योग मानकों के अनुसार प्रतिस्पर्धी वेतन प्रदान करते हैं।" : "Yes, all our internships are paid and offer competitive salaries according to industry standards."
    },
    {
      question: isHindi ? "क्या मैं रिमोट से इंटर्नशिप कर सकता हूं?" : "Can I do the internship remotely?",
      answer: isHindi ? "हां, हम हाइब्रिड और रिमोट वर्किंग विकल्प प्रदान करते हैं। आप अपनी सुविधा के अनुसार चुन सकते हैं।" : "Yes, we offer hybrid and remote working options. You can choose based on your convenience."
    },
    {
      question: isHindi ? "इंटर्नशिप के बाद नौकरी के अवसर क्या हैं?" : "What are the job opportunities after the internship?",
      answer: isHindi ? "हमारे 70% इंटर्न्स को पूर्णकालिक पदों पर रखा जाता है। यह आपके करियर के लिए एक बेहतरीन शुरुआत है।" : "70% of our interns are hired for full-time positions. It's an excellent start to your career."
    }
  ];

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Upload resume file if provided
      let resumeUrl = null;
      let resumeFilename = null;
      
      if (formData.resume) {
        try {
          setResumeUploadStatus("Uploading resume...");
          // First, try to upload to the resumes bucket
          const fileExt = formData.resume.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `resumes/${fileName}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('resumes')
            .upload(filePath, formData.resume);
          
          if (uploadError) {
            // If resumes bucket doesn't exist, try to create it
                          if (uploadError.message.includes('Bucket not found') || uploadError.message.includes('not found')) {
                console.log('Resumes bucket not found, attempting to create...');
                setResumeUploadStatus("Creating storage bucket...");
                
                // Try to create the bucket
                const { error: createError } = await supabase.storage.createBucket('resumes', {
                  public: true,
                  fileSizeLimit: 10485760, // 10MB
                  allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
                });
              
              if (createError) {
                console.warn('Could not create resumes bucket:', createError.message);
                
                // Try to use an existing bucket as fallback
                try {
                  setResumeUploadStatus("Trying fallback storage...");
                  const { data: bucketList } = await supabase.storage.listBuckets();
                  if (bucketList && bucketList.length > 0) {
                    const fallbackBucket = bucketList[0].name;
                    console.log(`Using fallback bucket: ${fallbackBucket}`);
                    setResumeUploadStatus(`Uploading to ${fallbackBucket}...`);
                    
                    const fallbackPath = `job-applications/${fileName}`;
                    const { data: fallbackUpload, error: fallbackError } = await supabase.storage
                      .from(fallbackBucket)
                      .upload(fallbackPath, formData.resume);
                    
                    if (!fallbackError) {
                      const { data: fallbackUrlData } = supabase.storage
                        .from(fallbackBucket)
                        .getPublicUrl(fallbackPath);
                      
                      resumeUrl = fallbackUrlData.publicUrl;
                      resumeFilename = formData.resume.name;
                    }
                  }
                } catch (fallbackError) {
                  console.warn('Fallback bucket upload also failed:', fallbackError);
                }
                
                // Continue without resume upload if all attempts fail
              } else {
                // Retry upload after creating bucket
                const { data: retryUpload, error: retryError } = await supabase.storage
                  .from('resumes')
                  .upload(filePath, formData.resume);
                
                if (retryError) {
                  throw new Error(`Resume upload failed after bucket creation: ${retryError.message}`);
                }
                
                // Get public URL for the uploaded file
                const { data: urlData } = supabase.storage
                  .from('resumes')
                  .getPublicUrl(filePath);
                
                resumeUrl = urlData.publicUrl;
                resumeFilename = formData.resume.name;
              }
            } else {
              throw new Error(`Resume upload failed: ${uploadError.message}`);
            }
          } else {
            // Get public URL for the uploaded file
            const { data: urlData } = supabase.storage
              .from('resumes')
              .getPublicUrl(filePath);
            
            resumeUrl = urlData.publicUrl;
            resumeFilename = formData.resume.name;
          }
        } catch (uploadError) {
          console.warn('Resume upload failed, continuing without resume:', uploadError);
          setResumeUploadStatus("Resume upload failed - continuing without resume");
          // Continue without resume upload - user can still submit application
        }
      }
      
      setResumeUploadStatus("Saving application...");
      
      // Log the data being sent for debugging
      const applicationData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        cover_letter: formData.coverLetter,
        resume_url: resumeUrl,
        resume_filename: resumeFilename,
        position_applied: formData.positionApplied || null,
        status: 'pending'
      };
      
      console.log('Attempting to insert application data:', applicationData);
      
      // Insert job application into database
      let insertResult = await supabase
        .from('job_applications')
        .insert(applicationData);
      
      if (insertResult.error) {
        console.error('Supabase insert error details:', insertResult.error);
        
        // Check if it's a table doesn't exist error
        if (insertResult.error.message.includes('relation "job_applications" does not exist') || 
            insertResult.error.message.includes('does not exist') ||
            insertResult.error.message.includes('undefined')) {
          
          console.error('The job_applications table does not exist in your Supabase database.');
          console.error('Please run this SQL in your Supabase SQL editor:');
          console.error(`
            CREATE TABLE IF NOT EXISTS public.job_applications (
              id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
              full_name TEXT NOT NULL,
              email TEXT NOT NULL,
              phone TEXT,
              cover_letter TEXT NOT NULL,
              resume_url TEXT,
              resume_filename TEXT,
              position_applied TEXT,
              status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'shortlisted', 'rejected', 'hired')),
              created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
            );
            
            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_job_applications_email ON public.job_applications(email);
            CREATE INDEX IF NOT EXISTS idx_job_applications_status ON public.job_applications(status);
            CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON public.job_applications(created_at);
            
            -- Enable Row Level Security (RLS)
            ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
            
            -- Create policy for inserting job applications (anyone can apply)
            CREATE POLICY "Allow public to insert job applications" ON public.job_applications
                FOR INSERT WITH CHECK (true);
          `);
          
          setDatabaseErrorMessage(`The job_applications table does not exist. Please run the SQL command shown in the console to create it.`);
          setShowDatabaseError(true);
          throw new Error(`The job_applications table does not exist. Please run the SQL command shown in the console to create it.`);
        } else {
          throw new Error(`Database error: ${insertResult.error.message}`);
        }
      }
      
      const { data, error } = insertResult;
      
      setResumeUploadStatus("Application submitted successfully!");
      // Success - reset form and show success message
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        resume: null,
        positionApplied: ""
      });
      
      setResumeUploadStatus("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Application submission error:', error);
      alert(`Application submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background py-0 lg:py-4 overflow-hidden min-h-screen flex items-center">
        {/* Floating Animated Elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-16 h-16 bg-background/10 rounded-full blur-sm"
        />
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-32 right-20 w-12 h-12 bg-background/10 rounded-full blur-sm"
        />

        <motion.div
          animate={{ 
            y: [0, -10, 0],
            x: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-background/10 rounded-full blur-sm"
        />

        {/* Geometric Shapes */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/3 w-24 h-24 border border-background/20 rounded-full"
        />

        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/4 w-16 h-16 border border-background/20 transform rotate-45"
        />

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Sparkle Icon Animation */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block mb-1"
            >
              <Sparkles className="w-12 h-12 text-background/60 mx-auto" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="asn-headline text-4xl md:text-6xl lg:text-7xl mb-1 leading-tight text-white"
            >
              {isHindi 
                ? "ASN Creative Agency में इंटर्न के रूप में शामिल हों और अपना डिजिटल करियर शुरू करें!"
                : "Join ASN Creative Agency as an Intern and kickstart your digital career!"
              }
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="asn-body text-xl md:text-2xl text-background/80 mb-3 max-w-3xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "वास्तविक प्रोजेक्ट्स, रचनात्मक स्वतंत्रता, और एक वैश्विक रूप से मान्यता प्राप्त एजेंसी में मेंटरशिप का अनुभव करें।"
                : "Experience real projects, creative freedom, and mentorship in a globally recognized agency."
              }
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            >
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6 relative overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <motion.span
                  animate={{ 
                    x: [0, 100, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                {isHindi ? "उपलब्ध पदों को देखें" : "View Available Positions"}
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:60px_60px]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>
      </section>

      {/* About ASN & Culture */}
      <section className="py-20 bg-background relative overflow-hidden">
        {/* Floating Background Elements */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-10 w-32 h-32 border border-muted/20 rounded-full opacity-30"
        />
        
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 left-16 w-24 h-24 bg-gradient-to-br from-muted/20 to-transparent rounded-full opacity-40"
        />

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <Rocket className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "ASN के बारे में" : "About ASN"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "ASN Creative Agency एक वैश्विक रचनात्मक एजेंसी है जो डिजिटल नवाचार और रचनात्मक उत्कृष्टता में विश्वास करती है। हमारी टीम विविध, समावेशी और सीखने के लिए तैयार है।"
                : "ASN Creative Agency is a global creative agency that believes in digital innovation and creative excellence. Our team is diverse, inclusive, and driven to learn."
              }
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Heart,
                title: isHindi ? "समावेशी संस्कृति" : "Inclusive Culture",
                description: isHindi ? "हर कोई स्वागत योग्य है" : "Everyone is welcome here",
                color: "from-red-500/20 to-pink-500/20",
                iconColor: "text-red-600"
              },
              {
                icon: Lightbulb,
                title: isHindi ? "रचनात्मक स्वतंत्रता" : "Creative Freedom",
                description: isHindi ? "अपने विचारों को व्यक्त करें" : "Express your ideas freely",
                color: "from-yellow-500/20 to-orange-500/20",
                iconColor: "text-yellow-600"
              },
              {
                icon: TrendingUp,
                title: isHindi ? "निरंतर सीखना" : "Continuous Learning",
                description: isHindi ? "हमेशा नई चीजें सीखें" : "Always learning new things",
                color: "from-green-500/20 to-blue-500/20",
                iconColor: "text-green-600"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                >
                  <item.icon className={`w-10 h-10 ${item.iconColor}`} />
                </motion.div>
                <h3 className="asn-headline text-xl mb-3 group-hover:text-foreground transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="asn-body text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-20 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 relative overflow-hidden">
        {/* Floating Particles */}
        <motion.div
          animate={{ 
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-1/4 w-3 h-3 bg-foreground/20 rounded-full"
        />
        
        <motion.div
          animate={{ 
            y: [0, 80, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 right-1/3 w-2 h-2 bg-foreground/20 rounded-full"
        />

        <motion.div
          animate={{ 
            y: [0, -60, 0],
            x: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/2 left-20 w-4 h-4 bg-foreground/20 rounded-full"
        />

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <Award className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "लाभ और सुविधाएं" : "Benefits & Perks"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "हमारे इंटर्नशिप कार्यक्रम के साथ आने वाले विशेष लाभ देखें"
                : "Discover the special benefits that come with our internship program"
              }
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="group"
              >
                <Card className="h-full border-2 hover:border-foreground/50 transition-all duration-300 shadow-lg hover:shadow-2xl bg-background/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-foreground/20 group-hover:to-foreground/10 transition-all duration-300"
                    >
                      <benefit.icon className="w-8 h-8 text-foreground group-hover:text-foreground transition-colors duration-300" />
                    </motion.div>
                    <CardTitle className="asn-headline text-xl group-hover:text-foreground transition-colors duration-300">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="asn-body text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
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
      <section className="py-20 bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
        {/* Floating Quote Marks */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-16 text-8xl text-foreground/5 font-serif"
        >
          "
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-32 right-16 text-8xl text-foreground/5 font-serif"
        >
          "
        </motion.div>

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <Star className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "हमारे इंटर्न क्या कहते हैं" : "What Our Interns Say"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "हमारे पूर्व इंटर्न्स की सफलता की कहानियां सुनें"
                : "Hear success stories from our former interns"
              }
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-2 hover:border-foreground/30 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-background to-muted/5">
                  <CardContent className="p-8">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center mb-6"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-2xl mr-4 flex items-center justify-center group-hover:from-foreground/20 group-hover:to-foreground/10 transition-all duration-300">
                        <Users className="w-8 h-8 text-foreground" />
                      </div>
                      <div>
                        <h4 className="asn-headline font-semibold text-lg group-hover:text-foreground transition-colors duration-300">
                          {testimonial.name}
                        </h4>
                        <p className="asn-body text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.blockquote 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                      viewport={{ once: true }}
                      className="asn-body text-muted-foreground italic text-lg leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 relative"
                    >
                      <span className="text-4xl text-foreground/20 absolute -top-2 -left-2">"</span>
                      {testimonial.quote}
                      <span className="text-4xl text-foreground/20 absolute -bottom-2 -right-2">"</span>
                    </motion.blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Internship Openings */}
      <section id="openings" className="py-20 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 relative overflow-hidden">
        {/* Floating Icons */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-24 right-24 w-20 h-20 bg-foreground/5 rounded-full opacity-40"
        />
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-24 left-24 w-16 h-16 bg-foreground/5 rounded-full opacity-30"
        />

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <Briefcase className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "वर्तमान इंटर्नशिप पद" : "Current Internship Openings"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "हमारे वर्तमान इंटर्नशिप अवसरों को देखें और अपने सपनों की भूमिका के लिए आवेदन करें"
                : "Browse our current internship opportunities and apply for your dream role"
              }
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {internshipOpenings.map((opening, index) => (
              <motion.div
                key={opening.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-2 hover:border-foreground/50 transition-all duration-300 shadow-lg hover:shadow-2xl bg-gradient-to-br from-background to-muted/5 overflow-hidden">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        <CardTitle className="asn-headline text-2xl group-hover:text-foreground transition-colors duration-300">
                          {opening.title}
                        </CardTitle>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge 
                          variant={opening.type === "remote" ? "secondary" : "default"}
                          className="text-sm px-3 py-1 font-medium shadow-md"
                        >
                          {opening.type === "remote" ? "Remote" : opening.type === "hybrid" ? "Hybrid" : "On-site"}
                        </Badge>
                      </motion.div>
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center text-sm text-muted-foreground mb-6 space-x-6"
                    >
                      <div className="flex items-center group-hover:text-foreground/80 transition-colors duration-300">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{opening.duration}</span>
                      </div>
                      <div className="flex items-center group-hover:text-foreground/80 transition-colors duration-300">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{opening.location}</span>
                      </div>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="asn-headline font-semibold mb-4 text-lg flex items-center">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                        {isHindi ? "जिम्मेदारियां" : "Responsibilities"}
                      </h4>
                      <ul className="space-y-3">
                        {opening.responsibilities.map((resp, idx) => (
                          <motion.li 
                            key={idx} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + 0.7 + idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start group/item"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.2 }}
                              className="w-3 h-3 bg-gradient-to-r from-foreground/60 to-foreground/40 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:from-foreground group-hover/item:to-foreground transition-all duration-300"
                            ></motion.div>
                            <span className="asn-body text-muted-foreground group-hover/item:text-foreground/80 transition-colors duration-300 leading-relaxed">
                              {resp}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="asn-headline font-semibold mb-4 text-lg flex items-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3 flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </motion.div>
                        {isHindi ? "आवश्यकताएं" : "Requirements"}
                      </h4>
                      <ul className="space-y-3">
                        {opening.requirements.map((req, idx) => (
                          <motion.li 
                            key={idx} 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.2 + 0.9 + idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start group/item"
                          >
                            <motion.div 
                              whileHover={{ scale: 1.2 }}
                              className="w-3 h-3 bg-gradient-to-r from-foreground/60 to-foreground/40 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:from-foreground group-hover/item:to-foreground transition-all duration-300"
                            ></motion.div>
                            <span className="asn-body text-muted-foreground group-hover/item:text-foreground/80 transition-colors duration-300 leading-relaxed">
                              {req}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 1.0 }}
                      viewport={{ once: true }}
                    >
                      <Button 
                        className="w-full bg-gradient-to-r from-foreground to-foreground/90 text-background hover:from-foreground/90 hover:to-foreground transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg py-6 relative overflow-hidden group/btn"
                        onClick={() => {
                          setSelectedRole(opening.id);
                          document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <motion.span
                          animate={{ 
                            x: [0, 100, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                        <span className="relative z-10 flex items-center justify-center">
                          {isHindi ? "अभी आवेदन करें" : "Apply Now"}
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="ml-2"
                          >
                            →
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
        {/* Floating Process Icons */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-24 h-24 bg-foreground/5 rounded-full opacity-30"
        />
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, -25, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-20 h-20 bg-foreground/5 rounded-full opacity-40"
        />

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <ClipboardList className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "आवेदन प्रक्रिया" : "Application Process"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "हमारी सरल और पारदर्शी आवेदन प्रक्रिया के माध्यम से अपनी यात्रा शुरू करें"
                : "Start your journey through our simple and transparent application process"
              }
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: isHindi ? "आवेदन जमा करें" : "Submit Application",
                description: isHindi ? "फॉर्म भरें और अपना रिज्यूमे अपलोड करें" : "Fill out the form and upload your resume",
                icon: FileText,
                color: "from-blue-500/20 to-purple-500/20",
                iconColor: "text-blue-600"
              },
              {
                step: "2",
                title: isHindi ? "समीक्षा" : "Review",
                description: isHindi ? "हमारी टीम आपके आवेदन की समीक्षा करेगी" : "Our team will review your application",
                icon: Search,
                color: "from-green-500/20 to-blue-500/20",
                iconColor: "text-green-600"
              },
              {
                step: "3",
                title: isHindi ? "साक्षात्कार" : "Interview",
                description: isHindi ? "सफल आवेदकों के साथ साक्षात्कार" : "Interview with successful applicants",
                icon: Users,
                color: "from-orange-500/20 to-red-500/20",
                iconColor: "text-orange-600"
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className={`w-24 h-24 bg-gradient-to-br ${process.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <process.icon className={`w-12 h-12 ${process.iconColor} relative z-10`} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <h3 className="asn-headline text-xl mb-3 group-hover:text-foreground transition-colors duration-300">
                    {process.title}
                  </h3>
                  <p className="asn-body text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                    {process.description}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
                  viewport={{ once: true }}
                  className="mt-4"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-foreground/20 to-foreground/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="asn-headline text-sm text-foreground/70 font-bold">
                      {process.step}
                    </span>
                  </div>
                </motion.div>
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
      <section className="py-20 bg-gradient-to-br from-muted/30 via-muted/20 to-muted/30 relative overflow-hidden">
        {/* Floating Question Marks */}
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 left-16 text-6xl text-foreground/5 font-serif"
        >
          ?
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 25, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-32 right-16 text-6xl text-foreground/5 font-serif"
        >
          ?
        </motion.div>

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <HelpCircle className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "इंटर्नशिप के बारे में आपके सभी प्रश्नों के उत्तर यहां मिलेंगे"
                : "Find answers to all your questions about internships here"
              }
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group"
                >
                  <AccordionItem value={`item-${index}`} className="border-2 hover:border-foreground/30 transition-all duration-300 rounded-xl mb-6 shadow-lg hover:shadow-xl bg-background/80 backdrop-blur-sm">
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
      <section id="application-form" className="py-20 bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
        {/* Floating Form Elements */}
        <motion.div
          animate={{ 
            y: [0, -40, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-28 h-28 bg-foreground/5 rounded-full opacity-30"
        />
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 left-20 w-20 h-20 bg-foreground/5 rounded-full opacity-40"
        />

        <div className="asn-container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <FileText className="w-16 h-16 text-foreground/60 mx-auto" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="asn-headline text-4xl md:text-5xl mb-6"
            >
              {isHindi ? "आवेदन फॉर्म" : "Application Form"}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="asn-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              {isHindi
                ? "अपना इंटर्नशिप आवेदन जमा करें और ASN टीम का हिस्सा बनें"
                : "Submit your internship application and become part of the ASN team"
              }
            </motion.p>
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
                        onValueChange={(value) => {
                          setSelectedRole(value);
                          setFormData({ ...formData, positionApplied: value });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={isHindi ? "एक भूमिका चुनें" : "Choose a role"} />
                        </SelectTrigger>
                        <SelectContent>
                          {internshipOpenings.map((opening) => (
                            <SelectItem key={opening.id} value={opening.title}>
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
                      {resumeUploadStatus && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          {resumeUploadStatus}
                        </div>
                      )}
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
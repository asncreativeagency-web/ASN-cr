import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, MessageSquare, Send, Globe, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactProps {
  language: string;
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userCountry, setUserCountry] = useState("");
  const { toast } = useToast();
  const isHindi = language === "hi";

  useEffect(() => {
    // Auto-detect user country
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setUserCountry(data.country_name || "");
        setFormData(prev => ({ ...prev, country: data.country_name || "" }));
      } catch (error) {
        console.log("Country detection failed");
      }
    };
    detectCountry();
  }, []);

  const services = isHindi ? [
    "वेब डेवलपमेंट",
    "डिजिटल मार्केटिंग",
    "ड्रॉपशिपिंग सेटअप",
    "व्यापार निष्पादन",
    "ब्रांड डेवलपमेंट",
    "SEO सेवाएं",
    "सामाजिक मीडिया मार्केटिंग",
    "ई-कॉमर्स समाधान"
  ] : [
    "Web Development",
    "Digital Marketing",
    "Dropshipping Setup",
    "Business Execution",
    "Brand Development", 
    "SEO Services",
    "Social Media Marketing",
    "E-commerce Solutions"
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Heard Island and McDonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jersey", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "North Macedonia", "Northern Mariana Islands", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico",
    "Qatar",
    "Réunion", "Romania", "Russia", "Rwanda",
    "Saint Barthélemy", "Saint Helena, Ascension and Tristan da Cunha", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten (Dutch part)", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands, British", "Virgin Islands, U.S.",
    "Wallis and Futuna", "Western Sahara",
    "Yemen",
    "Zambia", "Zimbabwe"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: isHindi ? "त्रुटि" : "Error",
        description: isHindi ? "कृपया सभी आवश्यक फ़ील्ड भरें" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.country || null,
            service_type: formData.service || null,
            message: formData.message
          }
        ]);

      if (error) throw error;

      // Success message
      toast({
        title: isHindi ? "संदेश भेजा गया!" : "Message Sent!",
        description: isHindi ? "हम 24 घंटे में आपसे संपर्क करेंगे।" : "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        country: userCountry,
        phone: "",
        service: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: isHindi ? "त्रुटि" : "Error",
        description: isHindi ? "संदेश भेजने में समस्या हुई। कृपया पुनः प्रयास करें।" : "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: isHindi ? "ईमेल" : "Email",
      details: "contact@asncreativeagency.com",
      action: "mailto:contact@asncreativeagency.com"
    },
    {
      icon: Phone,
      title: isHindi ? "फोन" : "Phone",
      details: "+91 93816 17904",
      action: "tel:+919381617904"
    },
    {
  icon: MessageSquare,
  title: "WhatsApp",
  details: "+91 93816 17904",
  action: "https://wa.me/919381617904?text=Hello%21%20I%27m%20interested%20in%20your%20digital%20services.%20Can%20we%20discuss%20my%20project%3F"
},

    {
      icon: Instagram,
      title: "Instagram",
      details: "@asncreativeagency",
      action: "https://www.instagram.com/asncreativeagency/"
    },
    {
      icon: MapPin,
      title: isHindi ? "पता" : "Address",
      details: "ASN Agency, Balaji Nagar, Hyderabad, India - 500087",
      action: null
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="asn-section bg-background">
        <div className="asn-container text-center space-y-6">
          <h1 className="asn-headline text-4xl md:text-6xl">
            {isHindi ? "संपर्क करें" : "Get In Touch"}
          </h1>
          <p className="asn-body text-xl text-muted-foreground max-w-3xl mx-auto">
            {isHindi
              ? "आपके डिजिटल साम्राज्य की शुरुआत एक बातचीत से होती है। आज ही हमसे जुड़ें।"
              : "Your digital empire starts with a conversation. Let's connect and make it happen."
            }
          </p>
          {userCountry && (
            <p className="asn-body text-muted-foreground flex items-center justify-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>
                {isHindi 
                  ? `${userCountry} से स्वागत है - हम आपकी सेवा के लिए तैयार हैं`
                  : `Greetings from ${userCountry} - We're ready to serve you globally`
                }
              </span>
            </p>
          )}
        </div>
      </section>

      <div className="asn-container asn-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="asn-headline text-2xl">
                  {isHindi ? "आइए बात करते हैं" : "Let's Start a Conversation"}
                </CardTitle>
                <p className="asn-body text-muted-foreground">
                  {isHindi
                    ? "अपने प्रोजेक्ट के बारे में बताएं और हम आपको सर्वोत्तम समाधान प्रदान करेंगे।"
                    : "Tell us about your project and we'll provide you with the best solution."
                  }
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="asn-body text-sm font-bold">
                        {isHindi ? "पूरा नाम *" : "Full Name *"}
                      </label>
                      <Input
                        placeholder={isHindi ? "आपका नाम दर्ज करें" : "Enter your name"}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="asn-body text-sm font-bold">
                        {isHindi ? "ईमेल पता *" : "Email Address *"}
                      </label>
                      <Input
                        type="email"
                        placeholder={isHindi ? "आपका ईमेल दर्ज करें" : "Enter your email"}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="asn-body text-sm font-bold">
                        {isHindi ? "देश" : "Country"}
                      </label>
                      <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder={isHindi ? "एक देश चुनें" : "Select a country"} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="asn-body text-sm font-bold">
                        {isHindi ? "फोन नंबर" : "Phone Number"}
                      </label>
                      <Input
                        type="tel"
                        placeholder={isHindi ? "आपका फोन नंबर दर्ज करें" : "Enter your phone number"}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="asn-body text-sm font-bold">
                      {isHindi ? "आवश्यक सेवा" : "Service Needed"}
                    </label>
                    <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder={isHindi ? "एक सेवा चुनें" : "Select a service"} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="asn-body text-sm font-bold">
                      {isHindi ? "संदेश *" : "Message *"}
                    </label>
                    <Textarea
                      placeholder={isHindi ? "अपने प्रोजेक्ट के बारे में विस्तार से बताएं..." : "Tell us about your project in detail..."}
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full asn-button-primary group"
                    disabled={isSubmitting}
                  >
                    <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    {isSubmitting 
                      ? (isHindi ? "भेजा जा रहा है..." : "Sending...") 
                      : (isHindi ? "संदेश भेजें" : "Send Message")
                    }
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="asn-headline text-xl">
                  {isHindi ? "संपर्क जानकारी" : "Contact Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <info.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="asn-headline text-sm">{info.title}</h3>
                      {info.action ? (
                        <a 
                          href={info.action}
                          className="asn-body text-muted-foreground hover:text-foreground transition-colors asn-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="asn-body text-muted-foreground">{info.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Call Booking */}
            <Card className="border-border bg-foreground text-background">
              <CardHeader>
                <CardTitle className="asn-headline text-xl text-background">
                  {isHindi ? "तुरंत कॉल बुक करें" : "Book a Quick Call"}
                </CardTitle>
                <p className="asn-body text-background/80">
                  {isHindi
                    ? "15 मिनट की निःशुल्क परामर्श कॉल के लिए अपना समय चुनें।"
                    : "Schedule a free 15-minute consultation call at your convenience."
                  }
                </p>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://calendly.com/asncreativeagency" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button className="w-full bg-background text-foreground hover:bg-background/90">
                    {isHindi ? "कॉल शेड्यूल करें" : "Schedule Call"}
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="asn-headline text-xl">
                  {isHindi ? "व्यापारिक घंटे" : "Business Hours"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="asn-body text-muted-foreground">
                    {isHindi ? "सोमवार - शुक्रवार" : "Monday - Friday"}
                  </span>
                  <span className="asn-body font-bold">9:00 AM - 7:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="asn-body text-muted-foreground">
                    {isHindi ? "शनिवार" : "Saturday"}
                  </span>
                  <span className="asn-body font-bold">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="asn-body text-muted-foreground">
                    {isHindi ? "रविवार" : "Sunday"}
                  </span>
                  <span className="asn-body font-bold">
                    {isHindi ? "बंद" : "Closed"}
                  </span>
                </div>
                <p className="asn-body text-xs text-muted-foreground pt-2">
                  {isHindi
                    ? "आपातकालीन सहायता 24/7 उपलब्ध है"
                    : "Emergency support available 24/7"
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="asn-section bg-surface">
        <div className="asn-container text-center space-y-8">
          <h2 className="asn-headline text-3xl md:text-4xl">
            {isHindi ? "आज ही अपना डिजिटल रूपांतरण शुरू करें" : "Start Your Digital Transformation Today"}
          </h2>
          <p className="asn-body text-lg text-muted-foreground max-w-2xl mx-auto">
            {isHindi
              ? "हमारी विशेषज्ञ टीम आपके साथ मिलकर आपके व्यापार को डिजिटल दुनिया में सफल बनाने के लिए तैयार है।"
              : "Our expert team is ready to work with you to make your business successful in the digital world."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919381617904?text=Hello%21%20I%27m%20interested%20in%20your%20digital%20services.%20Can%20we%20discuss%20my%20project%3F" target="_blank" rel="noopener noreferrer">
              <Button className="asn-button-primary">
                <MessageSquare className="mr-2 h-5 w-5" />
                {isHindi ? "WhatsApp पर चैट करें" : "Chat on WhatsApp"}
              </Button>
            </a>
            <a href="https://www.instagram.com/asncreativeagency/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="asn-button-secondary">
                <Instagram className="mr-2 h-5 w-5" />
                {isHindi ? "Instagram फॉलो करें" : "Follow on Instagram"}
              </Button>
            </a>
            <a href="https://wa.me/919381617904?text=Hi%21%20I%20want%20to%20call%20you%20on%20WhatsApp.%20Are%20you%20available%3F" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="asn-button-secondary">
                <Phone className="mr-2 h-5 w-5" />
                {isHindi ? "WhatsApp पर कॉल करें" : "Call on WhatsApp"}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
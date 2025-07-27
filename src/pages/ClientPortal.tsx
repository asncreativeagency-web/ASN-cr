import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, User, Download, Calendar, MessageCircle, FileText, CheckCircle, Clock, AlertCircle, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from "@supabase/supabase-js";

interface ClientPortalProps {
  language: string;
  user: SupabaseUser | null;
  session: Session | null;
}

const ClientPortal = ({ language, user, session }: ClientPortalProps) => {
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState<any[]>([]);
  const [projectUpdates, setProjectUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const isHindi = language === "hi";

  useEffect(() => {
    // Redirect to auth if not logged in
    if (!user || !session) {
      navigate("/auth");
      return;
    }

    // Fetch user's projects and updates
    fetchProjects();
  }, [user, session, navigate]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (projectsError) throw projectsError;
      setProjects(projectsData || []);

      // Fetch project updates
      const { data: updatesData, error: updatesError } = await supabase
        .from('project_updates')
        .select(`
          *,
          projects!inner(user_id)
        `)
        .eq('projects.user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (updatesError) throw updatesError;
      setProjectUpdates(updatesData || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        variant: "destructive",
        title: isHindi ? "डेटा लोड त्रुटि" : "Data Loading Error",
        description: isHindi ? "प्रोजेक्ट जानकारी लोड नहीं हो सकी" : "Could not load project information",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: isHindi ? "लॉगआउट त्रुटि" : "Logout Error",
        description: error.message,
      });
    } else {
      navigate("/");
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            user_id: user.id,
            sender_type: 'client',
            message: message.trim()
          }
        ]);

      if (error) throw error;

      toast({
        title: isHindi ? "संदेश भेजा गया" : "Message sent",
        description: isHindi ? "हम 24 घंटे में जवाब देंगे" : "We'll respond within 24 hours",
      });
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: isHindi ? "संदेश त्रुटि" : "Message Error",
        description: isHindi ? "संदेश भेजने में समस्या हुई" : "Failed to send message",
      });
    }
  };

  // Mock data when no real projects exist
  const mockProjectUpdates = [
    {
      id: 1,
      title: isHindi ? "वेबसाइट डिज़ाइन पूरी" : "Website Design Complete",
      status: "completed",
      created_at: "2025-01-15",
      description: isHindi ? "होम पेज और लैंडिंग पेज डिज़ाइन अप्रूवल के लिए तैयार" : "Homepage and landing page designs ready for approval"
    },
    {
      id: 2,
      title: isHindi ? "Meta Ads कैंपेन लाइव" : "Meta Ads Campaign Live",
      status: "in_progress",
      created_at: "2025-01-20",
      description: isHindi ? "पहला कैंपेन चल रहा है, प्रारंभिक परिणाम आशाजनक हैं" : "First campaign running, initial results are promising"
    },
    {
      id: 3,
      title: isHindi ? "SEO ऑप्टिमाइज़ेशन" : "SEO Optimization",
      status: "pending",
      created_at: "2025-01-25",
      description: isHindi ? "कीवर्ड रिसर्च और ऑन-पेज ऑप्टिमाइज़ेशन शुरू होगा" : "Keyword research and on-page optimization to begin"
    }
  ];

  const displayUpdates = projectUpdates.length > 0 ? projectUpdates : mockProjectUpdates;

  const downloadableFiles = [
    {
      name: isHindi ? "ब्रांड गाइडलाइन्स.pdf" : "Brand Guidelines.pdf",
      size: "2.3 MB",
      type: "PDF"
    },
    {
      name: isHindi ? "वेबसाइट मॉकअप्स.zip" : "Website Mockups.zip", 
      size: "15.7 MB",
      type: "ZIP"
    },
    {
      name: isHindi ? "सोशल मीडिया ऐसेट्स.zip" : "Social Media Assets.zip",
      size: "8.2 MB", 
      type: "ZIP"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return isHindi ? "पूर्ण" : "Completed";
      case "in-progress": 
        return isHindi ? "प्रगति में" : "In Progress";
      case "pending":
        return isHindi ? "लंबित" : "Pending";
      default:
        return status;
    }
  };

  // Show loading or redirect if not authenticated
  if (!user || !session) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-foreground rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-background" />
            </div>
            <CardTitle className="asn-headline text-2xl">
              {isHindi ? "क्लाइंट पोर्टल" : "Client Portal"}
            </CardTitle>
            <p className="asn-body text-muted-foreground">
              {isHindi ? "पहुंच के लिए प्रमाणीकरण आवश्यक है" : "Authentication required for access"}
            </p>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <Link to="/auth">
              <Button className="w-full asn-button-primary">
                {isHindi ? "लॉगिन करें" : "Login"}
              </Button>
            </Link>
            
            <p className="asn-body text-xs text-muted-foreground">
              {isHindi 
                ? "कोई खाता नहीं है? " 
                : "Don't have an account? "
              }
              <Link to="/auth" className="asn-link">
                {isHindi ? "साइनअप करें" : "Sign up"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
      {/* Header */}
      <section className="asn-section bg-surface">
        <div className="asn-container">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="asn-headline text-3xl md:text-4xl">
                {isHindi ? "आपका डैशबोर्ड" : "Your Dashboard"}
              </h1>
              <p className="asn-body text-muted-foreground">
                {isHindi ? `स्वागत है, ${user?.email}! यहाँ आपके प्रोजेक्ट की नवीनतम स्थिति है।` : `Welcome back, ${user?.email}! Here's the latest on your projects.`}
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="asn-button-secondary"
            >
              {isHindi ? "लॉगआउट" : "Logout"}
            </Button>
          </div>
        </div>
      </section>

      <div className="asn-container asn-section">
        {loading ? (
          <div className="text-center py-12">
            <p className="asn-body text-muted-foreground">
              {isHindi ? "लोड हो रहा है..." : "Loading..."}
            </p>
          </div>
        ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Updates */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="asn-headline text-2xl">
              {isHindi ? "प्रोजेक्ट अपडेट्स" : "Project Updates"}
            </h2>
            
            <div className="space-y-4">
              {displayUpdates.length === 0 ? (
                <Card className="border-border">
                  <CardContent className="p-6 text-center">
                    <p className="asn-body text-muted-foreground">
                      {isHindi ? "अभी तक कोई प्रोजेक्ट अपडेट नहीं है" : "No project updates yet"}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                displayUpdates.map((update) => (
                  <Card key={update.id} className="border-border">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-3">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          {getStatusIcon(update.status)}
                          <h3 className="text-responsive font-semibold truncate">{update.title}</h3>
                        </div>
                        <Badge variant="outline" className="self-start sm:self-center whitespace-nowrap">
                          {getStatusText(update.status)}
                        </Badge>
                      </div>
                      <p className="text-responsive text-muted-foreground mb-3 break-words leading-relaxed">
                        {update.description}
                      </p>
                      <p className="text-xs text-muted-foreground font-bold">
                        {new Date(update.created_at || update.date).toLocaleDateString(isHindi ? 'hi-IN' : 'en-US')}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Downloadable Files */}
            <Card>
              <CardHeader>
                <CardTitle className="asn-headline flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>{isHindi ? "डाउनलोड फाइलें" : "Downloads"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {downloadableFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-responsive font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="asn-headline">
                  {isHindi ? "त्वरित कार्य" : "Quick Actions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full asn-button-secondary justify-start text-left">
                  <Calendar className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{isHindi ? "मीटिंग शेड्यूल करें" : "Schedule Meeting"}</span>
                </Button>
                <Button className="w-full asn-button-secondary justify-start text-left">
                  <User className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{isHindi ? "अकाउंट मैनेजर से बात करें" : "Contact Account Manager"}</span>
                </Button>
                <a href="https://www.instagram.com/asncreativeagency/" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Instagram className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{isHindi ? "Instagram फॉलो करें" : "Follow on Instagram"}</span>
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle className="asn-headline flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>{isHindi ? "सहायता संदेश" : "Support Message"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={isHindi ? "आपका संदेश लिखें..." : "Type your message..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="w-full asn-button-primary"
                  disabled={!message.trim()}
                >
                  {isHindi ? "संदेश भेजें" : "Send Message"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

interface AuthProps {
  language: string;
}

const Auth = ({ language }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { toast } = useToast();
  const navigate = useNavigate();
  const isHindi = language === "hi";

  useEffect(() => {
    // Check if user is already authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: isHindi ? "लॉगिन त्रुटि" : "Login Error",
          description: error.message,
        });
      } else {
        toast({
          title: isHindi ? "सफलतापूर्वक लॉगिन हुआ" : "Login Successful",
          description: isHindi ? "आपका स्वागत है!" : "Welcome back!",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: isHindi ? "त्रुटि" : "Error",
        description: isHindi ? "कुछ गलत हुआ" : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: isHindi ? "पासवर्ड मेल नहीं खाते" : "Passwords don't match",
        description: isHindi ? "कृपया सुनिश्चित करें कि दोनों पासवर्ड समान हैं" : "Please ensure both passwords are the same",
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            variant: "destructive",
            title: isHindi ? "खाता पहले से मौजूद है" : "Account Already Exists",
            description: isHindi ? "कृपया लॉगिन करें" : "Please login instead",
          });
        } else {
          toast({
            variant: "destructive",
            title: isHindi ? "साइनअप त्रुटि" : "Signup Error",
            description: error.message,
          });
        }
      } else {
        toast({
          title: isHindi ? "साइनअप सफल" : "Signup Successful",
          description: isHindi ? "कृपया अपना ईमेल चेक करें" : "Please check your email for verification",
        });
        setActiveTab("login");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: isHindi ? "त्रुटि" : "Error",
        description: isHindi ? "कुछ गलत हुआ" : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {isHindi ? "होम पर वापस जाएं" : "Back to Home"}
          </Link>
          <h1 className="text-3xl font-bold">
            {isHindi ? "ASN क्रिएटिव एजेंसी" : "ASN Creative Agency"}
          </h1>
          <p className="text-muted-foreground">
            {isHindi ? "अपने खाते में प्रवेश करें" : "Access your account"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isHindi ? "खाता पहुंच" : "Account Access"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">
                  {isHindi ? "लॉगिन" : "Login"}
                </TabsTrigger>
                <TabsTrigger value="signup">
                  {isHindi ? "साइनअप" : "Sign Up"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {isHindi ? "ईमेल" : "Email"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={isHindi ? "आपका ईमेल दर्ज करें" : "Enter your email"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      {isHindi ? "पासवर्ड" : "Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={isHindi ? "आपका पासवर्ड दर्ज करें" : "Enter your password"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (isHindi ? "लॉगिन हो रहा है..." : "Logging in...") : (isHindi ? "लॉगिन करें" : "Login")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">
                      {isHindi ? "ईमेल" : "Email"}
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={isHindi ? "आपका ईमेल दर्ज करें" : "Enter your email"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">
                      {isHindi ? "पासवर्ड" : "Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={isHindi ? "पासवर्ड बनाएं" : "Create a password"}
                        minLength={6}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      {isHindi ? "पासवर्ड की पुष्टि करें" : "Confirm Password"}
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder={isHindi ? "पासवर्ड दोबारा दर्ज करें" : "Enter password again"}
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (isHindi ? "साइनअप हो रहा है..." : "Signing up...") : (isHindi ? "साइनअप करें" : "Sign Up")}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
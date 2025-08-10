import React, { useState } from 'react';
import CTAAnalysis from '@/components/CTAAnalysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Rocket, 
  Target, 
  Users, 
  TrendingUp,
  Lightbulb,
  Zap
} from 'lucide-react';

const CTADemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ecommerce');

  const demoScenarios = {
    ecommerce: {
      title: "E-commerce CTA Analysis",
      icon: ShoppingCart,
      currentContent: "Shop our latest collection",
      suggestedContent: "Get 20% off today - Limited time only!",
      description: "This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content."
    },
    saas: {
      title: "SaaS CTA Analysis", 
      icon: Rocket,
      currentContent: "Try our platform for free",
      suggestedContent: "Start your free trial now - No credit card required!",
      description: "This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content."
    },
    marketing: {
      title: "Marketing CTA Analysis",
      icon: Target,
      currentContent: "Learn more about our services",
      suggestedContent: "Download our free guide and transform your business today!",
      description: "This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content."
    },
    social: {
      title: "Social Media CTA Analysis",
      icon: Users,
      currentContent: "Follow us for updates",
      suggestedContent: "Join 10K+ followers and never miss an update!",
      description: "This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content."
    }
  };

  const handleComplete = (scenario: string) => {
    console.log(`Completed ${scenario} CTA analysis`);
  };

  const handleSaveForLater = (scenario: string) => {
    console.log(`Saved ${scenario} CTA analysis for later`);
  };

  const handleFeedback = (scenario: string, isPositive: boolean) => {
    console.log(`Feedback for ${scenario}: ${isPositive ? 'positive' : 'negative'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">
              CTA Analysis Demo
            </h1>
            <Zap className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different scenarios and see how our CTA Analysis tool helps optimize your content for better conversions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <p className="text-sm text-gray-600">Conversion Improvement</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">5x</div>
              <p className="text-sm text-gray-600">Click-through Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2.3k</div>
              <p className="text-sm text-gray-600">Active Users</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Rocket className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">15min</div>
              <p className="text-sm text-gray-600">Average Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="ecommerce" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                E-commerce
              </TabsTrigger>
              <TabsTrigger value="saas" className="flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                SaaS
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Marketing
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Social
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(demoScenarios).map(([key, scenario]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <scenario.icon className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    {scenario.title}
                  </h2>
                </div>
                <Badge variant="secondary" className="text-sm">
                  Industry: {key.charAt(0).toUpperCase() + key.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CTA Analysis Component */}
                <div className="lg:col-span-2">
                  <CTAAnalysis
                    currentStep={3}
                    totalSteps={5}
                    currentContent={scenario.currentContent}
                    suggestedContent={scenario.suggestedContent}
                    onComplete={() => handleComplete(key)}
                    onSaveForLater={() => handleSaveForLater(key)}
                    onFeedback={(isPositive) => handleFeedback(key, isPositive)}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Best Practices */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Best Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm text-gray-600">
                        <p>• Use action verbs (Get, Start, Try)</p>
                        <p>• Create urgency (Limited time, Today only)</p>
                        <p>• Remove friction (No credit card, Free)</p>
                        <p>• Be specific about benefits</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Industry Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-500" />
                        Industry Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm text-gray-600">
                        {key === 'ecommerce' && (
                          <>
                            <p>• Highlight discounts and deals</p>
                            <p>• Use scarcity (Limited stock)</p>
                            <p>• Offer free shipping</p>
                          </>
                        )}
                        {key === 'saas' && (
                          <>
                            <p>• Emphasize free trials</p>
                            <p>• Show ROI and benefits</p>
                            <p>• Remove signup barriers</p>
                          </>
                        )}
                        {key === 'marketing' && (
                          <>
                            <p>• Offer valuable content</p>
                            <p>• Use social proof</p>
                            <p>• Create urgency</p>
                          </>
                        )}
                        {key === 'social' && (
                          <>
                            <p>• Show community size</p>
                            <p>• Highlight exclusive content</p>
                            <p>• Use social proof</p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        View Analytics
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        A/B Test
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        User Feedback
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer CTA */}
        <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to optimize your CTAs?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of marketers who have improved their conversion rates using our CTA analysis tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTADemo; 
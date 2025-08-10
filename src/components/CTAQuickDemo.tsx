import React, { useState } from 'react';
import CTAAnalysis from './CTAAnalysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Target, Users } from 'lucide-react';

const CTAQuickDemo: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const demoData = {
    currentContent: "Your Digital Empire Starts Here",
    suggestedContent: "Start Your Journey with Us Today!",
    description: "This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content."
  };

  const handleComplete = () => {
    console.log('CTA analysis completed');
  };

  const handleSaveForLater = () => {
    console.log('CTA analysis saved for later');
  };

  const handleFeedback = (isPositive: boolean) => {
    console.log(`Feedback: ${isPositive ? 'positive' : 'negative'}`);
  };

  if (!isExpanded) {
    return (
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h3 className="text-2xl font-bold text-gray-900">
              Try Our CTA Analysis Tool
            </h3>
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            See how our AI-powered tool can transform your call-to-action content and boost your conversion rates.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">87%</div>
              <p className="text-sm text-gray-600">Conversion Improvement</p>
            </div>
            <div className="text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">5x</div>
              <p className="text-sm text-gray-600">Click-through Rate</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-xl font-bold text-gray-900">2.3k</div>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setIsExpanded(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            >
              Try Demo Now
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/cta-analysis'}
              className="px-8 py-3 text-lg"
            >
              Full Tool
            </Button>
          </div>

          <div className="mt-6">
            <Badge variant="secondary" className="text-sm">
              Free • No Signup Required • Instant Results
            </Badge>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          CTA Analysis Demo
        </h2>
        <p className="text-gray-600 mb-6">
          Experience our tool in action. Analyze and optimize your call-to-action content.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsExpanded(false)}
          className="mb-6"
        >
          ← Back to Overview
        </Button>
      </div>

      {/* CTA Analysis Component */}
      <CTAAnalysis
        currentStep={3}
        totalSteps={5}
        currentContent={demoData.currentContent}
        suggestedContent={demoData.suggestedContent}
        onComplete={handleComplete}
        onSaveForLater={handleSaveForLater}
        onFeedback={handleFeedback}
      />

      {/* Call to Action */}
      <Card className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            Ready to optimize your own CTAs?
          </h3>
          <p className="text-gray-600 mb-4">
            Get access to our full tool with unlimited analysis and AI-powered suggestions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => window.location.href = '/cta-analysis'}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Free Analysis
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/cta-demo'}
            >
              View More Examples
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTAQuickDemo; 
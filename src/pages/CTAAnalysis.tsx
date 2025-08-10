import React, { useState } from 'react';
import CTAAnalysis from '@/components/CTAAnalysis';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CTAStep {
  id: number;
  title: string;
  currentContent: string;
  suggestedContent: string;
  description: string;
  isCompleted: boolean;
}

const CTAAnalysisPage: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // Start at step 3 as shown in the image
  const [steps, setSteps] = useState<CTAStep[]>([
    {
      id: 1,
      title: "Headline Analysis",
      currentContent: "We Build Amazing Websites",
      suggestedContent: "Transform Your Business with Our Amazing Websites",
      description: "Your headline needs more specificity and urgency to drive conversions.",
      isCompleted: false
    },
    {
      id: 2,
      title: "Value Proposition",
      currentContent: "Professional web development services",
      suggestedContent: "Get a professional website that converts visitors into customers",
      description: "Focus on the outcome rather than just the service description.",
      isCompleted: false
    },
    {
      id: 3,
      title: "CTA Analysis",
      currentContent: "Your Digital Empire Starts Here",
      suggestedContent: "Start Your Journey with Us Today!",
      description: "This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content.",
      isCompleted: false
    },
    {
      id: 4,
      title: "Social Proof",
      currentContent: "Trusted by businesses worldwide",
      suggestedContent: "Join 500+ businesses that trust us with their digital success",
      description: "Add specific numbers and outcomes to make your social proof more compelling.",
      isCompleted: false
    },
    {
      id: 5,
      title: "Urgency Creation",
      currentContent: "Get started today",
      suggestedContent: "Limited spots available - Start your project this week!",
      description: "Create urgency without being pushy to encourage immediate action.",
      isCompleted: false
    }
  ]);

  const currentStep = steps[currentStepIndex];
  const totalSteps = steps.length;

  const handleComplete = () => {
    const updatedSteps = [...steps];
    updatedSteps[currentStepIndex].isCompleted = true;
    setSteps(updatedSteps);
    
    // Auto-advance to next step if not the last one
    if (currentStepIndex < totalSteps - 1) {
      setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, 1000);
    }
  };

  const handleSaveForLater = () => {
    // In a real app, this would save to a database or local storage
    console.log('Saved for later:', currentStep);
  };

  const handleFeedback = (isPositive: boolean) => {
    console.log('Feedback received:', { step: currentStep.title, isPositive });
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  };

  const goToPrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Content Optimization Tool
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze and improve your content's call-to-action effectiveness with our step-by-step optimization tool.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(index)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    index === currentStepIndex
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : step.isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {step.isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step.isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentStep.title}
            </h2>
            <p className="text-gray-600">
              Step {currentStep.id} of {totalSteps}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CTA Analysis Component */}
          <div className="lg:col-span-2">
            <CTAAnalysis
              currentStep={currentStep.id}
              totalSteps={totalSteps}
              currentContent={currentStep.currentContent}
              suggestedContent={currentStep.suggestedContent}
              onComplete={handleComplete}
              onSaveForLater={handleSaveForLater}
              onFeedback={handleFeedback}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={currentStepIndex === 0}
                  className="w-full justify-start"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Step
                </Button>
                <Button
                  variant="outline"
                  onClick={goToNext}
                  disabled={currentStepIndex === totalSteps - 1}
                  className="w-full justify-start"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        step.id === currentStep.id
                          ? 'border-blue-200 bg-blue-50'
                          : step.isCompleted
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {step.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : step.id === currentStep.id ? (
                          <div className="w-5 h-5 rounded-full bg-blue-600 animate-pulse" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`font-medium ${
                          step.id === currentStep.id
                            ? 'text-blue-900'
                            : step.isCompleted
                            ? 'text-green-900'
                            : 'text-gray-600'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {step.isCompleted ? 'Complete' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Use action verbs to create urgency</p>
                  <p>• Be specific about the benefit</p>
                  <p>• Keep it concise and clear</p>
                  <p>• Test different variations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-12 space-x-4">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentStepIndex === 0}
            className="px-8 py-3"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={goToNext}
            disabled={currentStepIndex === totalSteps - 1}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
          >
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTAAnalysisPage; 
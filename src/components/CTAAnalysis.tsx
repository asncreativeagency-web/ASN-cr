import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronUp, Copy, Check, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface CTAAnalysisProps {
  currentStep: number;
  totalSteps: number;
  currentContent: string;
  suggestedContent: string;
  onComplete: () => void;
  onSaveForLater: () => void;
  onFeedback?: (isPositive: boolean) => void;
}

const CTAAnalysis: React.FC<CTAAnalysisProps> = ({
  currentStep,
  totalSteps,
  currentContent,
  suggestedContent,
  onComplete,
  onSaveForLater,
  onFeedback
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(suggestedContent);
      setHasCopied(true);
      toast({
        title: "Copied!",
        description: "Content copied to clipboard",
      });
      setTimeout(() => setHasCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy content",
        variant: "destructive",
      });
    }
  };

  const handleFeedback = (isPositive: boolean) => {
    onFeedback?.(isPositive);
    toast({
      title: "Thank you!",
      description: `Your ${isPositive ? 'positive' : 'negative'} feedback has been recorded.`,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg border-0">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">
            CTA Analysis {currentStep}/{totalSteps}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronUp 
              className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                isCollapsed ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CardContent className="space-y-6">
              {/* Description */}
              <div className="text-gray-700 leading-relaxed">
                This phrase is catchy but lacks a direct call to action. Including an action-oriented phrase can encourage users to engage more actively with the content.
              </div>

              {/* Current Content Section */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Current Content</h3>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-800 font-medium">{currentContent}</p>
                </div>
              </div>

              {/* Suggested Content Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">Content</h3>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-600 font-semibold text-sm">SUGGESTED</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="ml-auto h-8 px-3 text-xs"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-purple-900 font-medium">{suggestedContent}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex gap-3">
                  <Button
                    onClick={onComplete}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Ok, I've done it
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onSaveForLater}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Save for later
                  </Button>
                </div>

                {/* Feedback Icons */}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback(true)}
                    className="p-2 hover:bg-green-100 hover:text-green-600 transition-colors rounded-full"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFeedback(false)}
                    className="p-2 hover:bg-red-100 hover:text-red-600 transition-colors rounded-full"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default CTAAnalysis; 
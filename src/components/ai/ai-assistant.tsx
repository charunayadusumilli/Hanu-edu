import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Zap,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIAssistantProps {
  variant?: 'floating' | 'embedded' | 'fullscreen';
  className?: string;
}

const predefinedMessages = [
  "How can AI transform my business operations?",
  "What consulting services do you offer?",
  "Tell me about your success stories",
  "How do I get started with Hanu Consulting?",
];

const assistantResponses = {
  greeting: "👋 Hello! I'm your AI consulting assistant. I'm here to help you discover how AI can revolutionize your business. What would you like to explore today?",
  ai_transform: "🚀 Great question! AI can transform your business through process automation, predictive analytics, intelligent decision-making, and customer experience enhancement. Would you like me to elaborate on any specific area?",
  services: "🎯 We offer comprehensive AI consulting services including Strategy Development, Implementation Support, Custom AI Solutions, Training & Development, and Ongoing Optimization. Which area interests you most?",
  success_stories: "📈 We've helped 500+ companies achieve remarkable results: 40% cost reduction in operations, 60% improvement in decision-making speed, and 85% increase in customer satisfaction. Would you like specific case studies?",
  getting_started: "✨ Getting started is simple! We begin with a free AI readiness assessment, followed by a customized strategy session. Then we create a tailored implementation roadmap. Ready to begin your AI journey?",
};

export function AIAssistant({ variant = 'floating', className }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'assistant',
        content: assistantResponses.greeting,
        timestamp: new Date(),
        suggestions: predefinedMessages,
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = "I understand your question. Let me connect you with one of our AI specialists who can provide detailed insights tailored to your specific needs.";
      
      if (content.toLowerCase().includes('ai') || content.toLowerCase().includes('transform')) {
        response = assistantResponses.ai_transform;
      } else if (content.toLowerCase().includes('service')) {
        response = assistantResponses.services;
      } else if (content.toLowerCase().includes('success') || content.toLowerCase().includes('story')) {
        response = assistantResponses.success_stories;
      } else if (content.toLowerCase().includes('start')) {
        response = assistantResponses.getting_started;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        suggestions: predefinedMessages.filter(msg => msg !== content),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  if (variant === 'floating') {
    return (
      <>
        {/* Floating Button */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="w-16 h-16 rounded-full bg-gradient-primary shadow-glow-strong hover:shadow-glow-strong hover:scale-110 transition-all duration-300"
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </Button>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-accent-green rounded-full pulse-glow"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-6 z-50 w-96 h-[600px]"
            >
              <Card className="h-full glass-strong border-primary/30 shadow-glow overflow-hidden">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border/20 bg-gradient-primary">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">AI Assistant</h3>
                        <p className="text-xs text-white/80">Always here to help</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "flex",
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div className={cn(
                          "max-w-[80%] rounded-lg p-3",
                          message.type === 'user'
                            ? "bg-primary text-primary-foreground"
                            : "bg-surface-elevated text-foreground"
                        )}>
                          <div className="flex items-start space-x-2">
                            {message.type === 'assistant' && (
                              <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            )}
                            <p className="text-sm">{message.content}</p>
                            {message.type === 'user' && (
                              <User className="w-4 h-4 text-primary-foreground mt-0.5 flex-shrink-0" />
                            )}
                          </div>
                          
                          {/* Suggestions */}
                          {message.suggestions && (
                            <div className="mt-3 space-y-2">
                              {message.suggestions.slice(0, 2).map((suggestion, index) => (
                                <Button
                                  key={index}
                                  variant="outline"
                                  size="sm"
                                  className="w-full text-left h-auto p-2 text-xs"
                                  onClick={() => handleSendMessage(suggestion)}
                                >
                                  {suggestion}
                                </Button>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-surface-elevated rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-border/20">
                    <div className="flex space-x-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && inputValue.trim()) {
                            handleSendMessage(inputValue.trim());
                          }
                        }}
                      />
                      <Button
                        onClick={() => inputValue.trim() && handleSendMessage(inputValue.trim())}
                        disabled={!inputValue.trim()}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Embedded or fullscreen variants can be implemented here
  return null;
}
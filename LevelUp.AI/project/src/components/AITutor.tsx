import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

const AITutor: React.FC = () => {
  const { chatMessages, addChatMessage, user, courses } = useApp();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message);
      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): ChatMessage => {
    const responses = [
      "I'd be happy to help you with that! Based on your learning progress, I recommend focusing on the fundamentals first.",
      "Great question! Let me suggest some resources that align with your current skill level.",
      "I see you're interested in advancing your skills. Here are some personalized recommendations based on your learning history.",
      "That's an excellent area to explore! I've noticed you've been doing well with similar topics.",
      "I can help you create a custom learning path. Would you like me to recommend some specific courses?",
      "Based on your recent activity, I think you'd benefit from our intermediate-level courses in this area.",
      "Let me analyze your progress and suggest the most effective next steps for your learning journey.",
      "I've found some great resources that match your interests. Would you like me to add them to your learning plan?"
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: (Date.now() + 1).toString(),
      content: randomResponse,
      sender: 'ai',
      timestamp: new Date()
    };
  };

  const quickActions = [
    { text: "Recommend courses for me", icon: BookOpen },
    { text: "How can I improve my progress?", icon: TrendingUp },
    { text: "Set learning goals", icon: Target },
    { text: "Study tips and strategies", icon: Lightbulb }
  ];

  const handleQuickAction = (actionText: string) => {
    setMessage(actionText);
    handleSendMessage();
  };

  return (
    <div className="p-6 h-screen flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Learning Assistant</h1>
          <p className="text-gray-600 mt-1">Your personalized AI tutor is here to help</p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 py-2 rounded-full">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">AI Powered</span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatMessages.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Welcome to your AI Learning Assistant!</h3>
              <p className="text-gray-600 mb-6">I'm here to help you learn more effectively. You can ask me about:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-900">Course recommendations</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">Learning strategies</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-900">Progress tracking</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-900">Study tips</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-3 max-w-md ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600' 
                        : 'bg-gradient-to-r from-green-500 to-teal-600'
                    }`}>
                      {msg.sender === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-md">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {chatMessages.length === 0 && (
          <div className="p-6 border-t">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.text)}
                    className="flex items-center space-x-2 p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Icon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-gray-900">{action.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-6 border-t">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your learning journey..."
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim() || isTyping}
              className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-3 rounded-lg hover:from-purple-600 hover:to-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="mt-6 bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-bold text-gray-900 mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-1">Recommended Focus</h4>
            <p className="text-sm text-purple-700">Based on your progress, focus on Machine Learning fundamentals</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-1">Learning Style</h4>
            <p className="text-sm text-blue-700">You prefer interactive content and hands-on exercises</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-1">Next Milestone</h4>
            <p className="text-sm text-green-700">Complete 2 more lessons to reach Level 13</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
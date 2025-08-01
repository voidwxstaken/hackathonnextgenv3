import React from 'react';
import { useState } from 'react';
import { Monitor, Brain, Clock, TrendingUp, AlertCircle, CheckCircle, User, Smartphone, Tv, Gamepad2, Lightbulb, Heart, Shield, BarChart3, Coins, ShoppingBag, Star, Trophy, Gift, Palette, Camera, Music } from 'lucide-react';

// Interface definitions for type safety

// Represents a child's profile with all tracking data
interface Child {
  id: number;
  name: string;
  age: number;
  screenTime: number;      // Total screen time in minutes
  limit: number;           // Daily limit in minutes
  tokens: number;          // Earned tokens for shop purchases
  streak: number;          // Consecutive days of good habits
  achievements: string[];  // Array of earned achievement badges
  theme: string;           // Selected theme from shop
  avatar: string;          // Selected avatar from shop
  powerUps: string[];      // Active power-ups from shop
}

// Represents items available in the token shop
interface ShopItem {
  id: string;
  name: string;
  cost: number;            // Token cost to purchase
  type: 'theme' | 'avatar' | 'powerup' | 'special';  // Item category
  description: string;     // What the item does
  icon: string;            // Emoji icon for display
}

// Represents daily challenges users can complete
interface Challenge {
  id: string;
  title: string;
  description: string;     // Challenge instructions
  reward: number;          // Token reward for completion
  completed: boolean;      // Whether user completed it
  type: 'daily' | 'weekly'; // Challenge duration type
}

function App() {
  // State for managing children data
  const [children, setChildren] = useState([
    {
      id: 1,
      name: 'Emma',
      age: 8,
      avatar: '👧',
      screenTimeMinutes: 135, // 2h 15m
      limitMinutes: 180, // 3h 0m
      status: 'good',
      tokens: 45,
      streak: 3,
      achievements: ['Early Bird', 'Balanced User'],
      purchasedItems: ['Rainbow Theme', 'Unicorn Avatar'],
      activities: [
        { type: 'Educational Apps', minutes: 80 },
        { type: 'TV Shows', minutes: 45 },
        { type: 'Games', minutes: 10 }
      ]
    },
    {
      id: 2,
      name: 'Jake',
      age: 12,
      avatar: '👦',
      screenTimeMinutes: 285, // 4h 45m
      limitMinutes: 240, // 4h 0m
      status: 'exceeded',
      tokens: 12,
      streak: 0,
      achievements: ['Gaming Master'],
      purchasedItems: ['Dark Theme'],
      activities: [
        { type: 'Games', minutes: 150 },
        { type: 'Educational Apps', minutes: 75 },
        { type: 'TV Shows', minutes: 60 }
      ]
    }
  ]);

  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  // Shop items
  const shopItems = [
    { id: 1, name: 'Rainbow Theme', price: 25, icon: '🌈', type: 'theme', description: 'Colorful rainbow interface' },
    { id: 2, name: 'Dark Theme', price: 20, icon: '🌙', type: 'theme', description: 'Cool dark mode theme' },
    { id: 3, name: 'Unicorn Avatar', price: 30, icon: '🦄', type: 'avatar', description: 'Magical unicorn profile picture' },
    { id: 4, name: 'Robot Avatar', price: 30, icon: '🤖', type: 'avatar', description: 'Futuristic robot avatar' },
    { id: 5, name: 'Achievement Badge', price: 15, icon: '🏆', type: 'badge', description: 'Special achievement badge' },
    { id: 6, name: 'Screen Time Shield', price: 40, icon: '🛡️', type: 'power', description: 'Extra 30 minutes daily limit' },
    { id: 7, name: 'Focus Boost', price: 35, icon: '⚡', type: 'power', description: 'Double tokens for educational apps' },
    { id: 8, name: 'Weekend Pass', price: 50, icon: '🎉', type: 'power', description: 'No limits on weekends' }
  ];

  // Monthly data for trends
  const monthlyData = [
    { month: 'Jan', hours: 85, educational: 35, entertainment: 50 },
    { month: 'Feb', hours: 92, educational: 40, entertainment: 52 },
    { month: 'Mar', hours: 78, educational: 45, entertainment: 33 },
    { month: 'Apr', hours: 88, educational: 50, entertainment: 38 },
    { month: 'May', hours: 95, educational: 55, entertainment: 40 },
    { month: 'Jun', hours: 102, educational: 48, entertainment: 54 }
  ];

  // Device usage breakdown
  const deviceData = [
    { device: 'Tablet', percentage: 45, hours: 12.5, color: 'bg-blue-500' },
    { device: 'Phone', percentage: 30, hours: 8.3, color: 'bg-green-500' },
    { device: 'Computer', percentage: 15, hours: 4.2, color: 'bg-purple-500' },
    { device: 'TV', percentage: 10, hours: 2.8, color: 'bg-orange-500' }
  ];

  // App categories breakdown
  const categoryData = [
    { category: 'Educational', percentage: 40, hours: 11.2, color: 'bg-emerald-500', icon: '📚' },
    { category: 'Entertainment', percentage: 35, hours: 9.8, color: 'bg-pink-500', icon: '🎬' },
    { category: 'Games', percentage: 20, hours: 5.6, color: 'bg-indigo-500', icon: '🎮' },
    { category: 'Social', percentage: 5, hours: 1.4, color: 'bg-yellow-500', icon: '💬' }
  ];

  // Helper function to convert minutes to readable format
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Add new child
  const addChild = () => {
    if (newChildName.trim() && newChildAge) {
      const newChild = {
        id: Date.now(),
        name: newChildName.trim(),
        age: parseInt(newChildAge),
        avatar: '👤',
        screenTimeMinutes: 0,
        limitMinutes: 120, // Default 2 hours
        status: 'good',
        tokens: 10, // Starting tokens
        streak: 0,
        achievements: [],
        purchasedItems: [],
        activities: []
      };
      setChildren([...children, newChild]);
      setNewChildName('');
      setNewChildAge('');
      setShowAddForm(false);
    }
  };

  // Add screen time to a child
  const addScreenTime = (childId, minutes) => {
    setChildren(children.map(child => {
      if (child.id === childId) {
        const newScreenTime = child.screenTimeMinutes + minutes;
        const newStatus = newScreenTime > child.limitMinutes ? 'exceeded' : 'good';
        
        // Calculate tokens earned (1 token per 15 minutes, bonus for staying within limits)
        let tokensEarned = Math.floor(minutes / 15);
        if (newStatus === 'good' && child.status === 'good') {
          tokensEarned += 2; // Bonus for staying within limits
        }
        
        return {
          ...child,
          screenTimeMinutes: newScreenTime,
          status: newStatus,
          tokens: child.tokens + tokensEarned
        };
      }
      return child;
    }));
  };

  // Update time limit
  const updateLimit = (childId, newLimitMinutes) => {
    setChildren(children.map(child => {
      if (child.id === childId) {
        return {
          ...child,
          limitMinutes: newLimitMinutes,
          status: child.screenTimeMinutes > newLimitMinutes ? 'exceeded' : 'good'
        };
      }
      return child;
    }));
  };

  // Calculate total screen time
  const totalScreenTime = children.reduce((total, child) => total + child.screenTimeMinutes, 0);
  const totalTokens = children.reduce((total, child) => total + child.tokens, 0);
  
  // Calculate leaderboard rankings
  const leaderboard = [...children]
    .map(child => ({
      ...child,
      score: (child.tokens * 2) + (child.streak * 10) + (child.achievements.length * 15) + 
             (child.status === 'good' ? 20 : 0) + 
             (child.screenTimeMinutes <= child.limitMinutes * 0.8 ? 25 : 0) // Bonus for using <80% of limit
    }))
    .sort((a, b) => b.score - a.score);

  // Purchase item
  const purchaseItem = (childId, item) => {
    setChildren(children.map(child => {
      if (child.id === childId && child.tokens >= item.price) {
        return {
          ...child,
          tokens: child.tokens - item.price,
          purchasedItems: [...child.purchasedItems, item.name]
        };
      }
      return child;
    }));
  };

  const insights = [
    {
      icon: AlertCircle,
      title: 'Bedtime Screen Break',
      description: 'Jake is using devices 30 minutes before bedtime. Consider setting a digital sunset.',
      color: 'orange'
    },
    {
      icon: Heart,
      title: 'Great Educational Balance',
      description: 'Emma is spending 60% of her screen time on educational content!',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Weekend Pattern',
      description: 'Screen time increases by 40% on weekends. Consider outdoor activities.',
      color: 'blue'
    }
  ];

  const weekData = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 4.5 },
    { day: 'Fri', hours: 5.2 },
    { day: 'Sat', hours: 6.1 },
    { day: 'Sun', hours: 4.8 }
  ];

  // Creative challenges
  const challenges = [
    { id: 1, title: 'Digital Artist', description: 'Spend 30 minutes on creative apps', reward: 15, icon: '🎨' },
    { id: 2, title: 'Learning Streak', description: 'Use educational apps for 3 days straight', reward: 25, icon: '📚' },
    { id: 3, title: 'Balance Master', description: 'Stay within limits for a week', reward: 50, icon: '⚖️' },
    { id: 4, title: 'Early Bird', description: 'No screens 1 hour before bedtime', reward: 20, icon: '🌅' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ScreenWise</h1>
                <p className="text-xs text-gray-500">AI-Powered Screen Time Tracker</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-lg">
                <Coins className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-700">{totalTokens} Tokens</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-2 rounded-lg">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">AI Active</span>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mt-4 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('shop')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'shop' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 inline mr-1" />
              Shop
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'challenges' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Trophy className="w-4 h-4 inline mr-1" />
              Challenges
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'leaderboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'analytics' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-1" />
              Analytics
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <>
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Total</p>
                    <p className="text-2xl font-bold text-gray-900">{formatTime(totalScreenTime)}</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Tokens</p>
                    <p className="text-2xl font-bold text-orange-600">{totalTokens}</p>
                  </div>
                  <Coins className="w-8 h-8 text-orange-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Streaks</p>
                    <p className="text-2xl font-bold text-green-600">{children.reduce((total, child) => total + child.streak, 0)}</p>
                  </div>
                  <Star className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Goals Met</p>
                    <p className="text-2xl font-bold text-green-600">{children.filter(c => c.status === 'good').length}/{children.length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Children Profiles */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Children's Screen Time</h2>
                <div className="space-y-6">
                  {children.map((child, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-xl">
                          {child.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                            <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
                              <Coins className="w-3 h-3 text-orange-600" />
                              <span className="text-xs font-medium text-orange-700">{child.tokens}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">Age {child.age} • {child.streak} day streak</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-600">{formatTime(child.screenTimeMinutes)} / {formatTime(child.limitMinutes)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              child.status === 'good' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {child.status === 'good' ? 'Within Limit' : 'Exceeded'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      {child.achievements.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Achievements</p>
                          <div className="flex flex-wrap gap-2">
                            {child.achievements.map((achievement, achIndex) => (
                              <span key={achIndex} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                🏆 {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 mb-4">
                        {child.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">{activity.type}</span>
                            <span className="text-sm text-gray-500">{formatTime(activity.minutes)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Controls */}
                      <div className="space-y-3 border-t pt-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => addScreenTime(child.id, 15)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                          >
                            +15m (+1🪙)
                          </button>
                          <button
                            onClick={() => addScreenTime(child.id, 30)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                          >
                            +30m (+2🪙)
                          </button>
                          <button
                            onClick={() => addScreenTime(child.id, 60)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                          >
                            +1h (+4🪙)
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Daily limit:</span>
                            <select
                              value={child.limitMinutes}
                              onChange={(e) => updateLimit(child.id, parseInt(e.target.value))}
                              className="px-2 py-1 border border-gray-300 rounded text-sm"
                            >
                              <option value={60}>1 hour</option>
                              <option value={120}>2 hours</option>
                              <option value={180}>3 hours</option>
                              <option value={240}>4 hours</option>
                              <option value={300}>5 hours</option>
                            </select>
                          </div>
                          <button
                            onClick={() => setSelectedChild(child)}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3 inline mr-1" />
                            Shop
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${child.status === 'good' ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min((child.screenTimeMinutes / child.limitMinutes) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add New Child Button */}
                  {!showAddForm ? (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    >
                      <User className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Add New Child</p>
                    </button>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Child</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={newChildName}
                            onChange={(e) => setNewChildName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter child's name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                          <input
                            type="number"
                            value={newChildAge}
                            onChange={(e) => setNewChildAge(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter age"
                            min="1"
                            max="18"
                          />
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={addChild}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            Add Child
                          </button>
                          <button
                            onClick={() => {
                              setShowAddForm(false);
                              setNewChildName('');
                              setNewChildAge('');
                            }}
                            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Insights</h2>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Brain className="w-8 h-8 text-purple-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Smart Recommendations</h3>
                      <p className="text-sm text-gray-500">AI-powered insights</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <insight.icon className={`w-6 h-6 mt-1 ${
                          insight.color === 'orange' ? 'text-orange-600' :
                          insight.color === 'green' ? 'text-green-600' : 'text-blue-600'
                        }`} />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Weekly Trends</h2>
                  <p className="text-sm text-gray-500">Daily screen time this week</p>
                </div>
              </div>

              <div className="space-y-3">
                {weekData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-4 relative">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${(data.hours / 7) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-700 w-12">
                      {data.hours}h
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'shop' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Token Shop</h2>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-lg">
                <Coins className="w-5 h-5 text-orange-600" />
                <span className="text-lg font-bold text-orange-700">{totalTokens} Tokens</span>
              </div>
            </div>

            {selectedChild && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  Shopping for: <strong>{selectedChild.name}</strong> ({selectedChild.tokens} tokens available)
                </p>
                <button
                  onClick={() => setSelectedChild(null)}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Shop for everyone
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-center space-x-1 text-orange-600">
                      <Coins className="w-4 h-4" />
                      <span className="font-bold">{item.price}</span>
                    </div>
                  </div>
                  
                  {selectedChild ? (
                    <button
                      onClick={() => purchaseItem(selectedChild.id, item)}
                      disabled={selectedChild.tokens < item.price || selectedChild.purchasedItems.includes(item.name)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        selectedChild.purchasedItems.includes(item.name)
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : selectedChild.tokens >= item.price
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {selectedChild.purchasedItems.includes(item.name)
                        ? '✓ Owned'
                        : selectedChild.tokens >= item.price
                        ? 'Buy Now'
                        : 'Not Enough Tokens'
                      }
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => purchaseItem(child.id, item)}
                          disabled={child.tokens < item.price || child.purchasedItems.includes(item.name)}
                          className={`w-full py-1 px-3 rounded text-sm font-medium transition-colors ${
                            child.purchasedItems.includes(item.name)
                              ? 'bg-green-100 text-green-700 cursor-not-allowed'
                              : child.tokens >= item.price
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {child.name}: {child.purchasedItems.includes(item.name)
                            ? '✓ Owned'
                            : child.tokens >= item.price
                            ? `Buy (${child.tokens} tokens)`
                            : 'Not enough tokens'
                          }
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Trophy className="w-8 h-8 text-yellow-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Daily Challenges</h2>
                <p className="text-gray-600">Complete challenges to earn bonus tokens!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 mb-3">{challenge.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Gift className="w-4 h-4" />
                          <span className="font-medium">{challenge.reward} tokens</span>
                        </div>
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                        >
                          Start Challenge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Creative Activities */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Palette className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Creative Activities</h3>
                  <p className="text-gray-600">Earn bonus tokens with creative screen time!</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <Camera className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Photo Editing</h4>
                  <p className="text-sm text-gray-600">2x tokens for creative apps</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Music className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Music Creation</h4>
                  <p className="text-sm text-gray-600">2x tokens for music apps</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Learning</h4>
                  <p className="text-sm text-gray-600">3x tokens for educational content</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Star className="w-8 h-8 text-yellow-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Family Leaderboard</h2>
                <p className="text-gray-600">Rankings based on healthy screen time habits</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How Scoring Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Coins className="w-4 h-4 text-orange-500" />
                  <span>2 points per token</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>10 points per streak day</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  <span>15 points per achievement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>20 points for staying within limits</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {leaderboard.map((child, index) => (
                <div key={child.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${
                  index === 0 ? 'ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' :
                  index === 1 ? 'ring-2 ring-gray-400 bg-gradient-to-r from-gray-50 to-gray-100' :
                  index === 2 ? 'ring-2 ring-orange-400 bg-gradient-to-r from-orange-50 to-red-50' : ''
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-500 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                        <div className="flex items-center space-x-1 bg-purple-100 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 text-purple-600" />
                          <span className="text-sm font-bold text-purple-700">{child.score} pts</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Coins className="w-4 h-4 text-orange-500" />
                          <span>{child.tokens} tokens</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{child.streak} day streak</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Trophy className="w-4 h-4 text-purple-500" />
                          <span>{child.achievements.length} achievements</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{formatTime(child.screenTimeMinutes)} today</span>
                        </div>
                      </div>
                      
                      {child.achievements.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-2">
                            {child.achievements.map((achievement, achIndex) => (
                              <span key={achIndex} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                🏆 {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {index < 3 && (
                      <div className="text-right">
                        <div className={`text-2xl mb-1 ${
                          index === 0 ? 'text-yellow-500' :
                          index === 1 ? 'text-gray-500' :
                          'text-orange-500'
                        }`}>
                          {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                        </div>
                        <p className="text-xs text-gray-500">
                          {index === 0 ? 'Champion' : index === 1 ? 'Runner-up' : '3rd Place'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                  <p className="text-gray-600">Detailed insights into screen time patterns</p>
                </div>
              </div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            {/* Enhanced Weekly Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Screen Time Trends</h3>
              <div className="space-y-3">
                {weekData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                        style={{ width: `${(data.hours / 7) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{data.hours}h</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 w-16 text-right">
                      {data.hours > 5 ? '⚠️' : data.hours > 3 ? '⚡' : '✅'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {monthlyData.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gray-100 rounded-lg p-3 mb-2">
                      <div className="text-2xl font-bold text-blue-600">{data.hours}h</div>
                      <div className="text-xs text-gray-500">{data.month}</div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-green-600">📚 {data.educational}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-600">🎬 {data.entertainment}h</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Usage Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Usage</h3>
                <div className="space-y-4">
                  {deviceData.map((device, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-4 h-4 rounded-full ${device.color}`}></div>
                        <span className="font-medium text-gray-700">{device.device}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${device.color}`}
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12">{device.percentage}%</span>
                        <span className="text-sm text-gray-500 w-16">{device.hours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Categories</h3>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium text-gray-700">{category.category}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12">{category.percentage}%</span>
                        <span className="text-sm text-gray-500 w-16">{category.hours}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Screen Time Goals */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Weekly Goals Progress</h3>
                  <p className="text-gray-600">Track your family's healthy screen time goals</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-gray-900">Stay Within Limits</h4>
                  <p className="text-2xl font-bold text-green-600">5/7</p>
                  <p className="text-sm text-gray-600">days this week</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">📚</div>
                  <h4 className="font-semibold text-gray-900">Educational Content</h4>
                  <p className="text-2xl font-bold text-blue-600">65%</p>
                  <p className="text-sm text-gray-600">of total screen time</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-3xl mb-2">🌙</div>
                  <h4 className="font-semibold text-gray-900">Digital Sunset</h4>
                  <p className="text-2xl font-bold text-purple-600">4/7</p>
                  <p className="text-sm text-gray-600">nights screen-free before bed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Shop Modal */}
        {selectedChild && activeTab === 'dashboard' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Shop for {selectedChild.name}</h3>
                <button
                  onClick={() => setSelectedChild(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg mb-4">
                <Coins className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-700">{selectedChild.tokens} tokens available</span>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {shopItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.price} tokens</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        purchaseItem(selectedChild.id, item);
                        setSelectedChild(null);
                      }}
                      disabled={selectedChild.tokens < item.price || selectedChild.purchasedItems.includes(item.name)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        selectedChild.purchasedItems.includes(item.name)
                          ? 'bg-green-100 text-green-700'
                          : selectedChild.tokens >= item.price
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {selectedChild.purchasedItems.includes(item.name)
                        ? 'Owned'
                        : selectedChild.tokens >= item.price
                        ? 'Buy'
                        : 'Need more'
                      }
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedChild(null);
                }}
                className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                View Full Shop
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-200 mt-8">
          <p className="text-sm text-gray-500">
            ScreenWise - Helping families build healthy digital habits with gamification
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
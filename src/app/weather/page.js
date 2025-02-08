"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  BarChart2,
  Leaf,
  ShoppingBag,
  MessageCircle,
  User,
  Search,
  Menu,
  X,
  MapPin,
  Wind,
  Droplets,
  Sun,
  TreePine,
} from "lucide-react";
import WeatherCard from "../components/WeatherCard";

const SustainabilityDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: "Home" },
    { icon: BarChart2, label: "Analytics" },
    { icon: Leaf, label: "Sustainability" },
    { icon: ShoppingBag, label: "Shop Green" },
    { icon: MessageCircle, label: "AI Chat" },
    { icon: User, label: "Profile" },
  ];

  const sustainabilityStats = [
    { title: "Air Quality", value: "32", unit: "AQI", icon: Wind },
    {
      title: "Carbon Footprint",
      value: "12.5",
      unit: "tons/year",
      icon: TreePine,
    },
    { title: "Water Usage", value: "85", unit: "gal/day", icon: Droplets },
    { title: "Energy Score", value: "92", unit: "pts", icon: Sun },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-gray-900 text-white">
      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold text-emerald-400">
              EcoSense
            </span>
            <button
              className="md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="space-y-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="h-5 w-5 text-emerald-400" />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="md:ml-64 p-6">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <span className="text-2xl font-bold text-emerald-400">EcoSense</span>
          <Search className="h-6 w-6" />
        </div>

        <WeatherCard />

        {/* Dashboard Content */}
        <div className="grid mt-8 grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Stats Card */}

          {/* Stats Grid */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sustainabilityStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                className="bg-gray-800/50 rounded-2xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400">{stat.title}</h3>
                  <stat.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-3xl font-light">
                  {stat.value}
                  <span className="text-sm ml-1 text-gray-400">
                    {stat.unit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Cards */}
          <motion.div
            className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {["Chat With Ai"].map((action, index) => (
              <div
                key={action}
                onClick={() =>
                  document.getElementById("chatbot-button").click()
                }
                className="bg-gray-800/50 rounded-2xl p-6 cursor-pointer hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-xl ">{action}</h3>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityDashboard;

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDiscord } from "react-icons/fa";

import { 
  
  Play, 
  Zap, 
  Globe, 
  Users, 
  Palette, 
  Shield, 
  ArrowRight, 
  Menu, 
  X,
  ChevronDown,
  Star,
  Sparkles,
  MousePointer2,
  Github,
  Linkedin,
  
  
  
} from "lucide-react";


export default function ModernExcaliDraw() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const smoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", href: "home" },
    { name: "Features", href: "features" },
    { name: "Demo", href: "video" },
    { name: "About", href: "about" },
  ];

  const features = [
    { icon: <Zap className="w-8 h-8" />, title: "Lightning Fast", description: "Real-time collaboration with zero lag", gradient: "from-yellow-400 to-orange-500" },
    { icon: <Globe className="w-8 h-8" />, title: "Global Access", description: "Work from anywhere, anytime", gradient: "from-blue-400 to-purple-500" },
    { icon: <Users className="w-8 h-8" />, title: "Team Sync", description: "Seamless team collaboration", gradient: "from-green-400 to-blue-500" },
    { icon: <Palette className="w-8 h-8" />, title: "Rich Tools", description: "Professional drawing toolkit", gradient: "from-pink-400 to-purple-500" },
    { icon: <Shield className="w-8 h-8" />, title: "Secure", description: "Enterprise-grade security", gradient: "from-emerald-400 to-cyan-500" },
    { icon: <Sparkles className="w-8 h-8" />, title: "AI Enhanced", description: "Smart drawing assistance", gradient: "from-violet-400 to-pink-500" },
  ];

  // Reusable Button
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
  }

  const Button: React.FC<ButtonProps> = ({ children, className = "", variant = "default", size = "md", onClick, ...props }) => {
    const baseClasses =
      "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-md hover:shadow-purple-500/40",
      outline: "border-2 border-white/30 bg-transparent hover:border-purple-400 hover:bg-white/5 text-white",
      ghost: "bg-transparent hover:bg-white/10 text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md",
      md: "px-5 py-2 text-base rounded-lg",
      lg: "px-8 py-3 text-lg rounded-full",
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Background with glowing orbs */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-black"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 120, -60, 0], y: [0, -80, 60, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-blue-500/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 50, 0], y: [0, 60, -40, 0], scale: [1, 0.95, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 w-full z-40 backdrop-blur-lg transition-colors duration-300 ${
          scrollY > 20 ? "bg-black/70 border-b border-white/10" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            ExcaliDraw
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => smoothScroll(item.href)}
                className="relative text-white/70 hover:text-white transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/auth/sign-in")}>
                Sign In
              </Button>
              <Button onClick={() => (window.location.href = "/auth/sign-up")}>
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-xl"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      smoothScroll(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/70 hover:text-white py-2"
                  >
                    {item.name}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => (window.location.href = "/auth/sign-in")}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full"
                  onClick={() => (window.location.href = "/auth/sign-up")}
                >
                  Sign Up
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          style={{ transform: `translateY(${scrollY * 0.1}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
        >
          <motion.span
            className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-purple-400/30 text-sm mb-8"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-4 h-4 mr-2 text-purple-400" />
            The Future of Visual Collaboration
          </motion.span>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block">Create</span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-gradient">
              Collaborate
            </span>
            <span className="block">Innovate</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your ideas into stunning visual experiences with the most advanced collaborative whiteboard platform.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" onClick={() => (window.location.href = "/dashboard")}>
              Start Creating <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => smoothScroll("video")}>
              <Play className="mr-2 w-5 h-5" /> Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-32 relative">
        <motion.div className="container mx-auto px-6">
          <motion.div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for{" "}
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Modern Teams
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Everything you need to create, collaborate, and bring your ideas to life in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-purple-400/40 transition-all"
                whileHover={{ scale: 1.05, y: -6 }}
              >
                <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-tr ${feature.gradient} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* VIDEO */}
      <section id="video" className="py-32 relative">
        <motion.div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            See ExcaliDraw{" "}
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Watch how easy it is to create and collaborate with your team.
          </p>

          <div className="relative mx-auto max-w-4xl">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 aspect-video flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-purple-400 animate-pulse" />
                <p className="text-white/70">Video Demo Coming Soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section id="about" className="py-32 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform{" "}
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Workflow?
            </span>
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Join thousands of teams already using ExcaliDraw to bring their ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" onClick={() => (window.location.href = "/dashboard")}>
              Start Your Journey <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => window.open("https://www.linkedin.com/in/bhupendrasingh05/", "_blank")}>
                <Linkedin className="mr-2 w-5 h-5" /> LinkedIn
              </Button>
              <Button variant="outline" onClick={() => window.open("https://github.com/Bhuppibisht", "_blank")}>
                <Github className="mr-2 w-5 h-5" /> GitHub
              </Button>
                <Button variant="outline" onClick={() => window.open("https://canary.discord.com/channels/1421740492596445186/1421740493221658647", "_blank")}>
                <FaDiscord className="mr-2 w-5 h-5" /> Discord
              </Button>
             
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          ExcaliDraw
        </div>
        <p className="text-white/50">
          © 2025 Excalidraw clone project. Crafted with passion for visual collaboration.
        </p>
      </footer>
    </div>
  );
}

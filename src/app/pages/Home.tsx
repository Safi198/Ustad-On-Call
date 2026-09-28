import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion";
import Lottie from "lottie-react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router";
import {
  ArrowRight, Store, Download, CheckCircle2, Zap, Star, ShieldCheck, MapPin, Wrench, Focus, Clock, CheckCircle, Smartphone, LayoutDashboard, Globe, Settings, ThumbsUp, Quote, MessageCircle, X
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const navigate = useNavigate();
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  // Reduced motion preference
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Setup Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP Scroll Progress Bar
  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }
  }, []);

  return (
    <div className="font-['Inter'] bg-[#0F0F0F] text-[#F5F5F5] min-h-screen overflow-x-hidden selection:bg-[#FF4500] selection:text-white cursor-none">
      <CustomCursor />
      {/* GSAP Scroll Progress Bar */}
      <div 
        ref={progressBarRef} 
        className="fixed top-0 left-0 h-[2px] bg-[#FF4500] w-full z-[9999] scale-x-0 origin-left" 
      />

      <Navbar navigate={navigate} openChatModal={() => setIsChatModalOpen(true)} />

      <HeroSection reduced={reducedMotion} />
      <HowItWorksSection reduced={reducedMotion} />
      <WhyChooseUsSection reduced={reducedMotion} />
      <ServicesSection reduced={reducedMotion} />
      <AppShowcaseSection reduced={reducedMotion} />
      <StatsCounterSection reduced={reducedMotion} />
      <TestimonialsSection reduced={reducedMotion} />
      <Footer />
      <FloatingWhatsApp onClick={() => setIsChatModalOpen(true)} />
      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
    </div>
  );
}

function WhyChooseUsSection({ reduced }: { reduced: boolean }) {
  const features = [
    { title: "Verified Professionals", desc: "Every worker passes strict background checks and skill assessments before joining.", icon: "hugeicons:shield-tick" },
    { title: "Transparent Pricing", desc: "No hidden fees. You see bids upfront and choose what fits your budget.", icon: "hugeicons:wallet-02" },
    { title: "Lightning Fast Support", desc: "Our customer success team is available 24/7 to resolve any issues.", icon: "hugeicons:customer-support" },
    { title: "Satisfaction Guarantee", desc: "If you're not happy with the work, we'll make it right at no extra cost.", icon: "hugeicons:favourite" }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#0F0F0F] relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-[-20%] w-[600px] h-[600px] bg-[#FF4500] opacity-5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-[#FFB700] opacity-5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1.0 }}
             className="px-4 py-1.5 rounded-full bg-[rgba(255,69,0,0.15)] text-[#FF4500] text-[12px] font-semibold uppercase tracking-wide mb-4 border border-[rgba(255,69,0,0.3)]"
          >
            Why Choose Us
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-6 flex flex-wrap justify-center gap-x-3"
          >
            {"Experience The Best Service".split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView || reduced ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + idx * 0.1, type: "spring", bounce: 0.5 }}
                className={word === "Best" ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFB700]" : "text-[#F5F5F5]"}
              >
                {word}  
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 40 }}
               animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 1.0, delay: reduced ? 0 : 0.2 + idx * 0.1 }}
             >
               <Tilt options={reduced ? { max: 0, scale: 1 } : defaultTiltOptions}>
                 <div className="h-full bg-[rgba(26,26,26,0.6)] backdrop-blur-lg border border-[#2A2A2A] rounded-2xl p-8 hover:border-[#FF4500] transition-colors duration-300 group cursor-default">
                   <div className="w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-[#333] flex items-center justify-center mb-6 group-hover:bg-[#FF4500] group-hover:shadow-[0_0_20px_rgba(255,69,0,0.3)] transition-all duration-300 group-hover:scale-110">
                     <Icon icon={feature.icon} className="w-7 h-7 text-white" />
                   </div>
                   <h3 className="text-xl font-bold font-['Poppins'] text-white mb-3 group-hover:text-[#FF4500] transition-colors">{feature.title}</h3>
                   <p className="text-[#888888] leading-relaxed text-sm">{feature.desc}</p>
                 </div>
               </Tilt>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Navbar({ navigate, openChatModal }: { navigate: (path: string) => void, openChatModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(15,15,15,0.92)] backdrop-blur-[20px] border-b border-[rgba(255,255,255,0.06)] h-[60px]"
            : "bg-transparent h-[72px]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('top')}>
            <div className="text-[#FF4500]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            </div>
            <span className="font-['Poppins'] text-[22px] font-bold">
              <span className="text-white">Ustad</span>
              <span className="text-[#FF4500]">OnCall</span>
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Home", "Services", "About Us", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-[#888888] hover:text-[#F5F5F5] active:text-[#FF4500] text-sm font-medium transition-colors duration-200"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Magnetic>
              <button onClick={openChatModal} className="h-[38px] px-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold transition-colors flex items-center gap-2">
                <MessageCircle size={16} /> Chat with Us
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => navigate("/login")}
                className="h-[38px] px-5 rounded-lg bg-[#FF4500] hover:bg-[#E03E00] text-white text-sm font-semibold transition-colors flex items-center gap-2"
              >
                Admin Login
              </button>
            </Magnetic>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-[#F5F5F5]" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-0.5 bg-current mb-1.5" />
            <div className="w-6 h-0.5 bg-current mb-1.5" />
            <div className="w-6 h-0.5 bg-current" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-[rgba(15,15,15,0.98)] backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {["Home", "Services", "About Us", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-2xl font-['Poppins'] font-semibold text-[#F5F5F5]"
                >
                  {item}
                </button>
              ))}
              <div className="w-full h-px bg-[#2A2A2A] my-4" />
              <button onClick={() => { setMenuOpen(false); openChatModal(); }} className="w-full h-12 rounded-full bg-[#25D366] text-white font-semibold flex items-center justify-center gap-2">
                <MessageCircle size={20} /> Chat with Us
              </button>
              <button
                onClick={() => { setMenuOpen(false); navigate("/login"); }}
                className="w-full h-12 rounded-lg bg-[#FF4500] text-white font-semibold flex items-center justify-center gap-2"
              >
                Admin Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HeroSection({ reduced }: { reduced: boolean }) {
  const particles = Array.from({ length: 15 });

  return (
    <section id="top" className="relative w-full min-h-screen bg-[#0F0F0F] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background orbs */}
      {!reduced && (
        <>
          <div 
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF4500] opacity-[0.07] blur-[100px] pointer-events-none"
            style={{ animation: 'floatOrb 8s infinite ease-in-out' }} 
          />
          <div 
            className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#FFB700] opacity-[0.04] blur-[80px] pointer-events-none"
            style={{ animation: 'floatOrb 6s infinite ease-in-out reverse' }} 
          />
        </>
      )}

      {/* Ember particles */}
      {!reduced && particles.map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#FF4500] pointer-events-none"
          style={{
            width: `${Math.random() * 2 + 2}px`,
            height: `${Math.random() * 2 + 2}px`,
            left: `${Math.random() * 100}vw`,
            bottom: '-20px',
            opacity: 0,
            animation: `emberRise ${Math.random() * 6 + 10}s infinite linear`,
            animationDelay: `${Math.random() * 7}s`,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Left Content */}
        <div className="w-full md:w-[55%] flex flex-col items-start">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="px-4 py-1.5 rounded-full bg-[rgba(255,69,0,0.15)] text-[#FF4500] text-[12px] font-semibold uppercase tracking-wide mb-6 border border-[rgba(255,69,0,0.3)] flex items-center gap-2"
          >
            🔥 Pakistan's #1 Home Services Platform
          </motion.div>

          <h1 className="font-['Poppins'] text-5xl lg:text-[64px] font-bold text-[#F5F5F5] leading-[1.1] mb-6 flex flex-wrap gap-x-4">
            {"Find Verified Skilled Workers Near You — Instantly".split(" ").map((word, idx) => (
              <motion.div
                key={idx}
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 40, rotateX: -45 }}
                animate={reduced ? {} : { opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  delay: 0.3 + idx * 0.1, 
                  duration: 0.8, 
                  type: 'spring', 
                  bounce: 0.4 
                }}
                style={{ transformOrigin: "bottom center" }}
                className={word === "Skilled" || word === "Workers" ? "bg-gradient-to-r from-[#FF4500] to-[#FFB700] text-transparent bg-clip-text" : ""}
              >
                {word}
              </motion.div>
            ))}
          </h1>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={reduced ? {} : { opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-[#888888] text-[17px] max-w-[500px] leading-relaxed mb-10"
          >
            Find trusted local professionals for every job. Compare quotes, check ratings, and book skilled workers with confidence.
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
          >
            <Magnetic>
              <motion.button 
                whileHover={reduced ? {} : { scale: 1.03, boxShadow: "0 0 20px rgba(255,69,0,0.4)" }}
                transition={{ duration: 0.2 }}
                className="w-full sm:w-auto h-12 px-8 bg-[#FF4500] rounded-[10px] text-white font-semibold flex items-center justify-center gap-2 group"
              >
                Download the App <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Magnetic>
            <Magnetic>
              <button className="w-full sm:w-auto h-12 px-8 border border-[#FF4500] rounded-[10px] text-[#FF4500] font-semibold hover:bg-[#FF4500] hover:text-white transition-colors duration-200">
                How It Works
              </button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={reduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto"
          >
            <button className="h-[54px] px-6 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl flex items-center gap-4 hover:border-[#00e676] hover:bg-[#1A1A1A]/80 hover:shadow-[0_0_20px_rgba(0,230,118,0.2)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              <Icon icon="logos:google-play-icon" className="w-7 h-7" />
              <div className="flex flex-col items-start">
                <span className="text-[#888888] text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Get it on</span>
                <span className="text-white text-sm font-semibold leading-none text-left">Google Play</span>
              </div>
            </button>
            <button className="h-[54px] px-6 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl flex items-center gap-4 hover:border-[#4FA9FF] hover:bg-[#1A1A1A]/80 hover:shadow-[0_0_20px_rgba(79,169,255,0.2)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
              <Icon icon="ic:baseline-apple" className="w-8 h-8 text-white" />
              <div className="flex flex-col items-start">
                <span className="text-[#888888] text-[10px] uppercase font-bold tracking-wider leading-none mb-1">GET IT ON</span>
                <span className="text-white text-sm font-semibold leading-none text-left">App Store</span>
              </div>
            </button>
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={reduced ? {} : { opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-6"
          >
            {[
              { num: "10,000+", label: "Workers" },
              { num: "50,000+", label: "Jobs Done" },
              { num: "4.8★", label: "Rating" },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="font-['Poppins'] text-[26px] font-bold bg-gradient-to-br from-[#FF4500] to-[#FFB700] text-transparent bg-clip-text leading-tight">{stat.num}</span>
                  <span className="font-['Inter'] text-[13px] text-[#888888] uppercase tracking-wide">{stat.label}</span>
                </div>
                {idx < 2 && <div className="w-[1px] h-10 bg-[#2A2A2A]" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Content - 3D Lottie Cartoon Avatar */}
        <div className="w-full md:w-[45%] relative h-[600px] hidden md:block perspective-1000">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4500] opacity-20 blur-[100px] rounded-full" />
          
          <motion.div
            initial={reduced ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
            animate={reduced ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring", bounce: 0.4 }}
            className="absolute inset-0 flex items-center justify-center z-10 drop-shadow-[0_20px_50px_rgba(255,69,0,0.3)]"
          >
            {/* Primary Cartoon Avatar Lottie */}
            <RemoteLottie 
              url="https://assets2.lottiefiles.com/packages/lf20_puciaact.json" 
              className="w-full h-full object-contain max-h-[550px]" 
            />
          </motion.div>

          {/* Floating Badges */}
          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute top-16 -left-4 bg-[rgba(26,26,26,0.8)] backdrop-blur-md border border-[#333] py-3 px-5 rounded-2xl shadow-xl flex items-center gap-3 z-30"
            style={{ animation: 'floatFloat 4s infinite ease-in-out' }}
          >
            <div className="w-10 h-10 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <div className="text-white text-sm font-bold">Pro Arrived</div>
              <div className="text-[#888888] text-xs">Just now</div>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute top-1/2 -right-12 bg-gradient-to-r from-[#FF4500] to-[#FFB700] py-3 px-5 rounded-2xl shadow-[0_10px_30px_rgba(255,183,0,0.4)] flex items-center gap-3 z-30"
            style={{ animation: 'floatFloat 3s infinite ease-in-out 1s' }}
          >
            <Icon icon="hugeicons:flash" className="w-6 h-6 text-black" />
            <div>
              <div className="text-black text-sm font-black">Super Fast</div>
              <div className="text-black/80 text-xs font-semibold">Verified</div>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={reduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute bottom-20 left-10 bg-white py-3 px-5 rounded-2xl shadow-xl flex items-center gap-3 z-30 text-black"
            style={{ animation: 'floatFloat 3.5s infinite ease-in-out 2s' }}
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border-2 border-white">
               <RemoteLottie url="https://assets9.lottiefiles.com/packages/lf20_UoK4hG.json" className="w-16 h-16 scale-150" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-bold">
                <Star className="w-4 h-4 text-[#FFB700] fill-current" /> 4.9
              </div>
              <div className="text-gray-500 text-xs font-medium">Top Rated PRO</div>
            </div>
          </motion.div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes emberRise {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes floatFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}} />
    </section>
  );
}

function HowItWorksSection({ reduced }: { reduced: boolean }) {
  const steps = [
    { num: 1, title: "Post a Job", desc: "Describe what you need done and post your request in seconds.", icon: "hugeicons:edit-02", color: "from-[#FF4500] to-[#FF8C00]" },
    { num: 2, title: "Receive Bids", desc: "Workers nearby will bid on your job with their price quotes.", icon: "hugeicons:wallet-02", color: "from-[#FF8C00] to-[#FFB700]" },
    { num: 3, title: "Hire & Relax", desc: "Compare ratings and prices, approve a worker, and get it done.", icon: "hugeicons:shield-tick", color: "from-[#FF4500] to-[#FFB700]" },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" className="py-24 bg-[#F5F5F5] text-[#0F0F0F] relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1.0 }}
             className="px-4 py-1.5 rounded-full bg-[rgba(255,69,0,0.1)] text-[#FF4500] text-[12px] font-semibold uppercase tracking-wide mb-4"
          >
            Simple Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="font-['Poppins'] text-4xl font-bold mb-4"
          >
            How UstadOnCall Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-[#666666] max-w-2xl mx-auto"
          >
            We've made hiring local professionals as easy as tapping a button. Post your requirement and let the right person come to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line on Desktop */}
          <div className="hidden md:block absolute top-[28%] left-[15%] w-[70%] h-0.5 border-t-2 border-dashed border-[#DDDDDD] z-0" 
               style={{ 
                 transform: isInView || reduced ? 'scaleX(1)' : 'scaleX(0)', 
                 transformOrigin: 'left', 
                 transition: 'transform 0.8s ease 0.3s' 
               }} 
          />
          
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: reduced ? 0 : 0.3 + idx * 0.15 }}
              className="relative z-10"
            >
              <Tilt options={reduced ? { max: 0, scale: 1 } : defaultTiltOptions}>
                <div className="bg-white rounded-[16px] p-8 shadow-sm border border-[#EEEEEE] overflow-hidden group transition-all duration-300 h-full hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-[#FF4500] cursor-default flex flex-col items-center text-center">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={isInView || reduced ? { opacity: 0.04 } : {}}
                    transition={{ duration: 1.0, delay: reduced ? 0 : 0.6 + idx * 0.15 }}
                    className="absolute -right-6 -bottom-10 font-['Poppins'] font-bold text-[120px] text-black select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.08]"
                  >
                    0{step.num}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={isInView || reduced ? { scale: 1 } : {}}
                    transition={{ duration: 1.0, delay: reduced ? 0 : 0.4 + idx * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
                    className={`w-32 h-32 mb-6 rounded-full bg-gradient-to-br ${step.color} p-[3px] group-hover:scale-110 group-hover:drop-shadow-[0_10px_20px_rgba(255,69,0,0.3)] transition-all duration-300`}
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Icon icon={step.icon} className="w-14 h-14 text-[#0F0F0F] group-hover:text-[#FF4500] transition-colors duration-300" />
                    </div>
                  </motion.div>
                  
                  <h3 className="font-['Poppins'] text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[#FF4500]">{step.title}</h3>
                  <p className="text-[#666666] text-sm leading-relaxed">{step.desc}</p>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ reduced }: { reduced: boolean }) {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    { 
      title: "Electrician", 
      desc: "Wiring, switchboard repairs, appliance installations & fault finding.", 
      icon: "hugeicons:plug-socket",
      details: ["Complete House Wiring", "Switchboard Repair & Replacement", "UPS Installation", "Ceiling Fan & Light Fitting", "Fault Finding & Diagnostics", "Appliance Repair (Oven, Fridge)"] 
    },
    { 
      title: "Plumber", 
      desc: "Pipe leaks, unblocking, installations & water heater services.", 
      icon: "hugeicons:wrench-01",
      details: ["Water Leakage Repair", "Drain Unblocking", "Water Heater / Geyser Service", "Kitchen & Bathroom Fittings", "Water Motor Repair & Install", "PPRC Pipe Installation"] 
    },
    { 
      title: "AC Technician", 
      desc: "Servicing, gas refill, installation and regular maintenance.", 
      icon: "mdi:air-conditioner",
      details: ["AC Regular Service", "Gas Refilling", "New AC Installation", "AC Repair & Troubleshooting", "Compressor Replacement", "Split & Window AC Support"] 
    },
    { 
      title: "Mechanic", 
      desc: "On-spot car & bike repairs, oil change, and diagnostics.", 
      icon: "hugeicons:car-03",
      details: ["On-Spot Car Starting Issue", "Oil & Filter Change", "Brake Pad Replacement", "Battery Jump Start / Replace", "Engine Diagnostics", "Tire Puncture & Replacement"] 
    },
    { 
      title: "Carpenter", 
      desc: "Furniture polish, custom repairs, assembly & wooden fittings.", 
      icon: "mdi:saw-blade",
      details: ["Door & Lock Repair", "Furniture Assembly", "Custom Wardrobe Creation", "Wooden Floor Polishing", "Sofa Repair & Polish", "Kitchen Cabinets Repair"] 
    },
    { 
      title: "Painter", 
      desc: "Home, office, interior, exterior & texturing painting services.", 
      icon: "hugeicons:paint-brush-01",
      details: ["Interior Wall Painting", "Exterior Weather Shield", "Wood Polish & Paint", "Textured Wall Designs", "Dampness Treatment", "Ceiling Painting"] 
    },
  ];

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-[#0F0F0F] relative overflow-hidden" ref={sectionRef}>
      {/* Background Ambience */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#FF4500] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#FFB700] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
               initial={{ opacity: 0, y: 40 }}
               animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
               transition={{ duration: 1.0 }}
               className="px-4 py-1.5 rounded-full inline-flex items-center gap-2 bg-[rgba(255,69,0,0.15)] text-[#FF4500] text-[12px] font-semibold uppercase tracking-wide mb-6 border border-[rgba(255,69,0,0.3)]"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
              Our Services
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.0, delay: 0.1 }}
              className="font-['Poppins'] text-4xl md:text-5xl font-bold leading-tight"
            >
              Professional expertise, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFB700]">
                right at your doorstep.
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView || reduced ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            <button className="group flex items-center gap-3 h-12 px-6 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <span className="text-[#F5F5F5] font-semibold text-sm">View All Categories</span>
              <div className="w-8 h-8 rounded-full bg-[#FF4500] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight size={16} className="text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence>
            {activeService === null && (
              <motion.div 
                key="grid"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              >
                {services.map((svc, idx) => (
                  <ServiceCard 
                    key={`card-${idx}`} 
                    index={idx}
                    svc={svc} 
                    delay={0.2 + idx * 0.1} 
                    reduced={reduced}
                    onClick={() => setActiveService(idx)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {activeService !== null && (
              <motion.div
                key="expanded-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex flex-col"
              >
                <motion.div
                  layoutId={`card-container-${activeService}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                  className="w-full h-full"
                >
                  <ExpandedServiceCard 
                    svc={services[activeService]} 
                    onClose={() => setActiveService(null)} 
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import { Icon } from '@iconify/react';
import { Tilt } from 'react-tilt';

const defaultTiltOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            15,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.02,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,   // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

function ServiceCard({ svc, delay, reduced, onClick, index }: { svc: any, delay: number, reduced: boolean, onClick: () => void, index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      layoutId={`card-container-${index}`}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: reduced ? 0 : delay }}
      className="h-full"
    >
      <Tilt options={reduced ? { max: 0, scale: 1 } : defaultTiltOptions}>
        <div 
          onClick={onClick}
          className="group relative h-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 md:p-8 overflow-hidden cursor-pointer hover:border-[#FF4500] transition-all duration-500"
        >
          {/* Background Glow Effect on Hover */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4500] opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFB700] opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-500 rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full pointer-events-none">
            <div className="flex justify-between items-start mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#333] flex items-center justify-center group-hover:from-[#FF4500] group-hover:to-[#FFB700] group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(255,69,0,0.3)] transition-all duration-500 group-hover:-translate-y-1">
                <Icon icon={svc.icon} className="w-8 h-8 text-[#F5F5F5] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.03)] flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-[#FF4500] transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                <ArrowRight size={16} className="text-white" />
              </div>
            </div>
            
            <h3 className="font-['Poppins'] text-2xl font-bold mb-3 text-[#F5F5F5] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF4500] group-hover:to-[#FFB700] transition-all duration-300">{svc.title}</h3>
            <p className="text-[#888888] text-[15px] leading-relaxed group-hover:text-[#BBBBBB] transition-colors duration-300">{svc.desc}</p>
            
            <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-semibold text-[#666] group-hover:text-[#FF4500] transition-colors duration-300">
              <span>Explore Services</span>
              <div className="h-[1px] w-4 bg-[#666] group-hover:bg-[#FF4500] group-hover:w-8 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

function ExpandedServiceCard({ svc, onClose }: { svc: any, onClose: () => void }) {
  return (
    <div className="w-full h-full bg-[#1A1A1A] border border-[#FF4500] rounded-2xl p-8 md:p-12 overflow-hidden relative shadow-[0_0_40px_rgba(255,69,0,0.15)] flex flex-col md:flex-row gap-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF4500] opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFB700] opacity-10 blur-[100px] rounded-full pointer-events-none" />
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF4500] hover:text-white hover:border-transparent transition-all z-20"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>

      {/* Left Column */}
      <div className="w-full md:w-[40%] flex flex-col relative z-10 border-b md:border-b-0 md:border-r border-[#2A2A2A] pb-8 md:pb-0 md:pr-12">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#FFB700] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,69,0,0.3)]">
          <Icon icon={svc.icon} className="w-10 h-10 text-white" />
        </div>
        <h3 className="font-['Poppins'] text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFB700]">
          {svc.title}
        </h3>
        <p className="text-[#888888] text-lg leading-relaxed mb-8 flex-grow">
          {svc.desc}
        </p>
        <button className="h-14 px-8 bg-[#FF4500] text-white rounded-xl font-bold text-lg w-full md:w-auto hover:bg-[#E03E00] hover:shadow-[0_10px_20px_rgba(255,69,0,0.3)] transition-all duration-300 flex items-center justify-center gap-2">
          Book {svc.title} Now <ArrowRight size={20} />
        </button>
      </div>

      {/* Right Column (Details) */}
      <div className="w-full md:w-[60%] relative z-10 pt-4 md:pt-0">
        <h4 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <Icon icon="hugeicons:check-list" className="text-[#FF4500] w-7 h-7" />
          Services Included
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {svc.details.map((detail: string, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="flex items-start gap-3 p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF4500]/40 hover:bg-white/10 transition-colors group"
            >
              <CheckCircle2 className="w-5 h-5 text-[#FF4500] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="text-[#F5F5F5] font-medium leading-relaxed">{detail}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppShowcaseSection({ reduced }: { reduced: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#F5F5F5] text-[#0F0F0F] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Left: Text & CTA */}
        <div className="w-full md:w-1/2">
          <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
             transition={{ duration: 1.0 }}
             className="px-4 py-1.5 rounded-full bg-[rgba(255,69,0,0.1)] text-[#FF4500] text-[12px] font-semibold uppercase tracking-wide mb-6 inline-block"
          >
            Go Mobile
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="font-['Poppins'] text-4xl md:text-5xl font-bold mb-6 leading-[1.2]"
          >
            Manage everything from your pocket.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-[#666666] leading-relaxed mb-10 max-w-lg text-lg"
          >
            Download the UstadOnCall app to track pros in real-time, view detailed invoices, and get exclusive mobile-only discounts. Available on iOS and Android.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView || reduced ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Magnetic>
              <button className="h-[54px] px-6 bg-[#0F0F0F] rounded-xl flex items-center justify-center gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group">
                <Icon icon="logos:google-play-icon" className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span className="text-[#888888] text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Get it on</span>
                  <span className="text-white text-sm font-semibold leading-none text-left">Google Play</span>
                </div>
              </button>
            </Magnetic>
            <Magnetic>
              <button className="h-[54px] px-6 bg-[#0F0F0F] rounded-xl flex items-center justify-center gap-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto group">
                <Icon icon="ic:baseline-apple" className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span className="text-[#888888] text-[10px] uppercase font-bold tracking-wider leading-none mb-1">GET IT ON</span>
                  <span className="text-white text-sm font-semibold leading-none text-left">App Store</span>
                </div>
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: Floating CSS Phone */}
        <div className="w-full md:w-1/2 h-[600px] relative mt-12 md:mt-0 flex justify-center items-center">
          <motion.div
            initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, y: 50 }}
            animate={isInView || reduced ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4, type: "spring", bounce: 0.4 }}
            className="relative"
          >
            <Tilt options={reduced ? { max: 0 } : { max: 15, scale: 1.02, perspective: 1000 }}>
              {/* Phone Mockup Body */}
              <div className="w-[300px] h-[600px] bg-[#0F0F0F] rounded-[48px] border-[10px] border-[#1A1A1A] shadow-[0_30px_60px_rgba(0,0,0,0.2)] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1A1A1A] rounded-b-3xl z-20" />
                
                {/* Screen Wrapper */}
                <div className="w-full h-full bg-[#111111] relative flex flex-col pt-14 pb-6 px-5 z-10 overflow-hidden">
                  {/* Decorative Glow inside screen */}
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#FF4500] opacity-20 blur-[60px] rounded-full pointer-events-none" />
                  
                  {/* Header Area */}
                  <div className="flex justify-between items-center mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4500] to-[#FFB700] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-sm">U</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">Hi, Shaheer!</div>
                        <div className="text-[#888] text-xs">Need a service?</div>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon icon="hugeicons:notification-01" className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Active Job Card */}
                  <div className="w-full rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#FFB700] p-5 mb-6 shadow-[0_10px_20px_rgba(255,69,0,0.2)] relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/80 text-xs font-semibold uppercase tracking-wide">Ongoing</span>
                      <span className="text-white font-bold text-sm">₹ 1,500</span>
                    </div>
                    <div className="text-white font-bold text-lg mb-1">AC Repair</div>
                    <div className="text-white/90 text-sm mb-4">Technician arriving in 15 mins</div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Icon icon="hugeicons:user" className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">Ali Khan</span>
                      <div className="ml-auto w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#FF4500]">
                        <Icon icon="hugeicons:telephone-receive" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-white font-semibold text-sm mb-4 relative z-10">Popular Categories</div>
                  
                  {/* Categories Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-auto relative z-10">
                    {[
                      { i: "hugeicons:plug-socket", l: "Electrician", c: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                      { i: "hugeicons:wrench-01", l: "Plumber", c: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                      { i: "hugeicons:car-03", l: "Mechanic", c: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                      { i: "hugeicons:paint-brush-01", l: "Painter", c: "bg-pink-500/10 text-pink-400 border-pink-500/20" }
                    ].map((cat, idx) => (
                      <div key={idx} className="rounded-2xl bg-white/5 border border-white/5 p-4 flex flex-col items-center justify-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${cat.c}`}>
                          <Icon icon={cat.i} className="w-5 h-5" />
                        </div>
                        <span className="text-[#CCC] text-xs font-medium">{cat.l}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Navigation */}
                  <div className="w-full h-16 mt-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-between px-6 relative z-10">
                    <Icon icon="hugeicons:home-01" className="w-6 h-6 text-[#FF4500]" />
                    <Icon icon="hugeicons:calendar-01" className="w-6 h-6 text-[#666]" />
                    <Icon icon="hugeicons:message-01" className="w-6 h-6 text-[#666]" />
                    <Icon icon="hugeicons:user" className="w-6 h-6 text-[#666]" />
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatsCounterSection({ reduced }: { reduced: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { label: "Jobs Completed", target: 50 },
    { label: "Active Workers", target: 10 },
    { label: "Cities Covered", target: 5 },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-[#FF4500] to-[#FFB700] text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12" ref={ref}>
        <motion.div 
           initial={{ scale: 0.96, opacity: 0 }}
           animate={isInView || reduced ? { scale: 1, opacity: 1 } : {}}
           transition={{ duration: 1.0 }}
           className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-[rgba(0,0,0,0.1)]"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center pt-8 md:pt-0">
              <Counter target={stat.target} start={isInView} reduced={reduced} />
              <div className="font-semibold text-[rgba(0,0,0,0.7)] mt-2 uppercase tracking-wider text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ target, start, reduced }: { target: number, start: boolean, reduced: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) {
      setCount(target);
      return;
    }
    if (start) {
      let startTime: number;
      const duration = 1500;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeProgress * target));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [start, target, reduced]);

  return (
    <motion.div 
      animate={start && !reduced && count === target ? { scale: [1, 1.1, 1] } : {}} 
      transition={{ duration: 0.3 }}
      className="font-['Poppins'] text-6xl font-black"
    >
      {count}k+
    </motion.div>
  );
}

function TestimonialsSection({ reduced }: { reduced: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const testimonials = [
    { name: "Ahmed Raza", role: "Verified Customer", text: "UstadOnCall saved my day! Got a reliable electrician within 20 minutes when my AC broke down in peak summer.", avatar: "https://i.pravatar.cc/150?img=11" },
    { name: "Bilal Hussain", role: "Pro Plumber", text: "This platform has doubled my monthly income. The bidding system is fair and payments are always on time. Highly recommended for workers.", avatar: "https://i.pravatar.cc/150?img=33" },
    { name: "Sara Khan", role: "Verified Customer", text: "Love the transparency. I knew exactly who was coming and how much it would cost before they even arrived. Super safe.", avatar: "https://i.pravatar.cc/150?img=5" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#0F0F0F] text-[#F5F5F5] relative overflow-hidden border-t border-[#2A2A2A]">
      <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,183,0,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <Quote className="w-16 h-16 text-[#FF4500] opacity-20 mx-auto mb-10" />
        
        <div className="h-[240px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              animate={reduced ? {} : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute w-full"
            >
              <p className="font-['Poppins'] text-2xl md:text-4xl font-semibold leading-relaxed mb-10 text-[#F5F5F5]">
                "{testimonials[activeIdx].text}"
              </p>
              
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <img 
                    src={testimonials[activeIdx].avatar} 
                    alt={testimonials[activeIdx].name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#FF4500] shadow-[0_0_20px_rgba(255,69,0,0.3)]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] rounded-full border-2 border-[#0F0F0F] flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-lg text-white">{testimonials[activeIdx].name}</div>
                  <div className="text-sm font-semibold bg-gradient-to-r from-[#FF4500] to-[#FFB700] text-transparent bg-clip-text uppercase tracking-wide">
                    {testimonials[activeIdx].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIdx ? 'w-8 bg-[#FF4500]' : 'w-2 bg-[#333333] hover:bg-[#555]'}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[rgba(255,255,255,0.05)] pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF4500] to-transparent opacity-30" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-default">
              <div className="w-8 h-8 bg-[#FF4500] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="font-['Poppins'] text-lg font-bold">
                <span className="text-white">Ustad</span>
                <span className="text-[#FF4500]">OnCall</span>
              </span>
            </div>
            <p className="text-[#888888] text-sm leading-relaxed mb-6">
              Pakistan's trusted platform bridging the gap between skilled workers and people who need them.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Facebook', icon: 'mdi:facebook' },
                { name: 'Twitter', icon: 'mdi:twitter' },
                { name: 'Instagram', icon: 'mdi:instagram' },
                { name: 'LinkedIn', icon: 'mdi:linkedin' }
              ].map((social) => (
                <a key={social.name} href="#" aria-label={social.name} className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#888888] hover:bg-[#FF4500] hover:text-white hover:scale-110 transition-all duration-300">
                  <Icon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-[#888888]">
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">Electricians</a></li>
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">Plumbers</a></li>
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">AC Technicians</a></li>
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">Mechanics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-[#888888]">
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF4500] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6">Get the App</h4>
            <div className="space-y-4">
              <button className="w-full h-[54px] bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] hover:border-[#00e676] hover:bg-[#202020] flex items-center justify-center gap-3 transition-colors group px-4">
                <Icon icon="logos:google-play-icon" className="w-7 h-7 group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span className="text-[#888888] text-[10px] uppercase font-bold tracking-wider leading-none mb-1">Get it on</span>
                  <span className="text-white text-sm font-semibold leading-none text-left">Google Play</span>
                </div>
              </button>
              <button className="w-full h-[54px] bg-[#1A1A1A] rounded-xl border border-[#2A2A2A] hover:border-[#4FA9FF] hover:bg-[#202020] flex items-center justify-center gap-3 transition-colors group px-4">
                <Icon icon="ic:baseline-apple" className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
                <div className="flex flex-col items-start">
                  <span className="text-[#888888] text-[10px] uppercase font-bold tracking-wider leading-none mb-1">GET IT ON</span>
                  <span className="text-white text-sm font-semibold leading-none text-left">App Store</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#1A1A1A] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#555555] text-sm">© 2026 UstadOnCall. All rights reserved.</p>
          <div className="text-[#555555] text-sm flex gap-6">
            <a href="#" className="hover:text-white">Help Center</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[999] group cursor-pointer" onClick={(e) => { e.preventDefault(); onClick(); }}>
      <Magnetic>
        <motion.div 
          initial={{ y: 80, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ delay: 2.0, duration: 1.0, type: 'spring', bounce: 0.5 }}
          whileHover={{ scale: 1.12, rotate: -5 }}
          className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] relative block"
        >
          <MessageCircle size={30} className="text-white" />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-[#25D366] pointer-events-none" style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-sm font-bold py-2 px-4 rounded-lg shadow-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap">
            Chat Support
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
          </div>
        </motion.div>
      </Magnetic>
    </div>
  );
}

function RemoteLottie({ url, className }: { url: string, className?: string }) {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, [url]);

  if (!data) return <div className={`animate-pulse bg-[#1A1A1A] rounded-full ${className}`} />;

  return <Lottie animationData={data} loop={true} className={className} />;
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: springX.get(), y: springY.get() }}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: "rgba(255, 69, 0, 0.4)",
      mixBlendMode: "difference" as any,
      border: "0px solid transparent"
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 1,
      backgroundColor: "transparent",
      border: "2px solid #FF4500",
      mixBlendMode: "normal" as any
    }
  };

  return (
    <motion.div
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.2 }}
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[10000] hidden md:block"
    />
  );
}

function ChatModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello UstadOnCall!\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Message:* ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/923119555691?text=${encodedText}`, '_blank');
    onClose();
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="relative w-full max-w-md bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden cursor-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A] bg-gradient-to-r from-[rgba(37,211,102,0.1)] to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg font-['Poppins']">Chat with Us</h3>
                  <p className="text-[#888888] text-xs">We typically reply in minutes</p>
                </div>
              </div>
              <button onClick={onClose} className="text-[#888888] hover:text-white transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <input 
                type="text" 
                required 
                placeholder="Your Name" 
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#25D366] transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                required 
                placeholder="Email Address" 
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#25D366] transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="tel" 
                required 
                placeholder="Phone Number" 
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#25D366] transition-colors"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
              <textarea 
                required 
                placeholder="How can we help you?" 
                rows={3}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder:text-[#555] focus:outline-none focus:border-[#25D366] transition-colors resize-none"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
              <button 
                type="submit" 
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.2)] cursor-pointer"
              >
                Send via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


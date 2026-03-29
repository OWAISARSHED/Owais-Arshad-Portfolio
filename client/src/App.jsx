import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { FiGithub as Github, FiLinkedin as Linkedin, FiMail as Mail, FiMapPin as MapPin, FiPhone as Phone, FiTerminal as Terminal, FiCheckCircle as CheckCircle, FiDatabase as Database, FiAward as Award, FiBriefcase as Briefcase, FiVideo as Video, FiExternalLink as ExternalLink, FiMenu, FiX } from 'react-icons/fi';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');
  const [githubProjects, setGithubProjects] = useState([]);
  const [showCertModal, setShowCertModal] = useState(false);
  const [activeCert, setActiveCert] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('https://api.github.com/users/OWAISARSHED/repos')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
          const filteredRepos = data.filter(repo => !repo.name.toLowerCase().includes('personal-portfolio'));
          setGithubProjects(filteredRepos);
        }
      })
      .catch(err => console.error("Error fetching GitHub repos:", err));
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('Failed to send message. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('Network error. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="portfolio-container">
      {/* Secure Modal PDF Viewer */}
      {showCertModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.85)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', userSelect: 'none' }} onClick={() => setShowCertModal(false)}>
          <div style={{ width: '90%', maxWidth: '1000px', height: '85vh', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', position: 'relative', border: '1px solid var(--accent-1)', boxShadow: '0 10px 40px rgba(0,234,239,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '15px 20px', background: '#000', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', zIndex: 10 }}>
               <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Secure Document Viewer</h3>
               <button onClick={() => setShowCertModal(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.8rem', cursor: 'pointer', lineHeight: '1' }}>&times;</button>
            </div>
            <iframe src={`${activeCert}#toolbar=0&navpanes=0&view=Fit`} width="100%" height="100%" style={{ border: 'none', position: 'relative', zIndex: 1, backgroundColor: '#ffffff' }} title="Secure Document Viewer"></iframe>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/"><img src="/logo.png" alt="OA Tech Logo" style={{ height: "40px", width: "auto", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.1)" }} /></a>
            <span style={{ fontSize: "1.2rem", fontWeight: "700" }}>OA <span className="accent-text">Agency</span></span>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#experience" onClick={() => setIsMobileMenuOpen(false)}>Experience</a>
            <a href="#qanalyz" onClick={() => setIsMobileMenuOpen(false)}>QAnalyz</a>
            <a href="#workflows" onClick={() => setIsMobileMenuOpen(false)}>Workflows</a>
            <a href="#fiverr" onClick={() => setIsMobileMenuOpen(false)}>Fiverr</a>
            <a href="#github" onClick={() => setIsMobileMenuOpen(false)}>GitHub</a>
            <a href="#certifications" onClick={() => setIsMobileMenuOpen(false)}>Certifications</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <button 
              onClick={() => { setActiveCert("/resume.pdf"); setShowCertModal(true); setIsMobileMenuOpen(false); }} 
              className="btn btn-primary" 
              style={{ padding: "0.4rem 1rem", fontSize: "0.9rem", marginLeft: "1rem", whiteSpace: "nowrap" }}>
              View Resume
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="section-container hero-split">
          <motion.div 
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h4 className="hero-subtitle" variants={fadeInUp}>Welcome to my corner,</motion.h4>
            <motion.h1 className="hero-title" variants={fadeInUp}>Owais Arshad</motion.h1>
            <motion.h2 className="hero-role" variants={fadeInUp} style={{ minHeight: "4rem" }}>
              <Typewriter 
                options={{ 
                  strings: [
                    '<span class="accent-text">QA Engineer</span> & AI Agent Expert', 
                    '<span class="accent-text">AI Consultant</span> & Prompt Engineer', 
                    '<span class="accent-text">WordPress</span> Developer'
                  ], 
                  autoStart: true, 
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30
                }} 
              />
            </motion.h2>
            <motion.p className="hero-description" variants={fadeInUp}>
              Bridging the gap between absolute software quality and Agentic AI operations. 
              Passionate about building robust automated testing frameworks, autonomous intelligent bots, and deploying generative models.
            </motion.p>
            <motion.div className="hero-cta" variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href="https://cal.com/owais-arshad-l8zgub/15min" target="_blank" rel="noreferrer" className="btn" style={{ background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)", color: "white", padding: "0.8rem 1.5rem", borderRadius: "50px", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold", border: "none" }}>
                Book Free Consultation <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
              </a>
              <a href="#workflows" className="btn" style={{ background: "rgba(255, 255, 255, 0.05)", color: "white", border: "1px solid rgba(255, 255, 255, 0.2)", padding: "0.8rem 1.5rem", borderRadius: "50px", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold" }}>
                View My Work <Briefcase size={18} />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="hero-image-wrapper floating-element"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, delay: 0.2 } }}
          >
            <div className="hero-image-glow"></div>
            <img src="/profile.jpg" alt="Owais Arshad Profile" className="hero-image" />
          </motion.div>
        </div>
        
        {/* Abstract Animation Background Elements */}
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="section about" id="about">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Currently pursuing a Bachelor of Science in Software Engineering at Shifa Tameer-e-Millat University, expected to graduate in October 2027, while leading management roles at Shifa Sports Society and Shifa Freelancing Society. These roles focus on driving student engagement, promoting sports culture, and organizing events to empower students with technical and creative skills.
              </p>
              <br/>
              <p>
                I am a dedicated professional offering comprehensive freelance services in AI Video Generation, Quality Assurance, and Web Development. My goal is to execute technological solutions that transcend the limitations of manual interaction.
              </p>
              
              <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "600", color: "var(--accent-1)" }}>Top Skills & Services</h3>
                <div className="skills-tags" style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem" }}>
                  <span>AI Video Generation</span>
                  <span>Software Testing (QA)</span>
                  <span>Web Development</span>
                  <span>WordPress Design</span>
                  <span>Business Analytics</span>
                  <span>Project Management</span>
                  <span>Online Advertising</span>
                  <span>Blogging</span>
                </div>
              </div>

              <div className="contact-pills">
                <span className="pill"><MapPin size={16}/> Islamabad, Pakistan</span>
                <span className="pill"><Phone size={16}/> +92-310-9191005</span>
                <span className="pill"><Mail size={16}/> work19316@gmail.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="section experience" id="experience">
         <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <h2 className="section-heading">Experience</h2>
          
          <div className="timeline">
            {/* QA Engineer */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>QA Engineer</h3>
                <h4>QAnalyz | Jan 2026 – Present | Pakistan · Remote</h4>
                <p>Started my professional journey as a QA Engineer at QAnalyz, where I am responsible for ensuring software quality, performance, and reliability through structured testing processes.</p>
                <Link to="/qa-services" style={{ color: "var(--accent-1)", display: "inline-block", marginTop: "1rem", fontWeight: "bold" }}>Review QA Methodologies &rarr;</Link>
              </div>
            </motion.div>

            {/* Head Management */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Head Management</h3>
                <h4>Shifa Sports Society | Nov 2025 – Present | Part-time</h4>
                <p>Appointed as the Head of Management for the Shifa Sports Society. Responsible for overseeing the society's day-to-day operations, strategic planning, and team management.</p>
              </div>
            </motion.div>

            {/* Event Management */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Head of Event Management</h3>
                <h4>Shifa Freelancing Society (SFS) | Nov 2025 – Present | Islamabad, Pakistan</h4>
                <p>Leading the event management team for the Fall 2025 tenure. Responsible for planning, organizing, and executing all society events, including workshops and seminars.</p>
              </div>
            </motion.div>

            {/* AI Video Specialist */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>AI Video Specialist</h3>
                <h4>Self-employed | Dec 2024 – Present | Remote</h4>
                <p>Provided freelance AI video generation services for clients in marketing, social media, and content creation. Specialized in transforming text prompts, images, and creative concepts into high-quality, engaging videos.</p>
                <Link to="/ai-services" style={{ color: "var(--accent-1)", display: "inline-block", marginTop: "1rem", fontWeight: "bold" }}>Discover AI Architecture &rarr;</Link>
              </div>
            </motion.div>

            {/* Freelance QA */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Freelance QA</h3>
                <h4>Fiverr · Freelance | Jan 2024 – Present | Remote</h4>
                <p>As a freelance QA tester on Fiverr, I collaborated with multiple clients to enhance their software quality before launch.</p>
              </div>
            </motion.div>

            {/* QA Engineer (Manual & Automation) */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>QA Engineer (Manual & Automation)</h3>
                <h4>Technology Solutions Company | Jan 2023 – Present | Remote</h4>
                <p>Designed and executed 500+ test cases across 12+ projects covering functional, regression, and performance testing scenarios.</p>
                <p>Performed manual and automated testing using Selenium and Cypress, reducing regression testing time by 60%.</p>
              </div>
            </motion.div>

            {/* Freelance WordPress Developer */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Freelance WordPress Developer</h3>
                <h4>Self-Employed | Jan 2023 – Present | Remote</h4>
                <p>Designed and developed 15+ custom WordPress websites across diverse industries, focusing on responsive design and SEO optimization.</p>
                <p>Increased client website traffic by an average of 40% through implementations of performance optimization techniques.</p>
              </div>
            </motion.div>

            {/* Full Stack Dev */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Junior Full Stack Developer</h3>
                <h4>Decentral Developers | Jun 2024 – Sep 2024 | Remote</h4>
                <p>Collaborated with cross-functional teams to design, develop, and deploy responsive web applications using modern full-stack technologies.</p>
                <p>Implemented RESTful APIs and integrated front-end components, improving application performance and user experience.</p>
              </div>
            </motion.div>
            
          </div>
        </motion.div>
      </section>

      {/* QAnalyz Showcase Section */}
      <section className="section qanalyz" id="qanalyz" style={{ background: "linear-gradient(135deg, rgba(29, 191, 115, 0.05) 0%, rgba(30, 30, 36, 1) 100%)", padding: "5rem 0", borderTop: "1px solid var(--glass-border)", borderBottom: "1px solid var(--glass-border)", margin: "4rem 0" }}>
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "3rem", justifyContent: "space-between" }}>
            
            {/* Left Content */}
            <div style={{ flex: "1 1 min(100%, 500px)" }}>
              <div style={{ display: "inline-block", padding: "0.5rem 1rem", background: "rgba(29, 191, 115, 0.1)", color: "var(--accent-1)", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "1.5rem", border: "1px solid rgba(29, 191, 115, 0.3)" }}>
                Enterprise QA Partner
              </div>
              <h2 style={{ fontSize: "2.8rem", marginBottom: "1rem", color: "var(--text-primary)", lineHeight: "1.2" }}>
                Elevating Software Quality with <span style={{ color: "var(--accent-1)" }}>QAnalyz</span>
              </h2>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "normal", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                My Role: <strong style={{ color: "var(--text-primary)" }}>QA Engineer</strong>
              </h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2.5rem", color: "var(--text-secondary)" }}>
                As a dedicated QA Engineer at QAnalyz, I architect and execute meticulous testing lifecycles. We ensure enterprise-grade software quality, peak performance, and absolute reliability before any product reaches the market. Whether it's robust automated frameworks or rigorous manual testing, QAnalyz delivers perfection.
              </p>
              <a href="https://qanalyz.com/" target="_blank" rel="noreferrer" className="btn" style={{ background: "var(--accent-1)", color: "white", padding: "1rem 2rem", fontSize: "1.1rem", borderRadius: "8px", fontWeight: "bold", boxShadow: "0 4px 14px 0 rgba(29, 191, 115, 0.3)" }}>
                Get Elite QA Services from QAnalyz
              </a>
            </div>

            {/* Right Badge/Graphic */}
            <div style={{ flex: "1 1 min(100%, 350px)", display: "flex", justifyContent: "center" }}>
               <div style={{ width: "100%", padding: "3rem 2rem", background: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--glass-border)", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-50px", left: "-50px", width: "100px", height: "100px", background: "var(--accent-1)", filter: "blur(50px)", opacity: "0.5" }}></div>
                  <CheckCircle size={56} color="var(--accent-1)" style={{ marginBottom: "1.5rem" }} />
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "var(--text-primary)" }}>Flawless Delivery</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.6" }}>Leveraging structured automation and deep manual testing techniques to eliminate critical bugs before production deployment.</p>
               </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Workflows & Automations Section (Moved under Experience) */}

      <section className="section workflows" id="workflows">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <h2 className="section-heading">Impactful Workflows & Automation</h2>
          
          <div className="workflow-grid">
            {/* WhatsApp */}
            <motion.div className="workflow-card box-glass" variants={fadeInUp}>
              <div className="workflow-video-container">
                <video src="/whatsapp.mp4" autoPlay loop muted playsInline className="workflow-video"></video>
              </div>
              <div className="workflow-info">
                <h3><Video className="workflow-icon" /> Intelligent WhatsApp Chatbot</h3>
                <p>An autonomous conversational agent capable of mimicking natural communication, processing inbound leads, parsing commands, and sending dynamic replies instantly without manual intervention 24/7.</p>
                <div className="tech-stack"><span>Automation</span><span>Bot Framework</span><span>Data Parsing</span></div>
              </div>
            </motion.div>

            {/* Instagram */}
            <motion.div className="workflow-card box-glass" variants={fadeInUp}>
              <div className="workflow-video-container">
                <video src="/instagram.mp4" autoPlay loop muted playsInline className="workflow-video"></video>
              </div>
              <div className="workflow-info">
                <h3><Video className="workflow-icon" /> Instagram Post Automation</h3>
                <p>An end-to-end Python pipeline engineered to systematize social media curation. Eliminates manual application execution by programmatically publishing content, scaling accounts efficiently.</p>
                <div className="tech-stack"><span>Python</span><span>Web Automation</span><span>Media Handling</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Fiverr Gigs Section */}
      <section className="section fiverr-gigs" id="fiverr">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>Freelance Fiverr Gigs</h2>
            <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn" style={{ background: "#1dbf73", color: "white", padding: "0.8rem 1.5rem" }}>
              Hire Me on Fiverr
            </a>
          </div>
          
          <div className="projects-grid">
            {/* Gig 1 */}
            <motion.div className="project-card box-glass" variants={fadeInUp} style={{ padding: 0, overflow: "hidden" }}>
              <img src="https://placehold.co/600x400/1e1e24/1dbf73?text=AI+Agent+Automation" alt="AI Agent Gig" style={{ width: "100%", height: "200px", objectFit: "cover", borderBottom: "1px solid var(--glass-border)" }} />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>I will build autonomous AI Agents and WhatsApp Chatbots</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--accent-1)", fontWeight: "bold" }}>STARTING AT $50</span>
                  <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn" style={{ background: "#1dbf73", color: "white", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>Order Now</a>
                </div>
              </div>
            </motion.div>

            {/* Gig 2 */}
            <motion.div className="project-card box-glass" variants={fadeInUp} style={{ padding: 0, overflow: "hidden" }}>
              <img src="https://placehold.co/600x400/1e1e24/1dbf73?text=QA+Testing" alt="QA Testing Gig" style={{ width: "100%", height: "200px", objectFit: "cover", borderBottom: "1px solid var(--glass-border)" }} />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>I will perform rigorous manual and automated QA testing</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--accent-1)", fontWeight: "bold" }}>STARTING AT $30</span>
                  <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn" style={{ background: "#1dbf73", color: "white", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>Order Now</a>
                </div>
              </div>
            </motion.div>

            {/* Gig 3 */}
            <motion.div className="project-card box-glass" variants={fadeInUp} style={{ padding: 0, overflow: "hidden" }}>
              <img src="https://placehold.co/600x400/1e1e24/1dbf73?text=WordPress+Development" alt="WordPress Gig" style={{ width: "100%", height: "200px", objectFit: "cover", borderBottom: "1px solid var(--glass-border)" }} />
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>I will develop a responsive, SEO-optimized WordPress site</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "var(--accent-1)", fontWeight: "bold" }}>STARTING AT $100</span>
                  <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn" style={{ background: "#1dbf73", color: "white", padding: "0.5rem 1rem", fontSize: "0.9rem" }}>Order Now</a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* GitHub Projects */}
      <section className="section github-projects" id="github">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <h2 className="section-heading">My GitHub Repositories</h2>
          <div className="projects-grid">
            {githubProjects.length > 0 ? githubProjects.map(repo => (
              <motion.a href={repo.html_url} target="_blank" rel="noreferrer" className="project-card box-glass" style={{display: "block"}} variants={fadeInUp} key={repo.id}>
                <Github className="project-icon" />
                <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {repo.name} 
                  <ExternalLink size={18} />
                </h3>
                {repo.language && <div className="tech-stack" style={{marginTop:"1rem"}}><span>{repo.language}</span></div>}
              </motion.a>
            )) : <p>Loading repositories...</p>}
          </div>
        </motion.div>
      </section>

      {/* Massive Certifications Section */}
      <section className="section certifications" id="certifications">
         <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">Licenses & Certifications Validation</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>Securely view my validated credentials and badges below.</p>
          
          <div className="cert-grid" onClick={(e) => {
            const link = e.target.closest('a');
            if (link && !link.href.includes('mailto:')) {
              e.preventDefault();
              setActiveCert(link.href);
              setShowCertModal(true);
            }
          }}>
            {/* QA & Testing */}
             <div className="cert-category box-glass">
              <h3><CheckCircle size={20} className="cert-icon" /> QA & Testing</h3>
              <ul className="cert-list">
                <li><a href="/certs/ISTQB Foundation Level  certificate fully.pdf" target="_blank" rel="noreferrer">ISTQB Foundation Level Certification</a></li>
                <li><a href="/certs/Black-box and White-box Testing certificate.pdf" target="_blank" rel="noreferrer">Black-box and White-box Testing</a></li>
                <li><a href="/certs/Foundation of Software testing and Validation.pdf" target="_blank" rel="noreferrer">Foundation of Software Testing</a></li>
                <li><a href="/certs/Fundamentals of Static Testing cource.pdf" target="_blank" rel="noreferrer">Fundamentals of Static Testing</a></li>
                <li><a href="/certs/Essential Testing Techniques in Software Development certificte.pdf" target="_blank" rel="noreferrer">Essential Testing Techniques</a></li>
                <li><a href="/certs/Introduction to Software Quality Assurance.pdf" target="_blank" rel="noreferrer">Software Quality Assurance</a></li>
                <li><a href="/certs/Introduction to Automated Analysis courses.pdf" target="_blank" rel="noreferrer">Introduction to Automated Analysis</a></li>
                <li><a href="/certs/Introduction to Software Testing.pdf" target="_blank" rel="noreferrer">Introduction to Software Testing</a></li>
                <li><a href="/certs/Selenium Course for Beginners.pdf" target="_blank" rel="noreferrer">Selenium Course for Beginners</a></li>
                <li><a href="/certs/Software Testing and Automation Specialization Certificate.pdf" target="_blank" rel="noreferrer">Testing & Automation Specialization</a></li>
              </ul>
            </div>

            {/* AI & Automation */}
            <div className="cert-category box-glass">
              <h3><Terminal size={20} className="cert-icon" /> AI & Automation</h3>
              <ul className="cert-list">
                <li><a href="/certs/AI Agents and Agentic AI with Python & Generative AI.pdf" target="_blank" rel="noreferrer">AI Agents and Agentic AI (Python & GenAI)</a></li>
                <li><a href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=185101506426125AAB027CA0F8E34BF20CE9D24B0F97BCEE06E420163BFA5EAD" target="_blank" rel="noreferrer">Oracle AI Agent Studio Certified (Badge 1)</a></li>
                <li><a href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=331C2FE17E8C4C48D5C49E72E66D404A3749ECE61CE3BC8050D7877CA6AB6C57" target="_blank" rel="noreferrer">Oracle AI Foundations Associate (Badge 2)</a></li>
                <li><a href="/certs/Oracle Fusion AI Agent Studio Certified Foundations Associate - Rel 1.pdf" target="_blank" rel="noreferrer">Oracle Fusion AI Foundations Rel 1</a></li>
                <li><a href="/certs/Prompt Engineering Generative AI for Marketing & Advertising.pdf" target="_blank" rel="noreferrer">Prompt Engineering for Marketing</a></li>
                <li><a href="/certs/Start Writing Prompts like a Pro BY GOOGLE CERTIFICATE.pdf" target="_blank" rel="noreferrer">Start Writing Prompts like a Pro (Google)</a></li>
                <li><a href="/certs/Design Prompts for Everyday Work Tasks by google certificates.pdf" target="_blank" rel="noreferrer">Design Prompts for Everyday Tasks (Google)</a></li>
                <li><a href="/certs/AI Infrastructure and Operations Fundamentals certificate.pdf" target="_blank" rel="noreferrer">AI Infrastructure Fundamentals</a></li>
                <li><a href="/certs/Introduction to GitHub Copilot.pdf" target="_blank" rel="noreferrer">Introduction to GitHub Copilot</a></li>
              </ul>
            </div>

            {/* Software Dev & Operations */}
            <div className="cert-category box-glass">
              <h3><Database size={20} className="cert-icon"/> Software & IT</h3>
              <ul className="cert-list">
                <li><a href="/certs/Full stack certificate.pdf" target="_blank" rel="noreferrer">Full Stack Development Certificate</a></li>
                <li><a href="/certs/Full stack verfication document.pdf" target="_blank" rel="noreferrer">Full Stack Verification Document</a></li>
                <li><a href="/certs/Programming for Everybody (Getting Started with Python).pdf" target="_blank" rel="noreferrer">Programming for Everybody (Python)</a></li>
                <li><a href="/certs/Python Data Structures.pdf" target="_blank" rel="noreferrer">Python Data Structures</a></li>
                <li><a href="/certs/Create a no-code responsive website with Webflow.pdf" target="_blank" rel="noreferrer">Create websites with Webflow</a></li>
                <li><a href="/certs/WordPress ka certificate.pdf" target="_blank" rel="noreferrer">WordPress Development Certificate</a></li>
                <li><a href="/certs/Google Agile Essentials.pdf" target="_blank" rel="noreferrer">Google Agile Essentials</a></li>
                <li><a href="/certs/GoogleAgileEssentialsV1_Badge20251215-32-iw8rsw.pdf" target="_blank" rel="noreferrer">Google Agile Essentials (Badge)</a></li>
                <li><a href="/certs/CertificateOfCompletion_Operating System Forensics.pdf" target="_blank" rel="noreferrer">Operating System Forensics</a></li>
              </ul>
            </div>

             {/* English & Soft Skills */}
             <div className="cert-category box-glass">
              <h3><Award size={20} className="cert-icon" /> Accomplishments</h3>
              <ul className="cert-list">
                <li><a href="/certs/IELTS Preparation Specialization Certificate!  (full 3).pdf" target="_blank" rel="noreferrer">IELTS Preparation Specialization</a></li>
                <li><a href="/certs/IELTS Listening and Speaking Sections Skills Mastery certificate.pdf" target="_blank" rel="noreferrer">IELTS Listening & Speaking Mastery</a></li>
                <li><a href="/certs/IELTS Writing Section Skills Mastery certificate.pdf" target="_blank" rel="noreferrer">IELTS Writing Section Mastery</a></li>
                <li><a href="/certs/Comsets CS quiz Compition certificate.pdf" target="_blank" rel="noreferrer">Comsats CS Quiz Competition</a></li>
                <li><a href="/certs/Advertising with Meta.pdf" target="_blank" rel="noreferrer">Advertising with Meta</a></li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">Let's Connect</h2>
          <div className="contact-content box-glass">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>I'm currently looking for new opportunities. Whether you have a question or just want to discuss an AI deployment, my inbox is always open!</p>
              
              <div className="social-links">
                <a href="https://github.com/OWAISARSHED" target="_blank" rel="noreferrer" className="social-icon">
                  <Github size={24} /> <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/owais-arshad-qa" target="_blank" rel="noreferrer" className="social-icon">
                  <Linkedin size={24} /> <span>LinkedIn</span>
                </a>
                <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="social-icon">
                  <Briefcase size={24} /> <span>Fiverr</span>
                </a>
              </div>
            </div>

            <div className="contact-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center' }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "1rem" }}>
                Reach out to me directly on WhatsApp for real-time collaboration or connect with me on LinkedIn to explore my professional history.
              </p>
              <a href="https://cal.com/owais-arshad-l8zgub/15min" target="_blank" rel="noreferrer" className="btn" style={{ background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "1rem", borderRadius: "50px", fontWeight: "bold" }}>
                Book Free Consultation <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
              </a>
              <a href="https://wa.me/923109191005" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "1rem" }}>
                <Phone size={20} /> Chat on WhatsApp
              </a>
              <a href="https://linkedin.com/in/owais-arshad-qa" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "1rem" }}>
                <Linkedin size={20} /> Connect on LinkedIn
              </a>
              <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn" style={{ background: "#1dbf73", color: "white", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "1rem" }}>
                <Briefcase size={20} /> View Fiverr Gigs
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Floating AI Consultant Widget */}
      <a href="https://cal.com/owais-arshad-l8zgub/15min" target="_blank" rel="noreferrer" 
         className="ai-widget-btn floating-element"
         title="Consult with Owais's AI Setup">
        <div className="ai-widget-indicator"></div>
        <Terminal size={24} color="white" />
      </a>

      {/* Footer */}
      <footer style={{ background: "var(--card-bg)", padding: "3rem 2rem", textAlign: "center", borderTop: "1px solid var(--glass-border)", marginTop: "4rem" }}>
        <h3 style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}>Connect With Me</h3>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <a href="https://cal.com/owais-arshad-l8zgub/15min" target="_blank" rel="noreferrer" className="btn" style={{ background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)", color: "white", padding: "0.8rem 1.8rem", borderRadius: "50px", display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: "bold", border: "none" }}>
            Book Free Consultation <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
          </a>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
           <a href="https://github.com/OWAISARSHED" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", transition: "0.3s" }} onMouseOver={e => e.currentTarget.style.color="var(--accent-1)"} onMouseOut={e => e.currentTarget.style.color="var(--text-secondary)"}>
             <Github size={28} />
           </a>
           <a href="https://linkedin.com/in/owais-arshad-qa" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", transition: "0.3s" }} onMouseOver={e => e.currentTarget.style.color="var(--accent-1)"} onMouseOut={e => e.currentTarget.style.color="var(--text-secondary)"}>
             <Linkedin size={28} />
           </a>
           <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", transition: "0.3s" }} onMouseOver={e => e.currentTarget.style.color="var(--accent-1)"} onMouseOut={e => e.currentTarget.style.color="var(--text-secondary)"}>
             <Briefcase size={28} />
           </a>
           <a href="https://wa.me/923109191005" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", transition: "0.3s" }} onMouseOver={e => e.currentTarget.style.color="var(--accent-1)"} onMouseOut={e => e.currentTarget.style.color="var(--text-secondary)"}>
             <Phone size={28} />
           </a>
        </div>
        <div style={{ height: "1px", background: "var(--glass-border)", maxWidth: "300px", margin: "0 auto 2rem auto" }}></div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          &copy; {new Date().getFullYear()} Owais Arshad. All rights reserved. | Executive AI & QA Services
        </p>
      </footer>
    </div>
  );
};

const AIServicesDetail = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="portfolio-container" style={{ minHeight: "100vh", padding: "4rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Link to="/" className="btn" style={{ marginBottom: "2rem", display: "inline-block" }}>&larr; Back to Main Portfolio</Link>
      <h1 className="section-heading">AI Agent & Chatbot Services</h1>
      <div className="section-container box-glass" style={{ maxWidth: "800px", padding: "3rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)" }}>Transforming Business with Intelligent Automation</h2>
        <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
          My custom AI agents integrate tightly into your daily operations. From WhatsApp Chatbots managing thousands of customer leads 24/7 to deep Python automation scaling your social media—I build systems that execute flawlessly without human intervention.
        </p>
        <ul style={{ textAlign: "left", margin: "2.5rem auto", maxWidth: "600px", color: "var(--text-secondary)", lineHeight: "2.2", fontSize: "1.1rem" }}>
          <li><CheckCircle size={18} color="var(--accent-1)" /> Seamless conversational interfaces using the latest LLMs.</li>
          <li><CheckCircle size={18} color="var(--accent-1)" /> Instant lead generation through multi-channel data extraction.</li>
          <li><CheckCircle size={18} color="var(--accent-1)" /> Personalized CRM integration and post-automation scheduling.</li>
          <li><CheckCircle size={18} color="var(--accent-1)" /> Completely hands-free social media publishing architecture.</li>
        </ul>
        <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: "1rem", padding: "1rem 2rem", fontSize: "1.1rem" }}>Discuss Your AI Project on Fiverr</a>
      </div>
    </div>
  );
};

const QAServicesDetail = () => {
  React.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="portfolio-container" style={{ minHeight: "100vh", padding: "4rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Link to="/" className="btn" style={{ marginBottom: "2rem", display: "inline-block" }}>&larr; Back to Main Portfolio</Link>
      <h1 className="section-heading">Enterprise QA Engineering Services</h1>
      <div className="section-container box-glass" style={{ maxWidth: "800px", padding: "3rem" }}>
        <h2 style={{ fontSize: "2rem", color: "var(--text-primary)" }}>Bulletproof Software Before Production</h2>
        <p style={{ marginTop: "1.5rem", fontSize: "1.1rem", lineHeight: "1.8", color: "var(--text-secondary)" }}>
          Quality Assurance is the backbone of successful digital products. Equipped with elite frameworks like Selenium, Postman, and Cypress, my automated testing matrices drastically lower regression times while maintaining zero defect escape rates.
        </p>
        <ul style={{ textAlign: "left", margin: "2.5rem auto", maxWidth: "600px", color: "var(--text-secondary)", lineHeight: "2.2", fontSize: "1.1rem" }}>
          <li><CheckCircle size={18} color="var(--accent-1)" /> End-to-End Automated UI & API Testing (Selenium, Cypress, Pytest).</li>
          <li><CheckCircle size={18} color="var(--accent-1)" /> Comprehensive Test Plans, Case Design, & ISTQB Standards.</li>
          <li><CheckCircle size={18} color="var(--accent-1)" /> High-density Regression execution prior to production deployment.</li>
          <li><CheckCircle size={18} color="var(--accent-1)" /> Integration with CI/CD Pipelines (Jenkins, Git) for continuous assurance.</li>
        </ul>
        <a href="https://www.fiverr.com/users/owaisarshad_wp" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: "1rem", padding: "1rem 2rem", fontSize: "1.1rem" }}>Request QA Consultation on Fiverr</a>
      </div>
    </div>
  );
};

const AppWithRouter = () => {
  return (
    <>
      <div className="bg-ai-network">
        <div className="tech-grid"></div>
        <div className="ambient-orb orb-primary"></div>
        <div className="ambient-orb orb-secondary"></div>
        <div className="ambient-orb orb-tertiary"></div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ai-services" element={<AIServicesDetail />} />
          <Route path="/qa-services" element={<QAServicesDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppWithRouter;

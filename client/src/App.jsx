import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Terminal, CheckCircle, Database } from 'lucide-react';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
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
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="portfolio-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">QA & Full Stack</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h4 className="hero-subtitle" variants={fadeInUp}>Hello, I'm</motion.h4>
          <motion.h1 className="hero-title" variants={fadeInUp}>Owais Arshad</motion.h1>
          <motion.h2 className="hero-role" variants={fadeInUp}>
            <span className="accent-text">QA Engineer</span> & Full Stack Developer
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            Bridging the gap between quality assurance and software development. 
            Passionate about building robust, scalable applications and ensuring absolute quality 
            through manual and automated testing.
          </motion.p>
          <motion.div className="hero-cta" variants={fadeInUp}>
            <a href="#contact" className="btn btn-primary">Get in Touch</a>
            <a href="#projects" className="btn btn-secondary">View Work</a>
          </motion.div>
        </motion.div>
        
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
                I am a dedicated professional based in Islamabad, Pakistan, pursuing a BS in Software Engineering at Shifa Tameer-e-Millat University. I bring a hybrid skill set: meticulous QA engineering (Selenium, Cypress, API Testing) and versatile full-stack development (MERN stack, WordPress).
              </p>
              <br/>
              <p>
                Whether I'm increasing test coverage by 75% or optimizing database queries, my goal is to deliver unparalleled software quality and outstanding user experiences.
              </p>
              <div className="contact-pills">
                <span className="pill"><MapPin size={16}/> Islamabad, Pakistan</span>
                <span className="pill"><Phone size={16}/> +92-310-9191005</span>
                <span className="pill"><Mail size={16}/> work19316@gmail.com</span>
              </div>
            </div>
            <div className="skills-container">
              <h3>Core Competencies</h3>
              <div className="skills-tags">
                <span>Python</span><span>Java</span><span>JavaScript</span>
                <span>React</span><span>Node.js</span><span>SQL</span>
                <span>Selenium</span><span>Cypress</span><span>Postman</span>
                <span>Jenkins CI/CD</span><span>MongoDB</span><span>Docker</span>
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
          <h2 className="section-heading">Experience & Certifications</h2>
          
          <div className="timeline">
            {/* QA Engineer */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>QA Engineer (Manual & Automation)</h3>
                <h4>Technology Solutions Company | Jan 2023 – Present</h4>
                <p>Designed and executed 500+ test cases across 12+ projects covering functional, regression, and performance testing scenarios.</p>
                <p>Implemented Selenium and Cypress frameworks, reducing regression testing time by 60% and improving test coverage from 30% to 75%.</p>
              </div>
            </motion.div>

            {/* Full Stack */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Junior Full Stack Developer</h3>
                <h4>Decentral Developers | Jun 2024 – Sep 2024</h4>
                <p>Collaborated with cross-functional teams to design, develop, and deploy responsive web applications using modern full-stack technologies.</p>
                <p>Implemented RESTful APIs and integrated front-end components, improving application performance and user experience.</p>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div className="timeline-item" variants={fadeInUp}>
              <div className="timeline-dot"></div>
              <div className="timeline-content box-glass">
                <h3>Key Certifications</h3>
                <ul className="cert-list">
                  <li><CheckCircle size={16}/> Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate (Sep 2025)</li>
                  <li><CheckCircle size={16}/> ISTQB Foundation Level Software Testing Certification Prep Specialization (Jul 2025)</li>
                  <li><CheckCircle size={16}/> Build a Full Website using WordPress – Coursera Project Network (Jul 2025)</li>
                  <li><CheckCircle size={16}/> Start Writing Prompts like a Pro – Google (Jul 2025)</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section className="section projects" id="projects">
        <motion.div 
          className="section-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <h2 className="section-heading">Technical Projects</h2>
          
          <div className="projects-grid">
            <motion.div className="project-card box-glass" variants={fadeInUp}>
              <Terminal className="project-icon" />
              <h3>E-Commerce Testing Framework</h3>
              <p>Automated testing framework for an e-commerce platform covering 200+ test scenarios including checkout and inventory. Integrated with Jenkins CI/CD pipeine enabling automated regression testing.</p>
              <div className="tech-stack"><span>Selenium</span><span>Python</span><span>Pytest</span><span>CI/CD</span></div>
            </motion.div>

            <motion.div className="project-card box-glass" variants={fadeInUp}>
              <Database className="project-icon" />
              <h3>REST API Testing Suite</h3>
              <p>Comprehensive API testing suite with 150+ test cases validating authentication, CRUD operations, and error handling. Automated via Newman CLI.</p>
              <div className="tech-stack"><span>Postman</span><span>JavaScript</span><span>Newman</span></div>
            </motion.div>

            <motion.div className="project-card box-glass" variants={fadeInUp}>
              <Github className="project-icon" />
              <h3>Twitter Sentiment Analysis</h3>
              <p>Built sentiment classification model using Python to analyze and categorize Twitter comments as positive or negative with 85% accuracy using scikit-learn.</p>
              <div className="tech-stack"><span>Python</span><span>NLP</span><span>Machine Learning</span></div>
            </motion.div>
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
              <p>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!</p>
              
              <div className="social-links">
                <a href="https://github.com/OWAISARSHED" target="_blank" rel="noreferrer" className="social-icon">
                  <Github size={24} /> <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/owais-arshad-qa" target="_blank" rel="noreferrer" className="social-icon">
                  <Linkedin size={24} /> <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <form className="contact-form" onSubmit={submitForm}>
              <input 
                type="text" 
                placeholder="Your Name" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <textarea 
                placeholder="Your Message" 
                rows="5" 
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
              <button type="submit" className="btn btn-primary">Send Message</button>
              {submitStatus && <p className="submit-status">{submitStatus}</p>}
            </form>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Owais Arshad. Designed with modern web technologies.</p>
      </footer>
    </div>
  );
};

export default App;

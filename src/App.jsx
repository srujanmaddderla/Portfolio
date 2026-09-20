import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon, FaGraduationCap, FaBriefcase, FaCode, FaGithub, FaExternalLinkAlt, FaExpand, FaLinkedin, FaEnvelope, FaWhatsapp, FaInstagram, FaCertificate, FaRobot, FaTasks, FaUsers, FaAward, FaPenNib, FaLaptopCode, FaCogs, FaArrowRight, FaTimesCircle, FaDownload } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import GallerySection from './GallerySection.jsx';

// Define styles object outside component
const styles = {
  sectionContainer: "min-h-[60vh] py-12 px-4 mb-20 bg-white dark:bg-primary transition-colors duration-300",
  sectionTitle: "text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white transition-colors duration-300",
  cardBase: "bg-white dark:bg-tertiary p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300",
  cardHover: "hover:border-gray-900 dark:hover:border-white hover:-translate-y-1 transition-all duration-300",
  textPrimary: "text-gray-800 dark:text-white transition-colors duration-300",
  textSecondary: "text-gray-600 dark:text-gray-300 transition-colors duration-300",
  projectCard: "relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300",
  projectOverlay: "absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  projectContent: "absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300",
};

function App() {
  const [nav, setNav] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [aboutImage, setAboutImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxCert, setLightboxCert] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track navbar scroll state for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load saved image effect
  useEffect(() => {
    const savedImage = localStorage.getItem('aboutImage');
    if (savedImage) {
      setAboutImage(savedImage);
    }
  }, []);

  // Image upload handler
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Please choose an image under 5MB.');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      setIsLoading(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Compress image if needed
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
          setAboutImage(compressedImage);
          localStorage.setItem('aboutImage', compressedImage);
          setIsLoading(false);
        };
        img.src = e.target.result;
      };

      reader.onerror = () => {
        setIsLoading(false);
        alert('Error reading file. Please try again.');
      };

      reader.readAsDataURL(file);
    }
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  };

  // Reusable animated section heading with underline reveal
  const SectionHeading = ({ eyebrow, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center mb-10"
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-5xl uppercase text-center text-gray-900 dark:text-white font-display transition-colors duration-300">
        {children}
      </h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '3rem' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-px bg-gray-400 dark:bg-gray-600 mt-4"
      />
    </motion.div>
  );

  // Experience data
  const experienceData = [
    {
      title: "Associate Manager - Product Support",
      company: "Kore.ai",
      period: "2023 - Present",
      responsibilities: [
        "Led and managed critical incident response for enterprise customers",
        "Developed comprehensive knowledge base system and documentation strategy",
        "Managed strategic customer accounts and maintained high satisfaction rates",
        "Led community management initiatives and engagement programs",
        "Streamlined business operations and automated support workflows",
        "Administered and optimized Zendesk support platform"
      ]
    },
    {
      title: "Senior Analyst",
      company: "Temenos India Pvt Ltd",
      period: "2019 - 2023",
      responsibilities: [
        "Led a team of technical support engineers for enterprise banking solutions",
        "Implemented new support processes reducing resolution time by 30%",
        "Managed critical customer escalations and maintained SLA compliance",
        "Developed and conducted technical training programs for team members",
        "Collaborated with product teams for feature improvements and bug fixes"
      ]
    },
    {
      title: "Senior Support Executive",
      company: "Kony, Inc",
      period: "2016 - 2019",
      responsibilities: [
        "Provided comprehensive technical support for enterprise mobility platform",
        "Resolved complex technical issues maintaining 95% customer satisfaction",
        "Contributed to knowledge base development and best practices",
        "Collaborated with development teams for issue resolution and product improvement",
        "Mentored junior team members and conducted technical training sessions"
      ]
    }
  ];

  // Education data
  const educationData = [
    {
      degree: "Bachelor of Technology in Information Technology",
      institution: "VBIT- JNTU Hyderabad",
      period: "2008 - 2012",
      details: "Specialized in Computer Science & Information Technology with focus on software engineering, database management, and system design."
    },
    
  ];

  // Add this to your existing data section
  const certificationsData = [
    {
      title: "ITIL v4 Foundation",
      issuer: "Axelos Global Best Practice",
      skills: ["Service Management", "ITIL Practices", "Incident Management"],
      icon: <FaCertificate className="text-secondary" size={22} />
    },
    {
      title: "Prompt Engineering - A guide for beginners",
      issuer: "Kore.ai",
      skills: ["few-shot", "zero-shot", "Platform Configuration"],
      icon: <FaRobot className="text-secondary" size={22} />
    },
    {
      title: "Project Management Foundations",
      issuer: "Alison",
      skills: ["Project Management", "Agile", "Scrum"],
      icon: <FaTasks className="text-secondary" size={22} />
    },
    {
      title: "Customer Experience Management",
      issuer: "Alison",
      skills: ["Customer Journey Mapping", "Service Design", "Account Management"],
      icon: <FaUsers className="text-secondary" size={22} />
    },
    {
      title: "Certified Leadership Developer",
      issuer: "MiddleEarthHR (SHRM Recertification Provider)",
      skills: ["Leadership Development", "High Distinction", "SHRM PDCs"],
      image: "/cert-leadership-developer.jpg",
      distinction: "High Distinction · 2026",
      icon: <FaAward className="text-amber-500" size={22} />
    }
  ];

  // Experience Section Component
  const ExperienceCard = ({ job, index }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="py-10 border-b border-gray-200 dark:border-gray-800 last:border-b-0"
    >
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
        <h3 className="font-display text-2xl md:text-3xl text-gray-900 dark:text-white">{job.title}</h3>
        <p className="eyebrow whitespace-nowrap">{job.period}</p>
      </div>
      <p className="font-serif italic text-lg text-secondary mb-6">{job.company}</p>
      <ul className="space-y-2 max-w-3xl">
        {job.responsibilities.map((resp, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="flex items-start text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <span className="text-gray-400 dark:text-gray-600 mr-3">—</span>
            {resp}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  // Education Section Component
  const EducationCard = ({ edu, index }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={`${styles.cardBase} ${styles.cardHover}`}
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-secondary rounded-full mr-4">
          <FaGraduationCap className="text-2xl text-primary" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${styles.textPrimary}`}>{edu.degree}</h3>
          <p className={styles.textSecondary}>{edu.institution}</p>
        </div>
      </div>
      <div className="ml-16">
        <p className={`text-sm ${styles.textSecondary}`}>{edu.period}</p>
        {Array.isArray(edu.details) ? (
          <ul className="mt-2 space-y-1">
            {edu.details.map((detail, i) => (
              <li key={i} className={`${styles.textPrimary} flex items-center`}>
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-2"></span>
                {detail}
              </li>
            ))}
          </ul>
        ) : (
          <p className={`mt-2 ${styles.textPrimary}`}>{edu.details}</p>
        )}
      </div>
    </motion.div>
  );

  // Updated Certification Card Component
  const CertificationCard = ({ cert, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="relative group overflow-hidden transition-all duration-300
                  border border-gray-200 dark:border-gray-800 bg-white dark:bg-tertiary hover:border-gray-900 dark:hover:border-white"
    >
      {cert.image && (
        <button
          type="button"
          onClick={() => setLightboxCert(cert)}
          className="relative w-full h-48 overflow-hidden block cursor-zoom-in"
          aria-label={`View ${cert.title} certificate`}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white text-sm font-medium">
              <FaExpand /> View Certificate
            </span>
          </div>
        </button>
      )}
      <div className="p-6">
        {/* Certificate Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {cert.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {cert.issuer}
            </p>
          </div>
          {cert.icon && <div className="shrink-0 mt-1">{cert.icon}</div>}
        </div>

        {cert.distinction && (
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">
            🏆 {cert.distinction}
          </p>
        )}

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {cert.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800
                       text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Lightbox modal for viewing full certificate images
  const CertificateLightbox = () => (
    <AnimatePresence>
      {lightboxCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/85"
          onClick={() => setLightboxCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxCert(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
              aria-label="Close certificate view"
            >
              <FaTimesCircle size={32} />
            </button>
            <img
              src={lightboxCert.image}
              alt={lightboxCert.title}
              className="w-full h-auto shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Update the projectsData by removing the links property
  const projectsData = [
    {
      title: "Support Escalation Bot",
      description: "Built on the Kore.ai platform, this bot streamlines escalation and prioritization requests from Customer Success teams through conversational workflows. Requests are routed for stakeholder review and approval or rejection, ensuring only valid escalations are accepted while invalid requests are closed with clear reasons. The solution improved escalation governance, visibility, and metric quality across support operations.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      tags: ["AI Automation", "Escalation Management", "Workflow Governance"],
      technologies: ["Kore.ai", "Webhook", "Google Chat"]
    },
    {
      title: "LIVE! Chat Support Implementation",
      description: "Implemented Kore.ai LIVE! Chat Support as part of a broader support transformation initiative to shift from reactive ticket-based operations to high-velocity real-time resolution. Integrated Automation AI, Search AI, Contact Center AI, and Agent AI with internal knowledge articles and documentation to enable instant triage, faster resolutions, and better data capture upfront. Complex issues are converted into formal tickets on behalf of requesters, reducing ticket volume, improving turnaround time, and enhancing customer experience.",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop",
      tags: ["Live Chat", "Support Transformation", "Customer Experience"],
      technologies: ["Kore.ai", "Automation AI", "Search AI", "Contact Center AI", "Agent AI"]
    },
    {
      title: "Knowledge Base System",
      description: "Developed a comprehensive knowledge base on Outline Wiki and Confluence, serving as a centralized resource for all teams across the organization. It includes detailed knowledge articles, process documentation, and other essential information, significantly improving team efficiency and information accessibility.",
      // NEW: Actual knowledge base interface showing documentation system
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop",
      // This image shows a clear documentation interface with searchable content and organized structure
      tags: ["Documentation", "Knowledge Management", "Technical Writing"],
      technologies: ["Outline Wiki", "Confluence", "SharePoint"]
    },
    {
      title: "Support Process Automation",
      description: "Implemented automated workflows in Zendesk and Jira to handle common support requests, such as ticket triaging, status updates, and escalations. These automations reduced manual intervention, cut response time by 60%, and significantly improved overall team productivity and SLA compliance.",
      image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?q=80&w=2070&auto=format&fit=crop",
      tags: ["Automation", "Process Improvement", "Efficiency"],
      technologies: ["Zendesk", "Jira", "SFDC"]
    },
    {
      title: "Automated Incident Management System",
      description: "Designed and implemented an automated Incident Management system to handle production outages.The system streamlined incident detection, escalation, and coordination, reducing manual effort and improving response efficiency.This resulted in an 80% reduction in outage impact across the organization.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
      tags: ["Incident Management", "Automation", "Production Support"],
      technologies: ["Zendesk", "Twilio", "Zenduty", "Site24/7", "Plivo"]
    },
    {
      title: "P0 & P1 Tickets Reminder App",
      description: "Developed an automated tool that integrates with Zendesk to notify team members in Google Chat about open P0 and P1 tickets.The tool provides real-time alerts, ensuring that critical tickets are promptly addressed.This proactive approach helps reduce the risk of SLA breaches and enhances team responsiveness.The solution streamlined communication and improved ticket management efficiency.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop",
      tags: ["Automation", "Notifications", "SLA Management"],
      technologies: ["Zendesk", "Twilio", "Zapier", "Git Workflow"]
    },
    {
      title: "Community Portal Enhancement",
      description: "Led the development of a Community Portal aimed at enhancing the customer experience.The portal provided self-service options, enabling customers to find solutions independently.This initiative resulted in a 30% reduction in support ticket volume by addressing common customer queries.The improved user experience boosted customer satisfaction and reduced reliance on support teams.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      tags: ["Community Management", "User Experience", "Portal Development"],
      technologies: ["Discourse", "Zendesk"]
    },
    {
      title: "Analytics Dashboards",
      description: "Built multiple dashboards using Confluence APIs to retrieve data from Confluence pages.These dashboards provided real-time insights into agent activities and performance.By automating data collection, it streamlined the tracking of agent productivity.This solution helped the team monitor performance more efficiently and make data-driven decisions.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      tags: ["Analytics", "Data Visualization", "Reporting"],
      technologies: ["Bolt.ai", "ConfluenceAPI's", "Analytics", "Cursor"]
    }
  ];

  // Alternative images if you prefer different options
  const alternativeImages = {
    knowledgeBase: [
      // Alternative 1: Documentation system with search
      "https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=2070&auto=format&fit=crop",
      // Alternative 2: Knowledge management interface
      "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=2070&auto=format&fit=crop"
    ],
    
    supportAutomation: [
      // Alternative 1: Process automation dashboard
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      // Alternative 2: Workflow automation interface
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop"
    ],
    
    customerPortal: [
      // Alternative 1: Customer dashboard
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop",
      // Alternative 2: Service portal interface
      "https://images.unsplash.com/photo-1497493292307-31c376b6e479?q=80&w=2071&auto=format&fit=crop"
    ]
  };

  // Modal Component for Project Details
  const ProjectModal = ({ project, isOpen, onClose }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white dark:bg-primary overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button - Updated styling and positioning */}
            <div className="absolute top-0 right-0 z-10 p-4 flex justify-end">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white 
                         transition-all duration-300 transform hover:scale-110
                         flex items-center justify-center group"
                aria-label="Close modal"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Close Button - Added for better mobile UX */}
            <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-secondary text-white rounded-full shadow-lg
                         flex items-center justify-center space-x-2
                         hover:bg-secondary/90 transition-all duration-300"
              >
                <span>Close Project</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>

            {/* Project Image */}
            <div className="relative h-[300px] md:h-[400px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Project Content */}
            <div className="relative p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                {project.title}
              </h2>

              <div className="space-y-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-3 py-1 text-sm rounded-full bg-secondary/80 text-white"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-tertiary rounded-lg 
                                 text-gray-800 dark:text-gray-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Updated ProjectCard component
  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Enhanced hover animations
    const cardVariants = {
      initial: { scale: 1, y: 0 },
      hover: { 
        scale: 1.02,
        y: -5,
        transition: { 
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }
    };

    // Shimmer animation for loading state
    const shimmerVariants = {
      animate: {
        x: ["0%", "100%"],
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
      }
    }
  };

  return (
      <>
        <motion.div
          variants={cardVariants}
          initial="initial"
          whileHover="hover"
          className="relative group h-[400px] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card Container */}
          <motion.div
            className="h-full relative overflow-hidden border border-gray-200 dark:border-gray-800"
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
          >
            {/* Loading State */}
            <AnimatePresence>
              {!imageLoaded && (
                <motion.div
                  className="absolute inset-0 bg-gray-200 overflow-hidden"
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    variants={shimmerVariants}
                    animate="animate"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project Image */}
            <motion.img
              src={imageError ? '/fallback-image.jpg' : project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: isHovered ? 1.1 : 1,
                opacity: imageLoaded ? 1 : 0,
                filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)'
              }}
              transition={{ duration: 0.5 }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Top Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-secondary/80 text-white"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Bottom Content */}
              <div>
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-white/80"
                >
                  <FaExpand size={16} />
                  <span className="text-sm">Click to view details</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Project Modal */}
        <ProjectModal
          project={project}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  };

  // Update your Projects section in the App component
  const ProjectsSection = () => (
    <div name="projects" className={styles.sectionContainer}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Portfolio">Selected Work</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );

  // Add this new array for tools and languages data
  const toolsAndLanguagesData = [
    {
      name: "Visual Studio",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/visualstudio/visualstudio-plain.svg"
    },
    {
      name: "Zendesk",
      icon: "https://cdn.worldvectorlogo.com/logos/zendesk-1.svg"
    },
    {
      name: "JIRA",
      icon: "https://cdn.worldvectorlogo.com/logos/jira-1.svg"
    },
    {
      name: "Salesforce",
      icon: "https://cdn.worldvectorlogo.com/logos/salesforce-2.svg"
    },
    {
      name: "Twilio",
      icon: "https://cdn.worldvectorlogo.com/logos/twilio.svg"
    },
    {
      name: "JavaScript",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
    },
    {
      name: "Node.js",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "React",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
    },
    {
      name: "Postman",
      icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
    },
    {
      name: "HTML",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
    },
    {
      name: "Tailwind CSS",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg"
    },
    {
      name: "WordPress",
      icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/wordpress/wordpress-plain.svg"
    },
    {
      name: "Zapier",
      icon: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg"
    },
    {
      name: "n8n",
      icon: "https://cdn.simpleicons.org/n8n/EA4B71"
    }
  ];

  // Add the new Tools & Languages section component
  const ToolsAndLanguagesSection = () => (
    <div name="tools" className={styles.sectionContainer}>
      <div className="max-w-7xl mx-auto">
        <SectionHeading eyebrow="Toolkit">Tools & Languages Used</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {toolsAndLanguagesData.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-tertiary
                         border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <img
                  src={tool.icon}
                  alt={`${tool.name} icon`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <p className="text-center text-sm font-medium text-primary dark:text-lightText">
                {tool.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const navItems = [
    { label: 'About', to: 'about' },
    { label: 'Experience', to: 'experience' },
    { label: 'Certifications', to: 'certifications' },
    { label: 'Work', to: 'projects' },
    { label: 'Skills', to: 'skills' },
    { label: 'Tools', to: 'tools' },
    { label: 'Education', to: 'education' },
    { label: 'Contact', to: 'contact' }
  ];

  const SocialLinks = () => {
    const socialLinks = [
      {
        name: 'WhatsApp',
        icon: <FaWhatsapp size={24} />,
        url: 'https://wa.me/+919885514357',
        hoverColor: 'hover:text-green-500'
      },
      {
        name: 'Instagram',
        icon: <FaInstagram size={24} />,
        url: 'https://instagram.com/yourusername',
        hoverColor: 'hover:text-pink-500'
      },
      {
        name: 'LinkedIn',
        icon: <FaLinkedin size={24} />,
        url: 'https://www.linkedin.com/in/srujan-madderla-a0692558/',
        hoverColor: 'hover:text-blue-500'
      },
      {
        name: 'X (Twitter)',
        icon: <FaXTwitter size={24} />,
        url: 'https://twitter.com/yourusername',
        hoverColor: 'hover:text-gray-700 dark:hover:text-gray-300'
      },
      {
        name: 'Email',
        icon: <FaEnvelope size={24} />,
        url: 'mailto:smadderla91@gmail.com',
        hoverColor: 'hover:text-red-500'
      }
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center mt-8"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Get in Touch
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-tertiary
                          text-gray-600 dark:text-gray-400 ${social.hoverColor} hover:shadow-lg transition-all duration-300`}
              aria-label={social.name}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    );
  };

  // Update the Contact Section to include the social links
  const ContactSection = () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus(null);

      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
        timestamp: new Date().toISOString()
      };

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxZRLJZfegGgAnR4FBj1Nd13_pXY2tn1b2YHQOZxkV4oMiHxfnTik2NGZdviMNXyH-M6w/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        setSubmitStatus('success');
        e.target.reset(); // Clear the form
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div name="contact" className={`${styles.sectionContainer} bg-gray-50 dark:bg-primary`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <SectionHeading eyebrow="Contact">Get In Touch</SectionHeading>
            
            {/* Contact Form */}
            <motion.form 
              variants={fadeInUp} 
              className="flex flex-col max-w-[600px] mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                disabled={isSubmitting}
                className="p-3 mb-4 rounded-lg bg-white dark:bg-tertiary border border-gray-200 dark:border-gray-700 
                         text-gray-800 dark:text-lightText focus:border-secondary dark:focus:border-secondary 
                         focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-50"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={isSubmitting}
                className="p-3 mb-4 rounded-lg bg-white dark:bg-tertiary border border-gray-200 dark:border-gray-700 
                         text-gray-800 dark:text-lightText focus:border-secondary dark:focus:border-secondary 
                         focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-50"
              />
              <textarea
                name="message"
                placeholder="Message"
                required
                disabled={isSubmitting}
                rows="6"
                className="p-3 mb-4 rounded-lg bg-white dark:bg-tertiary border border-gray-200 dark:border-gray-700 
                         text-gray-800 dark:text-lightText focus:border-secondary dark:focus:border-secondary 
                         focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-50"
              />

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center mb-4 p-3 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                  }`}
                >
                  {submitStatus === 'success' 
                    ? 'Message sent successfully!' 
                    : 'Failed to send message. Please try again.'}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="bg-gray-900 text-white dark:bg-white dark:text-gray-900
                         hover:opacity-90 font-medium px-6 py-3 my-2 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-secondary/50
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Message'
                )}
              </motion.button>
            </motion.form>

            {/* Social Links */}
            <SocialLinks />

            {/* Optional: Add a divider */}
            <div className="w-full max-w-[600px] mx-auto mt-8 border-t border-gray-200 dark:border-gray-700"></div>

            {/* Optional: Add a message */}
            <motion.p
              variants={fadeInUp}
              className="text-center text-gray-600 dark:text-gray-400 mt-4"
            >
              Feel free to reach out through any platform!
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  };

  const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="relative bg-white dark:bg-primary py-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4">
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Srujan Madderla. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white hover:border-gray-900 dark:hover:border-white transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const AboutSection = () => (
    <div name="about" className={`${styles.sectionContainer} pt-2 md:pt-6`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-stretch py-8"
        >
          {/* Image Section */}
          <motion.div
            variants={fadeInUp}
            className="order-2 md:order-1 flex justify-center md:h-full"
          >
            <div className="relative w-full max-w-[380px] h-[420px] md:h-full md:min-h-[560px] overflow-hidden group">
              <img
                src="/professional-portrait.png"
                alt="Srujan Madderla - Professional Portrait"
                className="w-full h-full object-cover object-center transition-all duration-500"
                style={{ objectPosition: "50% 25%" }}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
              {/* Refined border */}
              <div className="absolute inset-0 border border-gray-200/20 dark:border-gray-700/20"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={fadeInUp}
            className="order-1 md:order-2 flex flex-col h-full justify-center"
          >
            <p className="eyebrow mb-3">Introduction</p>
            <h2 className="text-3xl sm:text-5xl uppercase text-left text-gray-900 dark:text-white font-display mb-4 transition-colors duration-300">
              About Me
            </h2>
            <div className="w-12 h-px bg-gray-400 dark:bg-gray-600 mb-6"></div>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 max-w-xl">
              <p className="block">I'm a Delivery Manager and AI Automation Specialist with over a decade of experience building scalable incident management frameworks, leading strategic account management, and streamlining business operations for enterprise customers.</p>
              <p className="block">I design AI-driven automations for support and operations — intelligent ticket triaging, response suggestions, workflow orchestration, and proactive alerting for high-priority incidents. On the delivery side, I translate business requirements into implementation plans, coordinate across support, engineering, and product teams, and track delivery health using SLA, quality, and adoption metrics to drive continuous improvement.</p>
              <p className="block">Beyond my full-time role, I work as a <span className="text-secondary font-semibold">freelance web developer</span>, building fast, modern websites for small businesses and individuals; as a <span className="text-secondary font-semibold">content writer</span>, crafting clear and engaging copy, documentation, and technical articles; and as an <span className="text-secondary font-semibold">automation consultant</span>, helping teams eliminate repetitive manual work with custom scripts and no-code/low-code workflows.</p>
              <p className="block">This blend of enterprise delivery experience, hands-on automation expertise, and freelance client work lets me move seamlessly between strategy and execution — delivering results that are both technically sound and business-focused.</p>
            </div>

            {/* What I Do highlight grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-xl">
              {[
                { icon: <FaTasks className="text-secondary" size={20} />, title: 'Delivery & Incident Management', desc: 'Enterprise support operations' },
                { icon: <FaRobot className="text-secondary" size={20} />, title: 'AI & Automation', desc: 'Workflow & process automation' },
                { icon: <FaLaptopCode className="text-secondary" size={20} />, title: 'Freelance Web Dev', desc: 'Modern, responsive websites' },
                { icon: <FaPenNib className="text-secondary" size={20} />, title: 'Content Writing', desc: 'Copy, docs & technical writing' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-tertiary/60 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-white leading-tight">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Editorial pull-quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 md:mt-24 border-t border-gray-200 dark:border-gray-800 pt-12"
        >
          <p className="font-display uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.1] text-gray-900 dark:text-white max-w-5xl">
            "Turning complex operations into simple, automated, reliable systems — one workflow at a time."
          </p>
          <footer className="eyebrow mt-6">— Srujan Madderla</footer>
        </motion.blockquote>
      </div>
    </div>
  );

  // Add responsive styles
  const responsiveStyles = `
    @media (max-width: 768px) {
      .about-image-container {
        max-width: 90px;
        height: 50px;
      }
    }
  `;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-primary transition-colors duration-300 font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-secondary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Top-right quick links */}
      <div className={`hidden md:flex fixed top-8 right-10 z-50 items-center gap-6 font-serif text-sm transition-colors duration-300 ${scrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
        <a href="mailto:smadderla91@gmail.com" className="nav-link">Mail</a>
        <a href="https://www.linkedin.com/in/srujan-madderla-a0692558/" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
        <a href="https://wa.me/+919885514357" target="_blank" rel="noopener noreferrer" className="nav-link">WhatsApp</a>
        <a href="/Srujan_Madderla_Resume.pdf" download="Srujan_Madderla_Resume.pdf" className="nav-link">Resume</a>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          className="opacity-70 hover:opacity-100 transition-opacity"
        >
          {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
        </motion.button>
      </div>

      {/* Fixed right-side vertical nav */}
      <div className={`hidden md:flex fixed top-1/2 -translate-y-1/2 right-10 z-50 flex-col items-end gap-5 font-serif text-sm transition-colors duration-300 ${scrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth={true}
            duration={500}
            spy={true}
            activeClass="nav-link-active"
            className="nav-link"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <div
        onClick={() => setNav(!nav)}
        className={`md:hidden fixed top-6 right-6 z-50 cursor-pointer transition-colors duration-300 ${scrolled ? 'text-gray-800 dark:text-white' : 'text-white'}`}
        role="button"
        aria-label="Toggle menu"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') setNav(!nav);
        }}
      >
        {nav ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* Mobile fullscreen menu */}
      <motion.ul
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: nav ? 1 : 0, x: nav ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className={`${nav ? 'flex' : 'hidden'} fixed z-40 top-0 left-0 w-full h-screen ${darkMode ? 'bg-primary' : 'bg-white'} flex-col justify-center items-center gap-2`}
      >
        {navItems.map((item) => (
          <motion.li
            key={item.to}
            whileHover={{ scale: 1.1 }}
            className="py-4 text-3xl nav-link text-gray-800 dark:text-white"
          >
            <Link onClick={() => setNav(false)} to={item.to} smooth={true} duration={500}>
              {item.label}
            </Link>
          </motion.li>
        ))}
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="py-4 text-3xl nav-link text-gray-800 dark:text-white"
        >
          <a href="/Srujan_Madderla_Resume.pdf" download="Srujan_Madderla_Resume.pdf" onClick={() => setNav(false)}>
            Resume
          </a>
        </motion.li>
      </motion.ul>

      {/* Hero Section - full-bleed portrait */}
      <div name="home" className="relative w-full min-h-screen overflow-hidden bg-primary">
        <img
          src="/hero-office.png"
          alt="Srujan Madderla at work"
          className="absolute inset-0 h-full w-full object-cover object-center hero-photo-colorize"
        />
        {/* Gradient overlays so text stays legible over the background photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-primary/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/40 pointer-events-none"></div>

        <div className="relative z-10 min-h-screen w-full px-6 md:px-16 flex flex-col justify-end pb-20 md:pb-28">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="eyebrow !text-gray-300"
          >
            Hi, I am
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display uppercase text-white text-lg sm:text-3xl md:text-4xl lg:text-5xl leading-[1.05] mt-3"
          >
            Srujan Madderla
          </motion.h1>
          <h2 className="font-serif italic text-lg sm:text-2xl md:text-3xl font-medium text-gray-300 mt-6 min-h-[3rem]">
            <TypeAnimation
              sequence={[
                'AI Automations Specialist',
                2000,
                'Delivery Manager',
                2000,
                'Freelance Web Developer',
                2000,
                'Content Writer',
                2000,
                'Business Automation Consultant',
                2000,
                'Product Support Expert',
                2000,
                'Incident Manager',
                2000,
                'Community Manager',
                2000,
                'Knowledge Management',
                2000
              ]}
              wrapper="span"
              speed={30}
              repeat={Infinity}
            />
          </h2>

          {/* Service badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-8 font-serif text-gray-400"
          >
            {['Automation Specialist', 'Web Development', 'Content Writing'].map((label, i, arr) => (
              <span key={label} className="flex items-center gap-x-5">
                <span className="text-sm md:text-base tracking-wide">{label}</span>
                {i < arr.length - 1 && <span className="text-gray-600">/</span>}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link to="projects" smooth={true} duration={500} className="cursor-pointer">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold transition-all"
              >
                View My Work <FaArrowRight />
              </motion.span>
            </Link>
            <Link to="contact" smooth={true} duration={500} className="cursor-pointer">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 border border-gray-500 text-white font-semibold hover:border-white transition-all"
              >
                Get In Touch
              </motion.span>
            </Link>
            <motion.a
              href="/Srujan_Madderla_Resume.pdf"
              download="Srujan_Madderla_Resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 border border-gray-500 text-white font-semibold hover:border-white transition-all cursor-pointer"
            >
              <FaDownload /> Download Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 1.8, repeat: Infinity } }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-xs uppercase tracking-[0.3em]"
        >
          Scroll
        </motion.div>
      </div>

      {/* About Section */}
      <AboutSection />

      <GallerySection />

      {/* Experience Section */}
      <div name="experience" className={styles.sectionContainer}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Career">Work Experience</SectionHeading>
          <div className="max-w-4xl mx-auto border-t border-gray-200 dark:border-gray-800">
            {experienceData.map((job, index) => (
              <ExperienceCard key={index} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div name="certifications" className={styles.sectionContainer}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Credentials">Professional Certifications</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationsData.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>
      <CertificateLightbox />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <div name="skills" className={styles.sectionContainer}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Capabilities">Skills</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Incident Management", level: 90 },
              { name: "Product Support", level: 95 },
              { name: "Customer Success", level: 85 },
              { name: "Knowledge Management", level: 88 },
              { name: "Process Improvement", level: 92 },
              { name: "Team Leadership", level: 85 },
              { name: "Technical Writing", level: 90 },
              { name: "Problem Solving", level: 93 },
              { name: "AI & Automation", level: 91 },
              { name: "Web Development", level: 82 },
              { name: "Content Writing", level: 88 },
              { name: "Client Communication", level: 90 }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white dark:bg-tertiary p-4 text-primary dark:text-lightText
                           border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
              >
                <h3 className="font-bold mb-2">{skill.name}</h3>
                <div className="h-2 bg-gray-200 dark:bg-primary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-secondary"
                  />
                </div>
                <p className="text-right text-sm mt-1">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools & Languages Section */}
      <ToolsAndLanguagesSection />

      {/* Education Section */}
      <div name="education" className={`${styles.sectionContainer} pb-2`}>
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Background">Education</SectionHeading>
          <div className="space-y-3">
            {educationData.map((edu, index) => (
              <EducationCard key={index} edu={edu} index={index} />
            ))}
        </div>
      </div>
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Add Footer after all other sections */}
      <Footer />
    </div>
  );
}

export default App;
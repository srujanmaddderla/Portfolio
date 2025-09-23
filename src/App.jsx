import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-scroll';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon, FaGraduationCap, FaBriefcase, FaCode, FaGithub, FaExternalLinkAlt, FaExpand, FaLinkedin, FaEnvelope, FaWhatsapp, FaInstagram, FaCertificate, FaRobot, FaTasks, FaUsers } from 'react-icons/fa';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';

// Define styles object outside component
const styles = {
  sectionContainer: "min-h-[60vh] py-12 px-4 mb-20 bg-white dark:bg-primary transition-colors duration-300",
  sectionTitle: "text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white transition-colors duration-300",
  cardBase: "bg-white dark:bg-tertiary p-4 rounded-xl shadow-lg transition-colors duration-300",
  cardHover: "hover:shadow-xl transition-shadow duration-300",
  textPrimary: "text-gray-800 dark:text-white transition-colors duration-300",
  textSecondary: "text-gray-600 dark:text-gray-300 transition-colors duration-300",
  projectCard: "relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300",
  projectOverlay: "absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  projectContent: "absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300",
};

function App() {
  const [nav, setNav] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [aboutImage, setAboutImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      logo: "https://www.axelos.com/assets/images/itil-4-foundation-logo.png",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "border-blue-200 dark:border-blue-800",
      icon: <FaCertificate className="text-blue-500" size={24} />
    },
    {
      title: "Prompt Engineering - A guide for beginners",
      issuer: "Kore.ai",
      skills: ["few-shot", "zer", "Platform Configuration"],
      logo: "https://kore.ai/wp-content/themes/kore/images/logo.svg",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      borderColor: "border-purple-200 dark:border-purple-800",
      icon: <FaRobot className="text-purple-500" size={24} />
    },
    {
      title: "Project Management Foundations",
      issuer: "Alison",
      skills: ["Project Management", "Agile", "Scrum"],
      logo: "https://alison.com/images/alison-logo.svg",
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "border-green-200 dark:border-green-800",
      icon: <FaTasks className="text-green-500" size={24} />
    },
    {
      title: "Customer Experience Management",
      issuer: "Alison",
      skills: ["Customer Journey Mapping", "Service Design", "Account Management"],
      logo: "https://alison.com/images/alison-logo.svg",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
      borderColor: "border-orange-200 dark:border-orange-800",
      icon: <FaUsers className="text-orange-500" size={24} />
    }
  ];

  // Experience Section Component
  const ExperienceCard = ({ job, index }) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`${styles.cardBase} ${styles.cardHover}`}
    >
      <div className="flex items-start">
        <div className="p-3 bg-secondary rounded-full mr-4">
          <FaBriefcase className="text-2xl text-primary" />
        </div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${styles.textPrimary}`}>{job.title}</h3>
          <p className={styles.textSecondary}>{job.company}</p>
          <p className={`text-sm mb-4 ${styles.textSecondary}`}>{job.period}</p>
          <ul className="space-y-2">
            {job.responsibilities.map((resp, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`flex items-center ${styles.textPrimary}`}
              >
                <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                {resp}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );

  // Education Section Component
  const EducationCard = ({ edu, index }) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.02 }}
      className={styles.cardBase}
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
      className={`relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                  border ${cert.borderColor} ${cert.bgColor}`}
    >
      <div className="p-6">
        {/* Certificate Header - Simplified without logos */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            {cert.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {cert.issuer}
          </p>
        </div>

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

  // Update the projectsData by removing the links property
  const projectsData = [
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
            className="relative w-full max-w-4xl bg-white dark:bg-primary rounded-2xl overflow-hidden"
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
            className={`${styles.cardBase} h-full relative overflow-hidden rounded-xl`}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
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
              className="w-full h-full object-cover transition-transform duration-700"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                opacity: imageLoaded ? 1 : 0
              }}
              transition={{ duration: 0.4 }}
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
        <motion.h2 
          variants={fadeInUp} 
          className={styles.sectionTitle}
        >
          Featured Projects
        </motion.h2>
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
    }
  ];

  // Add the new Tools & Languages section component
  const ToolsAndLanguagesSection = () => (
    <div name="tools" className={styles.sectionContainer}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          variants={fadeInUp} 
          className={styles.sectionTitle}
        >
          Tools & Languages Used
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {toolsAndLanguagesData.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 bg-white dark:bg-tertiary rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
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
    'Home',
    'About',
    'Experience',
    'Certifications',
    'Projects',
    'Skills',
    'Tools',
    'Education',
    'Contact'
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
        <div className="flex space-x-6">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`text-gray-600 dark:text-gray-400 ${social.hoverColor} transition-all duration-300`}
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
        const response = await fetch('https://script.google.com/macros/s/AKfycbw6AYZ_mLE-qJio-9noVStzhaYP5qcSmPjjvT2ijIgfWnv-WDrq-ylNI-sjC4LFmnbz/exec', {
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
            <motion.h2 
              variants={fadeInUp} 
              className={`${styles.sectionTitle} text-gray-800 dark:text-lightText`}
            >
              Contact Me
            </motion.h2>
            
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
                className="text-white bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90
                         font-medium rounded-lg px-6 py-3 my-2 transition-all duration-300
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

  const Logo = () => (
        <motion.div
          initial={{ x: -500, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="flex items-center"
    >
      <div className="group relative">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="flex items-center space-x-1 bg-gradient-to-br from-white/5 to-white/10 dark:from-black/5 dark:to-black/10 p-2 rounded-lg"
        >
          <span className="text-3xl font-black relative">
            <span className="text-red-600 dark:text-secondary relative">
              S
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 dark:bg-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </span>
            <span className="text-red-600 dark:text-secondary relative">
              R
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-red-600 dark:bg-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
            </span>
            <span className="text-secondary">.</span>
          </span>
        </motion.div>
        <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </motion.div>
  );

  const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-white dark:bg-primary py-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
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
                className="px-4 py-2 text-sm text-secondary border border-secondary rounded-lg hover:bg-secondary hover:text-white transition-colors"
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
    <div name="about" className={styles.sectionContainer}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-start py-8"
        >
          {/* Image Section */}
          <motion.div
            variants={fadeInUp}
            className="order-2 md:order-1 flex justify-center"
          >
            <div className="relative w-full max-w-[380px] h-[480px] rounded-xl overflow-hidden shadow-lg group">
              <img
                src="/professional-portrait.jpg"
                alt="Srujan Madderla - Professional Portrait"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                style={{ objectPosition: "50% 25%" }}
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>
              {/* Refined border */}
              <div className="absolute inset-0 border border-gray-200/20 dark:border-gray-700/20 rounded-xl"></div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            variants={fadeInUp}
            className="order-1 md:order-2 flex flex-col h-full justify-center"
          >
            <h2 className={`${styles.sectionTitle} text-left md:text-left mb-6`}>
              About Me
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 max-w-xl">
              <p className="block">I have successfully implemented scalable incident management frameworks that reduce resolution time and enhance service reliability.</p>
              <p className="block">My background includes strategic account management, focused on driving long-term customer success and satisfaction.</p>
              <p className="block">I played a key role in redesigning and optimizing the community portal to improve user engagement and self-service adoption.</p>
              <p className="block">Additionally, I've streamlined business operations by aligning cross-functional teams and automating key workflows.</p>
              <p className="block">This combination of technical proficiency and business insight enables me to deliver both operational efficiency and exceptional customer experiences.</p>
            </div>
          </motion.div>
        </motion.div>
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
    <div className="w-full min-h-screen bg-white dark:bg-primary transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full h-[80px] flex justify-between items-center px-4 
                 ${darkMode ? 'bg-primary border-gray-800' : 'bg-white border-gray-200'} 
                 z-50 border-b transition-colors duration-300`}>
        <Logo />

        {/* Menu */}
        <div className="flex items-center">
          <ul className="hidden md:flex mr-8">
            {navItems.map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={item.toLowerCase()} 
                  smooth={true} 
                  duration={500} 
                  className="nav-link px-4 text-gray-800 dark:text-white hover:text-secondary dark:hover:text-secondary transition-colors duration-300"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun size={24} className="text-white" />
            ) : (
              <FaMoon size={24} className="text-gray-800" />
            )}
          </motion.button>
        </div>

        {/* Hamburger */}
        <div 
          onClick={() => setNav(!nav)} 
          className="md:hidden z-10 cursor-pointer"
          role="button"
          aria-label="Toggle menu"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter') setNav(!nav);
          }}
        >
          {nav ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        <motion.ul
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: nav ? 1 : 0, x: nav ? 0 : 100 }}
          transition={{ duration: 0.3 }}
          className={`${nav ? 'flex' : 'hidden'} absolute top-0 left-0 w-full h-screen ${darkMode ? 'bg-primary' : 'bg-white'} flex-col justify-center items-center`}
        >
          {['Home', 'About', 'Education', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.1 }}
              className="py-6 text-4xl nav-link"
            >
              <Link onClick={() => setNav(false)} to={item.toLowerCase()} smooth={true} duration={500}>
                {item}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </nav>

      {/* Hero Section */}
      <div name="home" className="w-full h-screen bg-white dark:bg-primary transition-colors duration-300">
        <div className="max-w-[800px] mx-auto px-4 flex flex-col justify-center h-full">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
            className="max-w-[800px] px-4 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-secondary"
          >
              Hi, I am 
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
              className="text-4xl sm:text-7xl font-bold mb-8"
          >
              <span className="text-red-600 dark:text-white">S</span>
              <span className="text-gray-800 dark:text-white">rujan </span>
              <span className="text-red-600 dark:text-white">M</span>
              <span className="text-gray-800 dark:text-white">adderla</span>
          </motion.h1>
            <h2 className="text-3xl sm:text-6xl font-bold text-lightestText mt-8">
            <TypeAnimation
              sequence={[
                'Product Support Expert',
                  2000,
                  'Software Professional',
                2000,
                'Incident Manager',
                2000,
                  'Community Manager',
                  2000,
                  'Business Operations',
                  2000,
                  'Knowledge Management',
                  2000
              ]}
              wrapper="span"
                speed={30}
              repeat={Infinity}
            />
          </h2>
        </motion.div>
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Experience Section */}
      <div name="experience" className={styles.sectionContainer}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Work Experience
          </motion.h2>
          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <ExperienceCard key={index} job={job} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div name="certifications" className={styles.sectionContainer}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Professional Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificationsData.map((cert, index) => (
              <CertificationCard key={index} cert={cert} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <div name="skills" className={styles.sectionContainer}>
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Skills
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Incident Management", level: 90 },
              { name: "Product Support", level: 95 },
              { name: "Customer Success", level: 85 },
              { name: "Knowledge Management", level: 88 },
              { name: "Process Improvement", level: 92 },
              { name: "Team Leadership", level: 85 },
              { name: "Technical Writing", level: 90 },
              { name: "Problem Solving", level: 93 }
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-tertiary p-4 rounded-xl shadow-lg text-primary dark:text-lightText"
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
          <motion.h2 variants={fadeInUp} className={styles.sectionTitle}>
            Education
            </motion.h2>
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
import { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  // const [setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // useEffect(() => {
  //   // const onScroll = () => {
  //   //   setScrollY(window.scrollY);
  //   // };

  //   window.addEventListener("scroll", onScroll);

  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    observerRef.current = observer;

    const elements = document.querySelectorAll("[data-observe]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "JavaScript" },
    { name: "Java" },
    { name: "TypeScript" },
    { name: "Python" },
    { name: "AWS" },
    { name: "React" },
    { name: "Terraform" },
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "Node.js" },
    { name: "PostgreSQL" },
    { name: "Azure" },
    { name: "ROS" },
    { name: "Linux" },
    { name: "HTML/CSS" },
    { name: "Angular" },
    { name: "VMware vSphere" },
    { name: "Vault" },
    { name: "REST APIs" },
    { name: "Agile/Scrum" },
    { name: "Git" }
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "Bank of America",
      period: "July 2025 - Present",
      location: "New York City, NY",
      points: [
        "Provision and manage virtualized infrastructure using Broadcom VMware vSphere Foundation, supporting internal cloud platforms on the Core Technology Infrastructure team.",
        "Work with Kubernetes (VMware Tanzu) and Terraform to automate infrastructure provisioning and support scalable, containerized workloads"
      ],
      tags: ["VMware", "Kubernetes", "Terraform"]
    },
    {
      title: "Software Engineering Intern",
      company: "Bank of America",
      period: "June 2024 - August 2024",
      location: "New York City, NY",
      points: [
        "Built and scaled a backend entitlement system using Python, Azure SDK, and REST APIs to support enterprise access control.",
        "Extended and maintained existing Terraform configurations to support scalable development environments.",
        "Strengthened data security through Vault integration, supporting secure secrets management within existing access control workflows."
      ],
      tags: ["Python", "Azure", "Terraform"]
    },
    {
      title: "Software Engineer Intern",
      company: "SAS",
      period: "May 2023 - May 2024",
      location: "Cary, NC",
      points: [
        "Developed full-stack features for an NLP-powered chatbot, designing backend services in Flask and integrating them with a responsive frontend.",
        "Deployed service on Google Cloud and implemented CI/CD pipelines to support reliable production releases.",
        "Wrote unit tests using Pytest and participated in peer code reviews to maintain code quality and system reliability."
      ],
      tags: ["Flask", "Google Cloud", "NLP"]
    },
    {
      title: "Undergraduate Research Assistant",
      company: "NCSU f1tenth Lab",
      period: "August 2023 - February 2024",
      location: "Raleigh, NC",
      points: [
        "Developed autonomous driving algorithms using ROS on Linux, improving vehicle control and responsiveness in high-speed navigation.",
        "Automated test environments using containerization to improve experiment reproducibility and streamline research workflows."
      ],
      tags: ["ROS", "Linux", "Python"]
    }
  ];


  return (
    <div className="app">
      {/* Animated Orbs Background */}
      <div className="background">
        {[...Array(27)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>


      {/* Content */}
      <div className="content">
        {/* Hero */}
        <section className="hero">
          <h1>Rishika Baichwal</h1>
          <p className="desc">
            I'm a software engineer passionate about creative problem solving.
            I love building intuitive systems, exploring new technologies, and turning
            creative ideas into accessible tools! I have experience in backend infrastructure
            and fullstack work.
          </p>
          <a href="/Rishika_Baichwal_RESUME.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button className="cta">View Resume</button>
          </a>
        </section>

        {/* About */}
        <section
          id="about"
          data-observe
          className={`about ${visibleSections.has("about") ? "visible" : ""}`}
        >
          <img src="/profilepic.jpeg" className="photo" />
          <div className="about-text">
            <h2>About Me</h2>
            <p>
              Hi, my name is Rishika Baichwal and I am a 2025 grad from NC State University.
              I have extensive experience in cloud infrastructure, including services such as
              Terraform, Azure, AWS, VMware, and Tanzu Kubernetes. I also enjoy solving complex
              coding challenges through analytics and algorithmic design.
            </p>
            <p>
              I am interested in fullstack development or anything that allows for creative
              problem solving. I am always open to learning more about tech industry developments,
              so reach out to chat!
            </p>
            <span className="location">📍 New York City, NY</span>
          </div>
        </section>

        {/* My Skills */}
        <section
          id="skills"
          data-observe
          className={`skills-section ${visibleSections.has("skills") ? "visible" : ""}`}
        >
          <h2>My Skills</h2>

          {[0, 1, 2].map((rowIndex) => {
            let rowSkills;
            if (rowIndex === 0) {
              rowSkills = skills.slice(0, 7);
            } else if (rowIndex === 1) {
              rowSkills = skills.slice(7, 14);
            } else {
              rowSkills = skills.slice(14, 21);
            }

            return (
              <div
                key={rowIndex}
                className={`skills-row ${rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"}`}
              >
                {rowSkills.map((skill, i) => (
                  <div key={`${rowIndex}-${i}`} className="skill">
                    {skill.name}
                  </div>
                ))}
              </div>
            );
          })}
        </section>

        {/* Experience */}
        <section id="experience" data-observe className="experience-section">
          <h2>Experience</h2>
          <p className="subtitle">My professional journey and experiences</p>

          <div className="timeline">
            <div className="timeline-line" />

            {experiences.map((exp, i) => (
              <div
                key={i}
                id={`exp-${i}`}
                data-observe
                className={`experience-card ${visibleSections.has(`exp-${i}`) ? "visible" : ""}`}
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                <div className="timeline-dot" />

                <div className="card-content">
                  <div className="card-header">
                    <div>
                      <h3>{exp.title}</h3>
                      <p className="company">{exp.company}</p>
                    </div>
                    <span className="period">{exp.period}</span>
                  </div>

                  <ul className="points">
                    {exp.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>

                  <div className="tags">
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          data-observe
          className={`contact-section ${visibleSections.has("contact") ? "visible" : ""}`}
        >
          <h2>Reach Out!</h2>

          <div className="contact-grid">

            <div className="contact-info">

              <div className="info-item">
                <div className="info-label">Email</div>
                <div className="info-value">
                  <a href="mailto:rishbaichwal@gmail.com">rishbaichwal@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-label">Location</div>
                <div className="info-value">New York, NY</div>
              </div>

              <div className="info-item">
                <div className="info-label">My Socials</div>
                <div className="social-links">
                  <a href="https://github.com/rishbai" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/rishikabaichwal" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
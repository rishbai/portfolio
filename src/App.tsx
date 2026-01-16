import { useEffect, useState, useRef } from "react";
import "./App.css";

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
    { name: "JavaScript"},
    { name: "React"},
    { name: "TypeScript"},
    { name: "Python"},
    { name: "AWS"},
    { name: "Terraform"},
    { name: "Docker"},
    { name: "Kubernetes"},
    { name: "Node.js"},
    { name: "PostgreSQL"},
    { name: "Git"},
    { name: "Azure"},
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company: "Bank of America",
      period: "July 2025 - Present",
      location: "New York City, NY",
      points: [
        "Provision and manage virtualized infrastructure using Broadcom VMware vSphere Foundation",
        "Work with Kubernetes and Terraform to automate infrastructure provisioning",
        "Support scalable, containerized workloads on Core Technology Infrastructure team"
      ],
      tags: ["VMware", "Kubernetes", "Terraform"]
    },
    {
      title: "Software Engineering Intern",
      company: "Bank of America",
      period: "June 2024 - August 2024",
      location: "New York City, NY",
      points: [
        "Built and scaled backend entitlement system using Python, Azure SDK, and REST APIs",
        "Extended Terraform configurations for scalable development environments",
        "Strengthened data security through Vault integration"
      ],
      tags: ["Python", "Azure", "Terraform"]
    },
    {
      title: "Software Engineer Intern",
      company: "SAS",
      period: "May 2023 - May 2024",
      location: "Cary, NC",
      points: [
        "Developed full-stack features for NLP-powered chatbot with Flask backend",
        "Deployed service on Google Cloud with CI/CD pipelines",
        "Wrote unit tests using Pytest and participated in code reviews"
      ],
      tags: ["Flask", "Google Cloud", "NLP"]
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
              Hi, I'm a software engineer who likes breaking things just to figure out
              how to fix them—usually with JavaScript and snacks. I build systems that
              try their best to work on the first try (no promises though).
            </p>
            <p>
              React and Tailwind are my daily tools, and I'm currently exploring the
              mysterious land of backend development where bugs go to multiply. Full-stack
              dreams, coffee-fueled nights, and lots of console.log.
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

          {[0, 1, 2].map((rowIndex) => (
            <div
              key={rowIndex}
              className={`skills-row ${rowIndex % 2 === 0 ? "scroll-left" : "scroll-right"}`}
            >
              {[...skills, ...skills].slice(rowIndex * 4, rowIndex * 4 + 8).map((skill, i) => (
                <div key={`${rowIndex}-${i}`} className="skill">
                  {skill.name}
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Experience */}
        <section id="experience" data-observe className="experience-section">
          <h2>Experience</h2>
          <p className="subtitle">My professional journey and key experiences</p>

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
      </div>

      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    </div>
  );
}
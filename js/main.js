/**
 * ACM MITS Student Chapter - Ultra-Premium Engine
 * Madhav Institute of Technology and Science (MITS), Gwalior
 * Tagline: "Code. Create. Connect."
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initHeroCanvas();
  initCardSpotlights();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initStatsCounter();
  initTerminalInteractive();
  initEventsFilterAndModal();
  initGalleryFilterAndLightbox();
  initJoinModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   1. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgressBar() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.prepend(bar);
  }

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    bar.style.width = progress + '%';
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Mouse Spotlight on Glass Cards
   -------------------------------------------------------------------------- */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* --------------------------------------------------------------------------
   3. Subtle Technology Particle & Grid Canvas Engine
   -------------------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 42;
  let mouse = { x: null, y: null, radius: 130 };

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, ' : 'rgba(59, 130, 246, ';
      this.alpha = Math.random() * 0.45 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Subtle gentle mouse repulsion
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color + '0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   4. Interactive Terminal in Hero
   -------------------------------------------------------------------------- */
function initTerminalInteractive() {
  const terminalBody = document.getElementById('terminal-interactive-content');
  if (!terminalBody) return;

  const logs = [
    { type: 'cmd', text: 'npx acm-mits-cli init --chapter=mits-gwalior' },
    { type: 'out', text: '✔ Initializing ACM MITS Student Chapter environment...' },
    { type: 'out', text: '✔ Connecting 500+ student developers & faculty mentor...' },
    { type: 'out', text: '✔ Tracks loaded: [Competitive Coding, Hackathons, AI/ML, Cloud]' },
    { type: 'accent', text: '🚀 ACM MITS is live: "Code. Create. Connect."' }
  ];

  let lineIndex = 0;

  function renderNextLine() {
    if (lineIndex < logs.length) {
      const item = logs[lineIndex];
      const lineEl = document.createElement('div');

      if (item.type === 'cmd') {
        lineEl.className = 'terminal-line';
        lineEl.innerHTML = `<span class="terminal-prompt">$</span> <span class="terminal-command">${item.text}</span>`;
      } else if (item.type === 'accent') {
        lineEl.className = 'terminal-output';
        lineEl.innerHTML = `<span class="terminal-cyan">${item.text}</span>`;
      } else {
        lineEl.className = 'terminal-output';
        lineEl.innerText = item.text;
      }

      terminalBody.appendChild(lineEl);
      lineIndex++;
      setTimeout(renderNextLine, 500);
    }
  }

  setTimeout(renderNextLine, 400);
}

/* --------------------------------------------------------------------------
   5. Sticky Navbar & Active Section Tracking
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  const observerOptions = {
    threshold: 0.25
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   6. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const mobileLinks = drawer ? drawer.querySelectorAll('a') : [];

  function openMenu() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   7. Scroll Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.glass-card, .section-header, .stat-card, .hero-terminal');

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. Animated Stats Counter
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = target.getAttribute('data-count');
        if (!countTo) return;

        let start = 0;
        const end = parseInt(countTo);
        const duration = 1600;
        const stepTime = Math.max(Math.floor(duration / end), 20);

        const timer = setInterval(() => {
          start += Math.ceil(end / 40);
          if (start >= end) {
            target.innerText = end + '+';
            clearInterval(timer);
          } else {
            target.innerText = start + '+';
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(num => observer.observe(num));
}

/* --------------------------------------------------------------------------
   9. Events Filter, Search & Modal Engine
   -------------------------------------------------------------------------- */
const sampleEventsData = [
  {
    id: 1,
    name: "HackACM 2026 - National Student Hackathon",
    category: "hackathon",
    categoryLabel: "Hackathon",
    status: "upcoming",
    statusLabel: "Registration Live",
    date: "[Editable Date: Nov 15-16, 2026]",
    time: "36 Hours Live Code Sprint",
    location: "MITS Auditorium & Hybrid",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    desc: "The flagship annual hackathon of ACM MITS uniting developers, designers, and innovators to build high-impact tech solutions.",
    fullDesc: "HackACM is our signature 36-hour hackathon where student teams build prototypes addressing Healthcare, FinTech, AI, and Sustainable Tech. Features 1-on-1 industry mentorship and a generous prize pool.",
    prereqs: "Open to all engineering students. Teams of 2-4 members.",
    agenda: [
      "Day 1: Opening Ceremony & Problem Statements Release",
      "Day 1: Mentor Round 1 & Midnight Snack Sprints",
      "Day 2: Final Demos, Expert Jury Evaluation & Prizes"
    ]
  },
  {
    id: 2,
    name: "Cloud Architecture & Microservices Bootcamp",
    category: "workshop",
    categoryLabel: "Workshop",
    status: "upcoming",
    statusLabel: "Upcoming",
    date: "[Editable Date: Oct 28, 2026]",
    time: "02:00 PM - 05:30 PM",
    location: "CS Lab 3, MITS Gwalior",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    desc: "Hands-on technical workshop on deploying containerized microservices using Docker, Kubernetes, and modern cloud patterns.",
    fullDesc: "Learn practical production deployment patterns, container orchestration, CI/CD pipeline automation, and serverless edge functions guided by senior student mentors and guest engineers.",
    prereqs: "Basic knowledge of Linux terminal commands and web fundamentals.",
    agenda: [
      "Part 1: Containerization with Docker",
      "Part 2: Kubernetes Cluster Architecture & Pods",
      "Part 3: Live Production Deployment & Certification"
    ]
  },
  {
    id: 3,
    name: "CodeRush: Algorithmic Duel 2026",
    category: "contest",
    categoryLabel: "Coding Contest",
    status: "upcoming",
    statusLabel: "Upcoming",
    date: "[Editable Date: Oct 10, 2026]",
    time: "06:00 PM - 09:00 PM",
    location: "Online Platform (CodeChef/CP)",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    desc: "High-speed competitive programming contest testing data structures, graph theory, and algorithmic problem-solving speed.",
    fullDesc: "CodeRush is an ACM MITS monthly competitive coding challenge featuring 6 graded problem statements designed to prepare students for ICPC, Google Code Jam, and technical interviews.",
    prereqs: "C++, Java, or Python proficiency.",
    agenda: [
      "06:00 PM - Challenge Goes Live",
      "09:00 PM - Submissions Conclude",
      "Editorial Session & Leaderboard Reveal"
    ]
  },
  {
    id: 4,
    name: "AI & Transformer Architecture Deep-Dive",
    category: "talk",
    categoryLabel: "Tech Talk",
    status: "completed",
    statusLabel: "Completed",
    date: "[Editable Date: Sep 05, 2026]",
    time: "04:00 PM - 06:00 PM",
    location: "MITS Seminar Hall 1",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    desc: "Exploring generative AI, self-attention mechanics, transformer architectures, and building production RAG pipelines.",
    fullDesc: "An insightful tech talk discussing how large language models work under the hood, fine-tuning techniques, and practical vector database integrations.",
    prereqs: "Interest in Artificial Intelligence and Machine Learning.",
    agenda: [
      "Overview of Transformer Architectures",
      "Building Production RAG Pipelines",
      "Interactive Q&A Session"
    ]
  },
  {
    id: 5,
    name: "Open Source Summer & Git Masterclass",
    category: "workshop",
    categoryLabel: "Workshop",
    status: "completed",
    statusLabel: "Completed",
    date: "[Editable Date: Aug 18, 2026]",
    time: "10:00 AM - 04:00 PM",
    location: "Computer Center, MITS",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    desc: "Bootcamp introducing students to Git branch management, GitHub collaboration workflows, Hacktoberfest preparation, and open-source licenses.",
    fullDesc: "Master version control fundamentals! Students created their first pull requests, merged code cleanly, and set up GitHub developer portfolios.",
    prereqs: "Laptop required.",
    agenda: [
      "Git Basics: Commit, Branch, Merge",
      "GitHub Workflow & Pull Requests",
      "Contributing to Global Open Source Projects"
    ]
  },
  {
    id: 6,
    name: "Careers in Tech: Alumni Leadership Panel",
    category: "seminar",
    categoryLabel: "Seminar",
    status: "completed",
    statusLabel: "Completed",
    date: "[Editable Date: Jul 12, 2026]",
    time: "05:00 PM - 07:00 PM",
    location: "Virtual / Google Meet",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    desc: "MITS alumni from top tier tech companies share career roadmaps, system design strategies, and interview guidance.",
    fullDesc: "A panel discussion with distinguished alumni working across Product Engineering, DevOps, and AI Research, sharing strategies for tech interviews and higher studies.",
    prereqs: "Open to all MITS students.",
    agenda: [
      "Panel Discussion & Career Journey Stories",
      "Resume Prep & Interview Strategy Tips",
      "Open Q&A Networking"
    ]
  }
];

function initEventsFilterAndModal() {
  const tabs = document.querySelectorAll('.events-tabs .filter-tab');
  const searchInput = document.getElementById('events-search');
  const modal = document.getElementById('event-modal');
  const modalClose = document.getElementById('event-modal-close');
  const eventGrid = document.getElementById('events-grid');

  if (!eventGrid) return;

  let currentFilter = 'all';
  let searchQuery = '';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderEvents();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderEvents();
    });
  }

  renderEvents();

  function renderEvents() {
    eventGrid.innerHTML = '';
    const filtered = sampleEventsData.filter(ev => {
      const matchCategory = currentFilter === 'all' || ev.category === currentFilter;
      const matchSearch = searchQuery === '' || 
        ev.name.toLowerCase().includes(searchQuery) || 
        ev.desc.toLowerCase().includes(searchQuery) ||
        ev.categoryLabel.toLowerCase().includes(searchQuery);
      return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
      eventGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:4rem; color:var(--text-muted); background:rgba(15,23,42,0.4); border-radius:var(--radius-md); border:1px solid var(--border-subtle);">No events match your criteria. Try adjusting your search query or filter.</div>`;
      return;
    }

    filtered.forEach(ev => {
      const card = document.createElement('div');
      card.className = 'glass-card event-card';
      card.innerHTML = `
        <div class="event-banner">
          <img src="${ev.image}" alt="${ev.name}" loading="lazy">
          <span class="event-status-badge ${ev.status === 'upcoming' ? 'status-upcoming' : 'status-completed'}">
            ${ev.statusLabel}
          </span>
        </div>
        <div class="event-body">
          <span class="event-category-label">${ev.categoryLabel}</span>
          <h3 class="event-title">${ev.name}</h3>
          <div class="event-meta">
            <div class="event-meta-item">
              <svg fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>${ev.date}</span>
            </div>
          </div>
          <p class="event-desc">${ev.desc}</p>
          <div class="event-footer">
            <span class="placeholder-badge">Sample Event Data</span>
            <button class="btn btn-outline btn-sm view-event-btn" data-id="${ev.id}">
              View Details &rarr;
            </button>
          </div>
        </div>
      `;

      eventGrid.appendChild(card);
    });

    // Re-bind spotlights for newly rendered cards
    initCardSpotlights();

    // Attach click handlers to View Details buttons
    document.querySelectorAll('.view-event-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'));
        const eventItem = sampleEventsData.find(e => e.id === id);
        if (eventItem) openEventModal(eventItem);
      });
    });
  }

  function openEventModal(ev) {
    const modalBody = document.getElementById('event-modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom:1.5rem;">
        <span class="event-category-label">${ev.categoryLabel}</span>
        <h2 style="font-size:1.85rem; margin:0.4rem 0 0.8rem 0;">${ev.name}</h2>
        <div class="event-meta" style="flex-wrap:wrap; gap:1.2rem;">
          <div class="event-meta-item">
            <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="var(--primary-purple-light)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span>${ev.date}</span>
          </div>
          <div class="event-meta-item">
            <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>${ev.time}</span>
          </div>
          <div class="event-meta-item">
            <svg fill="none" viewBox="0 0 24 24" width="16" height="16" stroke="#f472b6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>${ev.location}</span>
          </div>
        </div>
      </div>
      <img src="${ev.image}" alt="${ev.name}" style="width:100%; height:230px; object-fit:cover; border-radius:var(--radius-md); margin-bottom:1.5rem; border:1px solid var(--border-subtle);">
      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:0.5rem;">Event Overview</h4>
        <p style="color:var(--text-secondary); line-height:1.75;">${ev.fullDesc}</p>
      </div>
      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:0.5rem;">Eligibility / Prerequisites</h4>
        <p style="color:var(--text-muted); font-size:0.95rem;">${ev.prereqs}</p>
      </div>
      <div style="margin-bottom:2rem;">
        <h4 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:0.5rem;">Event Schedule</h4>
        <ul style="display:flex; flex-direction:column; gap:0.6rem;">
          ${ev.agenda.map(a => `<li style="display:flex; align-items:center; gap:0.6rem; color:var(--text-secondary); font-size:0.92rem;"><span style="color:var(--accent-cyan);">&#9656;</span> ${a}</li>`).join('')}
        </ul>
      </div>
      <div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap; border-top:1px solid var(--border-subtle); padding-top:1.5rem;">
        <button class="btn btn-primary" onclick="showToast('Registration link ready for official ACM event portal!')">
          RSVP / Register Now
        </button>
        <span class="placeholder-badge">[Editable Event Link Placeholder]</span>
      </div>
    `;

    modal.classList.add('active');
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   10. Gallery Filtering & Interactive Lightbox Carousel
   -------------------------------------------------------------------------- */
const galleryData = [
  {
    id: 1,
    title: "HackACM Innovation Sprint Night",
    category: "hackathons",
    tag: "Hackathon",
    date: "November 2025",
    caption: "Teams brainstorming and coding overnight during the 36-hour flagship hackathon.",
    img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Full-Stack Dev & Cloud Workshop",
    category: "workshops",
    tag: "Workshop",
    date: "October 2025",
    caption: "Hands-on lab sessions on containerization and microservices architecture.",
    img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Competitive Coding Championship",
    category: "coding",
    tag: "Coding Contest",
    date: "September 2025",
    caption: "High-stakes algorithmic duels preparing students for ICPC regionals.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "AI & Neural Networks Keynote",
    category: "talks",
    tag: "Tech Talk",
    date: "August 2025",
    caption: "Industry architects discussing transformer architectures and production LLMs.",
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Annual ACM Community Onboarding",
    category: "community",
    tag: "Community",
    date: "July 2025",
    caption: "Welcoming 200+ new first-year engineering students to the ACM MITS chapter.",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Student Project Expo & Demo Day",
    category: "workshops",
    tag: "Exhibition",
    date: "May 2025",
    caption: "Student innovators showcasing open source solutions to faculty and jury.",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    title: "Open Source Git Masterclass",
    category: "workshops",
    tag: "Workshop",
    date: "March 2025",
    caption: "Mastering Git branching workflows, pull requests, and collaborative code reviews.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    title: "MITS Tech Alumni Speaker Panel",
    category: "talks",
    tag: "Tech Talk",
    date: "January 2025",
    caption: "Distinguished alumni sharing industry roadmaps and FAANG interview insights.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80"
  }
];

function initGalleryFilterAndLightbox() {
  const tabs = document.querySelectorAll('.gallery-tabs .filter-tab');
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  if (!grid) return;

  let currentCategory = 'all';
  let activeGalleryList = [...galleryData];
  let currentActiveIndex = 0;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      currentCategory = tab.getAttribute('data-filter');
      renderGallery();
    });
  });

  renderGallery();

  function renderGallery() {
    grid.innerHTML = '';
    activeGalleryList = currentCategory === 'all' 
      ? [...galleryData] 
      : galleryData.filter(g => g.category === currentCategory);

    if (activeGalleryList.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No images found in this category.</div>`;
      return;
    }

    activeGalleryList.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-tag">${item.tag} &bull; ${item.date}</span>
          <h4 class="gallery-title">${item.title}</h4>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(index));
      grid.appendChild(card);
    });
  }

  function openLightbox(index) {
    currentActiveIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
  }

  function updateLightboxContent() {
    if (activeGalleryList.length === 0) return;
    const item = activeGalleryList[currentActiveIndex];
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxTag = document.getElementById('lightbox-tag');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxCounter = document.getElementById('lightbox-counter');

    if (lightboxImg) lightboxImg.src = item.img;
    if (lightboxTitle) lightboxTitle.innerText = item.title;
    if (lightboxTag) lightboxTag.innerText = `${item.tag} | ${item.date}`;
    if (lightboxCaption) lightboxCaption.innerText = item.caption;
    if (lightboxCounter) lightboxCounter.innerText = `${currentActiveIndex + 1} / ${activeGalleryList.length}`;
  }

  function showPrevImage() {
    if (activeGalleryList.length <= 1) return;
    currentActiveIndex = (currentActiveIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
    updateLightboxContent();
  }

  function showNextImage() {
    if (activeGalleryList.length <= 1) return;
    currentActiveIndex = (currentActiveIndex + 1) % activeGalleryList.length;
    updateLightboxContent();
  }

  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   11. Join Us Interactive Modal
   -------------------------------------------------------------------------- */
function initJoinModal() {
  const modal = document.getElementById('join-modal');
  const closeBtn = document.getElementById('join-modal-close');
  const openBtns = document.querySelectorAll('.open-join-modal');
  const form = document.getElementById('join-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      modal.classList.remove('active');
      showToast('Application recorded! Ready to connect to official Google Form / Registration system.');
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   12. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Your message has been dispatched! ACM MITS team will respond shortly.');
    form.reset();
  });
}

/* --------------------------------------------------------------------------
   13. Toast Notification Engine
   -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="var(--accent-cyan)">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * ============================================================================
 * VANSH SHARMA | B.Tech CSE Core Portfolio Interactive Engine
 * THEME: Gamer & Software Engineer Fusion (Tactical HUD + 3D Cyber Matrix)
 * 
 * Features:
 * 1. Radiant 60 FPS 3D Cyber Perspective Grid with Additive Blending ('lighter')
 * 2. 3D Constellation Particle Matrix with dynamic laser connections
 * 3. High-Speed Luminous Data Stream Sparks
 * 4. Interactive Hero Code Terminal (Tab switching, Code execution & Copy)
 * 5. Dynamic Animated Number Counters (CBSE 83.4%, 60 FPS, 100%)
 * 6. Tactical Gaming Subtitle Typing Engine
 * 7. Certificate Modal Viewer with High-Res CBSE Documents
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. DYNAMIC NUMBER COUNTERS (Hero HUD)
  // ==========================================================================
  const counters = document.querySelectorAll('.counter-num[data-target]');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    counters.forEach(counter => {
      const targetStr = counter.getAttribute('data-target');
      if (!targetStr) return;
      const isFloat = targetStr.includes('.');
      const target = parseFloat(targetStr);
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 1600; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = isFloat 
          ? (target * easeProgress).toFixed(1)
          : Math.floor(target * easeProgress);

        counter.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = `${prefix}${targetStr}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters with observer or immediate fallback
  const heroCountersRow = document.querySelector('.hero-counters-row');
  if (heroCountersRow && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    observer.observe(heroCountersRow);
  } else {
    setTimeout(runCounters, 300);
  }

  // ==========================================================================
  // 2. HERO SUBTITLE TYPING ENGINE
  // ==========================================================================
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const roles = [
      "B.Tech Computer Science & Engineering (Core)",
      "C / C++ & Algorithmic Problem Solver",
      "Modern Web & Frontend Developer",
      "JECRC University '30 • Aspiring Software Engineer",
      "Systems Programming & Logic Explorer"
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let speed = 80;

    function typeStep() {
      const current = roles[wordIdx];

      if (isDeleting) {
        typingElement.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        speed = 40;
      } else {
        typingElement.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        speed = 75;
      }

      if (!isDeleting && charIdx === current.length) {
        speed = 2200; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % roles.length;
        speed = 400; // Pause before new word
      }

      setTimeout(typeStep, speed);
    }

    typeStep();
  }

  // ==========================================================================
  // 3. INTERACTIVE HERO CODE TERMINAL
  // ==========================================================================
  const terminalTabs = document.querySelectorAll('.t-tab');
  const terminalPanels = document.querySelectorAll('.terminal-tab-panel');
  const runCodeBtn = document.getElementById('runCodeBtn');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const terminalOutput = document.getElementById('terminalOutput');

  // Tab switching
  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      terminalTabs.forEach(t => t.classList.remove('active'));
      terminalPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPanel = document.getElementById(`panel-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Run Code Simulation
  if (runCodeBtn && terminalOutput) {
    runCodeBtn.addEventListener('click', () => {
      runCodeBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> RUNNING...`;
      terminalOutput.classList.remove('show');

      setTimeout(() => {
        runCodeBtn.innerHTML = `<i class="fa-solid fa-play"></i> EXECUTE`;
        terminalOutput.classList.add('show');
        terminalOutput.innerHTML = `
          <div>&gt;&gt; [SYSTEM COMPILER]: g++ -O3 profile.cpp -o vansh_portfolio</div>
          <div>&gt;&gt; [BUILD SUCCESS]: 0 errors, 0 warnings. Execution output:</div>
          <div style="color: #00f2fe; margin-top: 4px;">&gt;&gt; "Hello World! I'm Vansh Sharma — Ready to build impactful software!"</div>
          <div style="color: #ff4655;">&gt;&gt; [STATUS]: Active Student @ JECRC University, Jaipur (2026–2030)</div>
        `;
      }, 650);
    });
  }

  // Copy Code
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.terminal-tab-panel.active pre');
      if (activePanel) {
        navigator.clipboard.writeText(activePanel.innerText).then(() => {
          const original = copyCodeBtn.innerHTML;
          copyCodeBtn.innerHTML = `<i class="fa-solid fa-check"></i> COPIED`;
          setTimeout(() => {
            copyCodeBtn.innerHTML = original;
          }, 2000);
        });
      }
    });
  }

  // ==========================================================================
  // 4. THEME TOGGLE (Dark / Light Mode)
  // ==========================================================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlElement = document.documentElement;

  const currentTheme = localStorage.getItem('vansh_theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const now = htmlElement.getAttribute('data-theme');
      const next = now === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', next);
      localStorage.setItem('vansh_theme', next);
      updateThemeIcon(next);
      if (window.cyberEngine) {
        window.cyberEngine.setTheme(next);
      }
    });
  }

  function updateThemeIcon(t) {
    if (!themeIcon) return;
    if (t === 'dark') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.title = 'Switch to Light Mode';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.title = 'Switch to Dark Cyber Mode';
    }
  }

  // ==========================================================================
  // 5. MOBILE MENU DRAWER
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ==========================================================================
  // 6. PROJECTS FILTER BAR
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-hud-btn');
  const projectCards = document.querySelectorAll('.project-hud-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 7. CERTIFICATE MODAL PREVIEW (High-Res CBSE Documents)
  // ==========================================================================
  const certModal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');

  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');

      if (imgSrc && certModal) {
        modalImg.src = imgSrc;
        modalTitle.textContent = title || 'Verified Certificate';
        modalDownloadBtn.href = imgSrc;
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (certModal) {
      certModal.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (modalImg) modalImg.src = '';
      }, 200);
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 8. ACTIVE NAVBAR LINK ON SCROLL
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // ==========================================================================
  // 9. CONTACT FORM DISPATCH
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessMsg = document.getElementById('formSuccessMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName')?.value || 'Friend';
      const email = document.getElementById('senderEmail')?.value || '';
      const subject = document.getElementById('senderSubject')?.value || 'Portfolio Contact';
      const message = document.getElementById('senderMessage')?.value || '';

      if (formSuccessMsg) {
        formSuccessMsg.style.display = 'flex';
        formSuccessMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Preparing communication channel...`;
      }

      const emailRecipient = "vanshsharmabtech@gmail.com";
      const fullSubject = encodeURIComponent(`[Vansh Portfolio] ${subject} - ${name}`);
      const fullBody = encodeURIComponent(`Hi Vansh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent via Vansh Sharma Portfolio`);
      const mailtoUrl = `mailto:${emailRecipient}?subject=${fullSubject}&body=${fullBody}`;

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();

      setTimeout(() => {
        if (formSuccessMsg) formSuccessMsg.style.display = 'none';
      }, 7000);
    });
  }

  // ==========================================================================
  // 10. RADIANT 3D CYBER ANIMATED BACKGROUND ENGINE (60 FPS)
  //     - Additive Blending ('lighter') for intense neon laser luminescence
  //     - Glowing 3D Perspective Horizon Grid with Wave Oscillations
  //     - 140+ 3D Floating Constellation Particles with multi-depth scaling
  //     - High-speed glowing data stream sparks traversing formed lines
  //     - Pulsing nodes with expanding soft neon halos
  //     - Interactive mouse parallax with smooth camera damping
  //     - NO THICK DARK OVERLAYS: Clean, brilliant, and readable!
  // ==========================================================================
  const canvas = document.getElementById('bgParticleCanvas');
  const mouseGlow = document.getElementById('mouseGlowFollower');

  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isDark = htmlElement.getAttribute('data-theme') !== 'light';

    // Interactive mouse parallax tracker
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      radius: 170,
      active: false
    };

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initGrid();
      initParticles();
    }

    // Mouse listener
    window.addEventListener('mousemove', (e) => {
      mouse.active = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.targetX = (e.clientX / width) * 2 - 1;
      mouse.targetY = (e.clientY / height) * 2 - 1;

      if (mouseGlow) {
        mouseGlow.style.opacity = '1';
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
      }
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
      if (mouseGlow) mouseGlow.style.opacity = '0';
    });

    // Touch tracking for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        mouse.active = true;
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.targetX = (mouse.x / width) * 2 - 1;
        mouse.targetY = (mouse.y / height) * 2 - 1;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
      mouse.targetX = 0;
      mouse.targetY = 0;
    });

    // ------------------------------------------------------------------------
    // A. 3D GLOWING CYBER HORIZON GRID
    // ------------------------------------------------------------------------
    let gridScrollZ = 0;
    let gridPulseZ = 0;
    let gridWaveTimer = 0;
    let gridRadialLines = 24;
    const gridDepth = 1400;
    const fov = 340;

    function initGrid() {
      gridRadialLines = width < 768 ? 14 : 26;
    }

    function renderCyberGrid(camX, camY) {
      // Vanishing Horizon
      const horizonY = height * 0.52 + camY * 35;
      const vanishX = width * 0.5 + camX * 50;

      gridScrollZ = (gridScrollZ + 1.2) % 65; // Forward scrolling speed
      gridPulseZ = (gridPulseZ + 5.5) % gridDepth; // Energy pulse wave
      gridWaveTimer += 0.035;

      ctx.save();
      // Use additive blending for radiant glowing laser lines!
      ctx.globalCompositeOperation = 'lighter';

      // 1. Transverse Latitudinal Grid Lines (Depth Z axis)
      for (let z = 60; z < gridDepth; z += 55) {
        const currentZ = z - gridScrollZ;
        if (currentZ <= 25) continue;

        const scale = fov / currentZ;
        // Terrain wave modulation
        const wave = Math.sin(gridWaveTimer + currentZ * 0.015) * 14 * scale;
        const screenY = horizonY + (170 * scale) + wave;

        if (screenY > height + 60) continue;

        // Depth fog: sharp near horizon, brilliant in midground
        const depthFog = Math.min(1, (currentZ - 25) / 160) * Math.max(0, 1 - (currentZ / gridDepth));

        // Check distance to laser pulse wave
        const distToPulse = Math.abs(currentZ - gridPulseZ);
        let pulseGlow = 0;
        if (distToPulse < 140) {
          pulseGlow = (1 - distToPulse / 140) * 0.85;
        }

        const baseAlpha = isDark ? 0.28 : 0.14;
        const totalAlpha = Math.min(0.95, (baseAlpha + pulseGlow) * depthFog);

        const halfWidth = (width * 1.6) * scale;

        ctx.beginPath();
        ctx.moveTo(vanishX - halfWidth, screenY);
        ctx.lineTo(vanishX + halfWidth, screenY);

        if (pulseGlow > 0.2) {
          ctx.strokeStyle = `rgba(0, 242, 254, ${totalAlpha})`;
          ctx.lineWidth = 1.6;
          ctx.shadowColor = '#00f2fe';
          ctx.shadowBlur = 10;
        } else {
          ctx.strokeStyle = isDark 
            ? `rgba(139, 92, 246, ${totalAlpha})` 
            : `rgba(99, 102, 241, ${totalAlpha * 0.7})`;
          ctx.lineWidth = 0.95;
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }

      // 2. Longitudinal Perspective Grid Lines (Beaming outward)
      const xSpacing = width / gridRadialLines;
      const groundMaxY = height + 120;

      for (let i = -gridRadialLines * 0.5; i <= gridRadialLines * 1.5; i++) {
        const bottomX = i * xSpacing + (camX * 70);

        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(bottomX, groundMaxY);

        const edgeDist = Math.abs(bottomX - width * 0.5) / (width * 0.5);
        const lineAlpha = (isDark ? 0.25 : 0.12) * Math.max(0.2, 1 - edgeDist * 0.45);

        ctx.strokeStyle = isDark 
          ? `rgba(0, 242, 254, ${lineAlpha})` 
          : `rgba(2, 132, 199, ${lineAlpha})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      ctx.restore();
    }

    // ------------------------------------------------------------------------
    // B. 3D PARTICLE CONSTELLATION & LASER CONNECTIONS
    // ------------------------------------------------------------------------
    class Particle3D {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = (Math.random() - 0.5) * (width * 1.7);
        this.y = (Math.random() - 0.5) * (height * 1.7);
        this.z = initial ? Math.random() * 850 + 40 : 880;

        // Smooth 3D velocity
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = -(Math.random() * 0.75 + 0.4); // Drifting forward

        this.baseRadius = Math.random() * 2.2 + 1.2;
        this.colorType = Math.floor(Math.random() * 4); // 0=cyan, 1=blue, 2=purple, 3=valorant red
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;

        this.projX = 0;
        this.projY = 0;
        this.projRadius = 0;
        this.projAlpha = 0;
        this.activeConnections = 0;
      }

      update(camX, camY) {
        this.pulseAngle += this.pulseSpeed;
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Wrap around bounds in 3D
        if (this.z < 35) this.z = 880;
        if (Math.abs(this.x) > width * 0.95) this.vx *= -1;
        if (Math.abs(this.y) > height * 0.95) this.vy *= -1;

        // 3D Perspective Projection
        const scale = fov / (fov + this.z);
        const centerX = width * 0.5 + camX * (1 - scale) * 95;
        const centerY = height * 0.48 + camY * (1 - scale) * 75;

        this.projX = centerX + this.x * scale;
        this.projY = centerY + this.y * scale;
        this.projRadius = this.baseRadius * scale * (1 + Math.sin(this.pulseAngle) * 0.25);

        // Radiant depth brightness
        const depthBrightness = Math.min(1, Math.max(0, 1 - (this.z / 900)));
        this.projAlpha = (0.45 + Math.sin(this.pulseAngle) * 0.25) * depthBrightness;

        // Interactive mouse repulsion
        if (mouse.active && mouse.x && mouse.y) {
          const dx = mouse.x - this.projX;
          const dy = mouse.y - this.projY;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 2.2;
            const angle = Math.atan2(dy, dx);
            this.projX -= Math.cos(angle) * force * 18;
            this.projY -= Math.sin(angle) * force * 18;
          }
        }
      }

      draw() {
        if (this.projAlpha <= 0.02) return;

        ctx.beginPath();
        ctx.arc(this.projX, this.projY, Math.max(0.9, this.projRadius), 0, Math.PI * 2);

        let col;
        if (this.colorType === 0) col = `rgba(0, 242, 254, ${this.projAlpha})`; // Cyan
        else if (this.colorType === 1) col = `rgba(59, 130, 246, ${this.projAlpha})`; // Blue
        else if (this.colorType === 2) col = `rgba(168, 85, 247, ${this.projAlpha})`; // Violet
        else col = `rgba(255, 70, 85, ${this.projAlpha * 0.85})`; // Valorant Red accent

        ctx.fillStyle = col;
        ctx.fill();

        // Soft bloom halo for foreground nodes
        if (this.projRadius > 1.6 && this.activeConnections > 0) {
          ctx.beginPath();
          ctx.arc(this.projX, this.projY, this.projRadius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 242, 254, ${this.projAlpha * 0.2})`;
          ctx.fill();
        }
      }
    }

    // ------------------------------------------------------------------------
    // C. HIGH-SPEED GLOWING DATA STREAM SPARKS
    // ------------------------------------------------------------------------
    class DataStreamPacket {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.speed = Math.random() * 0.03 + 0.02;
        this.dead = false;
        this.size = Math.random() * 2.5 + 1.8;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) this.dead = true;
      }

      draw() {
        const curX = this.p1.projX + (this.p2.projX - this.p1.projX) * this.progress;
        const curY = this.p1.projY + (this.p2.projY - this.p1.projY) * this.progress;
        const alpha = Math.sin(this.progress * Math.PI) * Math.min(this.p1.projAlpha, this.p2.projAlpha);

        if (alpha <= 0.04) return;

        // High-energy glowing packet
        ctx.beginPath();
        ctx.arc(curX, curY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.fill();

        // Neon outer pulse
        ctx.beginPath();
        ctx.arc(curX, curY, this.size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 242, 254, ${alpha * 0.45})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let particles = [];
    let dataPackets = [];

    function initParticles() {
      const count = width < 768 ? 60 : 135;
      particles = [];
      dataPackets = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle3D());
      }
    }

    function renderConnections() {
      const maxDist = width < 768 ? 95 : 130;
      const pCount = particles.length;

      for (let i = 0; i < pCount; i++) {
        particles[i].activeConnections = 0;
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < pCount; i++) {
        const p1 = particles[i];
        if (p1.projAlpha <= 0.06) continue;

        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          if (p2.projAlpha <= 0.06) continue;

          const dx = p1.projX - p2.projX;
          const dy = p1.projY - p2.projY;
          const screenDist = Math.hypot(dx, dy);

          if (screenDist < maxDist) {
            const zDiff = Math.abs(p1.z - p2.z);
            if (zDiff < 240) {
              p1.activeConnections++;
              p2.activeConnections++;

              const lineAlpha = (1 - screenDist / maxDist) * Math.min(p1.projAlpha, p2.projAlpha) * 0.85;

              ctx.beginPath();
              ctx.moveTo(p1.projX, p1.projY);
              ctx.lineTo(p2.projX, p2.projY);

              ctx.strokeStyle = isDark
                ? `rgba(0, 242, 254, ${lineAlpha * 0.45})`
                : `rgba(2, 132, 199, ${lineAlpha * 0.35})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();

              // Spawn glowing data stream packets
              if (dataPackets.length < 18 && Math.random() < 0.005) {
                dataPackets.push(new DataStreamPacket(p1, p2));
              }
            }
          }
        }
      }

      // Update & Draw Data Packets
      for (let k = dataPackets.length - 1; k >= 0; k--) {
        const packet = dataPackets[k];
        packet.update();
        packet.draw();
        if (packet.dead) {
          dataPackets.splice(k, 1);
        }
      }

      ctx.restore();
    }

    // ------------------------------------------------------------------------
    // D. MAIN ANIMATION LOOP (60 FPS)
    // ------------------------------------------------------------------------
    let camX = 0;
    let camY = 0;

    function animate() {
      // Smooth camera interpolation
      camX += (mouse.targetX - camX) * 0.055;
      camY += (mouse.targetY - camY) * 0.055;

      ctx.clearRect(0, 0, width, height);

      // 1. Deep Space Base
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isDark) {
        bgGrad.addColorStop(0, '#010309');
        bgGrad.addColorStop(0.5, '#04091a');
        bgGrad.addColorStop(1, '#01040a');
      } else {
        bgGrad.addColorStop(0, '#f1f5f9');
        bgGrad.addColorStop(0.5, '#e2e8f0');
        bgGrad.addColorStop(1, '#cbd5e1');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Glowing 3D Cyber Horizon Grid
      renderCyberGrid(camX, camY);

      // 3. Update & Draw Particles with Additive Blending
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(camX, camY);
      }

      // 4. Render Laser Wire Connections & Data Stream Sparks
      renderConnections();

      // 5. Draw Particle Nodes
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
      }
      ctx.restore();

      // NOTE: We DO NOT draw heavy black overlays over the canvas!
      // The background remains luminous and alive at all times!

      animId = requestAnimationFrame(animate);
    }

    // Resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    });

    // Battery saver
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(animate);
      }
    });

    window.cyberEngine = {
      setTheme: (t) => {
        isDark = t !== 'light';
      }
    };

    resize();
    animate();
  }
});

document.addEventListener('DOMContentLoaded', () => {

// Terminal-style loading screen
setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
    }
}, 1800);

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.setAttribute('aria-expanded',
            navLinks.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Scroll-based fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section > .container').forEach(el => {
    if (el.closest('#terminal')) return;
    el.classList.add('fade-in');
    observer.observe(el);
});

document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.classList.add('slide-in-left');
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
});

document.querySelectorAll('.project-card, .leadership-card, .stack-item').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
    observer.observe(el);
});

// Header shadow on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.boxShadow = 'none';
        }
    }
});

// Parallax effect on hero background
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    if (heroBg) {
        const scrolled = window.scrollY;
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.35}px)`;
    }
});

// Interactive glow effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const glow = card.querySelector('.project-card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.12) 0%, transparent 50%)`;
            glow.style.opacity = '1';
        }
    });

    card.addEventListener('mouseleave', () => {
        const glow = card.querySelector('.project-card-glow');
        if (glow) glow.style.opacity = '0';
    });
});

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.style.color = 'var(--color-accent)';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// Typing effect for hero tagline
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--color-green)';
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            tagline.textContent += text[i];
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    }, 50);
}

// View Transitions API for smooth nav
document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;

        if (document.startViewTransition) {
            e.preventDefault();
            document.startViewTransition(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            });
        }
    });
});

// ===== Interactive Terminal =====
initTerminal();

}); // end DOMContentLoaded

function initTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (!terminalInput || !terminalOutput) {
        console.error('Terminal elements not found');
        return;
    }

    const commands = {
        help: () => `Available commands:
  <span class="cmd-highlight">about</span>      — Who I am
  <span class="cmd-highlight">skills</span>     — My tech stack
  <span class="cmd-highlight">experience</span> — Work history
  <span class="cmd-highlight">education</span>  — Where I studied
  <span class="cmd-highlight">contact</span>    — How to reach me
  <span class="cmd-highlight">currently</span>  — What I'm up to now
  <span class="cmd-highlight">socials</span>    — My links
  <span class="cmd-highlight">resume</span>     — Download my resume
  <span class="cmd-highlight">secret</span>     — ???
  <span class="cmd-highlight">clear</span>      — Clear terminal
  <span class="cmd-highlight">help</span>       — Show this message`,

        about: () => `<span class="success">Saúl Villatoro</span>
CS student @ George Mason University (May 2027)
2× Amazon SDE Intern | Based in Washington, D.C.
Passionate about backend systems, scalable infrastructure,
and empowering the Latino STEM community.`,

        skills: () => `<span class="success">Languages:</span> Python, Java, JavaScript, TypeScript, SQL, C, C++
<span class="success">Cloud:</span>     AWS (S3, Lambda, IAM, DynamoDB), Linux/UNIX
<span class="success">Frameworks:</span> Django, Angular, React, Node.js
<span class="success">Tools:</span>     Git, GitHub, Bash, REST APIs`,

        experience: () => `<span class="success">Upcoming:</span> Technology Consultant Analyst Intern @ Accenture/Avanade
<span class="success">2025:</span>     SDE Intern @ Amazon — E2E testing, 10× perf gains
<span class="success">2024:</span>     Amazon Future Engineer SDE Intern — S3 data tools
<span class="success">2023:</span>     Product R&D Intern @ On Ramps to Careers`,

        education: () => `<span class="success">George Mason University</span> — B.S. Computer Science (Expected May 2027)
  Coursework: Data Structures, OOP, Low-Level Programming, Systems
<span class="success">Harvard Summer School</span> — Summer 2022
  Coursework: C++ for Programmers, Web Programming (Python & JS)`,

        contact: () => `<span class="success">Email:</span>    <a href="mailto:Villatoro980@outlook.com">Villatoro980@outlook.com</a>
<span class="success">Phone:</span>    (202) 735-4494
<span class="success">Location:</span> Washington, D.C.`,

        currently: () => `<span class="success">→</span> Upcoming Technology Consultant Analyst Intern at Accenture
  Working with Avanade (Microsoft joint venture)
  Stack: Angular, Node.js, TypeScript, DynamoDB, AWS Lambda
<span class="success">→</span> President of Phi Iota Alpha Fraternity
<span class="success">→</span> Mentoring underclassmen at George Mason University`,

        socials: () => `<span class="success">GitHub:</span>   <a href="https://github.com/SV05TM" target="_blank">github.com/SV05TM</a>
<span class="success">LinkedIn:</span> <a href="https://www.linkedin.com/in/sv-link/" target="_blank">linkedin.com/in/sv-link</a>
<span class="success">Website:</span>  <a href="https://saulv.dev">saulv.dev</a>`,

        resume: () => `<span class="success">Downloading resume...</span> (just kidding — add your PDF link here)
Tip: Add a resume.pdf to your repo and update this command.`,

        secret: () => `<span class="success">🎉 You found the easter egg!</span>
Fun facts:
  → I've written 1,000+ lines of Python in a single internship
  → I reduced build times from 4 hours to 15 minutes
  → This entire site is vanilla HTML/CSS/JS — no frameworks
  → Type "sudo hire saul" for a surprise`,

        'sudo hire saul': () => `<span class="success">Permission granted.</span> ✓
Sending offer letter to Villatoro980@outlook.com...
Just kidding. But seriously, <a href="mailto:Villatoro980@outlook.com">let's talk</a>. 🚀`,

        clear: () => 'CLEAR',
        whoami: () => `visitor@saulv.dev`,
        pwd: () => `/home/visitor/saulv.dev`,
        ls: () => `about.txt  experience/  projects/  skills.json  contact.md  README.md`,
        date: () => new Date().toString(),
        echo: (args) => args || '',
        neofetch: () => `<span class="success">       {SV}</span>        visitor@saulv.dev
                    ─────────────────
  <span class="success">OS:</span>      saulv.dev v1.0.0
  <span class="success">Host:</span>    GitHub Pages
  <span class="success">Shell:</span>   interactive-terminal
  <span class="success">Theme:</span>   Dark [accent: #38bdf8]
  <span class="success">Uptime:</span>  since 2026`,
    };

    const commandHistory = [];
    let historyIndex = -1;

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function processCommand(input) {
        // Display the command
        const cmdLine = document.createElement('div');
        cmdLine.className = 'output-line';
        cmdLine.innerHTML = `<span class="prompt">$</span> <span class="cmd">${escapeHtml(input)}</span>`;
        terminalOutput.appendChild(cmdLine);

        // Process command
        const lowerInput = input.toLowerCase();
        const [cmd, ...argParts] = lowerInput.split(' ');
        const args = argParts.join(' ');
        let response;

        if (commands[lowerInput]) {
            response = commands[lowerInput](args);
        } else if (commands[cmd]) {
            response = commands[cmd](args);
        } else {
            response = `<span class="error">command not found: ${escapeHtml(cmd)}</span>\nType <span class="cmd-highlight">help</span> for available commands.`;
        }

        if (response === 'CLEAR') {
            terminalOutput.innerHTML = '';
        } else {
            const responseLine = document.createElement('div');
            responseLine.className = 'output-response';
            responseLine.innerHTML = response;
            terminalOutput.appendChild(responseLine);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (!input) return;

            commandHistory.unshift(input);
            historyIndex = -1;
            processCommand(input);
            terminalInput.value = '';
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            }
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                terminalInput.value = '';
            }
        }

        if (e.key === 'Tab') {
            e.preventDefault();
            const partial = terminalInput.value.toLowerCase();
            if (partial) {
                const matches = Object.keys(commands).filter(c => c.startsWith(partial));
                if (matches.length === 1) {
                    terminalInput.value = matches[0];
                }
            }
        }
    });

    // Focus terminal on click anywhere in the terminal
    document.querySelector('.interactive-terminal').addEventListener('click', (e) => {
        terminalInput.focus();
    });

    console.log('Interactive terminal initialized');
}

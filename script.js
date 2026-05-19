// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', 
        navLinks.classList.contains('active'));
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

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

// Apply fade-in to sections and timeline items
document.querySelectorAll('section > .container').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.classList.add('slide-in-left');
    el.style.transitionDelay = `${i * 0.15}s`;
    observer.observe(el);
});

document.querySelectorAll('.project-card, .leadership-card').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${i * 0.1}s`;
    observer.observe(el);
});

// Header shadow on scroll
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Parallax effect on hero background
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    if (heroBg) {
        const scrolled = window.scrollY;
        heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
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
        if (glow) {
            glow.style.opacity = '0';
        }
    });
});

// Smooth active nav link highlighting
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

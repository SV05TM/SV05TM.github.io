// Terminal-style loading screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
    }, 1800);
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

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
        tagline.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(typeInterval);
            setTimeout(() => {
                tagline.style.borderRight = 'none';
            }, 1000);
        }
    }, 50);
}

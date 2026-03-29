document.addEventListener('DOMContentLoaded', () => {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle (safe version)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Intersection Observer for scroll animations
    const options = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');

                // Progress bar animation
                if (entry.target.classList.contains('skills-card')) {
                    const bars = entry.target.querySelectorAll('.progress');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                }
            }
        });
    }, options);

    // Observe sections safely
    const sections = document.querySelectorAll('section, .card');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    // Observe skill cards
    const skillCards = document.querySelectorAll('.skills-card');
    skillCards.forEach(card => observer.observe(card));

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarEl = document.querySelector('.navbar');
                const navHeight = navbarEl ? navbarEl.offsetHeight : 0;

                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Contact Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button');
            if (!submitBtn) return;

            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Message Sent!';
            submitBtn.style.background = '#4CAF50';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
});

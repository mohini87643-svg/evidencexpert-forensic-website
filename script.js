document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const hoverables = document.querySelectorAll('a, button, .service-card, .lab-item');
    hoverables.forEach(link => {
        link.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        link.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Top Visibility
        const scrollTopBtn = document.querySelector('.scroll-top-btn');
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Particle Animation for Hero
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 150; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();

    // Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));

    // Testimonial Slider
    const testimonials = [
        {
            text: "“EvidenceXpert delivers precision that transforms suspicion into proof. Their laboratory equipment and speed are centuries ahead.”",
            author: "— Dr. Julian Thorne, Lead Investigator"
        },
        {
            text: "“In the digital age, evidence is elusive. EvidenceXpert finds what others don't even know is missing. Simply the best in the sector.”",
            author: "— Sarah Jenkins, Cyber Crime Unit"
        },
        {
            text: "“Meticulous, professional, and undeniable. Their forensic testimony won the case before the defense even started their argument.”",
            author: "— Marcus Vane, Senior Prosecutor"
        }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialAuthor = document.getElementById('testimonial-author');
    const dots = document.querySelectorAll('.dot');

    function updateTestimonial(index) {
        testimonialText.style.opacity = '0';
        testimonialAuthor.style.opacity = '0';

        setTimeout(() => {
            testimonialText.innerText = testimonials[index].text;
            testimonialAuthor.innerText = testimonials[index].author;
            testimonialText.style.opacity = '1';
            testimonialAuthor.style.opacity = '1';

            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
        }, 500);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonial(currentTestimonial);
        });
    });

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }, 8000);

    // Parallax logic for Laboratory section
    window.addEventListener('scroll', () => {
        const parallax = document.querySelector('.parallax-bg');
        if (parallax) {
            let offset = window.pageYOffset;
            parallax.style.transform = `translateY(${offset * 0.1}px)`;
        }
    });

    // ========================
    // Chatbot Widget Logic
    // ========================
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotIframe = document.getElementById('chatbot-iframe');
    let chatbotLoaded = false;

    function toggleChatbot() {
        const isOpen = chatbotWidget.classList.toggle('open');
        // Lazy-load iframe on first open
        if (isOpen && !chatbotLoaded) {
            chatbotIframe.src = chatbotIframe.getAttribute('data-src');
            chatbotLoaded = true;
        }
    }

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', toggleChatbot);
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotWidget.classList.remove('open');
        });
    }

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
        if (chatbotWidget && chatbotWidget.classList.contains('open')) {
            if (!chatbotWidget.contains(e.target)) {
                chatbotWidget.classList.remove('open');
            }
        }
    });
});

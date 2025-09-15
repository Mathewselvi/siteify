// Modern JavaScript for Siteify - Absolutely Fire Interactions! 🔥

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initPreloader();
    initAOS();
    initNavigation();
    initHeroAnimations();
    initScrollEffects();
    initFormHandlers();
    initTypingEffect();
    initParticles();
    initMagneticButtons();
    initGlowEffects();
    initBackToTop();
    initPerformanceOptimizations();
    
    console.log('🚀 Siteify loaded - Website is absolutely fire! 🔥');
});

// ================================
// PRELOADER WITH MODERN ANIMATIONS
// ================================
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');
    
    if (preloader) {
        // Add glitch effect to preloader text
        addGlitchEffect(preloaderText);
        
        // Hide preloader after animations complete
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove from DOM after transition
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 2000);
    }
}

// ================================
// AOS (ANIMATE ON SCROLL) INIT
// ================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 100
        });
    }
}

// ================================
// NAVIGATION WITH GLASSMORPHISM
// ================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link-modern');
    
    // Glassmorphism effect on scroll
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10));
    
    // Magnetic effect for nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', createMagneticEffect);
        link.addEventListener('mouseleave', removeMagneticEffect);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// HERO SECTION ANIMATIONS
// ================================
function initHeroAnimations() {
    const heroStats = document.querySelectorAll('.stat-number');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    // Animate counters
    heroStats.forEach(stat => {
        animateCounter(stat);
    });
    
    // Add interactive hover effects to floating cards (only on desktop)
    if (window.innerWidth > 768) {
        floatingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.05) rotate(5deg)';
                card.style.boxShadow = '0 20px 40px rgba(0, 112, 74, 0.3)';
                card.style.zIndex = '20';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
                card.style.zIndex = '10';
            });
        });
    }
}

// ================================
// SCROLL EFFECTS & PARALLAX
// ================================
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Parallax effect for hero background
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Floating animations based on scroll (only on desktop)
        if (window.innerWidth > 768) {
            const floatingElements = document.querySelectorAll('.floating-card, .about-card');
            floatingElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = scrolled * speed;
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ================================
// FORM HANDLERS WITH MODERN UX
// ================================
function initFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    const contactMessage = document.getElementById('contactMessage');
    
    if (contactForm) {
        // Add floating label effects
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
                
                input.addEventListener('input', () => {
                    if (input.value) {
                        group.classList.add('filled');
                    } else {
                        group.classList.remove('filled');
                    }
                });
            }
        });
        
        // Form submission with modern feedback
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            showLoadingState(submitBtn);
            
            // Submit form data to Google Apps Script
            fetch(contactForm.action, {
                method: 'POST',
                body: formData
            })
            .then(response => {
                // Show success message
                showMessage('success', '🎉 Thank you! Your message has been sent successfully!', contactMessage);
                contactForm.reset();
                
                // Reset form states
                formGroups.forEach(group => {
                    group.classList.remove('focused', 'filled');
                });
            })
            .catch(error => {
                console.error('Form submission error:', error);
                showMessage('error', '❌ Sorry, there was an error. Please try again.', contactMessage);
            })
            .finally(() => {
                hideLoadingState(submitBtn);
            });
        });
    }
}

// ================================
// TYPING EFFECT FOR DYNAMIC TEXT
// ================================
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const phrases = [
            'Where Great Websites Begin',
            'Where Innovation Meets Design',
            'Where Dreams Become Digital',
            'Where Success Stories Start'
        ];
        
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const current = phrases[currentPhrase];
            
            if (isDeleting) {
                heroSubtitle.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                heroSubtitle.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typeSpeed = 500;
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeEffect, 1000);
    }
}

// ================================
// PARTICLE SYSTEM
// ================================
function initParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        createParticles(heroParticles, 50);
    }
}

function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 112, 74, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        container.appendChild(particle);
    }
    
    // Add particle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
            50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ================================
// MAGNETIC BUTTON EFFECTS
// ================================
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .nav-cta, .social-link');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', magneticMove);
        element.addEventListener('mouseleave', magneticReset);
    });
}

function magneticMove(e) {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = x * 0.3;
    const moveY = y * 0.3;
    
    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

function magneticReset(e) {
    const element = e.currentTarget;
    element.style.transform = 'translate(0, 0)';
}

// ================================
// GLOW EFFECTS ON INTERACTION
// ================================
function initGlowEffects() {
    const glowElements = document.querySelectorAll('.service-card, .portfolio-card, .contact-item');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 30px rgba(0, 112, 74, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    });
}

// ================================
// BACK TO TOP BUTTON
// ================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) {
        createBackToTopButton();
    }
    
    const btn = document.querySelector('.back-to-top');
    if (btn) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 500) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        }, 100));
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.id = 'backToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(button);
}

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================
function initPerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Optimize animations based on user preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Animate counter numbers
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        element.textContent = element.textContent.replace(/[0-9]+/, target);
                        clearInterval(timer);
                    } else {
                        element.textContent = element.textContent.replace(/[0-9]+/, Math.floor(current));
                    }
                }, 16);
                observer.unobserve(element);
            }
        });
    });
    
    observer.observe(element);
}

// Show loading state for buttons
function showLoadingState(button) {
    const submitText = button.querySelector('.submit-text');
    const submitLoading = button.querySelector('.submit-loading');
    
    if (submitText) submitText.style.display = 'none';
    if (submitLoading) submitLoading.style.display = 'inline-block';
    
    button.disabled = true;
    button.style.opacity = '0.7';
}

// Hide loading state for buttons
function hideLoadingState(button) {
    const submitText = button.querySelector('.submit-text');
    const submitLoading = button.querySelector('.submit-loading');
    
    if (submitText) submitText.style.display = 'inline-block';
    if (submitLoading) submitLoading.style.display = 'none';
    
    button.disabled = false;
    button.style.opacity = '1';
}

// Show messages with animations
function showMessage(type, message, container) {
    if (!container) return;
    
    container.className = `contact-message ${type}`;
    container.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    
    // Animate in
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    container.style.display = 'block';
    
    requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
    }, 5000);
}

// Add glitch effect to text
function addGlitchEffect(element) {
    if (!element) return;
    
    element.style.position = 'relative';
    element.style.color = 'white';
    
    const glitchStyle = document.createElement('style');
    glitchStyle.textContent = `
        .glitch::before,
        .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .glitch::before {
            animation: glitch-1 0.5s infinite;
            color: #ff00ff;
            z-index: -1;
        }
        
        .glitch::after {
            animation: glitch-2 0.5s infinite;
            color: #00ffff;
            z-index: -2;
        }
        
        @keyframes glitch-1 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(2px, 2px); }
            40% { transform: translate(2px, -2px); }
            60% { transform: translate(-2px, 2px); }
            80% { transform: translate(-2px, -2px); }
        }
    `;
    
    document.head.appendChild(glitchStyle);
    element.classList.add('glitch');
    element.setAttribute('data-text', element.textContent);
}

// Create magnetic effect for elements
function createMagneticEffect(e) {
    const element = e.currentTarget;
    element.style.transition = 'transform 0.3s ease';
    
    element.addEventListener('mousemove', function(e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.2;
        const moveY = y * 0.2;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// Remove magnetic effect
function removeMagneticEffect(e) {
    const element = e.currentTarget;
    element.style.transform = 'translate(0, 0)';
}

// Intersection Observer for animations
function observeElements() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(element => observer.observe(element));
}

// Mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    function createTrailDot(x, y) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(0, 112, 74, 0.7);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }
        
        // Animate trail
        trail.forEach((dot, index) => {
            const scale = (index + 1) / trailLength;
            const opacity = scale * 0.7;
            dot.style.transform = `scale(${scale})`;
            dot.style.opacity = opacity;
        });
    }
    
    document.addEventListener('mousemove', debounce((e) => {
        createTrailDot(e.clientX, e.clientY);
    }, 10));
}

// Initialize mouse trail on desktop only
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initMouseTrail();
}

// Console styling
console.log('%c🚀 Siteify Website Loaded! 🔥', 'color: #00704A; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cWebsite Features:', 'color: #00A368; font-size: 16px; font-weight: bold;');
console.log('%c• Glassmorphism UI', 'color: #666; font-size: 14px;');
console.log('%c• Magnetic Interactions', 'color: #666; font-size: 14px;');
console.log('%c• Smooth Animations', 'color: #666; font-size: 14px;');
console.log('%c• Modern Typography', 'color: #666; font-size: 14px;');
console.log('%c• Responsive Design', 'color: #666; font-size: 14px;');
console.log('%c• Performance Optimized', 'color: #666; font-size: 14px;');

// Export functions for global use
window.siteifyFunctions = {
    showMessage,
    animateCounter,
    debounce,
    createMagneticEffect,
    removeMagneticEffect
};
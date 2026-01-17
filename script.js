// Loading Screen Animation - Ensure it always hides
(function() {
    function hideLoader() {
        try {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }
        } catch (e) {
            console.error('Loader error:', e);
        }
    }
    
    // Hide loader when page is fully loaded
    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 500);
    } else {
        window.addEventListener('load', () => {
            setTimeout(hideLoader, 500);
        });
        
        // Fallback: hide after 2 seconds max
        setTimeout(hideLoader, 2000);
    }
})();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initAll();
});

function initAll() {
    try {
        // Mobile Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }

        // Active navigation link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function highlightActiveSection() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightActiveSection);

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Section title animation observer
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Observe section titles
        document.querySelectorAll('.section-title').forEach(title => {
            titleObserver.observe(title);
        });

        // Timeline items animation observer
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.timeline-item').forEach(item => {
            timelineObserver.observe(item);
        });

        // Animate elements on scroll with enhanced effects
        const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .education-card, .contact-item, .about-text');
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.95)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });

        // Parallax effect for sections
        const parallaxElements = document.querySelectorAll('.hero-text, .section-title');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            parallaxElements.forEach(element => {
                if (element.closest('.hero')) {
                    element.style.transform = `translateY(${rate * 0.3}px)`;
                }
            });
        });

        // Skill progress bars animation
        const skillProgressBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = `${progress}%`;
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        skillProgressBars.forEach(bar => {
            skillObserver.observe(bar);
        });

        // Enhanced Typewriter effect for hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Add blinking cursor animation
                    const cursor = document.querySelector('.cursor');
                    if (cursor) {
                        cursor.style.animation = 'blink 1s infinite';
                    }
                }
            }
            
            type();
        }

        // Initialize typewriter effect with delay
        const titleText = document.querySelector('.title-text');
        if (titleText) {
            const originalText = titleText.textContent;
            setTimeout(() => {
                typeWriter(titleText, originalText, 80);
            }, 1500);
        }

        // Enhanced parallax effect with smooth scrolling
        let ticking = false;

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroVisual = document.querySelector('.hero-visual');
            
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                
                if (heroVisual) {
                    heroVisual.style.transform = `translateY(${scrolled * 0.2}px) rotate(${scrolled * 0.05}deg)`;
                }
            }
            
            // Animate floating shapes
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Enhanced hover effects for timeline items
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            const marker = item.querySelector('.timeline-marker');
            
            item.addEventListener('mouseenter', function() {
                if (marker) {
                    marker.style.transform = 'scale(1.3) rotate(180deg)';
                    marker.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.6)';
                }
                this.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', function() {
                if (marker) {
                    marker.style.transform = 'scale(1) rotate(0deg)';
                    marker.style.boxShadow = '';
                }
                this.style.transform = 'translateX(0)';
            });
        });

        // 3D tilt effect for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Magnetic button effect
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });

        // Scroll reveal animations
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.skill-category, .project-card, .contact-item');
            
            reveals.forEach((element, index) => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check

        // Add ripple effect to buttons
        function addRippleEffect(element, e) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Add ripple effect CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent += `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .btn, .social-link, .project-link {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(rippleStyle);

        document.querySelectorAll('.btn, .social-link, .project-link').forEach(button => {
            button.addEventListener('click', function(e) {
                addRippleEffect(this, e);
            });
        });

    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Particle Animation - Only run after page loads (non-blocking)
(function() {
    function initParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;
        
        try {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particles = [];
            const particleCount = 30;

            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = (Math.random() - 0.5) * 0.5;
                    this.speedY = (Math.random() - 0.5) * 0.5;
                    this.opacity = Math.random() * 0.3 + 0.1;
                }

                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;

                    if (this.x > canvas.width) this.x = 0;
                    if (this.x < 0) this.x = canvas.width;
                    if (this.y > canvas.height) this.y = 0;
                    if (this.y < 0) this.y = canvas.height;
                }

                draw() {
                    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            function createParticles() {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });

                // Connect nearby particles (optimized)
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.stroke();
                        }
                    }
                }

                requestAnimationFrame(animateParticles);
            }

            function handleResize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }

            window.addEventListener('resize', handleResize);
            createParticles();
            animateParticles();
        } catch (error) {
            console.error('Particle animation error:', error);
        }
    }
    
    // Initialize particles after page loads (delayed)
    if (document.readyState === 'complete') {
        setTimeout(initParticles, 1500);
    } else {
        window.addEventListener('load', () => {
            setTimeout(initParticles, 1500);
        });
    }
})();

// Add active state styling for nav links
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::before {
        width: 100%;
        left: 0;
        transform: translateX(0);
    }
`;
document.head.appendChild(navStyle);

// Scroll to top button
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        z-index: 1000;
        transition: all 0.3s ease;
        font-size: 1.25rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTop();

// ============================================
// GAME MECHANICS - XP & Achievement System
// ============================================

// Game State
let gameState = {
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    achievementsUnlocked: []
};

// Load game state from localStorage
function loadGameState() {
    const saved = localStorage.getItem('portfolioGameState');
    if (saved) {
        gameState = JSON.parse(saved);
    }
    updateGameUI();
}

// Save game state to localStorage
function saveGameState() {
    localStorage.setItem('portfolioGameState', JSON.stringify(gameState));
}

// Add XP
function addXP(amount, source = '') {
    gameState.xp += amount;
    
    // Check for level up
    while (gameState.xp >= gameState.xpToNextLevel) {
        gameState.xp -= gameState.xpToNextLevel;
        gameState.level++;
        gameState.xpToNextLevel = Math.floor(gameState.xpToNextLevel * 1.5);
        showLevelUpNotification();
    }
    
    saveGameState();
    updateGameUI();
    
    if (amount > 0) {
        showXPNotification(amount, source);
    }
}

// Update Game UI
function updateGameUI() {
    const levelEl = document.getElementById('player-level');
    const xpEl = document.getElementById('player-xp');
    
    if (levelEl) levelEl.textContent = gameState.level;
    if (xpEl) xpEl.textContent = gameState.xp + '/' + gameState.xpToNextLevel;
}

// Show XP Notification
function showXPNotification(amount, source = '') {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `
        <i class="fas fa-star"></i>
        <span>+${amount} XP ${source ? '(' + source + ')' : ''}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2500);
}

// Show Level Up Notification
function showLevelUpNotification() {
    const notification = document.createElement('div');
    notification.className = 'level-up-notification show';
    notification.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">LEVEL UP!</h2>
        <p style="font-size: 1.5rem; font-weight: 700;">You're now Level ${gameState.level}!</p>
        <p style="margin-top: 1rem; opacity: 0.9;">Keep exploring to unlock more!</p>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 1000);
    }, 3000);
}

// Unlock Achievement
function unlockAchievement(index) {
    if (gameState.achievementsUnlocked.includes(index)) {
        return; // Already unlocked
    }
    
    gameState.achievementsUnlocked.push(index);
    const achievement = document.querySelector(`[data-unlock="${index}"]`);
    
    if (achievement) {
        const xpAmount = parseInt(achievement.querySelector('.achievement-xp').textContent.match(/\d+/)[0]);
        
        achievement.classList.remove('locked');
        achievement.classList.add('unlocked');
        
        addXP(xpAmount, achievement.querySelector('.achievement-title').textContent);
        
        // Animate achievement
        achievement.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            achievement.style.animation = '';
        }, 600);
    }
    
    saveGameState();
}

// Initialize Achievements
function initAchievements() {
    // Unlock initial achievements
    const achievements = document.querySelectorAll('.achievement-card');
    
    achievements.forEach((achievement, index) => {
        // Auto-unlock first 2 achievements on page load
        if (index < 2 && !gameState.achievementsUnlocked.includes(index)) {
            setTimeout(() => {
                unlockAchievement(index);
            }, 2000 + (index * 1000));
        }
        
        // Click to unlock (if not already unlocked)
        achievement.addEventListener('click', () => {
            if (!achievement.classList.contains('unlocked')) {
                unlockAchievement(index);
            }
        });
    });
}

// Add XP from Project Links
function initProjectXP() {
    const projectLinks = document.querySelectorAll('.project-link[data-xp]');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const xp = parseInt(link.getAttribute('data-xp'));
            addXP(xp, 'Project View');
        });
    });
}

// Add XP from Skill Bars
function initSkillXP() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = `${progress}%`;
                    
                    // Add XP when skill bar animates
                    setTimeout(() => {
                        addXP(5, 'Skill Mastery');
                    }, 1500);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Initialize Game System
function initGameSystem() {
    loadGameState();
    initAchievements();
    initProjectXP();
    initSkillXP();
    
    // Add XP for viewing different sections
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (!entry.target.dataset.xpAwarded) {
                    entry.target.dataset.xpAwarded = 'true';
                    addXP(10, 'Section Viewed');
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize game when DOM is ready
if (document.readyState === 'complete') {
    setTimeout(initGameSystem, 500);
} else {
    window.addEventListener('load', () => {
        setTimeout(initGameSystem, 500);
    });
}

// Console message for developers
console.log('%c🐍 Python Backend Developer Portfolio 🚀', 'font-size: 20px; font-weight: bold; color: #3776ab;');
console.log('%cBuilt with ❤️ by Priyank Rajput', 'font-size: 14px; color: #6b7280;');
console.log('%cLooking for backend opportunities! 💼', 'font-size: 12px; color: #44b78b;');
console.log('%c💡 Tip: Click achievements to unlock them and earn XP!', 'font-size: 12px; color: #ffd343;');

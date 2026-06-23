// ===========================
// HERO CAROUSEL
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let autoplayInterval = null;
    const AUTOPLAY_DELAY = 5000; // 5 seconds

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update current index
        currentIndex = index;
    }

    // Function to go to the next slide
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Function to go to the previous slide
    function prevSlide() {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoplay();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        }
    });

    // Auto-play functionality
    function startAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function resetAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
        startAutoplay();
    }

    // Start autoplay when page loads
    startAutoplay();

    // Pause autoplay when user hovers over carousel
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        });

        carousel.addEventListener('mouseleave', function() {
            if (!autoplayInterval) {
                startAutoplay();
            }
        });
    }

    // Touch support for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// ===========================
// HAMBURGER MENU TOGGLE
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===========================
// ADVANCED SCROLL BUTTON
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollText = document.getElementById('scrollText');
    const arrowDown = document.querySelector('.scroll-arrow-down');
    const arrowUp = document.querySelector('.scroll-arrow-up');
    let isAtBottom = false;
    let isAnimating = false;

    // Function to handle scroll
    function handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

        // Show/hide button based on scroll position
        if (scrollY > 200) {
            scrollIndicator.classList.remove('hidden');
        } else {
            scrollIndicator.classList.add('hidden');
        }

        // Check if at bottom
        if (scrollPercentage >= 98) {
            isAtBottom = true;
            scrollText.textContent = 'Back to top';
            arrowDown.style.display = 'none';
            arrowUp.style.display = 'flex';
            scrollIndicator.style.borderColor = 'rgba(255, 215, 0, 0.5)';
        } else {
            isAtBottom = false;
            scrollText.textContent = 'Scroll to explore';
            arrowDown.style.display = 'flex';
            arrowUp.style.display = 'none';
            scrollIndicator.style.borderColor = 'rgba(255, 215, 0, 0.2)';
        }
    }

    // Click handler with smooth animation
    function handleScrollClick() {
        if (isAnimating) return;
        isAnimating = true;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const currentScroll = window.scrollY;

        let targetScroll;
        let duration = 1200; // Animation duration in ms
        let startTime = null;

        if (isAtBottom) {
            // Scroll to top
            targetScroll = 0;
            scrollText.textContent = 'Going up...';
        } else {
            // Scroll to bottom
            targetScroll = documentHeight - windowHeight;
            scrollText.textContent = 'Going down...';
        }

        // Easing function for smooth animation
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animateScroll(timestamp) {
            if (startTime === null) {
                startTime = timestamp;
            }

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            const scrollPosition = currentScroll + (targetScroll - currentScroll) * easedProgress;
            window.scrollTo(0, scrollPosition);

            // Update scroll indicator state during animation
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, targetScroll);
                isAnimating = false;
                handleScroll(); // Update state after animation
            }
        }

        // Start animation
        requestAnimationFrame(animateScroll);

        // Pulse animation on click
        scrollIndicator.style.transform = 'scale(0.9)';
        setTimeout(() => {
            scrollIndicator.style.transform = '';
        }, 300);

        // Glow effect on click
        scrollIndicator.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.3)';
        setTimeout(() => {
            scrollIndicator.style.boxShadow = '';
        }, 600);
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    scrollIndicator.addEventListener('click', handleScrollClick);

    // Initial check
    setTimeout(handleScroll, 100);

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleScroll, 200);
    });
});


// ===========================
// ADVANCED NAVBAR
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('mainHeader');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressBar = document.getElementById('progressBar');
    const themeToggle = document.getElementById('themeToggle');

    // ===========================
    // SCROLL EFFECTS
    // ===========================

    let lastScroll = 0;
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.scrollY;
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (currentScroll / windowHeight) * 100;

                // Add scrolled class
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Hide/show on scroll direction
                if (currentScroll > 100 && currentScroll > lastScroll) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = currentScroll;

                // Update progress bar
                progressBar.style.width = scrollPercent + '%';

                // Update active nav link
                updateActiveNavLink(currentScroll);

                ticking = false;
            });
            ticking = true;
        }
    }

    // ===========================
    // ACTIVE NAV LINK
    // ===========================

    function updateActiveNavLink(scrollY) {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLinks[index]) {
                    navLinks[index].classList.add('active');
                }
            }
        });
    }

    // ===========================
    // HAMBURGER MENU
    // ===========================

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===========================
    // THEME TOGGLE (Optional)
    // ===========================

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }

    // ===========================
    // SMOOTH SCROLL FOR NAV LINKS
    // ===========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });

    // ===========================
    // INITIALIZE
    // ===========================

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial call
    setTimeout(handleScroll, 100);
});

// ===========================
// ADVANCED CIRCULAR SCROLL BUTTON
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollIcon = scrollIndicator.querySelector('.scroll-icon i');
    const scrollLabel = document.getElementById('scrollLabel');
    const progressRing = document.querySelector('.scroll-ring-progress');
    let isAtBottom = false;
    let isAnimating = false;

    function updateScrollButton() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
        const scrollPercent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

        // Show/hide button
        if (scrollY > 150) {
            scrollIndicator.classList.remove('hidden');
        } else {
            scrollIndicator.classList.add('hidden');
        }

        // Update progress ring
        const circumference = 264;
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;

        // Check if at bottom
        if (scrollPercent >= 98) {
            isAtBottom = true;
            scrollIndicator.classList.add('at-bottom');
            scrollLabel.textContent = 'Top';
            scrollIcon.className = 'fas fa-chevron-up';
        } else {
            isAtBottom = false;
            scrollIndicator.classList.remove('at-bottom');
            scrollLabel.textContent = 'Scroll';
            scrollIcon.className = 'fas fa-chevron-down';
        }
    }

    function handleScrollClick() {
        if (isAnimating) return;
        isAnimating = true;

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const currentScroll = window.scrollY;
        const targetScroll = isAtBottom ? 0 : documentHeight - windowHeight;
        const duration = 1200;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        // Animate icon
        scrollIcon.style.transition = 'transform 0.3s ease';
        scrollIcon.style.transform = 'scale(0.5)';

        function animateScroll(timestamp) {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            const scrollPosition = currentScroll + (targetScroll - currentScroll) * easedProgress;
            window.scrollTo(0, scrollPosition);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, targetScroll);
                isAnimating = false;
                scrollIcon.style.transform = 'scale(1)';
                updateScrollButton();
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Event listeners
    window.addEventListener('scroll', updateScrollButton);
    window.addEventListener('resize', updateScrollButton);
    scrollIndicator.addEventListener('click', handleScrollClick);

    // Initial call
    setTimeout(updateScrollButton, 200);
});

// ===========================
// THEME TOGGLE
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fas fa-sun';
    }

    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-theme');

        // Update icon with animation
        themeIcon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        themeIcon.style.transform = 'scale(0.5)';

        setTimeout(() => {
            if (isDark) {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
            themeIcon.style.transform = 'scale(1)';
        }, 200);

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Update scroll button colors
        updateScrollTheme(isDark);
    });

    function updateScrollTheme(isDark) {
        const scrollIcon = document.querySelector('.scroll-icon');
        if (scrollIcon) {
            scrollIcon.style.transition = 'all 0.5s ease';
            scrollIcon.style.background = isDark ? 'rgba(15, 26, 21, 0.95)' : 'rgba(26, 42, 31, 0.9)';
        }
    }
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('mainHeader');

    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (currentScroll / windowHeight) * 100;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    });
});

// ===========================
// HAMBURGER MENU
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.getElementById('mainHeader').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                history.pushState(null, null, href);
            }
        });
    });
});

// ===========================
// DROPDOWN TOGGLE (Mobile)
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            const parent = this.closest('.nav-dropdown');
            if (window.innerWidth <= 992) {
                e.preventDefault();
                parent.classList.toggle('active');
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const dropdowns = document.querySelectorAll('.nav-dropdown.active');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
});

// ===========================
// ACTIVE NAV LINK UPDATE
// ===========================

function updateActiveNavLink(scrollY) {
    const sections = document.querySelectorAll('section[id], .about-section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const matchingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (matchingLink) {
                matchingLink.classList.add('active');
            }
        }
    });
}


// ===========================
// DROPDOWN TOGGLE (Mobile)
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            const parent = this.closest('.nav-dropdown');
            if (window.innerWidth <= 992) {
                e.preventDefault();
                parent.classList.toggle('active');
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const dropdowns = document.querySelectorAll('.nav-dropdown.active');
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
        }
    });
});
// ===========================
// ANIMATED STAT COUNTERS
// ===========================

// ... rest of your existing main.js code ...
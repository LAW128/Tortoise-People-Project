// ===========================
// MAIN.JS - CLEAN VERSION (No About Hero Slide)
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // HERO CAROUSEL (Index Page)
    // ===========================
    (function() {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;
        
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        let currentIndex = 0;
        let autoplayInterval = null;
        const AUTOPLAY_DELAY = 5000;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentIndex = index;
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
        }

        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => { showSlide(index); resetAutoplay(); });
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') { nextSlide(); resetAutoplay(); }
            else if (e.key === 'ArrowLeft') { prevSlide(); resetAutoplay(); }
        });

        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);

            let touchStartX = 0;
            carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
            carousel.addEventListener('touchend', e => {
                const diff = touchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? nextSlide() : prevSlide();
                    resetAutoplay();
                }
            }, { passive: true });
        }

        startAutoplay();
    })();

    // ===========================
    // PROGRAMMES HERO AUTO-SLIDE
    // ===========================
    (function() {
        const progSlides = document.querySelectorAll('.programmes-slide');
        if (progSlides.length === 0) return;

        let currentProgSlide = 0;
        const totalProgSlides = progSlides.length;
        let progInterval;

        function goToProgSlide(index) {
            progSlides.forEach(slide => slide.classList.remove('active'));
            progSlides[index].classList.add('active');
            currentProgSlide = index;
        }

        function nextProgSlide() {
            currentProgSlide = (currentProgSlide + 1) % totalProgSlides;
            goToProgSlide(currentProgSlide);
        }

        function startProgAutoSlide() {
            stopProgAutoSlide();
            progInterval = setInterval(nextProgSlide, 6000);
        }

        function stopProgAutoSlide() {
            if (progInterval) {
                clearInterval(progInterval);
                progInterval = null;
            }
        }

        startProgAutoSlide();

        const progHero = document.querySelector('.programmes-hero');
        if (progHero) {
            progHero.addEventListener('mouseenter', stopProgAutoSlide);
            progHero.addEventListener('mouseleave', startProgAutoSlide);
        }

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopProgAutoSlide();
            } else {
                startProgAutoSlide();
            }
        });
    })();

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    (function() {
        const header = document.getElementById('mainHeader');
        const progressBar = document.getElementById('progressBar');
        if (!header) return;

        let lastScroll = 0;
        let ticking = false;

        function handleScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const currentScroll = window.scrollY;
                    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = windowHeight > 0 ? (currentScroll / windowHeight) * 100 : 0;

                    if (currentScroll > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }

                    if (currentScroll > 100 && currentScroll > lastScroll) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }

                    lastScroll = currentScroll;

                    if (progressBar) {
                        progressBar.style.width = scrollPercent + '%';
                    }

                    updateActiveNavLink(currentScroll);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);
    })();

    // ===========================
    // HAMBURGER MENU
    // ===========================
    (function() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('a').forEach(link => {
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
    })();

    // ===========================
    // THEME TOGGLE
    // ===========================
    (function() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const themeIcon = themeToggle.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
        }

        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark-theme');
            if (themeIcon) {
                themeIcon.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                themeIcon.style.transform = 'scale(0.5)';
                setTimeout(() => {
                    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                    themeIcon.style.transform = 'scale(1)';
                }, 200);
            }
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    })();

    // ===========================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================
    (function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const header = document.getElementById('mainHeader');
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    history.pushState(null, null, href);
                }
            });
        });
    })();

    // ===========================
    // DROPDOWN TOGGLE (Mobile)
    // ===========================
    (function() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        if (dropdownToggles.length === 0) return;

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    this.closest('.nav-dropdown').classList.toggle('active');
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
                    if (!dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                    }
                });
            }
        });
    })();

    // ===========================
    // ADVANCED SCROLL BUTTON (v1)
    // ===========================
    (function() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (!scrollIndicator) return;

        const scrollText = document.getElementById('scrollText');
        const arrowDown = scrollIndicator.querySelector('.scroll-arrow-down');
        const arrowUp = scrollIndicator.querySelector('.scroll-arrow-up');
        let isAtBottom = false;
        let isAnimating = false;

        function handleScroll() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

            if (scrollY > 200) {
                scrollIndicator.classList.remove('hidden');
            } else {
                scrollIndicator.classList.add('hidden');
            }

            if (scrollPercentage >= 98) {
                isAtBottom = true;
                if (scrollText) scrollText.textContent = 'Back to top';
                if (arrowDown) arrowDown.style.display = 'none';
                if (arrowUp) arrowUp.style.display = 'flex';
            } else {
                isAtBottom = false;
                if (scrollText) scrollText.textContent = 'Scroll to explore';
                if (arrowDown) arrowDown.style.display = 'flex';
                if (arrowUp) arrowUp.style.display = 'none';
            }
        }

        scrollIndicator.addEventListener('click', function() {
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

            function animateScroll(timestamp) {
                if (startTime === null) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = easeInOutCubic(progress);
                window.scrollTo(0, currentScroll + (targetScroll - currentScroll) * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    window.scrollTo(0, targetScroll);
                    isAnimating = false;
                    handleScroll();
                }
            }

            requestAnimationFrame(animateScroll);
        });

        window.addEventListener('scroll', handleScroll);
        setTimeout(handleScroll, 100);
    })();

    // ===========================
    // CIRCULAR SCROLL BUTTON (v2)
    // ===========================
    (function() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (!scrollIndicator) return;
        
        const scrollIcon = scrollIndicator.querySelector('.scroll-icon i');
        const scrollLabel = document.getElementById('scrollLabel');
        const progressRing = scrollIndicator.querySelector('.scroll-ring-progress');
        if (!scrollIcon || !progressRing) return;

        let isAtBottom = false;
        let isAnimating = false;

        function updateScrollButton() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const maxScroll = documentHeight - windowHeight;
            const scrollPercent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

            if (scrollY > 150) {
                scrollIndicator.classList.remove('hidden');
            } else {
                scrollIndicator.classList.add('hidden');
            }

            const circumference = 264;
            const offset = circumference - (scrollPercent / 100) * circumference;
            progressRing.style.strokeDashoffset = offset;

            if (scrollPercent >= 98) {
                isAtBottom = true;
                scrollIndicator.classList.add('at-bottom');
                if (scrollLabel) scrollLabel.textContent = 'Top';
                scrollIcon.className = 'fas fa-chevron-up';
            } else {
                isAtBottom = false;
                scrollIndicator.classList.remove('at-bottom');
                if (scrollLabel) scrollLabel.textContent = 'Scroll';
                scrollIcon.className = 'fas fa-chevron-down';
            }
        }

        scrollIndicator.addEventListener('click', function() {
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

            function animateScroll(timestamp) {
                if (startTime === null) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const easedProgress = easeInOutCubic(progress);
                window.scrollTo(0, currentScroll + (targetScroll - currentScroll) * easedProgress);
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                } else {
                    window.scrollTo(0, targetScroll);
                    isAnimating = false;
                    updateScrollButton();
                }
            }

            requestAnimationFrame(animateScroll);
        });

        window.addEventListener('scroll', updateScrollButton);
        setTimeout(updateScrollButton, 200);
    })();

});

// ===========================
// ACTIVE NAV LINK UPDATE (Global)
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
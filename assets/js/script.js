/**
 * MAROON ATK - Main JavaScript
 * Fungsi: Navbar, Back to Top, Hamburger, Dropdown, Page Transition, Slider, Active Nav
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // ==========================================
    // 2. HAMBURGER MENU (Mobile)
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('open');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (this.classList.contains('dropdown-toggle')) {
                    return;
                }
                navMenu.classList.remove('open');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ==========================================
    // 3. DROPDOWN NAVIGATION (Mobile & Desktop)
    // ==========================================
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.closest('.nav-item-dropdown');
            if (parent) {
                parent.classList.toggle('open');
            }
        });
    });

    // ==========================================
    // 4. BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 5. FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question, .question');
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                const isActive = item.classList.contains('active');
                faqItems.forEach(function(other) {
                    if (other !== item) {
                        other.classList.remove('active');
                    }
                });
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        }
    });

    // ==========================================
    // 6. NAVBAR ACTIVE STATE
    // ==========================================
    function setActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
        const currentPath = window.location.pathname;

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#') {
                link.classList.remove('active');
                return;
            }

            // Bersihkan href dari leading './' atau '/' atau '../' dan ekstensi .html
            let hrefClean = href.replace(/^\.\.\//, '').replace(/^\.\//, '').replace(/^\//, '').replace(/\.html$/, '');
            let currentClean = currentPath.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '');

            // Kasus root (Homepage / Beranda -> '/')
            if (hrefClean === '' || hrefClean === 'index') {
                const isRoot = (currentClean === '' || currentClean === 'index');
                link.classList.toggle('active', isRoot);
                return;
            }

            // Cek apakah currentClean cocok dengan hrefClean
            const isMatch = (currentClean === hrefClean) || 
                            currentClean.endsWith(hrefClean) ||
                            currentClean.startsWith(hrefClean + '/');

            link.classList.toggle('active', isMatch);
        });
    }

    // Jalankan pertama kali saat halaman dimuat
    setActiveNavLink();

    console.log('MAROON ATK - Website loaded successfully.');
});
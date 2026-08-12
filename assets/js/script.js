/**
 * MAROON ATK - Main JavaScript
 * Fungsi: Navbar, Back to Top, Hamburger, Dropdown, Page Transition, Slider
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

        // Tutup menu saat klik di luar
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

        // Tutup menu saat link diklik (kecuali dropdown toggle)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                if (this.classList.contains('dropdown-toggle')) {
                    return; // biarkan dropdown toggle bekerja
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
            // Di mobile: toggle dropdown
            // Di desktop: tetap toggel juga (agar konsisten untuk touch)
            e.preventDefault(); // cegah navigasi
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
    // 5. PAGE TRANSITION (Smooth antar halaman)
    // ==========================================
    // Semua link internal (tanpa target _blank dan bukan #)
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="index"], a[href^="tentang"], a[href^="produk"], a[href^="paket"], a[href^="blog"], a[href^="kontak"], a[href^="detail"]');

    internalLinks.forEach(function(link) {
        // Skip jika link memiliki target _blank atau href kosong / #
        if (link.target === '_blank') return;
        if (link.getAttribute('href') === '#') return;
        if (link.getAttribute('href') === '') return;

        // ===== PERBAIKAN: Lewati link dropdown toggle =====
        if (link.classList.contains('dropdown-toggle')) return;
        // Jika ada kemungkinan link di dalam dropdown (tapi bukan toggle) biarkan

        link.addEventListener('click', function(e) {
            // Cegah jika sedang menekan Ctrl/Cmd untuk buka tab baru
            if (e.ctrlKey || e.metaKey) return;

            const href = this.getAttribute('href');
            // Pastikan href bukan URL eksternal (mulai dengan http)
            if (href && href.startsWith('http') && !href.includes(window.location.hostname)) return;

            e.preventDefault();

            // Tambahkan class fade-out ke body
            document.body.classList.add('page-transition');

            // Setelah transisi, arahkan ke halaman tujuan
            setTimeout(function() {
                window.location.href = href;
            }, 400);
        });
    });

    // Hilangkan efek fade saat halaman dimuat (jika ada class)
    window.addEventListener('pageshow', function() {
        document.body.classList.remove('page-transition');
    });

    // ==========================================
    // 6. FAQ ACCORDION
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Tutup semua FAQ lain
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
    // 7. ABOUT SLIDER (Otomatis dari HTML)
    // ==========================================
    // Slider sudah dijalankan dari script inline di index.html

    console.log('MAROON ATK - Website loaded successfully.');
});
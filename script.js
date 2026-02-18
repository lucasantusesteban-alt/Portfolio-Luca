document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    const mainHeader = document.querySelector('.main-header');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
        });

        // Close menu when a link is clicked
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Smooth entry effect for sections on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .card, .bio-block, .hero-image').forEach(el => {
        el.classList.add('fade-in-section');
        observer.observe(el);
    });
});

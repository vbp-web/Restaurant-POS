document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3D Tilt Effect for Cards
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .download-cta');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xc = rect.width / 2;
            const yc = rect.height / 2;

            const dx = x - xc;
            const dy = y - yc;

            // Set custom property for spotlight effect
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            // Calculate rotation (max 10 degrees)
            const rotX = (dy / yc) * -10;
            const rotY = (dx / xc) * 10;

            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Parallax Effect for Background and Hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        // Move blobs at different speeds
        document.querySelector('.blob-1').style.transform = `translateY(${scrolled * 0.2}px)`;
        document.querySelector('.blob-2').style.transform = `translateY(${scrolled * -0.1}px)`;
        document.querySelector('.blob-3').style.transform = `translateY(${scrolled * 0.15}px)`;

        // Hero parallax
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(2deg) translateY(${scrolled * 0.05}px)`;
        }
    });

    // Reveal animations on scroll (Enhanced 3D Entry)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.feature-card, .pricing-card, .tech-item, .section-header, .download-cta');

    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) translate3d(0, 0, -100px) rotateX(-20deg)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`;
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        observer.observe(el);
    });

    // Update style for visible state
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) translate3d(0, 0, 0) rotateX(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    // Carousel Multi-Speed Parallax
    const carouselTrack = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = 6;
    let currentSlide = 0;

    function updateCarousel(slideIndex) {
        const offset = -slideIndex * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;

        indicators.forEach((ind, i) => ind.classList.toggle('active', i === slideIndex));
        currentSlide = slideIndex;
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(currentSlide);
    }, 4000);

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => updateCarousel(i));
    });
});

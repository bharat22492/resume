document.addEventListener('DOMContentLoaded', function() {

    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');
    const cursorBorder = document.getElementById('cursor-border');
    const interactiveElements = document.querySelectorAll('.interactive');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorBorder.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-grow');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-grow');
        });
    });

    // --- Particle.js Background ---
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#0a9396" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#94d2bd", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 4, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // --- Swiper.js Testimonial Slider ---
    const swiper = new Swiper('.testimonial-slider', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // --- Your existing JavaScript code follows... ---
    // (Typed.js, mobile menu, scroll animations, etc.)

});

document.addEventListener('DOMContentLoaded', function() {

    // --- Typed.js Initialization for Hero Subtitle ---
    const typed = new Typed('#typed-text', {
        strings: ['SEO Specialist', 'WordPress Developer', 'Digital Marketer', 'Team Leader', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        smartBackspace: true,
    });

    // --- Mobile Navigation (Hamburger Menu) ---
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    // --- Portfolio Filter ---
    const filterContainer = document.querySelector('.filter-buttons');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Deactivate existing active button
            filterContainer.querySelector('.active').classList.remove('active');
            // Activate new button
            e.target.classList.add('active');
            
            const filterValue = e.target.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (item.dataset.category === filterValue || filterValue === 'all') {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        }
    });


    // --- Contact Form Submission ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        const json = JSON.stringify(object);
        
        formStatus.innerHTML = "Sending...";
        formStatus.style.color = "#333";

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    formStatus.innerHTML = jsonResponse.message || "Form submitted successfully!";
                    formStatus.style.color = "green";
                } else {
                    console.log(response);
                    formStatus.innerHTML = jsonResponse.message || "Something went wrong!";
                    formStatus.style.color = "red";
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.innerHTML = "Something went wrong!";
                 formStatus.style.color = "red";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    formStatus.innerHTML = "";
                }, 5000);
            });
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
});
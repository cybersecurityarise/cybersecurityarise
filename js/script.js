document.addEventListener("DOMContentLoaded", function() {
    // Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Enhanced Smooth Scroll with offset
    const scrollOffset = 80; // Adjust this value based on your header height

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if href="#"
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                navLinks.classList.remove('active');
                menuBtn?.classList.remove('active');
            }
        });
    });

    // Smooth scroll for all sections
    let isScrolling = false;
    let lastScrollTop = 0;

    window.addEventListener('wheel', function(e) {
        if (!isScrolling) {
            isScrolling = true;

            const direction = e.deltaY > 0 ? 1 : -1;
            const sections = Array.from(document.querySelectorAll('section'));
            const currentPos = window.pageYOffset;
            
            let targetSection = null;
            
            // Find the next/previous section
            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop - scrollOffset;
                
                if (direction > 0 && sectionTop > currentPos) {
                    targetSection = section;
                    break;
                } else if (direction < 0 && sectionTop < currentPos) {
                    targetSection = sections[i - 1];
                }
            }

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Reset scrolling flag after animation
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    }, { passive: true });

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements
    document.querySelectorAll('.feature-card, .course-card').forEach(el => {
        observer.observe(el);
    });

    document.querySelector(".cta-button").addEventListener("click", function() {
        alert("Redirecting to Contact Page...");
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function(event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const section = document.querySelector(this.getAttribute("href"));
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Newsletter Form Handling
    document.getElementById('newsletter-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const button = e.target.querySelector('button');
        const originalText = button.innerHTML;

        try {
            button.innerHTML = 'Subscribing...';
            button.disabled = true;

            // Simulate API call - Replace with actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success handling
            button.innerHTML = 'Subscribed!';
            button.style.backgroundColor = '#00ff8c';
            e.target.reset();

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
                button.disabled = false;
            }, 2000);
        } catch (error) {
            button.innerHTML = 'Try Again';
            button.style.backgroundColor = '#ff6b6b';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
                button.disabled = false;
            }, 2000);
        }
    });

    // Animate progress bars when cards are visible
    const progressBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    // Random progress between 70% and 90%
                    const progress = Math.floor(Math.random() * (90 - 70 + 1)) + 70;
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe all field cards
    document.querySelectorAll('.field-card').forEach(card => {
        progressBarObserver.observe(card);
    });

    // Enhanced card animations
    document.querySelectorAll('.field-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Smooth progress bar animation
    const animateProgressBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = Math.floor(Math.random() * (95 - 75 + 1)) + 75;
                progressBar.style.width = `${progress}%`;
                progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
    };

    const progressObserver = new IntersectionObserver(animateProgressBars, {
        threshold: 0.5
    });

    document.querySelectorAll('.field-progress').forEach(progress => {
        progressObserver.observe(progress);
    });
});

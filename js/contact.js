document.addEventListener('DOMContentLoaded', () => {
    // Animate form elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.form-group, .info-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styling for animation
    document.querySelectorAll('.form-group, .info-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<span>Sending...</span>';
        
        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            form.reset();
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-arrow-right arrow-icon"></i>';
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = '<span>Error! Try Again</span>';
        }
    });
});

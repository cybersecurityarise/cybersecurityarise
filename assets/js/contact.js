document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const loading = document.getElementById('form-loading');
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');

    const validateForm = (formData) => {
        const errors = [];
        if (!formData.get('name').trim()) errors.push('Name is required');
        if (!formData.get('email').trim()) errors.push('Email is required');
        if (!formData.get('subject').trim()) errors.push('Subject is required');
        if (!formData.get('message').trim()) errors.push('Message is required');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.get('email'))) errors.push('Invalid email format');
        
        return errors;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset status messages
        loading.classList.add('hidden');
        success.classList.add('hidden');
        error.classList.add('hidden');

        const formData = new FormData(form);
        const errors = validateForm(formData);

        if (errors.length > 0) {
            error.textContent = errors.join('. ');
            error.classList.remove('hidden');
            return;
        }

        loading.classList.remove('hidden');

        try {
            // Replace with your actual form submission endpoint
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                form.reset();
                success.classList.remove('hidden');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err) {
            error.textContent = 'Error sending message. Please try again.';
            error.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    });
});

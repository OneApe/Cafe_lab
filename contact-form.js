class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.initializeForm();
    }

    initializeForm() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
        }
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'tel':
                isValid = /^[\d\s-+()]{10,}$/.test(value);
                errorMessage = 'Please enter a valid phone number';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }

        this.updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    updateFieldStatus(field, isValid, errorMessage) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = isValid ? '' : errorMessage;
            field.classList.toggle('error', !isValid);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await this.sendEmail(data);
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async sendEmail(data) {
        // Replace with your actual email service endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return response.json();
    }

    showSuccessMessage() {
        const messageElement = document.createElement('div');
        messageElement.className = 'success-message';
        messageElement.textContent = 'Thank you for your message! We will get back to you soon.';
        this.form.appendChild(messageElement);
        setTimeout(() => messageElement.remove(), 5000);
    }

    showErrorMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'error-message';
        messageElement.textContent = message || 'An error occurred. Please try again later.';
        this.form.appendChild(messageElement);
        setTimeout(() => messageElement.remove(), 5000);
    }
}

// Initialize the contact form
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
}); 
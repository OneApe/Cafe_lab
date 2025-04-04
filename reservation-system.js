class ReservationSystem {
    constructor() {
        this.form = document.getElementById('reservationForm');
        this.calendar = document.getElementById('reservationCalendar');
        this.initializeSystem();
    }

    initializeSystem() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
            this.initializeCalendar();
        }
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, select');
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
            case 'number':
                isValid = value > 0;
                errorMessage = 'Please enter a valid number of guests';
                break;
            case 'datetime-local':
                isValid = this.validateDateTime(value);
                errorMessage = 'Please select a valid date and time';
                break;
            default:
                isValid = value.length > 0;
                errorMessage = 'This field is required';
        }

        this.updateFieldStatus(field, isValid, errorMessage);
        return isValid;
    }

    validateDateTime(dateTime) {
        const selected = new Date(dateTime);
        const now = new Date();
        return selected > now;
    }

    updateFieldStatus(field, isValid, errorMessage) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = isValid ? '' : errorMessage;
            field.classList.toggle('error', !isValid);
        }
    }

    initializeCalendar() {
        if (this.calendar) {
            // Initialize calendar with available dates
            this.loadAvailableDates();
            this.calendar.addEventListener('change', () => this.handleDateSelection());
        }
    }

    async loadAvailableDates() {
        try {
            const response = await fetch('/api/available-dates');
            const dates = await response.json();
            this.updateCalendarAvailability(dates);
        } catch (error) {
            console.error('Failed to load available dates:', error);
        }
    }

    updateCalendarAvailability(dates) {
        // Update calendar UI with available dates
        dates.forEach(date => {
            const dateElement = this.calendar.querySelector(`[data-date="${date}"]`);
            if (dateElement) {
                dateElement.classList.add('available');
            }
        });
    }

    handleDateSelection() {
        const selectedDate = this.calendar.value;
        this.loadAvailableTimeSlots(selectedDate);
    }

    async loadAvailableTimeSlots(date) {
        try {
            const response = await fetch(`/api/available-slots?date=${date}`);
            const slots = await response.json();
            this.updateTimeSlotOptions(slots);
        } catch (error) {
            console.error('Failed to load time slots:', error);
        }
    }

    updateTimeSlotOptions(slots) {
        const timeSelect = this.form.querySelector('select[name="time"]');
        if (timeSelect) {
            timeSelect.innerHTML = slots.map(slot => 
                `<option value="${slot}">${slot}</option>`
            ).join('');
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
            const response = await this.createReservation(data);
            this.showSuccessMessage();
            this.sendConfirmationEmail(data);
            this.form.reset();
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, select');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async createReservation(data) {
        const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create reservation');
        }

        return response.json();
    }

    async sendConfirmationEmail(data) {
        try {
            await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
        }
    }

    showSuccessMessage() {
        const messageElement = document.createElement('div');
        messageElement.className = 'success-message';
        messageElement.textContent = 'Reservation confirmed! Check your email for details.';
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

// Initialize the reservation system
document.addEventListener('DOMContentLoaded', () => {
    new ReservationSystem();
}); 
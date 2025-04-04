class MembershipSystem {
    constructor() {
        this.form = document.getElementById('membershipForm');
        this.userProfile = document.getElementById('userProfile');
        this.initializeSystem();
    }

    initializeSystem() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            this.setupValidation();
        }
        this.loadUserProfile();
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input');
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
            case 'password':
                isValid = value.length >= 8;
                errorMessage = 'Password must be at least 8 characters long';
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

    async loadUserProfile() {
        try {
            const response = await fetch('/api/user-profile');
            const userData = await response.json();
            this.updateUserProfile(userData);
        } catch (error) {
            console.error('Failed to load user profile:', error);
        }
    }

    updateUserProfile(userData) {
        if (this.userProfile) {
            this.userProfile.innerHTML = `
                <div class="profile-header">
                    <h2>Welcome, ${userData.name}</h2>
                    <p class="membership-level">${userData.membershipLevel}</p>
                </div>
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-label">Points</span>
                        <span class="stat-value">${userData.points}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Visits</span>
                        <span class="stat-value">${userData.visits}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Rewards</span>
                        <span class="stat-value">${userData.availableRewards}</span>
                    </div>
                </div>
                <div class="rewards-section">
                    <h3>Available Rewards</h3>
                    <div class="rewards-list">
                        ${this.generateRewardsList(userData.rewards)}
                    </div>
                </div>
            `;
        }
    }

    generateRewardsList(rewards) {
        return rewards.map(reward => `
            <div class="reward-item">
                <h4>${reward.name}</h4>
                <p>${reward.description}</p>
                <button onclick="membershipSystem.claimReward('${reward.id}')" 
                        class="claim-reward-btn"
                        ${reward.claimed ? 'disabled' : ''}>
                    ${reward.claimed ? 'Claimed' : 'Claim Reward'}
                </button>
            </div>
        `).join('');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await this.createMembership(data);
            this.showSuccessMessage();
            this.sendWelcomeEmail(data);
            this.form.reset();
            this.loadUserProfile();
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async createMembership(data) {
        const response = await fetch('/api/memberships', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create membership');
        }

        return response.json();
    }

    async claimReward(rewardId) {
        try {
            const response = await fetch(`/api/claim-reward/${rewardId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                }
            });

            if (!response.ok) {
                throw new Error('Failed to claim reward');
            }

            this.showSuccessMessage('Reward claimed successfully!');
            this.loadUserProfile();
        } catch (error) {
            this.showErrorMessage(error.message);
        }
    }

    async sendWelcomeEmail(data) {
        try {
            await fetch('/api/send-welcome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Failed to send welcome email:', error);
        }
    }

    showSuccessMessage(message = 'Membership created successfully!') {
        const messageElement = document.createElement('div');
        messageElement.className = 'success-message';
        messageElement.textContent = message;
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

// Initialize the membership system
const membershipSystem = new MembershipSystem(); 
// Join Member Button Interaction
document.addEventListener('DOMContentLoaded', function() {
    const joinMemberBtn = document.getElementById('joinMemberBtn');
    const membershipModal = document.getElementById('membershipModal');
    const closeMembershipModal = document.querySelector('.close-membership-modal');
    const tabButtons = document.querySelectorAll('.tab-button');
    const membershipForms = document.querySelectorAll('.membership-form');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Check if user is already logged in (from localStorage)
    const loggedInUser = localStorage.getItem('cafeLabUser');
    if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        showUserProfile(userData.name);
    }
    
    // Show membership modal when "Join Our Cafe Member" button is clicked
    if (joinMemberBtn) {
        joinMemberBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add a ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Show the membership modal
            membershipModal.style.display = "block";
        });
    }
    
    // Close membership modal when close button is clicked
    if (closeMembershipModal) {
        closeMembershipModal.addEventListener('click', function() {
            membershipModal.style.display = "none";
        });
    }
    
    // Close membership modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == membershipModal) {
            membershipModal.style.display = "none";
        }
    });
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and forms
            tabButtons.forEach(btn => btn.classList.remove('active'));
            membershipForms.forEach(form => form.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding form
            const tabName = this.getAttribute('data-tab');
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Here you would typically send the data to your server
            // For demo purposes, we'll just show a success message and log the user in
            
            // Get user name from localStorage or use email as fallback
            let name = email.split('@')[0]; // Use part of email as name if not found
            const storedUser = localStorage.getItem('cafeLabUser');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                if (userData.email === email) {
                    name = userData.name;
                }
            }
            
            // Store user data in localStorage
            const userData = {
                name: name,
                email: email,
                isLoggedIn: true
            };
            localStorage.setItem('cafeLabUser', JSON.stringify(userData));
            
            // Show success message
            showMembershipSuccess('Login successful! Welcome back to Cafe-Lab.');
            
            // Show user profile
            showUserProfile(name);
            
            // Reset form
            loginForm.reset();
        });
    }
    
    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            // Simple validation
            if (password !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Store user data in localStorage
            const userData = {
                name: name,
                email: email,
                isLoggedIn: true
            };
            localStorage.setItem('cafeLabUser', JSON.stringify(userData));
            
            // Here you would typically send the data to your server
            // For demo purposes, we'll just show a success message
            showSignupSuccess(name, email);
            
            // Show user profile
            showUserProfile(name);
            
            // Reset form
            signupForm.reset();
        });
    }
    
    // Function to show login success message
    function showMembershipSuccess(message) {
        // Create success message
        const successMessage = `
            <div class="membership-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Success!</h3>
                <p>${message}</p>
                <button class="close-success-btn">Close</button>
            </div>
        `;
        
        // Create and show success modal
        const successModal = document.createElement('div');
        successModal.className = 'success-modal';
        successModal.innerHTML = successMessage;
        document.body.appendChild(successModal);
        
        // Close success modal when button is clicked
        const closeSuccessBtn = successModal.querySelector('.close-success-btn');
        closeSuccessBtn.addEventListener('click', function() {
            successModal.remove();
            membershipModal.style.display = "none";
        });
    }
    
    // Function to show signup success message with login prompt
    function showSignupSuccess(name, email) {
        // Create success message with login prompt
        const successMessage = `
            <div class="membership-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Account Created Successfully!</h3>
                <p>Welcome to Cafe-Lab, ${name}!</p>
                <p>Your account has been created with the email: <strong>${email}</strong></p>
                <div class="login-prompt">
                    <p>You are now logged in and can access your account.</p>
                    <button class="close-success-btn">Close</button>
                </div>
            </div>
        `;
        
        // Create and show success modal
        const successModal = document.createElement('div');
        successModal.className = 'success-modal';
        successModal.innerHTML = successMessage;
        document.body.appendChild(successModal);
        
        // Close success modal when button is clicked
        const closeSuccessBtn = successModal.querySelector('.close-success-btn');
        closeSuccessBtn.addEventListener('click', function() {
            successModal.remove();
            membershipModal.style.display = "none";
        });
    }
    
    // Function to show user profile
    function showUserProfile(name) {
        // Update user name
        userName.textContent = name;
        
        // Hide join member button and show user profile
        joinMemberBtn.style.display = "none";
        userProfile.style.display = "inline-flex";
    }
    
    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear user data from localStorage
            localStorage.removeItem('cafeLabUser');
            
            // Hide user profile and show join member button
            userProfile.style.display = "none";
            joinMemberBtn.style.display = "inline-flex";
            
            // Show logout success message
            const logoutMessage = `
                <div class="membership-success">
                    <div class="success-icon">
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                    <h3>Logged Out Successfully</h3>
                    <p>Thank you for visiting Cafe-Lab. Come back soon!</p>
                    <button class="close-success-btn">Close</button>
                </div>
            `;
            
            // Create and show success modal
            const successModal = document.createElement('div');
            successModal.className = 'success-modal';
            successModal.innerHTML = logoutMessage;
            document.body.appendChild(successModal);
            
            // Close success modal when button is clicked
            const closeSuccessBtn = successModal.querySelector('.close-success-btn');
            closeSuccessBtn.addEventListener('click', function() {
                successModal.remove();
            });
        });
    }
});

// Simple Settings Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get settings elements
    const settingsLink = document.querySelector('.nav-link[href="#"] i.fa-cog').parentElement;
    const settingsModal = document.getElementById('settingsModal');
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    const cancelSettingsBtn = document.querySelector('.cancel-settings-btn');
    const closeSettingsBtn = document.querySelector('.close-settings-btn');
    
    // Track if settings have been changed
    let settingsChanged = false;
    
    // Show settings modal when settings link is clicked
    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            settingsModal.style.display = "block";
            
            // Load user settings if available
            loadUserSettings();
        });
    }
    
    // Save settings when save button is clicked
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            saveSettings('manual');
        });
    }
    
    // Cancel settings when cancel button is clicked
    if (cancelSettingsBtn) {
        cancelSettingsBtn.addEventListener('click', function() {
            if (settingsChanged) {
                if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
                    settingsModal.style.display = "none";
                    settingsChanged = false;
                }
            } else {
                settingsModal.style.display = "none";
            }
        });
    }
    
    // Close modal when close button is clicked
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function() {
            if (settingsChanged) {
                if (confirm('You have unsaved changes. Are you sure you want to close?')) {
                    settingsModal.style.display = "none";
                    settingsChanged = false;
                }
            } else {
                settingsModal.style.display = "none";
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target == settingsModal) {
            if (settingsChanged) {
                if (confirm('You have unsaved changes. Are you sure you want to close?')) {
                    settingsModal.style.display = "none";
                    settingsChanged = false;
                }
            } else {
                settingsModal.style.display = "none";
            }
        }
    });
    
    // Track changes to settings
    const settingsInputs = settingsModal.querySelectorAll('input, select');
    settingsInputs.forEach(input => {
        input.addEventListener('change', function() {
            settingsChanged = true;
            
            // Apply settings immediately for better UX
            if (input.id === 'themeSelect') {
                applyThemeSetting(input.value);
            } else if (input.id === 'fontSize') {
                applyFontSizeSetting(input.value);
            } else if (input.id === 'languageSelect') {
                applyLanguageSetting(input.value);
            }
        });
    });
    
    // Auto-save after a delay when changes are detected
    let autoSaveTimeout;
    settingsInputs.forEach(input => {
        input.addEventListener('change', function() {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                saveSettings('auto');
            }, 2000); // Auto-save after 2 seconds of inactivity
        });
    });
    
    // Function to load user settings
    function loadUserSettings() {
        const loggedInUser = localStorage.getItem('cafeLabUser');
        if (loggedInUser) {
            const userData = JSON.parse(loggedInUser);
            if (userData.settings) {
                // Apply saved settings to form inputs
                Object.keys(userData.settings).forEach(key => {
                    const input = document.getElementById(key);
                    if (input) {
                        if (input.type === 'checkbox') {
                            input.checked = userData.settings[key];
                        } else {
                            input.value = userData.settings[key];
                        }
                    }
                });
                
                // Apply settings
                applyAllSettings(userData.settings);
            }
        }
    }
    
    // Function to save settings
    function saveSettings(saveType) {
        // Get all input elements
        const inputs = settingsModal.querySelectorAll('input, select');
        const settings = {};
        
        // Collect all settings values
        inputs.forEach(input => {
            const value = input.type === 'checkbox' ? input.checked : input.value;
            settings[input.id] = value;
        });
        
        // Save to localStorage
        const loggedInUser = localStorage.getItem('cafeLabUser');
        if (loggedInUser) {
            const userData = JSON.parse(loggedInUser);
            userData.settings = settings;
            localStorage.setItem('cafeLabUser', JSON.stringify(userData));
        }
        
        // Apply all settings
        applyAllSettings(settings);
        
        // Show success alert
        if (saveType === 'manual') {
            showSettingsAlert('Settings saved successfully!', 'success');
            settingsChanged = false;
        } else if (saveType === 'auto') {
            showSettingsAlert('Settings auto-saved', 'info');
        }
    }
    
    // Function to apply all settings
    function applyAllSettings(settings) {
        if (settings.themeSelect) applyThemeSetting(settings.themeSelect);
        if (settings.fontSize) applyFontSizeSetting(settings.fontSize);
        if (settings.languageSelect) applyLanguageSetting(settings.languageSelect);
    }
    
    // Function to apply theme setting
    function applyThemeSetting(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('cafeLabTheme', theme);
    }
    
    // Function to apply font size setting
    function applyFontSizeSetting(size) {
        document.body.setAttribute('data-font-size', size);
        localStorage.setItem('cafeLabFontSize', size);
    }
    
    // Function to apply language setting
    function applyLanguageSetting(language) {
        document.documentElement.setAttribute('lang', language);
        localStorage.setItem('cafeLabLanguage', language);
        
        // Update language preview
        const previewText = document.getElementById('languagePreview');
        if (previewText) {
            if (language === 'en') {
                previewText.textContent = 'Welcome to Cafe-Lab! Experience the perfect blend of coffee and technology.';
            } else if (language === 'my') {
                previewText.textContent = 'Cafe-Lab သို့ ကြိုဆိုပါတယ်။ ကော်ဖီနှင့် နည်းပညာ၏ ပြီးပြည့်စုံသော ရောနှောမှုကို ခံစားကြည့်ပါ။';
            } else if (language === 'th') {
                previewText.textContent = 'ยินดีต้อนรับสู่ Cafe-Lab! สัมผัสประสบการณ์การผสมผสานที่สมบูรณ์แบบระหว่างกาแฟและเทคโนโลยี';
            }
        }
    }
    
    // Function to show settings alert
    function showSettingsAlert(message, type) {
        // Create alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `settings-alert settings-alert-${type}`;
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add alert to modal
        const settingsBody = settingsModal.querySelector('.settings-body');
        settingsBody.insertBefore(alertDiv, settingsBody.firstChild);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('cafeLabTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    } else if (systemPrefersDark) {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        // Update theme
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('cafeLabTheme', newTheme);
        
        // Update icon
        updateThemeIcon(!isDark);
        
        // Show theme change alert
        showThemeAlert(newTheme);
    });
    
    // Function to update theme icon
    function updateThemeIcon(isDark) {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Function to show theme change alert
    function showThemeAlert(theme) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `settings-alert settings-alert-${theme === 'dark' ? 'info' : 'success'}`;
        alertDiv.innerHTML = `
            <div class="alert-content">
                <i class="fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}"></i>
                <span>${theme === 'dark' ? 'Dark' : 'Light'} mode activated</span>
            </div>
        `;
        
        // Add alert to body
        document.body.insertBefore(alertDiv, document.body.firstChild);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('cafeLabTheme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            updateThemeIcon(e.matches);
        }
    });
});

// Mobile Responsiveness Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add touch event support for mobile devices
    const settingsModal = document.getElementById('settingsModal');
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    
    if (saveSettingsBtn) {
        // Add touch event in addition to click
        saveSettingsBtn.addEventListener('touchend', function(e) {
            e.preventDefault(); // Prevent double-firing on mobile
            
            // Get all input elements
            const inputs = settingsModal.querySelectorAll('input, select');
            const settings = {};
            
            // Collect all settings values
            inputs.forEach(input => {
                const value = input.type === 'checkbox' ? input.checked : input.value;
                settings[input.id] = value;
            });
            
            // Save to localStorage
            const loggedInUser = localStorage.getItem('cafeLabUser');
            if (loggedInUser) {
                const userData = JSON.parse(loggedInUser);
                userData.settings = settings;
                localStorage.setItem('cafeLabUser', JSON.stringify(userData));
            }
            
            // Show success alert
            alert('Settings saved successfully!');
            
            // Also try to show the alert in the modal
            showSimpleAlert('Settings saved successfully!');
        });
    }
    
    // Improve modal scrolling on mobile
    if (settingsModal) {
        const modalBody = settingsModal.querySelector('.modal-body');
        if (modalBody) {
            // Add smooth scrolling for iOS
            modalBody.style.webkitOverflowScrolling = 'touch';
            
            // Prevent body scrolling when modal is open on mobile
            settingsModal.addEventListener('show', function() {
                document.body.style.overflow = 'hidden';
            });
            
            settingsModal.addEventListener('hide', function() {
                document.body.style.overflow = '';
            });
        }
    }
    
    // Add passive event listeners for better scrolling performance
    window.addEventListener('touchstart', function() {}, {passive: true});
    window.addEventListener('touchmove', function() {}, {passive: true});
    
    // Fix for iOS Safari 100vh issue
    function setVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', setVH);
    setVH();
});

// Rest of your existing functions (updateLanguagePreview, applyLanguageSetting, updateSiteTexts)
// ... existing code ...

// Product modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const productModal = document.getElementById('productModal');
    const closeProductModal = document.querySelector('.close-product-modal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductFamous = document.getElementById('modalProductFamous');
    const modalProductTaste = document.getElementById('modalProductTaste');
    const modalProductBrewing = document.getElementById('modalProductBrewing');
    const orderNowBtn = document.querySelector('.order-now-btn');
    const addToFavoritesBtn = document.querySelector('.add-to-favorites-btn');
    
    // Product data
    const products = [
        {
            id: 1,
            title: 'Golden Phoenix Latte',
            price: '$6.95',
            image: 'images/golden-phoenix-latte.jpg',
            description: 'Our signature latte featuring a blend of Ethiopian Yirgacheffe and Colombian beans, topped with a delicate gold leaf and a hint of cardamom.',
            famous: 'Featured in "Coffee Connoisseur" magazine for its unique flavor profile and elegant presentation.',
            taste: 'Rich and creamy with notes of caramel, chocolate, and a subtle floral finish.',
            brewing: 'Espresso-based drink prepared with our custom extraction method, ensuring perfect balance of flavors.'
        },
        // ... other products
    ];
    
    // Function to open product modal
    function openProductModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        modalProductImage.src = product.image;
        modalProductImage.alt = product.title;
        modalProductTitle.textContent = product.title;
        modalProductPrice.textContent = product.price;
        modalProductDescription.textContent = product.description;
        modalProductFamous.textContent = product.famous;
        modalProductTaste.textContent = product.taste;
        modalProductBrewing.textContent = product.brewing;
        
        // Reset favorite button state
        addToFavoritesBtn.classList.remove('active');
        addToFavoritesBtn.innerHTML = '<i class="far fa-heart"></i>';
        
        // Show modal with animation
        productModal.style.display = 'block';
        setTimeout(() => {
            productModal.style.opacity = '1';
        }, 10);
    }
    
    // Close modal when clicking the close button
    closeProductModal.addEventListener('click', function() {
        productModal.style.opacity = '0';
        setTimeout(() => {
            productModal.style.display = 'none';
        }, 300);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === productModal) {
            productModal.style.opacity = '0';
            setTimeout(() => {
                productModal.style.display = 'none';
            }, 300);
        }
    });
    
    // Order Now button functionality
    orderNowBtn.addEventListener('click', function() {
        const productTitle = modalProductTitle.textContent;
        alert(`Thank you for your interest in ${productTitle}! This feature will be available soon.`);
    });
    
    // Add to Favorites button functionality
    addToFavoritesBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-heart"></i>';
            // Add to favorites logic here
        } else {
            this.innerHTML = '<i class="far fa-heart"></i>';
            // Remove from favorites logic here
        }
    });
    
    // Add click event to all "Learn More" buttons
    document.querySelectorAll('.learn-more-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            openProductModal(productId);
        });
    });
}); 
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu')) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // Settings functionality
    const settingsModal = document.getElementById('settingsModal');
    const saveSettingsBtn = document.querySelector('.save-settings-btn');
    const cancelSettingsBtn = document.querySelector('.cancel-settings-btn');
    const closeSettingsBtn = document.querySelector('.close-settings-btn');
    const themeSelect = document.getElementById('theme');
    const fontSizeSelect = document.getElementById('fontSize');
    const languageSelect = document.getElementById('languageSelect');
    const emailNotif = document.getElementById('emailNotif');
    const eventReminders = document.getElementById('eventReminders');
    const profileVisibility = document.getElementById('profileVisibility');
    
    // Track if settings have been modified
    let settingsModified = false;
    // Track if settings have been saved
    let settingsSaved = false;

    // Load saved settings from localStorage
    function loadSavedSettings() {
        // Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        themeSelect.value = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Font Size
        const savedFontSize = localStorage.getItem('fontSize') || 'medium';
        fontSizeSelect.value = savedFontSize;
        document.body.style.fontSize = getFontSizeValue(savedFontSize);

        // Language
        const savedLanguage = localStorage.getItem('language') || 'en';
        languageSelect.value = savedLanguage;

        // Notifications
        emailNotif.checked = localStorage.getItem('emailNotifications') === 'true';
        eventReminders.checked = localStorage.getItem('eventReminders') === 'true';

        // Profile Visibility
        const savedVisibility = localStorage.getItem('profileVisibility') || 'public';
        profileVisibility.value = savedVisibility;
        
        // Reset modification tracking
        settingsModified = false;
        settingsSaved = false;
    }

    // Get font size value
    function getFontSizeValue(size) {
        const sizes = {
            'small': '14px',
            'medium': '16px',
            'large': '18px'
        };
        return sizes[size] || '16px';
    }

    // Save settings
    function saveSettings() {
        // Save theme
        const selectedTheme = themeSelect.value;
        localStorage.setItem('theme', selectedTheme);
        document.documentElement.setAttribute('data-theme', selectedTheme);

        // Save font size
        const selectedFontSize = fontSizeSelect.value;
        localStorage.setItem('fontSize', selectedFontSize);
        document.body.style.fontSize = getFontSizeValue(selectedFontSize);

        // Save language
        const selectedLanguage = languageSelect.value;
        localStorage.setItem('language', selectedLanguage);
        if (window.languageManager) {
            window.languageManager.setLanguage(selectedLanguage);
        }

        // Save notifications
        localStorage.setItem('emailNotifications', emailNotif.checked);
        localStorage.setItem('eventReminders', eventReminders.checked);

        // Save profile visibility
        localStorage.setItem('profileVisibility', profileVisibility.value);

        // Mark settings as saved
        settingsSaved = true;
        settingsModified = false;

        // Show success message
        showSuccessMessage();

        // Force close the modal after a short delay (for mobile)
        setTimeout(() => {
            settingsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Force reflow and remove any remaining backdrop
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scrollTo(0, parseInt(document.body.style.top || '0') * -1);
        }, 1000);
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'settings-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>Settings saved successfully!</p>
        `;
        document.body.appendChild(successMessage);

        // Remove success message after 2 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 2000);
    }

    // Check for unsaved changes
    function checkUnsavedChanges() {
        if (settingsModified && !settingsSaved) {
            return confirm('You have unsaved changes. Are you sure you want to close?');
        }
        return true;
    }

    // Event listeners for settings changes
    function addSettingsChangeListeners() {
        const settingsInputs = [
            themeSelect, 
            fontSizeSelect, 
            languageSelect, 
            emailNotif, 
            eventReminders, 
            profileVisibility
        ];
        
        settingsInputs.forEach(input => {
            if (input) {
                input.addEventListener('change', function() {
                    settingsModified = true;
                    settingsSaved = false;
                });
            }
        });
    }

    // Event listeners
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
    
    if (cancelSettingsBtn) {
        cancelSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (checkUnsavedChanges()) {
                closeSettingsModal();
            }
        });
    }
    
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (checkUnsavedChanges()) {
                closeSettingsModal();
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === settingsModal) {
            if (checkUnsavedChanges()) {
                closeSettingsModal();
            }
        }
    });

    // Open settings modal
    const settingsLink = document.querySelector('a[data-translate="nav_settings"]');
    if (settingsLink) {
        settingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            settingsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            loadSavedSettings(); // Load saved settings when opening modal
            addSettingsChangeListeners(); // Add change listeners
        });
    }

    // Initial load of saved settings
    loadSavedSettings();
});

// Apply font size changes immediately when selected
const fontSizeSelect = document.getElementById('fontSize');
if (fontSizeSelect) {
    fontSizeSelect.addEventListener('change', function(e) {
        document.body.style.fontSize = getFontSizeValue(e.target.value);
    });
}

// Apply theme changes immediately when selected
const themeSelect = document.getElementById('theme');
if (themeSelect) {
    themeSelect.addEventListener('change', function(e) {
        document.documentElement.setAttribute('data-theme', e.target.value);
    });
}

// Preview language changes immediately
const languageSelect = document.getElementById('languageSelect');
if (languageSelect) {
    languageSelect.addEventListener('change', function(e) {
        const previewText = document.getElementById('languagePreview');
        if (window.languageManager) {
            window.languageManager.updatePreviewText(e.target.value);
        }
    });
}

// Helper function for font size
function getFontSizeValue(size) {
    const sizes = {
        'small': '14px',
        'medium': '16px',
        'large': '18px'
    };
    return sizes[size] || '16px';
} 
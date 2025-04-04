document.addEventListener('DOMContentLoaded', function() {
    const settingsPopup = document.getElementById('settingsPopup');
    const closeSettings = document.getElementById('closeSettings');
    const currencySelect = document.getElementById('currencySelect');
    const languageSelect = document.getElementById('languageSelect');
    const themeSelect = document.getElementById('themeSelect');
    const pricePreview = document.getElementById('pricePreview');

    // Load saved settings
    function loadSettings() {
        const savedCurrency = localStorage.getItem('currency') || 'USD';
        const savedLanguage = localStorage.getItem('language') || 'en';
        const savedTheme = localStorage.getItem('theme') || 'light';

        currencySelect.value = savedCurrency;
        languageSelect.value = savedLanguage;
        themeSelect.value = savedTheme;

        updatePricePreview(savedCurrency);
    }

    // Update price preview
    function updatePricePreview(currency) {
        const basePrice = 6.95; // Example base price in USD
        const exchangeRates = {
            USD: 1,
            THB: 35.5,
            MMK: 2100
        };

        const rate = exchangeRates[currency];
        const convertedPrice = basePrice * rate;

        let currencySymbol;
        switch(currency) {
            case 'THB':
                currencySymbol = '฿';
                break;
            case 'MMK':
                currencySymbol = 'K';
                break;
            default:
                currencySymbol = '$';
        }

        const formattedPrice = currency === 'MMK' 
            ? Math.round(convertedPrice).toLocaleString()
            : convertedPrice.toFixed(2);

        pricePreview.textContent = `${currencySymbol}${formattedPrice}`;
    }

    // Event Listeners
    document.querySelector('.settings-button').addEventListener('click', function() {
        settingsPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
        loadSettings();
    });

    closeSettings.addEventListener('click', function() {
        settingsPopup.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(e) {
        if (e.target === settingsPopup) {
            settingsPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    currencySelect.addEventListener('change', function() {
        const selectedCurrency = this.value;
        localStorage.setItem('currency', selectedCurrency);
        updatePricePreview(selectedCurrency);
        // Trigger currency update event
        document.dispatchEvent(new CustomEvent('currencyChanged', { detail: selectedCurrency }));
    });

    languageSelect.addEventListener('change', function() {
        const selectedLanguage = this.value;
        localStorage.setItem('language', selectedLanguage);
        // Trigger language update event
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: selectedLanguage }));
    });

    themeSelect.addEventListener('change', function() {
        const selectedTheme = this.value;
        localStorage.setItem('theme', selectedTheme);
        applyTheme(selectedTheme);
    });

    // Apply theme
    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.style.setProperty('--background-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
        } else {
            root.style.setProperty('--background-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
        }
    }

    // Initialize settings
    loadSettings();
}); 
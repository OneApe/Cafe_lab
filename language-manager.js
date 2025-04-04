class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.currentCurrency = localStorage.getItem('currency') || 'USD';
        this.exchangeRates = {
            USD: 1,
            THB: 35.5,  // 1 USD = 35.5 THB
            MMK: 2100   // 1 USD = 2100 MMK
        };
        this.translations = translations;
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLanguage);
        this.setCurrency(this.currentCurrency);
        
        // Add event listeners
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.currentLanguage;
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }

        const currencySelect = document.getElementById('currencySelect');
        if (currencySelect) {
            currencySelect.value = this.currentCurrency;
            currencySelect.addEventListener('change', (e) => {
                this.setCurrency(e.target.value);
            });
        }

        // Update preview text when language changes
        this.updateLanguagePreview();
        this.updateCurrencyPreview();
    }

    setLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language ${lang} not found in translations`);
            return;
        }

        this.currentLanguage = lang;
        localStorage.setItem('language', lang);

        // Update all translatable elements
        this.updatePageContent();
        
        // Update language select if it exists
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = lang;
        }

        // Update preview text
        this.updateLanguagePreview();
        this.updateCurrencyPreview();
    }

    setCurrency(currency) {
        this.currentCurrency = currency;
        localStorage.setItem('currency', currency);
        this.updatePrices();
        this.updateCurrencyPreview();
    }

    updatePageContent() {
        // Update all elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update product elements
        this.updateProductElements();

        // Update meta tags
        this.updateMetaTags();
    }

    updateProductElements() {
        // Update coffee products
        document.querySelectorAll('[data-product-type="coffee"]').forEach(element => {
            const productId = element.getAttribute('data-product-id');
            const productData = this.getTranslation(`coffee_products.${productId}`);
            if (productData) {
                const nameElement = element.querySelector('[data-product-name]');
                const descElement = element.querySelector('[data-product-description]');
                const priceElement = element.querySelector('[data-product-price]');
                
                if (nameElement) nameElement.textContent = productData.name;
                if (descElement) descElement.textContent = productData.description;
                if (priceElement) priceElement.textContent = productData.price;
            }
        });

        // Update desserts
        document.querySelectorAll('[data-product-type="dessert"]').forEach(element => {
            const productId = element.getAttribute('data-product-id');
            const productData = this.getTranslation(`desserts.${productId}`);
            if (productData) {
                const nameElement = element.querySelector('[data-product-name]');
                const descElement = element.querySelector('[data-product-description]');
                const priceElement = element.querySelector('[data-product-price]');
                
                if (nameElement) nameElement.textContent = productData.name;
                if (descElement) descElement.textContent = productData.description;
                if (priceElement) priceElement.textContent = productData.price;
            }
        });

        // Update cold drinks
        document.querySelectorAll('[data-product-type="cold-drink"]').forEach(element => {
            const productId = element.getAttribute('data-product-id');
            const productData = this.getTranslation(`cold_drinks.${productId}`);
            if (productData) {
                const nameElement = element.querySelector('[data-product-name]');
                const descElement = element.querySelector('[data-product-description]');
                const priceElement = element.querySelector('[data-product-price]');
                
                if (nameElement) nameElement.textContent = productData.name;
                if (descElement) descElement.textContent = productData.description;
                if (priceElement) priceElement.textContent = productData.price;
            }
        });
    }

    updatePrices() {
        // Update all price elements
        document.querySelectorAll('[data-price]').forEach(element => {
            const basePrice = parseFloat(element.getAttribute('data-price'));
            const convertedPrice = this.convertPrice(basePrice);
            element.textContent = this.formatPrice(convertedPrice);
        });

        // Update product modal prices if open
        const modalProductPrice = document.getElementById('modalProductPrice');
        if (modalProductPrice && modalProductPrice.getAttribute('data-price')) {
            const basePrice = parseFloat(modalProductPrice.getAttribute('data-price'));
            const convertedPrice = this.convertPrice(basePrice);
            modalProductPrice.textContent = this.formatPrice(convertedPrice);
        }
    }

    convertPrice(basePrice) {
        // Convert from USD to selected currency
        return basePrice * this.exchangeRates[this.currentCurrency];
    }

    formatPrice(price) {
        switch (this.currentCurrency) {
            case 'USD':
                return `$${price.toFixed(2)}`;
            case 'THB':
                return `฿${Math.round(price).toLocaleString()}`;
            case 'MMK':
                return `K${Math.round(price).toLocaleString()}`;
            default:
                return `$${price.toFixed(2)}`;
        }
    }

    updateCurrencyPreview() {
        const previewElement = document.getElementById('currencyPreview');
        if (previewElement) {
            const basePrice = 10; // Example price in USD
            const convertedPrice = this.convertPrice(basePrice);
            const formattedPrice = this.formatPrice(convertedPrice);
            previewElement.textContent = this.getTranslation('currency_preview').replace('$10.00', formattedPrice);
        }
    }

    updateMetaTags() {
        // Update meta description and keywords based on language
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        
        if (metaDescription) {
            metaDescription.content = this.getTranslation('meta_description');
        }
        if (metaKeywords) {
            metaKeywords.content = this.getTranslation('meta_keywords');
        }
    }

    updateLanguagePreview() {
        const previewElement = document.getElementById('languagePreview');
        if (previewElement) {
            previewElement.textContent = this.getTranslation('preview_text');
        }
    }

    getTranslation(key) {
        return translations[this.currentLanguage]?.[key] || key;
    }

    // Helper method to translate text programmatically
    translate(key) {
        return this.getTranslation(key);
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    window.languageManager.init();
}); 
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

    // Order Modal Functionality
    const modal = document.getElementById('orderModal');
    const closeBtn = document.querySelector('.close-modal');
    const orderButtons = document.querySelectorAll('.order-button');
    const orderForm = document.getElementById('orderForm');
    const quantityInput = document.getElementById('orderQuantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    
    // Product elements in modal
    const productImage = document.getElementById('modalProductImage');
    const productName = document.getElementById('modalProductName');
    const productDescription = document.getElementById('modalProductDescription');
    const productPrice = document.getElementById('modalProductPrice');
    
    // Order summary elements
    const subtotalElement = document.getElementById('orderSubtotal');
    const taxElement = document.getElementById('orderTax');
    const totalElement = document.getElementById('orderTotal');
    
    // Open modal when order button is clicked
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details from the parent signature-item
            const signatureItem = this.closest('.signature-item');
            const productImg = signatureItem.querySelector('.signature-image');
            const productTitle = signatureItem.querySelector('.signature-title');
            const productDesc = signatureItem.querySelector('.signature-description');
            const priceElement = signatureItem.querySelector('.signature-price');
            
            // Get the base price (in USD) from the data-price attribute
            const basePrice = parseFloat(priceElement.getAttribute('data-price') || priceElement.textContent.replace(/[^0-9.]/g, ''));
            
            // Set modal content
            productImage.src = productImg.src;
            productImage.alt = productImg.alt;
            productName.textContent = productTitle.textContent;
            productDescription.textContent = productDesc.textContent;
            
            // Get current currency and format the display price
            const currentCurrency = localStorage.getItem('currency') || 'USD';
            const exchangeRates = {
                USD: 1,
                THB: 35.5,
                MMK: 2100
            };
            
            const rate = exchangeRates[currentCurrency];
            const convertedPrice = basePrice * rate;
            
            // Format the price display
            let currencySymbol;
            switch(currentCurrency) {
                case 'THB':
                    currencySymbol = '฿';
                    break;
                case 'MMK':
                    currencySymbol = 'K';
                    break;
                default:
                    currencySymbol = '$';
            }
            
            const formattedPrice = currentCurrency === 'MMK' 
                ? Math.round(convertedPrice).toLocaleString()
                : convertedPrice.toFixed(2);
                
            productPrice.textContent = `${currencySymbol}${formattedPrice}`;
            
            // Reset form
            orderForm.reset();
            quantityInput.value = 1;
            
            // Update order summary with the base price in USD
            updateOrderSummary(basePrice);
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when close button is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle quantity buttons
    decreaseBtn.addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateOrderSummary();
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        if (quantityInput.value < 10) {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateOrderSummary();
        }
    });
    
    // Update quantity when manually changed
    quantityInput.addEventListener('change', function() {
        if (this.value < 1) this.value = 1;
        if (this.value > 10) this.value = 10;
        updateOrderSummary();
    });
    
    // Update order summary when quantity changes
    function updateOrderSummary(price) {
        const quantity = parseInt(quantityInput.value);
        let basePrice;
        
        if (price) {
            // Store the base price in USD for future calculations
            basePrice = price;
            // Store it in the product price element's data attribute
            productPrice.setAttribute('data-base-price', price);
        } else {
            // Get the stored base price in USD
            basePrice = parseFloat(productPrice.getAttribute('data-base-price'));
            if (!basePrice) {
                // Fallback to parsing the displayed price if no base price is stored
                const priceText = productPrice.textContent;
                basePrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            }
        }

        // Get current currency from localStorage or default to USD
        const currentCurrency = localStorage.getItem('currency') || 'USD';
        const exchangeRates = {
            USD: 1,
            THB: 35.5,  // 1 USD = 35.5 THB
            MMK: 2100   // 1 USD = 2100 MMK
        };

        // Calculate in USD first
        const subtotalUSD = basePrice * quantity;
        const taxUSD = subtotalUSD * 0.08; // 8% tax
        const totalUSD = subtotalUSD + taxUSD;

        // Convert to selected currency
        const rate = exchangeRates[currentCurrency];
        const subtotal = subtotalUSD * rate;
        const tax = taxUSD * rate;
        const total = totalUSD * rate;

        // Format currency symbol
        let currencySymbol;
        switch(currentCurrency) {
            case 'THB':
                currencySymbol = '฿';
                break;
            case 'MMK':
                currencySymbol = 'K';
                break;
            default:
                currencySymbol = '$';
        }

        // Format numbers based on currency
        const formatNumber = (num) => {
            if (currentCurrency === 'MMK') {
                return Math.round(num).toLocaleString(); // No decimals for MMK
            }
            return num.toFixed(2);
        };

        // Update display
        subtotalElement.textContent = `${currencySymbol}${formatNumber(subtotal)}`;
        taxElement.textContent = `${currencySymbol}${formatNumber(tax)}`;
        totalElement.textContent = `${currencySymbol}${formatNumber(total)}`;
    }
    
    // Function to generate a random waiting token
    function generateWaitingToken() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let token = '';
        
        // Add two random letters
        for (let i = 0; i < 2; i++) {
            token += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        // Add a hyphen
        token += '-';
        
        // Add three random numbers
        for (let i = 0; i < 3; i++) {
            token += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        
        return token;
    }
    
    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('customerEmail').value;
        const phone = document.getElementById('customerPhone').value;
        const quantity = document.getElementById('orderQuantity').value;
        const notes = document.getElementById('orderNotes').value;
        const pickupTime = document.getElementById('pickupTime').value;
        
        // Generate waiting token
        const waitingToken = generateWaitingToken();
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        const modalBody = document.querySelector('.modal-body');
        const formContent = orderForm.innerHTML;
        
        orderForm.innerHTML = `
            <div class="order-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-content">
                    <h3>Order Placed Successfully!</h3>
                    <div class="order-details">
                        <p class="customer-name">Thank you, ${name}!</p>
                        <p class="order-item">Your order for ${quantity} ${productName.textContent} has been received.</p>
                        <p class="confirmation">We'll send a confirmation to ${email} shortly.</p>
                        <p class="pickup-time">Pickup time: ${pickupTime === 'asap' ? 'As Soon As Possible' : pickupTime}</p>
                    </div>
                    <div class="waiting-token">
                        <div class="token-container">
                            <span class="token-label">Your Waiting Token</span>
                            <span class="token-number">${waitingToken}</span>
                            <span class="token-instruction">Please show this token number when picking up your order</span>
                        </div>
                    </div>
                </div>
                <button class="close-success-btn">Close</button>
            </div>
        `;
        
        // Add event listener to the close button
        document.querySelector('.close-success-btn').addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            // Reset the form for next time
            setTimeout(() => {
                orderForm.innerHTML = formContent;
                // Re-attach event listeners
                attachFormEventListeners();
            }, 300);
        });
    });
    
    // Function to re-attach event listeners after form reset
    function attachFormEventListeners() {
        const quantityInput = document.getElementById('orderQuantity');
        const decreaseBtn = document.getElementById('decreaseQuantity');
        const increaseBtn = document.getElementById('increaseQuantity');
        
        decreaseBtn.addEventListener('click', function() {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateOrderSummary();
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            if (quantityInput.value < 10) {
                quantityInput.value = parseInt(quantityInput.value) + 1;
                updateOrderSummary();
            }
        });
        
        quantityInput.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            if (this.value > 10) this.value = 10;
            updateOrderSummary();
        });
        
        // Re-attach form submission handler
        document.getElementById('orderForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // ... (same submission code as above)
        });
    }
}); 
// Security Configuration
const securityConfig = {
    // CSRF Protection
    csrf: {
        enabled: true,
        tokenLength: 32,
        headerName: 'X-CSRF-Token',
        cookieName: 'csrf-token'
    },

    // Rate Limiting
    rateLimit: {
        enabled: true,
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
        message: 'Too many requests from this IP, please try again later.'
    },

    // Input Validation
    validation: {
        sanitizeInput: true,
        maxLength: {
            name: 100,
            email: 254,
            message: 1000,
            phone: 20
        },
        allowedTags: [], // No HTML tags allowed
        allowedAttributes: {} // No attributes allowed
    },

    // Secure Headers
    headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
    }
};

// Export the configuration
export default securityConfig; 
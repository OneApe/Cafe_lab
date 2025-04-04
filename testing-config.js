// Testing Configuration
const testingConfig = {
    // Cross-browser Testing
    browsers: {
        chrome: {
            enabled: true,
            versions: ['latest', 'latest-1']
        },
        firefox: {
            enabled: true,
            versions: ['latest', 'latest-1']
        },
        safari: {
            enabled: true,
            versions: ['latest', 'latest-1']
        },
        edge: {
            enabled: true,
            versions: ['latest', 'latest-1']
        }
    },

    // Mobile Responsiveness Testing
    mobile: {
        devices: [
            {
                name: 'iPhone 12',
                width: 390,
                height: 844,
                deviceScaleFactor: 3,
                userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
            },
            {
                name: 'Samsung Galaxy S21',
                width: 360,
                height: 800,
                deviceScaleFactor: 3,
                userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Mobile Safari/537.36'
            },
            {
                name: 'iPad Pro',
                width: 1024,
                height: 1366,
                deviceScaleFactor: 2,
                userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
            }
        ],
        orientations: ['portrait', 'landscape']
    },

    // Form Validation Testing
    forms: {
        contact: {
            required: ['name', 'email', 'message'],
            email: ['email'],
            phone: ['phone'],
            maxLength: {
                name: 100,
                email: 254,
                message: 1000,
                phone: 20
            }
        },
        reservation: {
            required: ['name', 'email', 'date', 'time', 'guests'],
            email: ['email'],
            phone: ['phone'],
            date: ['date'],
            time: ['time'],
            number: ['guests']
        },
        membership: {
            required: ['name', 'email', 'password', 'phone'],
            email: ['email'],
            phone: ['phone'],
            password: ['password']
        }
    },

    // Performance Testing
    performance: {
        metrics: {
            firstContentfulPaint: 2000, // ms
            largestContentfulPaint: 2500, // ms
            firstInputDelay: 100, // ms
            cumulativeLayoutShift: 0.1,
            speedIndex: 3000 // ms
        },
        budgets: {
            js: {
                initial: '200kb',
                async: '100kb'
            },
            css: {
                initial: '50kb'
            },
            image: {
                maxSize: '200kb',
                formats: ['webp', 'jpg', 'png']
            }
        },
        thresholds: {
            loadTime: 3000, // ms
            timeToInteractive: 3500, // ms
            domContentLoaded: 2000 // ms
        }
    },

    // Security Testing
    security: {
        headers: {
            required: [
                'X-Frame-Options',
                'X-Content-Type-Options',
                'X-XSS-Protection',
                'Strict-Transport-Security',
                'Content-Security-Policy'
            ],
            values: {
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'X-XSS-Protection': '1; mode=block',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
            }
        },
        vulnerabilities: {
            xss: true,
            csrf: true,
            sqlInjection: true,
            fileUpload: true,
            authentication: true
        },
        ssl: {
            required: true,
            minVersion: 'TLSv1.2',
            ciphers: [
                'ECDHE-ECDSA-AES128-GCM-SHA256',
                'ECDHE-RSA-AES128-GCM-SHA256',
                'ECDHE-ECDSA-AES256-GCM-SHA384',
                'ECDHE-RSA-AES256-GCM-SHA384'
            ]
        }
    }
};

// Export the configuration
export default testingConfig; 
// Performance Configuration
const performanceConfig = {
    // Image Optimization
    images: {
        lazyLoading: true,
        compression: {
            enabled: true,
            quality: 80,
            maxWidth: 1920,
            maxHeight: 1080
        },
        formats: ['webp', 'jpg', 'png'],
        placeholder: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    },

    // CDN Configuration
    cdn: {
        enabled: true,
        baseUrl: 'https://cdn.cafe-lab.com',
        paths: {
            images: '/images',
            styles: '/css',
            scripts: '/js',
            fonts: '/fonts'
        }
    },

    // Cache Configuration
    cache: {
        enabled: true,
        maxAge: 31536000, // 1 year in seconds
        static: {
            css: true,
            js: true,
            images: true,
            fonts: true
        },
        headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Expires': new Date(Date.now() + 31536000000).toUTCString()
        }
    },

    // Resource Minification
    minification: {
        enabled: true,
        css: true,
        js: true,
        html: true
    }
};

// Export the configuration
export default performanceConfig; 
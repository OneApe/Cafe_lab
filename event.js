document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.nav-menu')) {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Get all "Book Now" buttons
    const bookButtons = document.querySelectorAll('.event-button');
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const cancelButton = document.querySelector('.cancel-button');
    const submitButton = document.querySelector('.submit-button');
    const bookingForm = document.querySelector('.booking-form');
    const successMessage = document.querySelector('.booking-success');
    const successButton = document.querySelector('.booking-success-button');

    // Function to open modal
    function openModal(eventTitle, eventDate, eventTime) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update event info in modal
        const eventInfoTitle = document.querySelector('.booking-event-info h3');
        const eventInfoDate = document.querySelector('.booking-event-info p:nth-child(2)');
        const eventInfoTime = document.querySelector('.booking-event-info p:nth-child(3)');
        
        eventInfoTitle.textContent = eventTitle;
        eventInfoDate.innerHTML = `Date: <span>${eventDate}</span>`;
        eventInfoTime.innerHTML = `Time: <span>${eventTime}</span>`;
    }

    // Function to close modal
    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetForm();
    }

    // Function to reset form
    function resetForm() {
        bookingForm.reset();
        bookingForm.style.display = 'flex';
        successMessage.style.display = 'none';
    }

    // Add click event to all "Book Now" buttons
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventDate = eventCard.querySelector('.event-date').textContent;
            const eventTime = eventCard.querySelector('.event-time').textContent;
            openModal(eventTitle, eventDate, eventTime);
        });
    });

    // Close modal when clicking close button
    closeModal.addEventListener('click', closeModalHandler);

    // Close modal when clicking cancel button
    cancelButton.addEventListener('click', closeModalHandler);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Handle form submission
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            guests: document.getElementById('guests').value,
            requests: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.guests) {
            alert('Please fill in all required fields');
            return;
        }

        // Here you would typically send the data to a server
        // For now, we'll just show the success message
        bookingForm.style.display = 'none';
        successMessage.style.display = 'block';
    });

    // Handle success message button click
    successButton.addEventListener('click', closeModalHandler);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Activity Details Data
    const activityDetails = {
        'Coffee Tasting Workshop': {
            day: 'Every Monday',
            time: '6:00 PM - 7:30 PM',
            image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Immerse yourself in the world of coffee through our expert-led tasting sessions. Learn about different coffee origins, roasting techniques, and brewing methods. Our coffee masters will guide you through a sensory journey, helping you identify unique flavor profiles and characteristics of various coffee beans.',
            features: [
                'Professional coffee tasting equipment provided',
                'Sample 5 different coffee varieties',
                'Learn proper cupping techniques',
                'Take-home coffee guide included',
                'Complimentary coffee beans sample'
            ],
            funFact: 'Did you know? The world\'s most expensive coffee, Kopi Luwak, can cost up to $600 per pound! While we don\'t serve it, we\'ll teach you what makes certain coffees so special.'
        },
        'Literary Café': {
            day: 'Every Tuesday',
            time: '7:00 PM - 9:00 PM',
            image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Join our vibrant community of book lovers for engaging discussions about contemporary and classic literature. Each session focuses on a different book or theme, allowing participants to share their perspectives and discover new literary gems.',
            features: [
                'Monthly book selection announced in advance',
                'Discussion guides provided',
                'Author meet-and-greets (special events)',
                'Book exchange corner',
                'Complimentary coffee during discussions'
            ],
            funFact: 'Reading in a café has been a tradition since the 17th century, when coffeehouses were known as "penny universities" because for the price of a cup of coffee, you could engage in intellectual discussions.'
        },
        'Open Mic Night': {
            day: 'Every Wednesday',
            time: '8:00 PM - 11:00 PM',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Experience the raw talent of our local artists in this weekly showcase of music, poetry, comedy, and more. Whether you\'re a performer or an audience member, you\'ll be part of an unforgettable evening of creative expression.',
            features: [
                'Professional sound system',
                '5-minute performance slots',
                'Sign-up opens 30 minutes before start',
                'All genres welcome',
                'Special guest performances monthly'
            ],
            funFact: 'The term "open mic" originated in the 1940s when performers would literally share a single microphone in jazz clubs. Today, we maintain that spirit of community while providing modern equipment.'
        },
        'Creative Corner': {
            day: 'Every Thursday',
            time: '5:00 PM - 7:00 PM',
            image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Unleash your creativity in our weekly art workshops. From painting to pottery, explore different artistic mediums under the guidance of experienced instructors. All skill levels are welcome in this supportive environment.',
            features: [
                'All art supplies provided',
                'Expert instruction',
                'Different theme each week',
                'Take-home creations',
                'Group exhibitions monthly'
            ],
            funFact: 'Creating art in a café setting can enhance creativity by up to 37% due to the combination of ambient noise and caffeine, according to recent studies.'
        },
        'Pool & Snooker Club': {
            day: 'Every Friday',
            time: '5:00 PM - 8:00 PM',
            image: 'https://dubaisnooker.ae/wp-content/uploads/2023/05/WhatsApp-Image-2023-05-30-at-12.03.02.jpeg',
            description: 'Step into our premium pool and snooker room for an evening of friendly competition and skill development. Our professional-grade tables and expert guidance create the perfect environment for both beginners and experienced players.',
            features: [
                'Professional pool and snooker tables',
                'Weekly tournaments with prizes',
                'Free coaching sessions',
                'Special member discounts',
                'Complimentary refreshments during games'
            ],
            funFact: 'Did you know? The game of snooker was invented in 1875 by British Army officers stationed in India. The name comes from the slang term for a first-year cadet, which was "snooker."'
        },
        'Game Night': {
            day: 'Every Saturday',
            time: '6:00 PM - 10:00 PM',
            image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            description: 'Gather your friends for an evening of board games, card games, and trivia. Our game night features a wide selection of games for all ages and interests, creating the perfect setting for social interaction and fun.',
            features: [
                'Extensive game library',
                'Tournament-style competitions',
                'Team-based games',
                'Special drink offers',
                'Weekly prizes for winners'
            ],
            funFact: 'The oldest known board game, Senet, was played in ancient Egypt over 5,000 years ago. Today, we continue that tradition of bringing people together through games.'
        }
    };

    // Modal Elements
    const activityModal = document.getElementById('activityModal');
    const activityCloseModal = document.querySelector('.close-modal');
    const activityModalTitle = document.getElementById('modalActivityTitle');
    const activityModalDay = document.getElementById('modalActivityDay');
    const activityModalTime = document.getElementById('modalActivityTime');
    const activityModalImage = document.getElementById('modalActivityImage');
    const activityModalDescription = document.getElementById('modalActivityDescription');
    const activityModalFeatures = document.getElementById('modalActivityFeatures');
    const activityModalFunFact = document.getElementById('modalActivityFunFact');

    // Add click event to all "Learn More" links
    document.querySelectorAll('.activity-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const activityTitle = link.closest('.activity-content').querySelector('.activity-title').textContent;
            showActivityDetails(activityTitle);
        });
    });

    // Function to show activity details in modal
    function showActivityDetails(activityTitle) {
        const details = activityDetails[activityTitle];
        
        activityModalTitle.textContent = activityTitle;
        activityModalDay.innerHTML = `<i class="fas fa-calendar"></i> ${details.day}`;
        activityModalTime.innerHTML = `<i class="fas fa-clock"></i> ${details.time}`;
        activityModalImage.src = details.image;
        activityModalDescription.textContent = details.description;
        
        // Clear and populate features
        activityModalFeatures.innerHTML = '';
        details.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            activityModalFeatures.appendChild(li);
        });
        
        activityModalFunFact.textContent = details.funFact;
        
        // Show modal
        activityModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal when clicking the close button
    activityCloseModal.addEventListener('click', () => {
        activityModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === activityModal) {
            activityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activityModal.style.display === 'block') {
            activityModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 
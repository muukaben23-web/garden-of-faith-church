// JavaScript for Garden of Faith Church Website - Interactive Version

document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const nextSunday = new Date(now);
        nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7 || 7));
        nextSunday.setHours(8, 0, 0, 0);
        
        const timeUntilSunday = nextSunday - now;
        
        if (timeUntilSunday > 0) {
            const days = Math.floor(timeUntilSunday / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeUntilSunday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeUntilSunday % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeUntilSunday % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Gallery item click handler
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.category;
            showNotification(`Viewing ${category} gallery`, 'info');
        });
    });
    
    // Prayer Wall
    const prayerForm = document.getElementById('prayer-form');
    const prayerList = document.getElementById('prayer-list');
    
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('prayer-name').value || 'Anonymous';
            const request = document.getElementById('prayer-request').value;
            
            if (request) {
                addPrayerRequest(name, request);
                prayerForm.reset();
                showNotification('Prayer request added successfully!', 'success');
            }
        });
    }
    
    function addPrayerRequest(name, request) {
        const prayerItem = document.createElement('div');
        prayerItem.className = 'prayer-item';
        prayerItem.innerHTML = `
            <div class="prayer-header">
                <span class="prayer-name">${name}</span>
                <span class="prayer-time">Just now</span>
            </div>
            <p class="prayer-text">${request}</p>
            <div class="prayer-actions">
                <button class="pray-btn"><i class="fas fa-pray"></i> <span class="pray-count">0</span> Praying</button>
            </div>
        `;
        
        prayerList.insertBefore(prayerItem, prayerList.firstChild);
        
        // Add pray button functionality
        const prayBtn = prayerItem.querySelector('.pray-btn');
        prayBtn.addEventListener('click', function() {
            const countSpan = this.querySelector('.pray-count');
            let count = parseInt(countSpan.textContent);
            
            if (this.classList.contains('praying')) {
                count--;
                this.classList.remove('praying');
            } else {
                count++;
                this.classList.add('praying');
            }
            
            countSpan.textContent = count;
        });
    }
    
    // Service Reminder Buttons
    const reminderBtns = document.querySelectorAll('.reminder-btn');
    
    reminderBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const service = this.dataset.service;
            
            if (this.classList.contains('set')) {
                this.classList.remove('set');
                this.textContent = 'Set Reminder';
                showNotification('Reminder removed', 'info');
            } else {
                this.classList.add('set');
                this.textContent = 'Reminder Set ✓';
                
                const serviceNames = {
                    'sunday': 'Sunday Service',
                    'bible': 'Bible Study',
                    'women': 'Women\'s Fellowship',
                    'discipleship': 'Discipleship Class',
                    'youth': 'Youth Fellowship',
                    'praise': 'Praise Rehearsals'
                };
                
                showNotification(`Reminder set for ${serviceNames[service]}`, 'success');
            }
        });
    });
    
    // Initialize existing pray buttons
    const existingPrayBtns = document.querySelectorAll('.pray-btn');
    existingPrayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const countSpan = this.querySelector('.pray-count');
            let count = parseInt(countSpan.textContent);
            
            if (this.classList.contains('praying')) {
                count--;
                this.classList.remove('praying');
            } else {
                count++;
                this.classList.add('praying');
            }
            
            countSpan.textContent = count;
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Interactive card hover effects
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                this.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }

    // Add animation to service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #e7f3ff !important;
        font-weight: 600;
    }
    
    .nav-link.active::after {
        width: 80%;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;
document.head.appendChild(style);

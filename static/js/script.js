// Custom JavaScript for Mohamed Iqhlas Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initSkillBars();
    initContactForm();
    initThemeToggle();
    initNavbarScroll();
    initAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Animate skill progress bars
function initSkillBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    // Function to animate a single progress bar
    function animateProgressBar(bar) {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth + '%';
    }
    
    // Intersection Observer to trigger animations when bars come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar && !progressBar.style.width) {
                    setTimeout(() => {
                        animateProgressBar(progressBar);
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe all skill categories
    document.querySelectorAll('.skill-category').forEach(category => {
        observer.observe(category);
    });
}

// Handle contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner"></span>Sending...';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(this);
                
                const response = await fetch('/contact', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showAlert('success', result.message);
                    this.reset();
                } else {
                    showAlert('danger', result.message);
                }
            } catch (error) {
                console.error('Contact form error:', error);
                showAlert('danger', 'An error occurred while sending your message. Please try again.');
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Show alert messages
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert-message');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-message`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '100px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('button[onclick="toggleTheme()"]');
    const themeIcon = document.getElementById('theme-icon');
    
    // Get saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme);
    
    // Make toggleTheme function global
    window.toggleTheme = function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    };
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Initialize scroll animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle navbar active state based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll listener for active nav links
window.addEventListener('scroll', debounce(updateActiveNavLink, 100));

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .navbar-scrolled {
        background-color: rgba(26, 26, 26, 0.95) !important;
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Handle form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name').trim()) {
        errors.push('Name is required');
    }
    
    if (!formData.get('email').trim()) {
        errors.push('Email is required');
    } else if (!validateEmail(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('message').trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

// Add loading state to buttons
function setButtonLoading(button, loading = true) {
    if (loading) {
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = '<span class="spinner"></span>Loading...';
        button.disabled = true;
    } else {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
    }
}

// Initialize tooltips if Bootstrap is available
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Add copy to clipboard functionality for contact info
function initCopyToClipboard() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            navigator.clipboard.writeText(email).then(() => {
                showAlert('success', 'Email address copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showAlert('success', 'Email address copied to clipboard!');
            });
        });
    });
}

// Initialize copy to clipboard functionality
document.addEventListener('DOMContentLoaded', initCopyToClipboard);

// Add smooth reveal animation for elements
function addRevealAnimation() {
    const revealElements = document.querySelectorAll('.hero-section, .stats-container');
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    setTimeout(() => {
        revealElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 100);
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', addRevealAnimation);

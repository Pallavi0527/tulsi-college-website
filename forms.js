// Forms JavaScript

// Admission Form Validation
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateAdmissionForm()) {
            // Form is valid, show success message
            showSuccessMessage('admissionForm', 'Thank you! Your application has been submitted successfully. We will contact you soon.');
            admissionForm.reset();
        }
    });
}

function validateAdmissionForm() {
    let isValid = true;
    
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const course = document.getElementById('course');
    const category = document.getElementById('category');
    const address = document.getElementById('address');
    const board = document.getElementById('board');
    const percentage = document.getElementById('percentage');
    const terms = document.getElementById('terms');
    
    // Validate Full Name
    if (!fullName.value.trim()) {
        showError(fullName, 'Full name is required');
        isValid = false;
    } else {
        clearError(fullName);
    }
    
    // Validate Email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Validate Phone
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid 10-digit phone number');
        isValid = false;
    } else {
        clearError(phone);
    }
    
    // Validate Course
    if (!course.value) {
        showError(course, 'Please select a course');
        isValid = false;
    } else {
        clearError(course);
    }
    
    // Validate Category
    if (!category.value) {
        showError(category, 'Please select a category');
        isValid = false;
    } else {
        clearError(category);
    }
    
    // Validate Address
    if (!address.value.trim()) {
        showError(address, 'Address is required');
        isValid = false;
    } else {
        clearError(address);
    }
    
    // Validate Board
    if (!board.value.trim()) {
        showError(board, 'Board name is required');
        isValid = false;
    } else {
        clearError(board);
    }
    
    // Validate Percentage
    if (!percentage.value) {
        showError(percentage, 'Percentage is required');
        isValid = false;
    } else if (percentage.value < 0 || percentage.value > 100) {
        showError(percentage, 'Please enter a valid percentage (0-100)');
        isValid = false;
    } else {
        clearError(percentage);
    }
    
    // Validate Terms
    if (!terms.checked) {
        showError(terms, 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearError(terms);
    }
    
    return isValid;
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateContactForm()) {
            // Form is valid, show success message
            showSuccessMessage('contactForm', 'Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        }
    });
}

function validateContactForm() {
    let isValid = true;
    
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const phone = document.getElementById('contactPhone');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    
    // Validate Name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else {
        clearError(name);
    }
    
    // Validate Email
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Validate Phone
    if (!phone.value.trim()) {
        showError(phone, 'Phone number is required');
        isValid = false;
    } else if (!validatePhone(phone.value)) {
        showError(phone, 'Please enter a valid 10-digit phone number');
        isValid = false;
    } else {
        clearError(phone);
    }
    
    // Validate Subject
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    } else {
        clearError(subject);
    }
    
    // Validate Message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearError(message);
    }
    
    return isValid;
}

// Real-time validation
document.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => {
        // Clear error on blur if field is valid
        if (field.value.trim()) {
            clearError(field);
        }
    });
});

function showSuccessMessage(formId, message) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Remove existing success message
    const existingMessage = form.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = 'background: #2ecc71; color: white; padding: 1rem; border-radius: 5px; margin-bottom: 1rem; text-align: center;';
    successDiv.textContent = message;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to top of form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}


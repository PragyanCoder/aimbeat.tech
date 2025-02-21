// Form validation for authentication
const validateAuthForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        const value = input.value.trim();
        
        switch(input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showError(input, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
            
            case 'password':
                if (value.length < 8) {
                    showError(input, 'Password must be at least 8 characters');
                    isValid = false;
                }
                break;
                
            case 'text':
                if (value.length < 3) {
                    showError(input, 'This field is required');
                    isValid = false;
                }
                break;
        }
    });

    return isValid;
};

const showError = (input, message) => {
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
    } else {
        const div = document.createElement('div');
        div.className = 'error-message';
        div.textContent = message;
        input.parentElement.appendChild(div);
    }
    input.classList.add('error');
};

const clearErrors = () => {
    document.querySelectorAll('.error-message').forEach(err => err.remove());
    document.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
};

// Initialize auth forms
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            clearErrors();
            if (!validateAuthForm('login-form')) {
                e.preventDefault();
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            clearErrors();
            if (!validateAuthForm('signup-form')) {
                e.preventDefault();
            }
        });
    }

    // Password visibility toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            toggle.classList.toggle('show');
        });
    });
});

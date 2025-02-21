// Enhanced Spotlight effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.documentElement.style.setProperty('--x', e.clientX + 'px');
    document.documentElement.style.setProperty('--y', e.clientY + 'px');

    // Dynamic spotlight size based on movement speed
    const speed = Math.sqrt(Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2));
    const size = Math.min(600, 200 + speed * 2);
    document.documentElement.style.setProperty('--spotlight-size', size + 'px');
});

// Enhanced Stats counter animation
const statsSection = document.querySelector('.stats');
const numbers = document.querySelectorAll('.stat-number');
let animated = false;

function animateNumbers() {
    numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const updateNumber = () => {
            step++;
            current = Math.min(target, Math.floor(increment * step));

            // Add plus sign for numbers over 100
            num.textContent = current > 100 ? current + '+' : current;

            if (step < steps) {
                setTimeout(updateNumber, stepDuration);
            }
        };

        updateNumber();
    });
}

// Improved intersection observer for stats
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateNumbers();
            animated = true;

            // Add sequential fade-in animation to stat cards
            const statCards = document.querySelectorAll('.stat-card');
            statCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 200);
            });
        }
    });
}, {
    threshold: 0.5
});

if (statsSection) {
    observer.observe(statsSection);
}

// Enhanced smooth scroll with progress indicator
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
window.addEventListener('scroll', () => {
    serviceCards.forEach(card => {
        const speed = 0.2;
        const rect = card.getBoundingClientRect();
        const scrolled = window.scrollY;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = -(rect.top - window.innerHeight) * speed;
            card.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Enhanced page transition
window.addEventListener('pageshow', () => {
    document.body.classList.add('fade-in');
});

// Add hover effect to service icons
document.querySelectorAll('.service-card i').forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });

    icon.addEventListener('mouseout', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});
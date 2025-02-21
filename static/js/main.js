// Enhanced cyber attack map simulation
const createCyberMap = () => {
    const mapElement = document.querySelector('.cyber-map');
    if (!mapElement) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(width, height);
    mapElement.appendChild(renderer.domElement);

    // Create globe
    const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    camera.position.z = 10;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.002;
        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
};

// Navbar scroll behavior with full scroll detection
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 50;
let isFullyScrolled = true;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Check if we're at the very top
    if (currentScroll <= 0) {
        isFullyScrolled = true;
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
        return;
    }

    // Hide navbar when scrolling down
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        isFullyScrolled = false;
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } 
    // Show navbar only when scrolling up significantly
    else if (currentScroll < lastScroll - 20) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }

    lastScroll = currentScroll;
});

// Form validation with improved error handling
const validateForm = (form) => {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });

    return isValid;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createCyberMap();
    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
                alert('Please fill all required fields correctly.');
            }
        });
    });

    // Smooth scroll behavior
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
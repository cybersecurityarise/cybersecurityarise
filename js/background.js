// Create particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particlesContainer.appendChild(particle);
    }
}

// Create cyber lines
function createCyberLines() {
    const linesContainer = document.querySelector('.cyber-lines');
    const lineCount = 20;

    for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = 'cyber-line';
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${Math.random() * 8}s`;
        linesContainer.appendChild(line);
    }
}

// Create matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.textContent = '10'.repeat(50).split('').join('\n');
        matrixContainer.appendChild(column);
    }
}

// Initialize background effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createCyberLines();
    createMatrixRain();
});

// Performance optimization
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.cyber-grid').style.transform = 
        `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.1}px)`;
});

// Disable animations if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
}

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to generate random numbers within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a firework
function createFirework(x, y) {
    const particles = [];

    for (let i = 0; i < 100; i++) { // Increase the number of particles for a bigger effect
        const angle = random(0, Math.PI * 2);
        const speed = random(5, 15); // Increase the speed for a more dynamic effect
        const radius = random(3, 5); // Increase the radius for larger particles
        const color = `hsl(${random(0, 360)}, 100%, 50%)`;

        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius,
            color,
            alpha: 1,
            gravity: 0.2,
        });
    }

    fireworks.push(particles);
}

const fireworks = [];

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        const particles = fireworks[i];

        for (let j = 0; j < particles.length; j++) {
            const particle = particles[j];

            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += particle.gravity;
            particle.alpha -= 0.02;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.globalAlpha = particle.alpha;
            ctx.fill();
            ctx.closePath();
        }

        fireworks[i] = particles.filter((particle) => particle.alpha > 0.02);

        if (fireworks[i].length === 0) {
            fireworks.splice(i, 1);
        }
    }
}

function animate() {
    createFirework(canvas.width / 2, canvas.height);
    update();
    requestAnimationFrame(animate);
}

canvas.addEventListener("click", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    createFirework(mouseX, mouseY);
});

animate();

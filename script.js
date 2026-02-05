document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const startScreen = document.getElementById('start-screen');
    const countdownScreen = document.getElementById('countdown-screen');
    const celebrationScreen = document.getElementById('celebration-screen');
    const countdownNumber = document.getElementById('countdown-number');
    const audio = document.getElementById('birthday-audio');
    const countdownAudio = document.getElementById('countdown-audio');
    const balloonsContainer = document.getElementById('balloons-container');

    const nicknames = [
        "தங்க பூவே", "Milk யே", "கரும்பே", "நெல்லை தமிழே", "ராசாத்தி யே",
        "பிரசாதமே", "Eden தோட்டத்து பூவே", "Cocaine யே", "கவிதையே", "கண்ணே",
        "பஞ்சவர்ணமே", "Cinnamon Girl யே", "பூங்கொத்தே", "பொன் சிரிப்பே", "நடன மங்கையே",
        "சந்தனமே", "வெண்புறாவே", "விண்மீனே", "வானவில்லே", "வைகையே",
        "தாமிர பரணியே", "மீனாட்சியே", "மேரியே", "கற்கண்டே", "சக்கரை கட்டியே",
        "பனித்துளியே", "இளவேனிலே", "மதுரை மல்லியே", "மெழுகுவர்த்தியே", "மார்கழியே"
    ];

    const gradients = [
        "linear-gradient(45deg, #FF9A9E 0%, #FAD0C4 99%, #FAD0C4 100%)",
        "linear-gradient(to top, #A18CD1 0%, #FBC2EB 100%)",
        "linear-gradient(to top, #FAD0C4 0%, #FFD1FF 100%)",
        "linear-gradient(to right, #FFECD2 0%, #FCB69F 100%)",
        "linear-gradient(to right, #FF8177 0%, #FF867A 0%, #FF8C7F 21%, #F99185 52%, #CF5563 78%, #B12A5B 100%)",
        "linear-gradient(to top, #30CFD0 0%, #330867 100%)",
        "linear-gradient(120deg, #D4FC79 0%, #96E6A1 100%)",
        "linear-gradient(120deg, #84FAB0 0%, #8FD3F4 100%)",
        "linear-gradient(to top, #E6E9F0 0%, #EEF1F5 100%)",
        "linear-gradient(to top, #A8EDEA 0%, #FED6E3 100%)",
        "linear-gradient(to top, #5F72BD 0%, #9B23EA 100%)",
        "linear-gradient(to top, #FF0844 0%, #FFB199 100%)",
        "linear-gradient(to top, #4481EB 0%, #04BEFE 100%)",
        "linear-gradient(to top, #D299C2 0%, #FEF9D7 100%)",
        "linear-gradient(to top, #E14FAD 0%, #F9D423 100%)",
        "linear-gradient(to top, #F093FB 0%, #F5576C 100%)",
        "linear-gradient(to right, #4FACFE 0%, #00F2FE 100%)",
        "linear-gradient(to top, #43E97B 0%, #38F9D7 100%)",
        "linear-gradient(45deg, #FA709A 0%, #FEE140 100%)",
        "linear-gradient(to top, #FFF1EB 0%, #ACE0F9 100%)"
    ];

    const nicknameEl = document.getElementById('nickname');

    let count = 1;
    let balloonInterval;

    startBtn.addEventListener('click', () => {
        // Unlock audio context and play countdown music
        countdownAudio.play().catch(e => console.log("Countdown music blocked"));

        // Prepare other audios
        audio.play().catch(e => console.log("Silent play birthday"));
        audio.pause();
        audio.currentTime = 0;

        // Switch screens
        startScreen.classList.remove('active');
        countdownScreen.classList.add('active');

        // Start countdown
        const timer = setInterval(() => {
            const currentName = nicknames[count - 1];

            // Update Number
            countdownNumber.textContent = count;

            // Update Name
            nicknameEl.textContent = currentName;

            // Apply unique gradient (loop colors if needed)
            const grad = gradients[(count - 1) % gradients.length];
            nicknameEl.style.background = grad;
            nicknameEl.style.webkitBackgroundClip = 'text';
            nicknameEl.style.backgroundClip = 'text';

            // Re-trigger animation
            nicknameEl.classList.remove('name-animate');
            void nicknameEl.offsetWidth; // Trigger reflow
            nicknameEl.classList.add('name-animate');

            if (count >= 30) {
                clearInterval(timer);
                triggerSplash();
            }
            count++;
        }, 750);
    });

    function triggerSplash() {
        const burstOverlay = document.getElementById('burst-overlay');
        const burstAudio = document.getElementById('burst-audio');

        // Stop countdown music
        countdownAudio.pause();
        countdownAudio.currentTime = 0;

        // Switch to celebration screen first (so image is behind splash)
        countdownScreen.classList.remove('active');
        celebrationScreen.classList.add('active');

        // Show overlay and play burst sound
        burstOverlay.classList.remove('burst-hidden');
        burstAudio.play().catch(e => console.log("Burst sound blocked"));

        // Create particles
        createParticles();

        // After 4 seconds (increased from 1.5), hide splash and start main celebration
        setTimeout(() => {
            burstOverlay.style.opacity = '0';
            setTimeout(() => {
                burstOverlay.classList.add('burst-hidden');
                startCelebration();
            }, 300);
        }, 4000);
    }

    function createParticles() {
        const container = document.getElementById('confetti-burst-container');
        // Diverse palette from the cake image
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

        for (let i = 0; i < 200; i++) {
            const p = document.createElement('div');
            p.classList.add('confetti-particle');

            // Random horizontal start
            const startX = Math.random() * 100;

            // Random physics
            const drift = (Math.random() - 0.5) * 400; // Left/Right drift
            const rotation = (Math.random() - 0.5) * 1000; // Multi-spin
            const duration = 2.5 + Math.random() * 2.5; // Falling speed
            const delay = Math.random() * 1.5; // Staggered start

            p.style.left = `${startX}%`;
            p.style.top = `-20px`; // Start just above view

            p.style.setProperty('--drift', `${drift}px`);
            p.style.setProperty('--rot', `${rotation}deg`);
            p.style.setProperty('--duration', `${duration}s`);
            p.style.setProperty('--delay', `${delay}s`);

            // Random size and color
            const size = 6 + Math.random() * 10;
            p.style.width = `${size}px`;
            p.style.height = `${size * (0.6 + Math.random() * 0.4)}px`;
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Random shape (square, small rectangle, circle)
            const shapeRand = Math.random();
            if (shapeRand > 0.8) p.style.borderRadius = '50%';
            else if (shapeRand > 0.5) p.style.borderRadius = '2px';

            container.appendChild(p);

            // Cleanup
            setTimeout(() => p.remove(), (duration + delay) * 1000);
        }
    }

    function startCelebration() {
        // Play main looping music
        audio.play().catch(e => console.error("Main audio failed:", e));

        // Start Balloons
        startBalloons();
    }

    function createBalloon() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('balloon-wrapper');

        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const knot = document.createElement('div');
        knot.classList.add('balloon-knot');

        const string = document.createElement('div');
        string.classList.add('balloon-string');

        // Random Position
        const left = Math.random() * 100;
        wrapper.style.left = `${left}%`;

        // Twitter-like Colors from screenshot
        const colors = [
            '#FFD700', // Gold/Yellow
            '#FF4081', // Pink/Red
            '#00E676', // Green/Teal
            '#2979FF', // Blue
            '#7C4DFF', // Purple
            '#FFA726'  // Orange
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = color;
        knot.style.backgroundColor = color;

        // Random Size scaling
        const scale = 0.5 + Math.random() * 0.7;
        wrapper.style.transform = `scale(${scale})`;

        // Random Animation Duration & Delay
        const duration = 5 + Math.random() * 5;
        wrapper.style.animationDuration = `${duration}s`;

        // Small random horizontal drift
        wrapper.style.setProperty('--drift', `${(Math.random() - 0.5) * 100}px`);

        wrapper.appendChild(balloon);
        wrapper.appendChild(knot);
        wrapper.appendChild(string);
        balloonsContainer.appendChild(wrapper);

        // Remove balloon after animation
        setTimeout(() => {
            wrapper.remove();
        }, duration * 1000);
    }

    function startBalloons() {
        // Create a balloon every 300ms
        balloonInterval = setInterval(createBalloon, 300);
    }
});

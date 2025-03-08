let step = -1;
let questions = [
    {
        question: "What's my favorite way to annoy you? 😈",
        correct: "Calling out your BIG forehead",
        options: ["Tickling you", "Calling out your BIG forehead", "Stealing your food"],
        video: "video2.MP4"
    },
    {
        question: "What's my favorite color? 🎨",
        correct: "Blue",
        options: ["Blue", "Red", "Green"],
        video: "video3.MP4"
    },
    {
        question: "What do I like more about you? 💕",
        correct: "Your personality",
        options: ["Your looks", "Your personality", "Your body"],
        video: "video4.MP4"
    },
    {
        question: "Who is more annoying!!",
        correct: "You",
        options: ["You", "arii", "ummul"],
        video: "video2.MP4"
    },
    {
        question: "You know I care about you",
        correct: "Yes Papi",
        options: ["NAHH", "Kinda", "Yes Papi"],
        video: "video4.MP4"
    },
    {
        question: "I also want to bite your ynash (this one no be question)",
        correct: "yeah, I do!",
        options: ["yeah, I do!", "yeah, I do!", "yeah, I do!"],
        video: "video1.MP4"
    },
    {
        question: "So......",
        correct: "So???",
        options: ["So???"],
        video: "video4.MP4"
    }
];

function playMusic() {
    let audio = document.getElementById("background-music");
    audio.muted = false;
    audio.volume = 0.5;

    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            document.addEventListener("click", () => audio.play(), { once: true });
        });
    }

    setInterval(() => {
        if (audio.paused) {
            audio.play();
        }
    }, 1000);
}

function changeVideo(videoFile) {
    let videoElement = document.getElementById("background-video");
    let sourceElement = document.getElementById("video-source");
    sourceElement.src = videoFile;
    videoElement.load();
}

function nextQuestion() {
    step++;
    if (step < questions.length) {
        let current = questions[step];
        document.getElementById("quiz").innerHTML = `
            <h1>${current.question}</h1>
            ${current.options.map(option => `
                <button class="btn ${option === current.correct ? "correct" : "wrong"}" 
                onclick="handleAnswer('${option}', '${current.correct}', '${current.video}')">${option}</button>
            `).join("")}
        `;
    } else {
        showProposal();
    }
}

function handleAnswer(selected, correct, video) {
    if (selected === correct) {
        changeVideo(video);
        nextQuestion();
    } else {
        alert("Nope! Try again 😈");
    }
}

function startQuiz() {
    playMusic();
    nextQuestion();
}

function showProposal() {
    document.body.innerHTML = `
        <div class="proposal-box">
            <h1>Will you be my Habibti forever? 💍</h1>
            <button class="btn correct" onclick="showFinalPage()">Yes</button>
            <button class="btn no-btn" id="no-button" onmouseover="moveNoButton()">No</button>
        </div>
    `;
}

function moveNoButton() {
    let noButton = document.getElementById("no-button");
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 100);
    noButton.style.left = x + "px";
    noButton.style.top = y + "px";
}

function showFinalPage() {
    document.body.innerHTML = `
        <div class="final-page">
            <video autoplay loop muted playsinline class="final-video">
                <source src="video5.MP4" type="video/mp4">
            </video>

            <div class="overlay"></div> <!-- NEW DARKENED LAYER -->

            <div class="final-text">
                <h1 class="glow-text">SHARP! We are finally official 💍</h1>
                <h2 class="glow-text">Na cult you just join so 🤭</h2>
                <h2 class="glow-text">Where should we go to celebrate? 🎉</h2>
            </div>

            <div id="balloons"></div>
            <canvas id="confetti"></canvas>
        </div>
    `;

    startConfetti();
    createBalloons();
}


function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                speed: Math.random() * 3 + 1,
                directionX: Math.random() * 2 - 1,
                directionY: Math.random() * 2 - 1
            });
        }
    }

    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.directionX * p.speed;
            p.y += p.directionY * p.speed;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(updateParticles);
    }

    createParticles();
    updateParticles();
}

function createBalloons() {
    let balloonContainer = document.getElementById("balloons");
    
    for (let i = 0; i < 10; i++) {
        let balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${Math.random() * 3 + 2}s`;
        balloonContainer.appendChild(balloon);
    }
}


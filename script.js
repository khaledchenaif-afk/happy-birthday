const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            a: Math.random(),
            s: Math.random() * 0.02 + 0.005
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        star.a += star.s;
        if (star.a >= 1 || star.a <= 0) star.s *= -1;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.a));
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(draw);
}

const shape = [
    "..ppp..",
    ".ppypp.",
    "ppyyypp",
    ".ppypp.",
    "..ppp..",
    "...g...",
    "..gg...",
    "...g..."
];

const petals = ["#ff6fa5", "#ff9ecb", "#c77dff", "#ff5c5c"];

function makeFlower() {
    const c = document.createElement("canvas");
    c.width = 7;
    c.height = 8;
    const x = c.getContext("2d");
    const petal = petals[Math.floor(Math.random() * petals.length)];
    shape.forEach((row, j) => {
        [...row].forEach((ch, i) => {
            if (ch === ".") return;
            x.fillStyle = ch === "p" ? petal : ch === "y" ? "#ffd93d" : "#4caf50";
            x.fillRect(i, j, 1, 1);
        });
    });
    return c;
}

function spawnFlower() {
    const f = makeFlower();
    f.className = "flower";
    f.style.left = Math.random() * 100 + "vw";
    f.style.width = (Math.floor(Math.random() * 3) + 3) * 7 + "px";
    f.style.animationDuration = Math.random() * 4 + 5 + "s";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 9000);
}

document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("box").style.display = "none";
    document.getElementById("text").classList.add("show");
    resize();
    draw();
    setInterval(spawnFlower, 500);
});

addEventListener("resize", resize);
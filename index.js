var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];
var images = [
    "./myheart.png", 
    "./h1.png", 
    "./hold_h.png", 
    "./final.png",
    "./1flight.png", 
    "./collage1.png", 
    "./collage3.png", 
    "./1pull.png", 
    "./1out.png",
    "./hot2.png", 
    "./image1.png", 
    "./katrina_hold.png", 
    "./1wmk.png", 
    "./fun.png", 
    "./collage2.png", 
    "./clumsy1.png", 
    "./farewell.png", 
    "./h-ring1.png",
    "./h-ring1.png", 
];
var messages = [
  "Hello Love! Welcome to my universe ;)",
    "UK, when i first saw this girl, i really thought that wow!, How can she be so hot, she is out of my league...",
    "But guess what.... I pulled it off ;)",
    ".                        And we are happily here now!              .            .       Wait Wait Wait         . ",
    ".                       Let's start from the beginning!              .              Remember our first flight together?. ",
    "or remember this????? the best couple in the college ;)",
    "Hottest of em all>>> ;)",
    "and not to mention, the most adorable ;)",
    "OOOHhhh wait a sec,,,, i almost forgot this... lol.. muaah ",
    "Ufff i can't forget this one.... AAAH too damn hot ma'am",
    "what about him?? Can you fall for someone like him??",
    "Isn't it so nice that these both looks alike>>>",
    "Every day, I cannot believe how lucky I am",
    "Amongst trillions and trillions of stars, over billions of years",
    "To be alive, and to get to spend this life with you",
    "It is so incredibly, unfathomably unlikely",
    "I love you so much, more than words can say   ,          .     more than i can ever express",
    "Remember this??? Look how precious your hand looks",
    "And look at your hands now... Why are they empty babe?",
];
var loadedImages = images.map(src => {
    var img = new Image();
    img.src = src;
    return img;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function initializeStars() {
    for (var i = 0; i < stars; i++) {
        starArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: getRandom(0.5, 1.5),
            hue: colorrange[Math.floor(Math.random() * colorrange.length)],
            saturation: getRandom(50, 100),
            opacity: getRandom(0.3, 1),
            opacityChange: getRandom(0.005, 0.02)
        });
    }
}

function drawStars() {
    for (var star of starArray) {
        star.opacity += star.opacityChange;
        if (star.opacity <= 0.3 || star.opacity >= 1) star.opacityChange *= -1;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 88%, ${star.opacity})`;
        context.fill();
    }
}

var frameNumber = 0;
var opacity = 0;
var isAuthenticated = false;

function checkPassword() {
    if (document.getElementById("passwordInput").value === "vrforever") {
        isAuthenticated = true;
        document.getElementById("passwordOverlay").style.display = "none";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

function wrapText(text, maxWidth) {
    var lines = [];
    var words = text.split(" ");
    var line = "";

    for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i] + " ";
        var testWidth = context.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {
            lines.push(line);
            line = words[i] + " ";
        } else {
            line = testLine;
        }
    }

    if (line) {
        lines.push(line);
    }

    return lines;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();

    if (isAuthenticated) {
        var index = Math.floor(frameNumber / 600);
        if (index < messages.length) {
            var img = loadedImages[index];
            var message = messages[index];
            var imgWidth = Math.min(canvas.width * 0.5, 400);
            var imgHeight = Math.min(canvas.height * 0.5, 400);
            var imgX = (canvas.width - imgWidth) / 2;
            var imgY = (canvas.height - imgHeight) / 3;

            if (img.complete) {
                context.globalAlpha = opacity;
                context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
            }

            if (frameNumber % 600 < 300) opacity += 0.01;
            if (frameNumber % 600 >= 300) opacity -= 0.01;

            context.font = `${Math.min(canvas.width * 0.04, 30)}px Comic Sans MS`;
            context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
            context.textAlign = "center";

            // Wrap text to fit within the canvas
            var lines = wrapText(message, canvas.width * 0.8);
            var lineHeight = 35;
            var textY = imgY + imgHeight + 50;

            for (var i = 0; i < lines.length; i++) {
                context.fillText(lines[i], canvas.width / 2, textY + (i * lineHeight));
            }

            context.globalAlpha = 1;
        }
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

initializeStars();
document.getElementById("passwordButton").onclick = checkPassword;
draw();

/* ==========================================
        PARA EUDI 🩵
========================================== */

const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const hugBtn = document.getElementById("hugBtn");
const musicBtn = document.getElementById("musicBtn");

const story = document.getElementById("story");
const proposal = document.getElementById("proposal");
const success = document.getElementById("success");

const bgMusic = document.getElementById("bgMusic");

const fades = document.querySelectorAll(".fade");

/* ==========================================
        BOTÓN COMENZAR
========================================== */

startBtn.addEventListener("click", () => {

    story.scrollIntoView({

        behavior:"smooth"

    });

});

/* ==========================================
        ANIMACIÓN AL HACER SCROLL
========================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{

    threshold:.25

});

fades.forEach((item)=>{

    observer.observe(item);

});

/* ==========================================
        EFECTO MÁQUINA DE ESCRIBIR
========================================== */

const letter = document.getElementById("letterText");

const originalText = letter.textContent;

letter.innerHTML = "";

let index = 0;

function typeLetter(){

    if(index < originalText.length){

       letter.textContent += originalText.charAt(index);

        index++;

        setTimeout(typeLetter,25);

    }

}

window.addEventListener("load",()=>{

    setTimeout(typeLetter,1200);

});

/* ==========================================
        BOTÓN "SÍ, QUIERO"
========================================== */

yesBtn.addEventListener("click", () => {

    // Oculta la propuesta
    proposal.style.display = "none";

    // Muestra la celebración
    success.classList.add("active");

launchConfetti();

    // Reproduce la canción
    if(bgMusic){

        bgMusic.volume = 0.6;

        bgMusic.play().catch(()=>{

            console.log("La música necesita interacción del usuario.");

        });

    }

    // Guarda la fecha si es la primera vez
    if(!localStorage.getItem("relationshipDate")){

        localStorage.setItem(
            "relationshipDate",
            new Date().toISOString()
        );

    }

    startCounter();

});

/* ==========================================
      BOTÓN "ABRÁZAME PRIMERO"
========================================== */

hugBtn.addEventListener("click",()=>{

    alert("🩵 Ese abrazo queda pendiente... Ahora responde otra vez. 😊");

});

/* ==========================================
        CONTADOR
========================================== */

let counterInterval = null;

function startCounter(){

    if(counterInterval) return;

    const savedDate = localStorage.getItem("relationshipDate");

    if(!savedDate) return;

    const start = new Date(savedDate);

    counterInterval = setInterval(()=>{

        const now = new Date();

        const diff = now - start;

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2,"0");
        document.getElementById("hours").textContent = String(hours).padStart(2,"0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

    },1000);


}

/* ==========================================
        CORAZONES FLOTANTES
========================================== */

function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "🩵";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.animationDuration =
        (4 + Math.random() * 4) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 25) + "px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },8000);

}

setInterval(createHeart,700);

/* ==========================================
        CONFETI
========================================== */

function launchConfetti(){

    const canvas = document.getElementById("confetti");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

    const pieces = [];

    for(let i=0;i<180;i++){

        pieces.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height-canvas.height,

            r:Math.random()*8+4,

            dx:(Math.random()-.5)*3,

            dy:Math.random()*4+2,

            color:[
                "#8ddcff",
                "#ffffff",
                "#66cfff",
                "#d8f7ff"
            ][Math.floor(Math.random()*4)]

        });

    }

    function animate(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        pieces.forEach(p=>{

            ctx.fillStyle=p.color;

            ctx.fillRect(p.x,p.y,p.r,p.r);

            p.x+=p.dx;

            p.y+=p.dy;

        });

        if(pieces.some(p=>p.y<canvas.height+20)){

            requestAnimationFrame(animate);

        }

    }

    animate();

}

/* ==========================================
        EFECTOS FINALES
========================================== */

// Ajustar el canvas al cambiar el tamaño
window.addEventListener("resize", () => {

    const canvas = document.getElementById("confetti");

    if(canvas){

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    }

});

/* ==========================================
        CARGAR CONTADOR SI YA EXISTE
========================================== */

window.addEventListener("load",()=>{

    if(localStorage.getItem("relationshipDate")){

        success.classList.add("active");

        proposal.style.display="none";

        startCounter();

    }

});

/* ==========================================
        BOTÓN NUESTRA CANCIÓN
========================================== */

musicBtn.addEventListener("click",()=>{

    if(bgMusic.paused){

        bgMusic.play();

        musicBtn.innerHTML="⏸️ Pausar canción";

    }else{

        bgMusic.pause();

        musicBtn.innerHTML="🎵 Nuestra canción";

    }

});

/* ==========================================
        EFECTO DE APARICIÓN
========================================== */

document.querySelectorAll(".glass").forEach((card,index)=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    setTimeout(()=>{

        card.style.transition="1s";

        card.style.opacity="1";

        card.style.transform="translateY(0)";

    },300+(index*250));

});

/* ==========================================
        MENSAJE FINAL
========================================== */

console.log("🩵 Para Eudi - Hecho con muchísimo cariño.");
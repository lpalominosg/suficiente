
const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
let countdown;
let time = 10;

// Crear los botones en círculo
window.onload = () => {
  const container = document.getElementById("letter-buttons");
  const rect = container.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const radius = Math.min(centerX, centerY) - 30;

  letters.forEach((letter, index) => {
    const angle = (index / letters.length) * (2 * Math.PI);
    const x = centerX + radius * Math.cos(angle) - 20;
    const y = centerY + radius * Math.sin(angle) - 20;

    const button = document.createElement("button");
    button.className = "letter-button";
    button.innerText = letter;
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

    button.addEventListener("click", () => {
      button.disabled = true;
      button.style.backgroundColor = "gray";
      document.getElementById("click-sound").play();
    });

    container.appendChild(button);
  });

  // Inicializar SVG círculo para el temporizador
  const circle = document.querySelector(".progress-ring__circle");
  const radiusCircle = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radiusCircle;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  window.setProgress = function(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  };
};

function startRound() {
  const categories = ["Nombre MASCULINO", "País del mundo", "Animal", "Algo que VUELE", "Color", "Comida"];
  const random = categories[Math.floor(Math.random() * categories.length)];
  document.getElementById("category").innerText = random;
}

function resetTimer() {
  document.getElementById("click-sound").play();
  clearInterval(countdown);
  time = 10;
  document.getElementById("timer").innerText = time;

  setProgress(0);
  let progress = 0;

  countdown = setInterval(() => {
    time--;
    progress += 10;
    document.getElementById("timer").innerText = time;
    setProgress(progress);

    if (time <= 0) {
      document.getElementById("alarm-sound").play();
      clearInterval(countdown);
      setProgress(100);
    }
  }, 1000);
}

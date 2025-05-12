
const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
let countdown;
let time = 10;

// Crear los botones en círculo
window.onload = () => {
  const container = document.getElementById("letter-buttons");

  // Obtener tamaño del contenedor real
  const rect = container.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const radius = Math.min(centerX, centerY) - 30; // dejar margen

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
};

//your code here
// Images pool (5 unique)
const images = [
  "https://picsum.photos/id/237/200/300",     // dog
  "https://picsum.photos/seed/picsum/200/300", 
  "https://picsum.photos/200/300?grayscale", 
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

// Elements
const main = document.querySelector("main");

// Create message
const message = document.createElement("h3");
message.id = "h";
message.innerText = "Please click on the identical tiles to verify that you are not a robot.";
main.appendChild(message);

// Container for images
const flex = document.createElement("div");
flex.classList.add("flex");
main.appendChild(flex);

// Buttons
const resetBtn = document.createElement("button");
resetBtn.id = "reset";
resetBtn.innerText = "Reset";
resetBtn.style.display = "none";

const verifyBtn = document.createElement("button");
verifyBtn.id = "verify";
verifyBtn.innerText = "Verify";
verifyBtn.style.display = "none";

main.appendChild(resetBtn);
main.appendChild(verifyBtn);

// Paragraph for result
const resultPara = document.createElement("p");
resultPara.id = "para";
main.appendChild(resultPara);

// --- Game Logic ---

let selectedImages = [];
let imgElements = [];

// Shuffle utility
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function setupGame() {
  flex.innerHTML = "";
  selectedImages = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  resultPara.innerText = "";
  message.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  // Choose a duplicate image
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicateImage = images[duplicateIndex];

  // Create pool: all unique + duplicate
  let pool = [...images, duplicateImage];

  // Shuffle
  pool = shuffle(pool);

  // Render
  imgElements = pool.map((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;

    img.addEventListener("click", () => handleClick(img));
    flex.appendChild(img);
    return img;
  });
}

function handleClick(img) {
  if (selectedImages.length >= 2) return; // Max 2 selections
  if (img.classList.contains("selected")) return; // Avoid double click same tile

  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.addEventListener("click", () => {
  setupGame();
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  const [img1, img2] = selectedImages;
  if (img1.src === img2.src) {
    resultPara.innerText = "You are a human. Congratulations!";
  } else {
    resultPara.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize on load
setupGame();

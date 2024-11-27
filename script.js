const words = [
  "red",
  "blue",
  "yellow",
  "green",
  "purple",
  "black",
  "white",
  "gray",
  "orange",
  "pink",
  "beige",
  "brown",
  "gold",
  "silver",
  "lilac",
  "rice",
  "beans",
  "meat",
  "chicken",
  "fish",
  "bread",
  "cheese",
  "milk",
  "coffee",
  "tea",
  "potato",
  "tomato",
  "lettuce",
  "carrot",
  "onion",
  "pineapple",
  "banana",
  "orange",
  "apple",
  "mango",
  "watermelon",
  "grape",
  "pumpkin",
  "cassava",
  "cashew",
  "açaí",
  "shrimp",
  "corn",
  "flour",
  "cake",
  "dog",
  "cat",
  "horse",
  "cow",
  "pig",
  "chicken",
  "duck",
  "lion",
  "tiger",
  "elephant",
  "giraffe",
  "monkey",
  "wolf",
  "bear",
  "snake",
  "alligator",
  "fish",
  "shark",
  "dolphin",
  "whale",
  "turtle",
  "butterfly",
  "bird",
  "bee",
  "ant",
  "spider",
  "chameleon",
  "rooster",
  "fox",
  "bat",
  "shirt",
  "pants",
  "dress",
  "skirt",
  "blouse",
  "coat",
  "jacket",
  "blazer",
  "suit",
  "shorts",
  "short",
  "sneakers",
  "sandal",
  "flip-flop",
  "boot",
  "sock",
  "hat",
  "cap",
  "gloves",
  "scarf",
  "glasses",
  "bag",
  "backpack",
  "belt",
  "pajamas",
  "nightgown",
  "tie",
  "vest",
  "sweater",
  "tank top",
  "guitar",
  "electric guitar",
  "piano",
  "keyboard",
  "drums",
  "drum",
  "flute",
  "saxophone",
  "clarinet",
  "trumpet",
  "violin",
  "viola",
  "double bass",
  "ukulele",
  "tambourine",
  "triangle",
  "reco-reco",
  "zabumba",
  "bass drum",
  "cuíca",
  "agogô",
  "harmonica",
  "maracas",
  "xylophone",
  "organ",
  "tuba",
  "oboe",
  "harp",
  "mandolin",
  "zither",
  "soccer",
  "volleyball",
  "basketball",
  "tennis",
  "swimming",
  "athletics",
  "cycling",
  "gymnastics",
  "boxing",
  "judo",
  "karate",
  "capoeira",
  "skateboarding",
  "surfing",
  "polo",
  "fencing",
  "rugby",
  "baseball",
  "handball",
  "hockey",
  "equestrian",
  "rowing",
  "throwing",
  "running",
  "jump",
  "marathon",
  "triathlon",
  "canoeing",
  "climbing",
  "golf",
  "house",
  "school",
  "street",
  "market",
  "square",
  "church",
  "city",
  "beach",
  "forest",
  "mountain",
  "river",
  "sea",
  "sun",
  "moon",
  "star",
  "car",
  "bicycle",
  "boat",
  "airplane",
  "train",
  "bus",
  "bridge",
  "clock",
  "chair",
  "table",
  "sofa",
  "bed",
  "mirror",
  "wardrobe",
  "computer",
  "phone",
  "lamp",
  "window",
  "door",
  "painting",
  "friend",
  "love",
  "work",
  "family",
  "time",
  "dream",
  "life",
  "hope",
  "joy",
  "longing",
  "strength",
  "courage",
  "nature",
  "history",
  "art",
  "music",
  "dance",
  "poetry",
  "language",
  "culture",
  "brazil",
  "peace",
  "light",
  "energy",
  "destiny",
  "tradition",
  "happiness",
  "curiosity",
  "wisdom",
  "future",
  "science",
  "friendship",
  "happiness",
  "rest",
  "health",
  "travel",
  "discovery",
  "child",
  "education",
  "fun",
  "planet",
  "universe",
  "star",
  "food",
  "party",
  "flowers",
  "rain",
  "wind",
  "wonder",
  "challenge",
  "trail",
  "explore",
  "freedom",
  "trip",
  "pleasure",
  "laughter",
  "memory",
  "winter",
  "summer",
  "autumn",
  "spring",
  "colors",
  "flavor",
  "secret",
  "adventure",
];

const textContainer = document.getElementById("text-container");
const timerElement = document.getElementById("timer");
const tryAgainButton = document.getElementById("try-again");
const finalScoreElement = document.getElementById("final-score");

let totalTyped = "";
let currentCharIndex = 0;
let errors = 0;
let longText = generateLongText();
let timeLeft = 60;
let timerInterval;
let typingStarted = false;

// textContainer.textContent = longText; // removed because it is now being called at the bottom in the Startup()

// Shuffle the words array

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Combine shuffled words into one long string with spaces

function generateLongText() {
  const shuffledWords = shuffleArray([...words]);
  return shuffledWords.join(" ");
}
// start countdown timer
function startTimer() {
  if (!typingStarted) {
    typingStarted = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endTest();
      }
    }, 1000);
  }
}

// Calculate words per minute with error adjustment
function calculateWPM() {
  // Split the total typed text and the reference text into arrays of words
  const typedWords = totalTyped.trim().split(/\s+/); // Words typed by the user
  const referenceWords = longText.trim().split(/\s+/); // Words from the original text

  let correctWords = 0;

  // Loop through typed words and compare them to the reference text
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === referenceWords[i]) {
      correctWords++; // Count correctly typed words
    }
  }

  // Calculate elapsed time in seconds
  const elapsedTime = 60 - timeLeft; // Using 60 seconds as the full duration

  // Avoid division by zero if elapsed time is too small
  const timeInMinutes = elapsedTime > 0 ? elapsedTime / 60 : 1 / 60;

  // Calculate WPM (Words Per Minute)
  const wpm = Math.round(correctWords / timeInMinutes);

  return Math.max(wpm, 0); // Ensure WPM doesn't go below 0
}

//Handing typing over the displayed text and scrolling
document.addEventListener("keydown", (e) => {
  startTimer();

  if (e.key === "Backspace") {
    if (totalTyped.length > 0) {
      currentCharIndex = Math.max(currentCharIndex - 1, 0);
      totalTyped = totalTyped.slice(0, -1);
    }
  } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    totalTyped += e.key;
    currentCharIndex++;
  }

  const textArray = longText.split("");
  textContainer.innerText = "";

  errors = 0;

  for (let i = 0; i < textArray.length; i++) {
    const span = document.createElement("span");

    if (i < totalTyped.length) {
      if (totalTyped[i] === textArray[i]) {
        span.classList.add("correct");
      } else {
        span.classList.add("error");
        errors++;
        console.log(errors);
      }
    }

    span.textContent = textArray[i];
    textContainer.appendChild(span);
  }

  // Scroll the container only after 20 chars
  if (totalTyped.length >= 20) {
    const scrollAmount = (totalTyped.length - 20) * 14;
    textContainer.scrollLeft = scrollAmount;
  }
});

// End the test and display the final score
function endTest() {
  clearInterval(timerInterval);

  const finalWPM = calculateWPM(); // Calculate the WPM.

  finalScoreElement.textContent = `Final WPM: ${finalWPM}`;

  textContainer.style.display = "none"; // Hide the text container.
  tryAgainButton.style.display = "block"; // Show retry button.
}

//Reset the test

function resetTest() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timerElement.textContent = `Time left: ${timeLeft}s `;
  finalScoreElement.textContent = "";
  textContainer.style.display = "block";
  tryAgainButton.style.display = "none";
  totalTyped = "";
  typingStarted = false;
  currentCharIndex = 0;
  errors = 0;
  textContainer.scrollLeft = 0;
  longText = generateLongText();
}
// Initialize the test

function init() {
  if (isMobileDevice()) {
    showMobileMessage();
  } else {
    textContainer.innerText = longText;
    timerElement.textContent = `Time Left: ${timeLeft}s `;
  }
}

// Try again button listener
tryAgainButton.addEventListener("click", resetTest);

//Detect mobile usage
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 800;
}

//Show message for mobile users
function showMobileMessage() {
  textContainer.textContent =
    "This typing test is designed for desktop use only";
}

//Startup
init();

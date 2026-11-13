let cardsBlock = document.querySelector(".cards-blocks");
let cards = document.querySelectorAll(".card-block");
let numOfTries = document.querySelector(".num-of-tries span");
let startButton = document.querySelector(".start-button");

let duration = 700;
let firstCard = null;
let secondCard = null;
let flipCount = 0;

// Start Page
startButton.addEventListener("click", function (e) {
  let yourName = prompt("Whats Your Name?");

  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  e.target.parentNode.remove();
});

// Shuffle
let shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);
cardsBlock.append(...shuffledCards);

cards.forEach((card) => {
  card.addEventListener("click", function (e) {
    let clickedBlock = e.currentTarget;

    if (
      clickedBlock.classList.contains("flipped") ||
      clickedBlock.classList.contains("hasMatched")
    )
      return;
    else {
      selectedCard(clickedBlock);
    }
  });
});

function selectedCard(card) {
  card.classList.add("flipped");
  let allselectedCards = Array.from(cards).filter((flippedBlock) =>
    flippedBlock.classList.contains("flipped"),
  );
  if (allselectedCards.length === 2) {
    stopClicking();

    checkMatchedBlocks(allselectedCards[0], allselectedCards[1]);
  } else {
  }
}

function stopClicking() {
  cardsBlock.classList.add("no-clicking");
  setTimeout(() => {
    cardsBlock.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstCard, secondCard) {
  if (firstCard.dataset.tech === secondCard.dataset.tech) {
    firstCard.classList.add("hasMatched");
    secondCard.classList.add("hasMatched");
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
  } else {
    setTimeout(() => {
      numOfTries.innerHTML = parseInt(numOfTries.innerHTML) + 1;
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
  }
}

// Grab Couple of Things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

// link text
playerLivesCount.textContent = playerLives;

// Generate the data
const getData = () => [
  { imgSrc: "./Assets/1.webp", name: "1" },
  { imgSrc: "./Assets/2.webp", name: "2" },
  { imgSrc: "./Assets/3.webp", name: "3" },
  { imgSrc: "./Assets/4.webp", name: "4" },
  { imgSrc: "./Assets/5.webp", name: "5" },
  { imgSrc: "./Assets/6.webp", name: "6" },
  { imgSrc: "./Assets/7.webp", name: "7" },
  { imgSrc: "./Assets/8.webp", name: "8" },
  { imgSrc: "./Assets/1.webp", name: "1" },
  { imgSrc: "./Assets/2.webp", name: "2" },
  { imgSrc: "./Assets/3.webp", name: "3" },
  { imgSrc: "./Assets/4.webp", name: "4" },
  { imgSrc: "./Assets/5.webp", name: "5" },
  { imgSrc: "./Assets/6.webp", name: "6" },
  { imgSrc: "./Assets/7.webp", name: "7" },
  { imgSrc: "./Assets/8.webp", name: "8" },
];

// Randomize
const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Card Generator function
const cardGenerator = () => {
  const cardData = randomize();

  //Generate the html
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
    // Attch the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCard(e);
    });
  });
};

// check Cards
const checkCard = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  // logic
  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute("name") ===
      flippedCard[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("try again");
      }
    }
  }
  // Run a check to see if we won the game
  if (toggleCard.length === 16) {
    restart("you won");
  }
};

// Restart
const restart = (text) => {
  console.log("iam runa");
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // randomize
    setTimeout((text) => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 6;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};
cardGenerator();

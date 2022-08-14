const { exit } = require("process");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

//-------------TERMINAL TEXT COLORS-------------
let defaultText = "\033[39m";
let greenText = "\033[32m";
let yellowText = "\033[0;33m";
let redText = "\033[91m";
let blueText = "\033[94m";
let grayText = "\033[90m";

//*---------------------------------CLASS CONSTRUCTORS & OBJECTS-------------------------------
class Room {
  constructor(name, description, inventory) {
    this.name = name;
    this.description = description;
    this.inventory = inventory;
  }
}

let hall = new Room(
  "Hall",
  "The hall is a long and narrow room with a small seating area at the back. Mrs. Peacock is seated in a chair and Professor Plum stands next to her. There is one door to the left leading to the lounge, and two doors to the right leading to the study and the library",
  ["Professor Plum", "Mrs. Peacock"]
);
let study = new Room(
  "Study",
  "There is desk towards the back of the room that is crowded with items. There is a large green cabinet in the corner that is secured with a padlock. Behind you is the door to the hall.",
  ["wrench", "corkscrew", "cabinet", "desk"]
);
let lounge = new Room(
  "Lounge",
  "This small room contains a sofa and two chairs. One of the chairs is turned over and a lamp lays broken on the ground. Mr. Green’s body is on the far side of the room. You notice a key on the end table in the corner. On one side of the room is the door to the hall. On the other is the door to the kitchen.",
  ["key", "Mr. Green"]
);
let library = new Room(
  "Library",
  "The library walls are lined with floor to ceiling bookshelves. There is a large safe recessed into one of the shelves. Ms. Scarlett sits in a chair by the window. There are doors leading to the study and the hall.",
  ["Ms. Scarlett", "safe"]
);
let sunroom = new Room(
  "Sunroom",
  "The sunroom has a collection of chairs and a coffee table facing the window and a collection of houseplants. There is a knife sitting on the coffee table. There is a large green cabinet in the corner. On one side of the room is the door leading to the ballroom.",
  ["cabinet", "knife"]
);
let kitchen = new Room(
  "Kitchen",
  "The room is crowded with pots and pans filled with enough food to feed an army. A turkey sits on top of the stove, dangerously close to the edge. At the center of the kitchen table, you notice an empty candlestick holder.",
  ["candlestick"]
);
let ballroom = new Room(
  "Ballroom",
  "The ballroom is a long room with a circular table in the middle. Mrs. White is busy pacing the room from end to end. On the table, you notice a leather-bound notebook. On one side of the room there is a door leading to the sunroom and on the other is a door leading to the kichen.",
  ["Mrs. White", "notebook"]
);

class Item {
  constructor(name, description, interactivity, status) {
    this.name = name;
    this.description = description;
    this.interactivity = interactivity;
    this.status = status;
  }
}

let peacock = new Item(
  "Mrs. Peacock",
  "Mrs. Peacock is sitting in a chair in the back corner, sobbing. Professor Plum seems to be trying to comfort her. You notice that parts of her dress have dark smears of some substance. Perhaps blood?",
  `\“Oh inspector--I\’m so glad you\’re here! Something horrible has happened. I was in the kitchen preparing dinner for my guests when I heard a loud thud coming from the lounge, just as I was pulling the turkey out of the oven. I put the turkey down as quickly as I could and opened the door. That\’s when I saw Mr. Green on the floor. I tried to give him CPR, but it was too late. He was already gone. Please help find who did this. I\’m worried that it\’s one of my guests. The hall door was locked before this happened so I don\’t think it could have been someone from the outside.\”`
);
let plum = new Item(
  "Professor Plum",
  "Professor Plum stands next to Mrs. Peacock at the back of the hall. He places a comforting hand on her shoulder and buttons up his jacket as you approach.",
  `\“This is very upsetting business, inspector. I was in the sunroom when I heard Mrs. Peacock scream. It\’s absolutely horrid. Now, if you\’ll excuse me, I\’m going to find myself a chair. This whole ordeal has my back acting up again.\”`
);
let key = new Item("key", "This is an old skeleton key.");
let green = new Item(
  "Mr. Green",
  "Mr. Green’s body is on the far side of the room near the door to the kitchen. He seems to have a large wound on his head. You also notice that he has some blood on the outside of his right hand."
);
let scarlett = new Item(
  "Ms. Scarlett",
  "Ms. Scarlett sits in the chair by the window. You notice that her blouse has a tear on the sleeve.",
  `\"Hello, inspector. I suppose you want to hear my side of things. I was in the sunroom with Mrs. White when we heard Mrs. Peacock scream. We ran through the ballroom and kitchen into the lounge. Mrs. Peacock was giving Mr. Green CPR. Professor Plum joined us a few minutes later. I thought it was weird that he didn\’t come sooner. When I asked him about it, he said he threw his back out again. Perhaps that slowed him down? Mrs. Peacock\’s screams were loud enough to alert the whole house!\”`
);
let white = new Item(
  "Mrs. White",
  "Mrs. White paces around the room looking worried.",
  `\n“It\’s about time you got here! Ms. Scarlett and I were having a nice chat in the sunroom when we heard Mrs. Peacock scream. There was some tension going on between Mrs. Peacock and Professor Plum when we arrived, so we thought it best to give them their space. I\’m not sure what is going on with them, but she was avoiding him all day.”`
);
let safe = new Item(
  "safe",
  "This is a large safe with a combination lock. The lock takes 4 digits. If you want to try to open it, enter 'open safe'.",
  undefined,
  []
);
let openSafe = new Item(
  "safe",
  "You open the safe. Inside you find love letters written from Professor Plum to Mrs. Peacock.",
  undefined,
  ["open"]
);
let wrench = new Item(
  "wrench",
  "This wrench looks very clean. Maybe too clean?"
);
let knife = new Item("knife", "Looks like a well-used kitchen knife.");
let corkscrew = new Item(
  "corkscrew",
  "Typical wine corkscrew. A red substance is on the end. Merlot, perhaps? Or something more sinister...?"
);
let candlestick = new Item(
  "candlestick",
  "This candlestick is really heavy. Could it be a possible murder weapon?"
);
let notebook = new Item(
  "notebook",
  "The first page of the notebook reads:'Combo: 1845 '. That might come in handy later."
);
let cabinet = new Item(
  "cabinet",
  "This large green cabinet is big enough for a person to stand inside. If only you had the key to unlock it..."
);
let desk = new Item(
  "desk",
  "The desk has piles of paper, books, and other items. After moving some papers, you discover a wrench and corkscrew hidden beneath the mess."
);

//*---------------------------------RULES/STATE MACHINES---------------------------------

let roomTransitions = {
  hall: { canMoveTo: ["study", "lounge", "library"] },
  study: { canMoveTo: ["hall", "library"] },
  lounge: { canMoveTo: ["hall", "kitchen"] },
  library: { canMoveTo: ["hall", "study"] },
  sunroom: { canMoveTo: ["ballroom"] },
  kitchen: { canMoveTo: ["lounge", "ballroom"] },
  ballroom: { canMoveTo: ["kitchen", "sunroom"] },
};

//*---------------------------------LOOKUP TABLES---------------------------------

let roomLookUp = {
  hall: hall,
  study: study,
  lounge: lounge,
  library: library,
  sunroom: sunroom,
  kitchen: kitchen,
  ballroom: ballroom,
};

let commands = {
  movement: ["move", "enter", "walk", "go"],
  pickup: ["pick", "grab", "take"],
  drop: ["drop" , "discard"],
  examine: ["read", "look", "examine", "inspect", "study"],
  talkTo: ["ask", "speak", "question", "talk"],
  help: ["help"],
  inventory: ["inventory"],
  unlock: ["unlock"],
  open: ["open"],
  solve: ["solve"],
  room: ["room"],
};

let gameObjects = {
  pickUp: ["key", "wrench", "knife", "candlestick", "notebook", "corkscrew"],
  speakTo: ["plum", "peacock", "scarlett", "white"],
  possibleRooms: [
    "hall",
    "study",
    "lounge",
    "library",
    "sunroom",
    "kitchen",
    "ballroom",
  ],
};

let ItemLookUp = {
  peacock: peacock,
  key: key,
  plum: plum,
  green: green,
  scarlett: scarlett,
  safe: safe,
  white: white,
  wrench: wrench,
  knife: knife,
  corkscrew: corkscrew,
  candlestick: candlestick,
  notebook: notebook,
  cabinet: cabinet,
  desk: desk,
};

//*---------------------------------FUNCTIONS---------------------------------

//SANITIZE
function sanitize(dirtyWord) {
  let sanitize = dirtyWord.toString().trim().toLowerCase();
  return sanitize;
}

//PLAYER MOVEMENT
function movelocation(newLocation) {
  if (gameObjects.possibleRooms.includes(newLocation)) {
    //room name is included in possible rooms
    let validTransitions = roomTransitions[locationCurrent].canMoveTo;
    let descriptionLookUp = roomLookUp[newLocation].description;
    let roomNameLookUp = roomLookUp[newLocation].name;
    console.log(yellowText + `\n${roomNameLookUp}\n` + defaultText); //Print name of current location to the console
    if (validTransitions.includes(newLocation)) {
      //if the newLocation is an allowed transition
      locationCurrent = newLocation;
      console.log(
        defaultText + `You are in the ${roomNameLookUp}. ${descriptionLookUp}`
      );
    } else if (locationCurrent === newLocation) {
      //if player is already in the room requested
      console.log(
        `You are already in ${locationCurrent}. ${roomLookUp[locationCurrent].description}`
      );
    } else {
      //not an allowed transition
      console.log(
        `You cannot go from the ${locationCurrent} to the ${newLocation}`
      );
    }
  } else {
    //room name not included in possible room list
    console.log(`${newLocation} does not exist. Try a different location.`);
  }
}

// SPEAK FUNCTION
function speakTo(name) {
  let talkTo = ItemLookUp[name];
  let roomInventoryLookUp = roomLookUp[locationCurrent].inventory;

  if (roomInventoryLookUp.includes(name)) {
    //if the name is in the inventory of locationCurrent
    if (gameObjects.speakTo.includes(name)) {
      //if name is on speakTo list

      if (gameObjects.speakTo.includes(name)) {
        console.log(`${yellowText}${talkTo.name} says,${defaultText}`);
        console.log(talkTo.interactivity);
      }
    } else {
      console.log("You can't speak to that!");
    }
  } else {
    console.log("You can't speak to that!");
  }
}

// TAKE ITEM FUNCTION
function takeItem(command, item) {
  let takeIt = ItemLookUp[item];
  let roomInventory = roomLookUp[locationCurrent].inventory;

switch (true) {
case playerInventory.includes(item):
  //if item is already in player inventory
  console.log(`You already have the ${item} in your inventory.`);
    printInventory();
    break;
 case roomInventory.includes(item) && gameObjects.pickUp.includes(item):
    //if current room inventory includes item && item can be picked up
    playerInventory.push(item);
    console.log(
      `You pick up the ${takeIt.name}.\n${yellowText}`
    );
    let itemIndex = roomInventory.indexOf(item);
    roomInventory.splice(itemIndex, 1);
    printInventory();
    break;
default:
  console.log(`You can't ${command} that.`);
}
}

//DROP ITEM FUNCTION
function dropItem(item) {
  if (playerInventory.includes(item)) {
    playerInventory.splice(playerInventory.indexOf(item));
    roomLookUp[locationCurrent].inventory.push(item);
    console.log(`You dropped the ${item}.`);
  } else {
    console.log(`You can\n't drop an item you are not carrying`);
  }
}

//UNLOCK SECRET DOOR FUNCTION
function unlock(item) {
  if (locationCurrent === "study") {
    if (playerInventory.includes("key") && item === "cabinet") {
      roomTransitions.study.canMoveTo.push("sunroom");
      roomTransitions.sunroom.canMoveTo.push("study");
      console.log(
        `You have found a secret passage between the study and the sunroom!`
      );
    } else {
      console.log(`This door is locked. If only you had a key...`);
    }
  } else if (
    locationCurrent === "sunroom" &&
    roomTransitions.study.canMoveTo == false
  ) {
    console.log(
      `This cabinet appears to be locked from the inside. Very curious...`
    );
  } else {
    console.log("There is no cabinet in this room.");
  }
}

//EXAMINE ITEM
function examineItem(object) {
  let roomNameLookUp = roomLookUp[locationCurrent];
  let examineObject = ItemLookUp[object];

  switch (true) {
    case roomNameLookUp.inventory.includes(object): //The locationCurrent has the item
      console.log(defaultText + examineObject.description);
      break;
    case playerInventory.includes(object):
      console.log(defaultText + examineObject.description);
      break;

    default:
      console.log(`${defaultText}You can't examine this item.`);
  }
}

//PRINT PLAYER INVENTORY
function printInventory() {
  if (playerInventory.length > 0) {
    //check if player is carrying anything
    console.log(
      `${yellowText}Player Inventory:${defaultText}`
    );
    let printedPlayerInventory = playerInventory.forEach((item)=> console.log(`${blueText}${item}${defaultText}`))
  } else
    console.log(
      `You are not carrying anything yet! Try picking up some items in different rooms.`
    );
}

//PRINT ROOM INVENTORY
function roomInventory() {
  let roomInventory = roomLookUp[locationCurrent].inventory;
  console.log(
    `\n${yellowText}${roomLookUp[locationCurrent].name}\n\n${defaultText} ${roomLookUp[locationCurrent].description}\n\n${yellowText}Room inventory:${defaultText}`
  );
  let printedRoomInventory = roomInventory.forEach((item) =>
    console.log(`${blueText}${item}${defaultText}`)
  );
}

//*-----------------------------FIRST ROOM SETUP---------------------------------
let locationCurrent = "hall";
let playerInventory = [];

//!---------------------------------START OF GAME---------------------------------

start();

async function start() {
  const endOfStory =
    "Professor Plum pined after Mrs. Peacock for years, only to be rebuffed again and again. When Professor Plum found out that Mrs. Peacock and Mr. Green were dating, he knew he needed to take Green out of the picture. Plum planned to attack Green in the lounge with the wrench. When Green saw him with the weapon, he grabbed the closest item he could find—a corkscrew and jabbed it into Plum’s side. Unfortunately, it wasn’t enough to stop the fatal blow to the head with the wrench. When Green fell, Plum quickly grabbed the wrench and corkscrew, and stored them in the study. He then used the secret passage into the sunroom and eventually made his way through the ballroom and kitchen back to the lounge.";

  const welcomeMessage = `\nWHODONIT!${defaultText} - ${greenText}Welcome to Whodonit—an interactive text adventure game where you are a detective called to the scene of a crime. If you would like to see a list of helpful commands, type 'help'.\n
  ${redText}Objective:${defaultText} You must make your way through the house to collect clues, interview suspects, and name the perpetrator. When you believe you have solved the mystery, enter "solve" to check your theory. Let's begin the adventure.\n\n
  When you arrive, you find the front door unlocked. You carefully push it open and step into the hall.\n\n`;
  let help =
    redText +
    `Helpful Commands\n${yellowText}Enter + Room Name:${defaultText} move from room to room.\n${yellowText}Inventory:${defaultText} see what items you are carrying.\n${yellowText}Room:${defaultText} check to see where you are and what items are currently in the room.\n${yellowText}Examine:${defaultText} study an object further.\n${yellowText}Solve:${defaultText} test your theory about the murder and win the game!\n${yellowText}Exit:${defaultText} to exit the game`;

  let answer = "";

  console.log(
    welcomeMessage +
      yellowText +
      `${hall.name}\n\n ${defaultText}${hall.description}.`
  );

  while (answer !== "exit") {
    answer = await ask(`${grayText}>_${defaultText}`);

    //SPLIT USER INPUT INTO VARIABLES - COMMAND & OBJECT
    answer = sanitize(answer);
    let cleanInput = answer.split(" ");
    let command = cleanInput[0];
    //console.log(command);

    let object = cleanInput[cleanInput.length - 1];
    //console.log(object);

    //*---------------------------------ALL PLAYER ACTIVITY---------------------------------

    if (commands.movement.includes(command)) {
      //MOVEMENT
     movelocation(object);
    
    } else if (commands.talkTo.includes(command)) {
      //TALK TO

      speakTo(object);
    } else if (commands.pickup.includes(command)) {
      //TAKE ITEM

      takeItem(command, object);
    } else if (commands.drop.includes(command)) {
      //DROP ITEM

      dropItem(object);
    } else if (commands.help.includes(command)) {
      //PLAYER HELP

      console.log(help);
    } else if (commands.inventory.includes(command)) {
      //PRINT PLAYER INVENTORY

      printInventory();
    } else if (commands.room.includes(command)) {
      //PRINT ROOM INVENTORY

      roomInventory();
    } else if (commands.unlock.includes(command)) {
      //UNLOCKING SECRET DOOR

      unlock(object);
    } else if (commands.examine.includes(command)) {
      //EXAMINE ITEM

      examineItem(object);
    } else if (command === "open" && object === "safe") {
      //OPEN SAFE

      if (locationCurrent === "library") {
        if (safe.status.includes("open")) {
          //check if safe is already open
          console.log(safe.description);
        } else {
          console.log(
            `Try to unlock the safe by entering the correct numerical combination. There are a total of 4 numbers. If you want to stop guessing, type 'exit'.`
          );
          let keepGuessing = true;
          while (keepGuessing == true) {
            let comboGuess = await ask(`Enter the combination:`);
            switch (comboGuess) {
              case "exit":
                console.log(
                  "You step away from the safe. What would you like to do now?"
                );
                keepGuessing = false;
                break;
              case "1845":
                console.log(`${greenText}The safe is now unlocked${defaultText}`);
                safe = openSafe;
                console.log(safe.description);
                keepGuessing = false;
                break;
              default:
                console.log(
                  `${comboGuess}.${redText} That combination is incorrect. Try again!${defaultText}`
                );
            }
          }
        }
      }
      if (locationCurrent !== "library") {
        console.log(`There is no safe here. Try another command.`);
      }
    } else if (commands.solve.includes(command)) {
      //SOLVE GAME
      let finalGuess = "";
      console.log(`It\'s time to test your investigative skills!`);
      while (finalGuess !== "exit") {
        finalGuess = await ask(
          `Based on the evidence you gathered, who murdered Mr. Green?`
        );
        finalGuess = sanitize(finalGuess);
        let cleanGuess = finalGuess.split(" ");
        let nameGuess = cleanGuess[cleanGuess.length - 1];

        if (nameGuess === "plum") {
          console.log(`\n${greenText}Congratulations! You have solved the mystery!${defaultText}\n`);
          console.log(endOfStory);
          process.exit();
        } else {
          console.log(`${redText}Incorrect. Try again!${defaultText}`);
        }
      }
      console.log(finalGuess);
      console.log("You can try again later!\nWhat would you like to do now?");
    } else if (answer === "exit") {
      process.exit();
    } else {
      //IF COMMAND IS UNKNOWN
      console.log(`I don't know what ${answer} is.`);
    }
  }
}

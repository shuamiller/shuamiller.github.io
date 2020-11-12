// Create variables from HTML Elements
const beginBtn = document.querySelector("#begin-button");
const beginDiv = document.querySelector("#begin-div");
const textDiv = document.querySelector("#text-div");
const playerInterface = document.querySelector("#player-interface");
const inputDiv = document.querySelector("#input-div");
const playerInput = document.querySelector("#player-input");
const gameInfo = document.querySelector('#game-info');
const form = document.querySelector('form')
const locationDiv = document.createElement('div');
const worldLocation = document.createElement('div');
const worldText = document.createElement('p');
const roomLocation = document.createElement('div');
const roomText = document.createElement('p');
const descriptionDiv = document.createElement('div');
descriptionDiv.setAttribute('id', 'description-div');
const actionResponseDiv = document.createElement('div');
actionResponseDiv.setAttribute('id', 'action-response-div');

// Declare variables so they can be accessed from any function that changes the Location Header
let currentRoom;
let currentWorld;
let currentRoomName;
let currentWorldName;

// Create blank player object
let playerCharacter = {
    name: "",
    inventory: [],
}

//The First World Chain
let worlds0 = {
    name: "Worlds[0]",
    rooms: { // The Worlds[0] Rooms Chain - most recently added room first
        visionalHall: {
            name: "Visional Hall",
            description: `<p class="game-text">New Room</p>`,
            objects: {

            },
            characters: {

            },
            directions: {

            }
        },
        entryPoint: {
            name: "Entry Point",
            description: '<p class="game-text">You find yourself in a room of smooth stone the color of sand. You don\'t remember how you came to be here. You don\'t remember who you are.</p><p class="game-text">This room seems to be illuminated without a source. Ahead of you, there is a recessed wall that could be a <span class="object-text">doorway</span>, but there is no opening. To the left of the recess, a circular portal of <span class="object-text">dark glass</span> is set in the wall.</p>',
            objects: {
                doorway: {
                    description: `<p class="game-text">A smooth surface, the same color and texture as the rest of the room but recessed into the <span class="direction-text">North</span> wall.</p>`,
                    openText: '<p class="game-text">It doesn\'t appear to open in any way.</p>',
                    pushText: '<p class="game-text">You push against the flat surface, but it doesn\'t give.</p>',
                    pullText: '<p class="game-text">There isn\'t any way to pull it.</p>',
                    dialogue: ['<p class="game-text">It says nothing.</p>', '<p class="game-text">It still says nothing...</p>'],
                    removedDialogue: [],
                    isTakeable: false,
                },
                darkGlass: {
                    name: "dark glass",
                    description: `<p class="game-text">A circular portal of dark glass set into the wall. It is about the size of your head. As you look at it, the glass-like surface begins to ripple suddenly. You hear a voice come from the portal. As the voice speaks, the ripple grows.</p><p class="game-text">"Oh, another Convert. It's been some time. I didn't know there would be more of you, but I know not what happens beyond the deep. What is your name, Convert?"</p>`,
                    isTakeable: false,
                    examinationFunction: function() { // Allow player to enter their name
                        playerInput.removeEventListener('keypress', checkInput);
                        playerInput.addEventListener('keypress', getName);
                    },
                },
                key: {
                    name: "key",
                    description: '<p class="game-text">A small, brass key.</p>',
                    isTakeable: true,
                }
            },
            characters: {
                heraldOfYggdrasil: {
                    dialogue: [
                        `<p>Go away!</p>`
                    ]
                }
            },
            directions: {
                north: {
                    directionalAccess: false,
                    room: "visionalHall",
                }
            }
        },
        
    } 
}


function removeChildren(parent) { // Generic function to remove all children from an HTML parent element
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addRoomDescription(room) {
    descriptionDiv.innerHTML = room.description;
}

function setRoomLocation(room) {
    currentRoom = room;
    currentRoomName = room.name;
    roomText.textContent = currentRoomName;
}

function setWorldLocation(world) {
    currentWorld = world;
    currentWorldName = world.name;
    worldText.textContent = currentWorldName;
}

function createLocationHeader() {
    locationDiv.setAttribute('id', 'location-div');
    worldLocation.setAttribute('id', 'world-location');
    worldText.setAttribute('id', 'world-text');
    worldText.setAttribute('class', 'location-header');
    worldLocation.appendChild(worldText);
    locationDiv.appendChild(worldLocation);
    roomLocation.setAttribute('id', 'room-location');
    roomText.setAttribute('id', 'room-text');
    roomText.setAttribute('class', 'location-header');
    roomLocation.appendChild(roomText);
    locationDiv.appendChild(roomLocation);
    gameInfo.insertBefore(locationDiv, descriptionDiv);
};

beginBtn.addEventListener('click', () => {
    playerInterface.removeChild(beginDiv);
    playerInput.setAttribute('placeholder', 'What Will You Do?');
    removeChildren(gameInfo);
    gameInfo.appendChild(descriptionDiv);
    addRoomDescription(worlds0.rooms.entryPoint);
    gameInfo.appendChild(actionResponseDiv);
    createLocationHeader();
    setRoomLocation(worlds0.rooms.entryPoint);
    setWorldLocation(worlds0);
    
});

function camelCase(str) { 
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) 
    { 
        return index == 0 ? word.toLowerCase() : word.toUpperCase(); 
    }).replace(/\s+/g, ''); 
}

function getInput() {
    let input = playerInput.value;
    input = input.toLowerCase();
    return input;
}

function makeArray() {
    input = getInput();
    let inputArray = input.split(' ');
    return inputArray;
}

function getGeneralAspect(array) {
    let str = ""
    for (let i = 1; i < array.length; i++) {
        str = str + array[i] + " ";
    }
    let trimmedStr = str.trim();
    let camelStr = camelCase(trimmedStr);
    return camelStr;
}

function getSpeakerAspect(array) {
    let str = ""
    for (let i = 2; i < array.length; i++) {
        str = str + array[i] + " ";
    }
    let trimmedStr = str.trim();
    let camelStr = camelCase(trimmedStr);
    return camelStr;
}

function getGivenAspect(array) {
    let toIndex = array.indexOf('to')
    let str = ""
    for (let i = 1; i < toIndex; i++) {
        str = str + array[i] + " ";
    }
    let trimmedStr = str.trim();
    let camelStr = camelCase(trimmedStr);
    return camelStr;
}

function getReceiver(array) {
    let toIndex = array.indexOf('to')
    let str = ""
    for (let i = toIndex + 1; i < array.length; i++) {
        str = str + array[i] + " ";
    }
    let trimmedStr = str.trim();
    let camelStr = camelCase(trimmedStr);
    return camelStr;
}

function getAspect1(array) {
    let withIndex = array.indexOf('with')
    let str = ""
    for (let i = 1; i < withIndex; i++) {
        str = str + array[i] + " ";
    }
    let trimmedStr = str.trim();
    let camelStr = camelCase(trimmedStr);
    return camelStr;
}

function getAspect2(array) {
    let withIndex = array.indexOf('with')
    let str = ""
    for (let i = withIndex + 1; i < array.length; i++) {
        str = str + array[i] + " ";
    }
    let trimmedStr = str.trim();
    let camelStr = camelCase(trimmedStr);
    return camelStr;
}

function checkInput(event) {
    if (event.key === 'Enter') {
        determineAction();
        playerInput.value = "";
    }
}

function checkGameInfo(event) {
    if (event.key === 'Enter') {
        if (gameInfo.childElementCount > 51) {
            gameInfo.removeChild(firstChild);
        }
        actionResponseDiv.scrollTop = actionResponseDiv.scrollHeight - actionResponseDiv.clientHeight;
    }
}

function getName(event) {
    if (event.key === 'Enter') {
        playerCharacter.name = playerInput.value;
        const nameResponse = document.createElement('p');
        nameResponse.innerHTML = `<p class="game-text">"It's good to meet you, <span class="character-text">${playerCharacter.name}</span>! I'm Greeter,Dif. Of course you'll have heard of me from before your Conver- Oh! You appear to be missing your PED. How unusual... Something's wrong. I'm sorry about the inconvenience. Normally, I'd send you to the Council, but as they've dispersed, I'll have to take care of this somehow. Meet me in the Hall,Annals across the city; We can try to figure this out there. I'm sorry the circumstances are so strange, but nonetheless... Welcome to <span class="yggdrasil">Yggdrasil</span>."</p><p class="game-text">The doorway before you to the <span class="direction-text">North</span> splits down the middle, and the two halves recede into the walls creating an opening.`;
        actionResponseDiv.appendChild(nameResponse);
        actionResponseDiv.scrollTop = actionResponseDiv.scrollHeight - actionResponseDiv.clientHeight;
        currentRoom.directions.north.directionalAccess = true;
        removeTempEventListener();
        playerInput.value = "";
    }
}

playerInput.addEventListener('keypress', checkInput); // Recieve input and trigger action parser
playerInput.addEventListener('keypress', checkGameInfo); // Limit Game Info messages to 50

function removeTempEventListener() {
    playerInput.removeEventListener('keypress', getName);
    playerInput.addEventListener('keypress', checkInput);
}

function showRoomDescription(room) {
    descriptionDiv.innerHTML = room.description;
}

function enterRoom(aspect) {
    let newAspect = currentRoom.directions[aspect].room;
    currentRoom = worlds0.rooms[newAspect];
    setRoomLocation(currentRoom);
    showRoomDescription(currentRoom);
    actionResponseDiv.scrollTop = actionResponseDiv.scrollHeight - actionResponseDiv.clientHeight;
}

function walkDirection(aspect) {
    if (aspect === 'none' || currentRoom.directions[aspect].directionalAccess === false) {
        let p = document.createElement('p');
        p.innerHTML = `<p class="game-text">There\'s nothing in that direction.</p>`;
        actionResponseDiv.appendChild(p);
    } else {
        enterRoom(aspect);
    }
    if (aspect.walkFunction) {
        aspect.walkFunction();
    }
}

function examineAspect(aspect) {
    if (aspect in currentRoom.objects) {
        let p = document.createElement('p');
        p.innerHTML = currentRoom.objects[aspect].description;
        actionResponseDiv.appendChild(p);
        if (currentRoom.objects[aspect].examinationFunction) {
            currentRoom.objects[aspect].examinationFunction();
        }
    } else if (aspect in currentRoom.characters) {
        let p = document.createElement('p')
        p.innerHTML = currentRoom.characters[aspect].description;
        actionResponseDiv.appendChild(p);
        if (currentRoom.characters[aspect].examinationFunction) {
            currentRoom.characters[aspect].examinationFunction();
        }
    }
}

function takeAspect(aspect) {
    if (aspect in currentRoom.objects) {
        if (currentRoom.objects[aspect].isTakeable) {
            if (currentRoom.objects[aspect].takeText) {
                let p = document.createElement('p');
                p.innerHTML = currentRoom.objects[aspect].takeText;
                actionResponseDiv.appendChild(p)
            } else {
                let p = document.createElement('p');
                p.innerHTML = `<p class=game-text>You pick up the ${currentRoom.objects[aspect].name}`
                actionResponseDiv.appendChild(p);
            }
            playerCharacter.inventory[aspect] = currentRoom.objects[aspect];
            delete currentRoom.objects[aspect];
            if (aspect.takeFunction) {
                aspect.takeFunction();
            }
        } else {
            let p = document.createElement('p');
            p.innerHTML = '<p class="game-text">You can\'t take that with you.</p>'
            actionResponseDiv.appendChild(p);
        }
    } else if (aspect in currentRoom.characters) {
        if (currentRoom.objects[aspect].isTakeable) {
            if (currentRoom.objects[aspect].takeText) {
                let p = document.createElement('p');
                p.innerHTML = currentRoom.objects[aspect].takeText;
                actionResponseDiv.appendChild(p);
            } else {
                let p = document.createElement('p');
                p.innerHTML = `<p class=game-text>You pick up the ${currentRoom.objects[aspect].name}`
                actionResponseDiv.appendChild(p);
            }
            playerCharacter.inventory[aspect] = currentRoom.objects[aspect];
            delete currentRoom.objects[aspect];
            if (aspect.takeFunction) {
                aspect.takeFunction();
            }
        } else {
            let p = document.createElement('p');
            p.innerHTML = '<p class="game-text">You can\'t take that with you.</p>'
            actionResponseDiv.appendChild(p);
        }
    }
}

function openAspect(aspect) {
    if (aspect in currentRoom.objects) {
        let p = document.createElement('p');
        p.innerHTML = currentRoom.objects[aspect].openText;
        actionResponseDiv.appendChild(p);
        if (aspect.openFunction) {
            aspect.openFunction();
        }
    } else if (aspect in currentRoom.characters) {
        let p = document.createElement('p');
        p.innerHTML = currentRoom.characters[aspect].openText;
        actionResponseDiv.appendChild(p);
        if (currentRoom.characters[aspect].openFunction) {
            currentRoom.characters[aspect].openFunction();
        }
    }
}

function pushAspect(aspect) {
    if (aspect in currentRoom.objects) {
        let p = document.createElement('p');
        p.innerHTML = currentRoom.objects[aspect].pushText;
        actionResponseDiv.appendChild(p);
        if (aspect.pushFunction) {
            aspect.pushFuntion();
        }
    } else if (aspect in currentRoom.characters) {
        if (currentRoom.characters[aspect].pushFunction) {
            currentRoom.characters[aspect].pushFunction();
        }
    }
}

function pullAspect(aspect) {
    if (aspect in currentRoom.objects) {
        let p = document.createElement('p');
        p.innerHTML = currentRoom.objects[aspect].pullText;
        actionResponseDiv.appendChild(p)
        if (aspect.pullFunction) {
            aspect.pullFunction();
        }
    } else if (aspect in currentRoom.characters) {
        actionResponseDiv.innerHTML = currentRoom.characters[aspect].pullText;
        if (currentRoom.characters[aspect].pullFunction) {
            currentRoom.characters[aspect].pullFunction();
        }
    }
}

function talkToAspect(aspect) {
    if (aspect in currentRoom.objects) {
        if (currentRoom.objects[aspect].dialogue.length > 1) {
            let p = document.createElement('p');
            p.innerHTML = currentRoom.objects[aspect].dialogue[0];
            actionResponseDiv.appendChild(p);
            currentRoom.objects[aspect].removedDialogue.push(currentRoom.objects[aspect].dialogue[0]);
            currentRoom.objects[aspect].dialogue.shift();
        } else {
            let p = document.createElement('p');
            p.innerHTML = currentRoom.objects[aspect].dialogue[0];
            actionResponseDiv.appendChild(p);
        }
        if (currentRoom.objects[aspect].talkFunction) {
            currentRoom.objects[aspect].talkFunction();
        }
    } else if (aspect in currentRoom.characters) {
        if (currentRoom.characters[aspect].dialogue.length > 1) {
            let p = document.createElement('p');
            p.innerHTML = currentRoom.characters[aspect].dialogue[0];
            actionResponseDiv.appendChild(p);
            currentRoom.characters[aspect].removedDialogue.push(currentRoom.characters[aspect].dialogue[0]);
            currentRoom.characters[aspect].dialogue.shift();
        } else {
            let p = document.createElement('p');
            p.innerHTML = currentRoom.characters[aspect].dialogue[0];
            actionResponseDiv.appendChild(p);
        }
        if (currentRoom.characters[aspect].talkFunction) {
            currentRoom.characters[aspect].talkFunction();
        }
    }
}

function giveFunction(aspect, receiver) {
    if (!playerCharacter.inventory.hasOwnProperty(aspect)) {
        const noItemText = document.createElement('p');
        noItemText.innerHTML = `<p class="game-text">You don't have ${aspect} with you.`;
        actionResponseDiv.appendChild(noItemText);
    } else {
        if (!receiver.receivable.hasOwnProperty(aspect)) {
            let p = document.createElement('p');
            p.appendChild(receiver.wontTakeText);
            actionResponseDiv.appendChild(p);
        } else if (receiver.receivable.hasOwnProperty(aspect)) {
            receiver.inventory.push(aspect);
            let aspectIndex = playerCharacter.inventory.indexOf(aspect);
            playerCharacter.inventory.splice(aspectIndex, 1);
        }
    }
}

function useAspect(aspect1, aspect2) {
    if (!playerCharacter.inventory.hasOwnProperty(aspect1)) {
        let p = document.createElement('p');
        p.appendChild(`<p class="game-text">You don't have ${aspect1} with you.</p>`);
        actionResponseDiv.appendChild(p);
    } else if (
        !playerCharacter.inventory.hasOwnProperty(aspect2) || 
        !currentRoom.objects.hasOwnProperty(aspect2) ||
        !currentRoom.characters.hasOwnProperty(aspect2)
    ){
        let p = document.createElement('p');
        p.appendChild(`You don't have access to ${aspect2}`);
        actionResponseDiv.appendChild(p);
    } else if (!currentRoom.objects[aspect2].isUseableWith.hasOwnProperty(aspect1) || !currentRoom.characters[aspect2].isUseableWith.hasOwnProperty(aspect1)) {
        if (currentRoom.objects[aspect2].hasOwnProperty(refuseToTakeText)) {
            let p = document.createElement('p');
            p.appendChild(currentRoom.objects[aspect2].refuseToTakeText);
            actionResponseDiv.appendChild(p);
        } else if (currentRoom.characters[aspect2].hasOwnProperty(refuseToTakeText)) {
            let p = document.createElement('p');
            p.appendChild(currentRoom.characters[aspect2].refuseToTakeText);
            actionResponseDiv.appendChild(p);
        } else {
            let p = document.createElement('p');
            p.appendChild(`<p>You can't use ${aspect1} with ${aspect2}.</p>`);
            actionResponseDiv.appendChild(p);
        }
    } else {
        if (currentRoom.objects.hasOwnProperty(aspect2)) {
            let p = document.createElement('p');
            p.appendChild(currentRoom.objects[aspect2].usables[aspect1].useText);
            actionResponseDiv.appendChild(p);
            
        } else if (currentRoom.characters.hasOwnProperty(aspect1)) {
            let p = document.createElement('p');
            p.appendChild(currentRoom.characters[aspect2].usables[aspect1].useText);
            actionResponseDiv.appendChild(p);
        }
    }
}

function checkInventory() {
    let inventoryList = ``;
    for (const item in playerCharacter.inventory) {
        if (inventoryList != ``) {
            inventoryList += `,` + item.name;
        } else {
            inventoryList += item.name;
        }
    }
    inventoryList += `</p>`
    actionResponseDiv.appendChild(inventoryList);
}

function determineAction() {
    inputArray = makeArray();
    let aspect = ""
    if (inputArray[0] === "walk" || inputArray[0] === "go") {
        aspect = inputArray[1];
        console.log(aspect);
        walkDirection(aspect);
    } else if (inputArray[0] === "examine") {
        aspect = getGeneralAspect(inputArray);
        examineAspect(aspect);
    } else if (inputArray[0] === "take") {
        aspect = getGeneralAspect(inputArray);
        takeAspect(aspect);
    } else if (inputArray[0] === "open") {
        aspect = getGeneralAspect(inputArray);
        openAspect(aspect);
    } else if (inputArray[0] === "push") {
        aspect = getGeneralAspect(inputArray);
        pushAspect(aspect);
    } else if (inputArray[0] === "pull") {
        aspect = getGeneralAspect(inputArray);
        pullAspect(aspect);
    } else if (inputArray[0] === "talk" && inputArray[1] === "to") {
        aspect = getSpeakerAspect(inputArray);
        talkToAspect(aspect);
    } else if (inputArray[0] === "give") {
        let aspect = getGivenAspect(inputArray);
        let receiver = getReceiver(inputArray);
        giveAspect(aspect, receiver);
    } else if (inputArray[0] === "use") {
        let aspect1 = getAspect1(inputArray);
        let aspect2 = getAspect2(inputArray);
        useAspect(aspect1, aspect2);
    } else if (inputArray[0] === "?") {
        if (inputArray.length > 1) {
            aspect = getGeneralAspect(inputArray);
            getHelpWith(aspect);
        } else {
            getHelp();
        }
    } else if (inputArray[0] === "check" && inputArray[1] === "inventory") {
        checkInventory();
    }
}
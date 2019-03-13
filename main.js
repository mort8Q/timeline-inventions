function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var newCards = cards.slice(0);
console.log(newCards)
var sampleCards = document.querySelectorAll('.w3-display-container');



for (var element of sampleCards) {
    shuffle(newCards);
    element.querySelector('div').textContent = `${newCards[0]['name']}`;
    element.querySelector('img').setAttribute('src', `${newCards[0]['image']}`);

}


// Access playground section by class player-1 
// and player-2 card divs by class
var playground = document.querySelector('.playground');
var playerOne = document.querySelector('.player-1 .card');
var playerTwo = document.querySelector('.player-2 .card');

// Define a global variable to store all player cards
// cards, the card being dragged 
var playerOneCards;
var playerTwoCards;
var timelineCard;
var cardAssignment;
var randomCard;
var card;
var player = 0;
var dragged;
var draggedParent;


// A function shuffle to shuffle the cards 
// each time we choose a card instead of randomizing cards
//***************************************************************************************
//*    Title: How to randomize (shuffle) a JavaScript array?
//*    Author: CoolAJ86
//*    Date: March 11,2017
//*    Availability: https://stackoverflow.com/a/2450976
//***************************************************************************************/
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// Add an event listener for when the new game button is clicked
// Implement all logic inside this function
document.querySelector('#new-game').addEventListener('click', function () {


    // Instantiate variables and clear data when
    // button is clicked
    playerOneCards = [];
    playerTwoCards = [];
    timelineCard;
    cardAssignment = cards.slice(0);

    // Remove all player and timeline cards on
    // a new game
    $('.player-card').remove();
    $('.timeline-card').remove();

    // TODO TOGGLE CLASS DRAGABBLE
    // Define a function to switch players
    // define player turns
    // switch on player one indicator
    document.querySelector('#player-1-indicator').style.backgroundColor = 'green';
    document.querySelector('#player-2-indicator').style.backgroundColor = 'red';

    // Define a function to assign a new card when
    // player fails to guess a date
    //! Check lines 90 to 99 for additional comments
    function assignNewCard(parentElement) {
        cardAssignment = shuffle(cardAssignment);
        var randomCard = cardAssignment[cardAssignment.length - 1];
        var card = document.createElement('div');
        card.innerHTML = `<p>${randomCard['name']}</p><img src='${randomCard['image']}'/>`;
        document.querySelector(`.${parentElement}`).appendChild(card);
        card.setAttribute('class', 'player-card')
        card.setAttribute('id', `${randomCard['id']}`)
        card.setAttribute('draggable', 'true');
        cardAssignment.pop();
    }

    // Assign random cards to player-1
    for (var i = 0; i < 5; i++) {
        cardAssignment = shuffle(cardAssignment); // shuffle the cards
        randomCard = cardAssignment[cardAssignment.length - 1]; // get a new random card
        card = document.createElement('div'); // create a new div to host the card image and name
        card.innerHTML = `<p>${randomCard['name']}</p><img src='${randomCard['image']}'/>`; // set the card image and name
        playerOne.appendChild(card); // append the new card
        card.setAttribute('class', 'player-card') // set the card class
        card.setAttribute('id', `${randomCard['id']}`) // set the id 
        playerOneCards.push(randomCard); // push the card to the player array
        cardAssignment.pop(); // remove the card from the list of cards

    }

    // Assign random cards to player-2
    //! Check lines 90 to 99 for additional comments
    for (var i = 0; i < 5; i++) {
        randomCard = cardAssignment[cardAssignment.length - 1];
        card = document.createElement('div');
        card.innerHTML = `<p>${randomCard['name']}</p><img src='${randomCard['image']}'/>`;
        playerTwo.appendChild(card);
        card.setAttribute('class', 'player-card')
        card.setAttribute('id', `${randomCard['id']}`)
        playerTwoCards.push(randomCard);
        cardAssignment.pop();
        cardAssignment = shuffle(cardAssignment);
    }

    // Create a placeholder timeline card
    // Use this card to drag & drop at the start
    // of the timeline
    card = document.createElement('div');
    card.innerHTML = `<p>THE BIG BANG</p><img src='https://image.flaticon.com/icons/svg/813/813474.svg'/><p>The Universe Started Here</p>`;
    playground.appendChild(card);
    card.setAttribute('class', 'timeline-card')
    card.setAttribute('id', `bigbang`)

    // Create a new random timeline card
    // Use this card as a reference card
    randomCard = cardAssignment[cardAssignment.length - 1];
    card = document.createElement('div');
    card.innerHTML = `<p>${randomCard['name']}</p><img src='${randomCard['image']}'/><p>${randomCard['invented']}</p>`;
    playground.appendChild(card);
    card.setAttribute('class', 'timeline-card')
    card.setAttribute('id', `${randomCard['id']}`)
    timelineCard = randomCard;
    cardAssignment.pop();
    cardAssignment = shuffle(cardAssignment);


    // Query all player cards, set attribute to transfer data
    // if a card is dragged
    var playerCards = document.querySelectorAll('.player-card');

    for (var element of playerCards) {
        element.setAttribute('ondragstart', `event.dataTransfer.setData('text/plain', null)`)
    }

    // Set the attribute initially for all player-1 cards as
    // draggable cardds
    // Change this when switching players 
    var initialPlayer = document.querySelectorAll('.player-1 .card .player-card');
    for (var element of initialPlayer) {
        element.setAttribute('draggable', `true`);
    }

    // Set all images attribute draggable to false to 
    // prevent dragging conflict with the div
    var images = document.querySelectorAll('img')
    for (var image of images) {
        image.setAttribute('draggable', 'false');
    }

    // Set an event listener to bounce the cards on
    // mouseover and stop bounce on mouseout
    $('.player-card').on('mouseover', function () {
        $(this).attr('class', 'player-card animated infinite bounce');
    })

    $('.player-card').on('mouseout', function () {
        $(this).attr('class', 'player-card');
    })

    // Set an event listener for when a card is dragged
    document.addEventListener('drag', function (event) {}, 'false');

    // Set an event listener for when dragging is started
    document.addEventListener('dragstart', function (event) {
        dragged = event.target;

        event.target.style.opacity = 0.5; // make card transparent
    }, 'false');

    // Set an event listener for when dragging is stopped
    document.addEventListener('dragend', function (event) {
        event.target.style.opacity = ''; // make card opaque

    }, 'false');

    // Set an event listener for when dragging over an element
    document.addEventListener('dragover', function (event) {
        event.preventDefault();

    }, 'false');

    // Set an event listener for when dragging enter a zone
    document.addEventListener('dragenter', function (event) {
        if (event.target.className == 'timeline-card') {
            event.target.style.backgroundColor = 'purple'; // change background color of 
        }                                                  // the timeline card to purple
    }, 'false');

    // Set an event listener for when dragging leave zone
    document.addEventListener('dragleave', function (event) {
        if (event.target.className == 'timeline-card') { // reset background color
            event.target.style.backgroundColor = '';
        }
    }, 'false');

    // Set an event listener for when the dragged element is 
    // dropped into a zone
    document.addEventListener('drop', function (event) {
        event.preventDefault();

        // Check if the zone is a timeline card
        if (event.target.className == 'timeline-card') {


            // Check if the dragged grandparent node is player-1
            if (dragged.parentNode.parentNode.className == 'player-1') {
                draggedParent = 'player-1 .card'
            } else if (dragged.parentNode.parentNode.className == 'player-2') {
                draggedParent = 'player-2 .card'
            }

            // Check if the element triggering the drop event is
            // a timeline card & get the id of the dragged element
            // & compare with the cards array to get the index
            if (event.target.className == 'timeline-card') {
                for (var i = 0; i < cards.length; i++) {
                    if (dragged.id == cards[i]['id']) {
                        var index = i;
                    }
                }

                // Get a dragged element object from the cards
                // array and insert the new card next to the 
                // timeline card it was dropped on
                randomCard = cards[index];
                card = document.createElement('div');
                card.innerHTML = `<p>${randomCard['name']}</p><img src='${randomCard['image']}'/><p>${randomCard['invented']}</p>`;
                card.setAttribute('class', 'timeline-card');
                card.setAttribute('id', `${dragged.id}`);
                event.target.insertAdjacentElement('afterend', card);
                event.target.style.backgroundColor = ''

                // Remove the dragged card from the players cards
                var currentPlayerCards = document.querySelectorAll(`.player-card`)
                for (var currentCard of currentPlayerCards) {
                    if (currentCard.id == dragged.id) {
                        currentCard.remove();
                    }
                }


            }

            // Get the newley dropped card & the adjacent cards
            var timeline = playground.querySelector(`#${dragged.id}`);
            var next;
            var previous;

            // Get the date & the date suffix from the date p tag
            //! prefix == suffix 
            var timelineDate = timeline.querySelectorAll('p')[1].textContent.match(/\d+/)[0];
            var timelinePrefix = timeline.querySelectorAll('p')[1].textContent.replace(/[0-9]/g, '');

            // Check if it is the first card (second child) or last card
            // (last child) & assign null value to date ans suffix
            if (timeline.nextSibling == null) {
                nextDate = 'null';
                nextPrefix = 'null';
            } else {
                next = timeline.nextSibling;
                var nextDate = next.querySelectorAll('p')[1].textContent.match(/\d+/)[0];
                var nextPrefix = next.querySelectorAll('p')[1].textContent.replace(/[0-9]/g, '');
                nextPrefix = nextPrefix.replace(/\s/g, "");
            }

            if (timeline.previousSibling == null) {
                previousDate = 'null';
                previousPrefix = 'null';
            } else if (timeline.previousSibling.id == 'bigbang') {
                previousDate = 'null';
                previousPrefix = 'null';
            } else {
                previous = timeline.previousSibling;
                var previousDate = previous.querySelectorAll('p')[1].textContent.match(/\d+/)[0];
                var previousPrefix = previous.querySelectorAll('p')[1].textContent.replace(/[0-9]/g, '');
                previousPrefix = previousPrefix.replace(/\s/g, "");
            }

            // Convert date to from BC to AD
            if (previousPrefix.includes('BC')) {
                previousDate = 0 - previousDate;
            }
            if (timelinePrefix.includes('BC')) {
                timelineDate = 0 - timelineDate;
            }
            if (nextPrefix.includes('BC')) {
                nextDate = 0 - nextDate;
            }


            // Check if date lays within the timeline
            // Alert player if date is not correct
            // Remove timeline card 
            // Assign a new player card
            if (nextPrefix.includes('null') == true) {
                if (parseInt(timelineDate) < parseInt(previousDate)) {
                    swal({
                        title: "Review History 101",
                        text: `${timeline.querySelector('p:first-child').textContent} was invented in ${timeline.querySelector('p:last-child').textContent}`,
                        icon: "error"
                    });
                    timeline.remove();
                    assignNewCard(draggedParent);
                    console.log('check1')
                }
            } else if ((previousPrefix.includes('null') == true)) {
                if (parseInt(timelineDate) > parseInt(nextDate)) {
                    swal({
                        title: "Review History 101",
                        text: `${timeline.querySelector('p:first-child').textContent} was invented in ${timeline.querySelector('p:last-child').textContent}`,
                        icon: "error"
                    });
                    timeline.remove();
                    assignNewCard(draggedParent);
                    console.log('check2')
                }
            }
            else if (parseInt(timelineDate) < parseInt(previousDate) || parseInt(timelineDate) > parseInt(nextDate)) {
                swal({
                    title: "Review History 101",
                    text: `${timeline.querySelector('p:first-child').textContent} was invented in ${timeline.querySelector('p:last-child').textContent}`,
                    icon: "error"
                });
                timeline.remove();
                assignNewCard(draggedParent);
                console.log('check3')
            }


            // Check if player has no cards left
            // Alert winning player
            if (document.querySelectorAll('.player-1 .card .player-card').length <= 0) {
                swal({
                    text: "Player 1 Won",
                    icon: "success"
                })
            }
            if (document.querySelectorAll('.player-2 .card .player-card').length <= 0) {
                swal({
                    text: "Player 2 Won",
                    icon: "success"
                })
            }

            // Switch players by changing player variable, setting indicator
            // background color & toggling draggable attribute from player
            // cards
            if (player == 0) {
                player = 1;
                document.querySelector('#player-1-indicator').style.backgroundColor = 'red';
                document.querySelector('#player-2-indicator').style.backgroundColor = 'green';
                var playerOneCards = document.querySelectorAll('.player-1 .card .player-card');
                var playerTwoCards = document.querySelectorAll('.player-2 .card .player-card');
                for (var playerOneCard of playerOneCards) {
                    playerOneCard.setAttribute('draggable', 'false');
                }
                for (var playerTwoCard of playerTwoCards) {
                    playerTwoCard.setAttribute('draggable', 'true');
                }

            } else {
                player = 0
                document.querySelector('#player-1-indicator').style.backgroundColor = 'green';
                document.querySelector('#player-2-indicator').style.backgroundColor = 'red';
                var playerOneCards = document.querySelectorAll('.player-1 .card .player-card');
                var playerTwoCards = document.querySelectorAll('.player-2 .card .player-card');
                for (var playerOneCard of playerOneCards) {
                    playerOneCard.setAttribute('draggable', 'true');
                }
                for (var playerTwoCard of playerTwoCards) {
                    playerTwoCard.setAttribute('draggable', 'false');
                }
            }

        }

    }, 'false');
});
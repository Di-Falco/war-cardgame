import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WarService from './war-service.js';

async function getDeckApiCall() {
  const response = WarService.getDeck();
  return response;
}

async function getPileApiCall(deck) {
  const response = WarService.getPile(deck);
  return response;
}

async function dishPileApiCall(id, name, cards) {
  const response = WarService.dishPile(id, name, cards);
  return response;
}

async function listCardsApiCall(id, name) {
  const response = WarService.listCards(id, name);
  return response;
}

async function drawCardApiCall(id, name) {
  const response = WarService.drawPile(id, name);
  return response;
}

function compareCards(card1, card2) {
  const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
  if (cardValues.indexOf(card1.value) < cardValues.indexOf(card2.value)) {
    return false;
  }
  return true;
}

async function war(deck, card1, card2) {
  let p1Cards = [card1];
  let p2Cards = [card2];

  for(let i=0; i<3; i++) {
    let newCard = await drawCardApiCall(deck, "player1");
    p1Cards.push(newCard);
  }
  for(let i=0; i<3; i++) {
    let newCard = await drawCardApiCall(deck, "player2");
    p2Cards.push(newCard);
  }

  let win;
  for (let i=0; i<3; i++) {
    win = compareCards(card1, card2);
    if(win) break;
  }

  console.log("PLAYER WAR CARDS: ", p1Cards);
  console.log("COMPUTER WAR CARDS: ", p2Cards);
  console.log(win);

  return win;

}

$(document).ready(async function() {

  let gameDeck;

  $("#new-game").click(async function(){

    gameDeck = await getDeckApiCall();

    let cards1 = await getPileApiCall(gameDeck);

    gameDeck = await dishPileApiCall(gameDeck, "player1", cards1);

    let cards2 = await getPileApiCall(gameDeck);

    gameDeck = await dishPileApiCall(gameDeck, "player2", cards2);

    console.log("FINAL GAMEDECK: ", gameDeck);

    let cardImage = await listCardsApiCall(gameDeck, "player1");
    console.log(cardImage);
    $("#player1").prop("disabled", false);
    $("#output-card1").html('<img src="https://deckofcardsapi.com/static/img/back.png">').show();
    $("#output-card2").html('<img src="https://deckofcardsapi.com/static/img/back.png">').show();
  });

  $("#player1").click(async function() {
    let p1Draw = await drawCardApiCall(gameDeck, "player1");
    console.log(p1Draw);
    $("#output-card1").html(`<img src=${p1Draw.image}>`);

    let p2Draw = await drawCardApiCall(gameDeck, "player2");
    console.log(p2Draw);
    $("#output-card2").html(`<img src=${p2Draw.image}>`);

    console.log(gameDeck);

    if (p1Draw.value === p2Draw.value) {
      return war(gameDeck, p1Draw, p2Draw);
    }

    let win = await compareCards(p1Draw, p2Draw);
    if (win) {
      console.log("player won this round");
    } else {
      console.log("computer won this round");
    }
  });
/*
  $("#robot").click(function(){
    const quotes = [];
    random = Math.floor(Math.random) * 2;
    
  });
*/
});
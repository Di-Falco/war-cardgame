import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WarService from './war-service.js';

/*
function getElements(response) {
  if (response.main) {
    return response;
  }
  return ("ERROR: error...");
}
*/

async function getDeckApiCall() {
  const response = await WarService.getDeck();
  return response;
}

async function getPileApiCall(deck) {
  const response = await WarService.getPile(deck);
  return response;
}

async function dishPileApiCall(id, name, cards) {
  const response = WarService.dishPile(id, name, cards);
  return response;

}

$(document).ready(function() {

  $("#new-game").click(async function(){
    $("#start-game").show();

    const deck = await getDeckApiCall();
    
    console.log("Deck: ", deck);

    let cards1 = await getPileApiCall(deck);

    console.log("Player 1 cards: ", cards1);

    let player1 = await dishPileApiCall(deck, "player1", cards1);

    console.log("Deck w/ player1: ", player1);

    let cards2 = await getPileApiCall(deck);

    console.log("Player 2 cards: ", cards2);

    let player2 = await dishPileApiCall(deck, "player2", cards2);

    console.log("Deck w/ player2: ", player2);





  });
  /*
  $("#player1").click(function() {
    let promise1 = WarService.drawPile();
    promise1.then(function(response){
      const body = JSON.parse(response);
    }, function(error){
      $("#show-errors").text(`There was an error processing your request: ${error}`);
    });

    let promise2 = WarService.drawPile();
    promise2.then(function(response){
      const body = JSON.parse(response);
    }, function(error){
      $("#show-errors").text(`There was an error processing your request: ${error}`);
    });
  });
  */

});
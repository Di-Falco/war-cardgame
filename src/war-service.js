export default class WarService {
  
  static async getDeck() {
    try {
      const response =  await fetch(`http://deckofcardsapi.com/api/deck/new/shuffle`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(error) {
      return error.message;
    }
  }

  static async getPile(deck) {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=26`); 
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const cards = await response.json();
      return cards.cards;
    } catch(error) {
      return error.message;
    }
  }

  static async dishPile(deck, pileName, cards) {

    let cardPile = [];
    for(let i=0; i<26; i++){
      cardPile.push(cards[i].code);
    }
    cardPile = cardPile.join();

    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/pile/${pileName}/add/?cards=${cardPile}`); 
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }

  static async drawPile(deck, pile) {
    try {
      const response = await fetch(`http://deckofcardsapi.com/api/deck/${deck}>/pile/${pile}/draw/?count=1`);
      if (!response.ok) {
        throw Error(response.statusText);
      } 
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}

import React from "react";
import Card from "./Card";

function CardList({deck}){
  
  //list of cards in a specified deck
  const list = Object.keys(deck).length ?
      deck.cards.map((card) => (
      <li key={card.id}>
          <Card key={card.id}
              card={card}
             />
       </li>
      )) : null;
     
      return (
        <div className="container">
          <h3>Cards</h3>
            <section className="row">
              <ul className="list-unstyled">{list}</ul>
            </section>
        </div>
      )
};

export default CardList;
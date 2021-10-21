import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";
import Deck from "./Deck";
import {listDecks} from "../../utils/api/index";

//displays all decks 
function DeckList(){

const [decks, setDecks] = useState([]);
  
  //retrieves all available decks 
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
        try {
            const response = await listDecks(abortController.signal);
            setDecks(response);
        } catch (error) {
            console.log(error)
            }
        }
    loadDecks();
    return () => abortController.abort();
}, []);

  //if there are no available decks, Not Found page displayed, otherwise list of decks created
   if (decks.length===0){
     return <NotFound/>
   } else {
    const list = 
    decks.map((deck) => (
    <li key={deck.id}>
        <Deck key={deck.id} 
            deck={deck}
            deckId={deck.id}
           />
     </li>
    ));
 
    return (
        <div className="container">
           <Link to="/decks/new">
            <button className="btn btn-secondary my-2"> 
              + Create Deck
            </button>
           </Link>
        <section className="row">
          <ul className="list-unstyled">{list}</ul>
        </section>
        </div>
    )
   }
};
    

export default DeckList;
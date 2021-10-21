import {Link, useHistory} from "react-router-dom";
import {deleteDeck} from "../../utils/api/index";


function Deck({deck, deckId}){
  
    const {name, description} =deck
    const history=useHistory();

    //called when Delete button is clicked
    const deleteDeckHandler = () => {
        if(window.confirm("Delete this deck? You will not be able to recover it.")){
        deleteDeck(deckId);
        history.go(0); 
        }
    }

    //returns single deck view
    return (
      <div className ="card w-100">  
        <div className="card-body">
          <h5 className="card-title">{name} <span className="badge font-weight-lighter mx-5">{deck.cards.length} cards</span></h5>
            <p className="card-text">{description}</p>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary m-2">View</Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-2">Study</Link>
            <button className="btn btn-danger mx-5" onClick={deleteDeckHandler}>
                Delete
            </button>
          </div> 
        </div>
    )
};

export default Deck;
import React from "react";
import {useRouteMatch, useParams, useHistory, Link} from "react-router-dom";
import {deleteDeck} from "../../utils/api/index";

//deck information and associated buttons at top of page in ViewDeck route
function Deck({deck}){

    const {deckId} =useParams();
    const {url} = useRouteMatch();
    const history=useHistory();

    //called when Delete button for the deck is clicked
    const deleteDeckHandler = () => {
        if(window.confirm("Delete this deck? You will not be able to undo this action")){
        deleteDeck(deckId);
        history.go("/"); 
        }
}
    return (
        <div class="card border-0">
            <div class="card-body">
                <h5 class="card-title">{deck.name}</h5> 
                    <p class="card-text">{deck.description}</p>
                   
                   {/* Link to Edit Deck page */}
                    <Link to={`${url}/edit`}>
                        <button className="btn btn-secondary">
                            Edit
                        </button>
                    </Link>

                    {/* Link to study deck page */}
                    <Link to={`${url}/study`}>
                        <button className="btn btn-primary mx-2">
                            Study
                        </button>
                    </Link>

                    {/* Link to Add cards page */}
                    <Link to={`${url}/cards/new`}>
                        <button className="btn btn-primary mx-2 mr-5"> 
                            Add Cards
                        </button>
                    </Link>

                    {/* Delete deck button */}
                    <button className="btn btn-danger ml-5" onClick={deleteDeckHandler}>
                        Delete
                    </button>
            </div>
        </div>
    )
}

export default Deck;
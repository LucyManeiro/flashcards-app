import { useParams, useHistory, NavLink} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { readDeck } from "../../utils/api";
import AddCardForm from "./AddCardForm";

function AddCards(){
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
    const history = useHistory();

    useEffect(() => {
        setDeck({});
        const abortController = new AbortController();
        async function currentDeck(){
        try{
            const response= await readDeck(deckId, abortController.signal);
            setDeck(response); 
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Unable to load deck", deckId);
            } else {
                history.push(`/${error}`);
//               console.log(error)
            }
        }
        }
        currentDeck();
        return ()=> abortController.abort();
    },[deckId, history]);

    

 return (
<div>
<nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <NavLink to="/">
                    Home
                </NavLink>
            </li>
            <li class="breadcrumb-item">
                <NavLink to={`/decks/${deckId}`}>
                 {deck.name}
                </NavLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
    </nav>
    <AddCardForm deck = {deck}/>
   
 </div>
 )
}

export default AddCards;
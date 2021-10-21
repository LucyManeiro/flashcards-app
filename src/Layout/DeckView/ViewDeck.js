import React, {useEffect, useState} from "react";
import {readDeck} from "../../utils/api/index";
import { NavLink, useParams} from "react-router-dom";

import Deck from "./Deck";
import CardList from "./CardList";

function ViewDeck() {
    
    const initialDeckState= {
        id:0,
        name: "", 
        description: "",
        cards: [],
    }

    const [deck, setDeck] = useState(initialDeckState);
    const {deckId} = useParams();

    //gets current deck information
    useEffect(() => {
        setDeck({});
        const abortController = new AbortController();
        async function currentDeck(){
            try{
                const response= await readDeck(deckId, abortController.signal);
                setDeck(response); 
            } catch (error) {
                console.log(error)
            }
        }
        currentDeck();
        return ()=> abortController.abort();
    },[deckId]);


    return (
        <div>
            {/* breadcrumb navigation */}
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                    <NavLink to="/" href="/">
                        Home
                    </NavLink>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                    {deck.name}
                    </li>
                </ol>
            </nav>

            {/* component for deck information */}
            <Deck deck={deck}/>

            {/* component for list of cards in the specified deck */}
            <CardList deck={deck}/>
        </div>
    )
};

export default ViewDeck;
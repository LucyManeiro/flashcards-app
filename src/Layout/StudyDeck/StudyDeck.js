import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {readDeck} from "../../utils/api/index";
import StudyBreadCrumb from "./StudyBreadcrumb"
import StudyCardView from "./StudyCardView";

function StudyDeck(){
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();

    //loads current deck to be studied
    useEffect(() => {
      const abortController = new AbortController();
      async function loadDeck() {
        try{
          const newDeck = await readDeck(deckId);
          setDeck(newDeck);
        console.log(newDeck);
        } catch(error) {
          if (error.name === "AbortError")
          console.log(error)
        }
      }
      loadDeck();
      return ()=> abortController.abort();
    }, [deckId]);
  
    //if readDeck returns a deck with cards in it, will return the following
      if (Object.keys(deck).length) {
        return (
        <>
        <StudyBreadCrumb deck = {deck}/>
        <div className = "container">
        <div className="row">
          <h3>Study: {deck.name}</h3>
        </div>
        <div className="row">
        <StudyCardView cards={deck.cards}/> 
        </div>
        </div>
        </>
        )
      }
        else return "Loading deck...";
};

  export default StudyDeck;
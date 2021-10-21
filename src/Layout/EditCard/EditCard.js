import {useParams, NavLink, useHistory} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { readDeck, readCard, updateCard  } from "../../utils/api";
import EditCardForm from "./EditCardForm";

function EditCard(){

    const initialDeckState = {
        name: "", 
        description: "",
    }

    const initialCardState = {
        front: "", 
        back: "", 
    }
    
    const {cardId, deckId} = useParams();
    const [card, setCard] = useState({...initialCardState});
    const [deck, setDeck] = useState({...initialDeckState});
    const history = useHistory();

    //retrieves current deck
    useEffect(()=> {
        const abortController = new AbortController();
        async function currentDeck(){
            try{
                const thisDeck = await readDeck(deckId, abortController.signal);
                setDeck(thisDeck)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Unable to load deck", deckId);
                }
            }
        }
        currentDeck();
        return () => abortController.abort();
    }, [deckId]);
    
    //retrieves current card information 
    useEffect(()=> {
        const abortController = new AbortController();
        async function currentCard(){
            try{
                const thisCard = await readCard(cardId, abortController.signal);
                setCard(thisCard);
                console.log(thisCard);
            } catch (error) {
                if (error.name === "AbortError"){
                    console.log("Unable to load card", cardId)
                } 
            } 
        }
        currentCard();
        }, [cardId]);
    
    //called when changes made to form
    const handleChange = ({target}) => {
        setCard({
            ...card,
            [target.name]: target.value
        })
    }; 
    
    //called when Submit button clicked
    const handleSubmit = (event) => {
        event.preventDefault();
        async function newCard(){
            try{
                await updateCard(card) ;
                history.push(`/decks/${deckId}`);
            } catch (error){
                if(error.name === "AbortError") {
                    console.log("updateCard Aborted");
                } else {
                throw error;
                }
            }
        }
        newCard();
    };

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                <NavLink to="/" href="/">
                    Home
                </NavLink>
                </li>
                
                <li class="breadcrumb-item">
                <NavLink to={`/decks/${deckId}`}>
                    Deck {deck.name}
                </NavLink>
                </li>
                
                <li class="breadcrumb-item active" aria-current="page">
                Edit card {cardId}
                </li>
            </ol>
        </nav>
        <EditCardForm 
            card = {card}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
        </>
    )
};

export default EditCard;
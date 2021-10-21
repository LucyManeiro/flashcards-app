import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";


function StudyCardView({cards}) {

    const initialState = {
        onBack: false,
        currentCard: 0,
    };

    const { deckId } = useParams();
    const history = useHistory();
    const [session, setSession] = useState({...initialState});
   
    
    const handleNext = () => {
        if (session.currentCard < cards.length - 1) {
            setSession({
                ...session,
                currentCard: session.currentCard + 1,
                onBack: false,
            })
        } 
        else {
            if(window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
                setSession(initialState);
            } else {
                history.push("/");
            }
        
    }
}

    const handleFlip = () => {
        if (session.onBack) {
            setSession({
                ...session,
                onBack: false
            }) 
        } else {
            setSession({
                ...session,
                onBack: true
            })
        }
    }
    
   
    if (cards.length > 2) {
        return (
           <div className="container">
            <div className="card w-100">
                <div className="card-body">
                    <h4 className="card-title">
                        Card {session.currentCard + 1} of {cards.length}
                    </h4>
                    <p className="card-text">
                        {session.onBack 
                        ? cards[session.currentCard].back
                        : cards[session.currentCard].front
                        }                      
                    </p>
                    <button className="btn btn-secondary mr-1" onClick={handleFlip}>Flip</button>
                    {session.onBack && (
                        <button className="btn btn-primary" onClick={handleNext}>Next</button>
                    )}
                </div>
            </div>
            </div>
        )
    } else {
            return (
    <>
    <div className = "container">
    <h3>Not enough cards.</h3>
    <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
    <Link to={`/decks/${deckId}/cards/new`}>
        <button className="btn btn-primary">+ Add Cards</button>
    </Link>
    </div>
    </>

        )
    }
}

export default StudyCardView;
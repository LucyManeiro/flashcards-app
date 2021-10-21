import {updateDeck, readDeck} from "../../utils/api/index";
import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import EditDeckForm from "./EditDeckForm";

function EditDeck(){

    const {deckId} = useParams()
    const history = useHistory();

    const deckReset={
        id: "",
        name: "",
        description: "",
    }

    const [deck, setDeck] = useState(deckReset);

    //retrieves current deck to be edited and sets deck state
    useEffect(() => {
        const abortController = new AbortController();
        async function currentDeck(){
            try{
                const deckFromAPI= await readDeck(deckId, abortController.signal);
                setDeck(deckFromAPI); 
            } catch (error) {
                console.log(error);
            }
        }
        currentDeck();
    },[deckId]);


    //called when any change made to form
    const handleChange = ({target}) => {
        setDeck({
            ...deck,
            [target.name]: target.value
        });
    };

    //called when user clicks Submit button
    async function handleSubmit(event) {
          event.preventDefault();
          await updateDeck({
              ...deck,
              id: deck.id,
              name: deck.name, 
              description: deck.description,
          });
              history.push(`/decks/${deckId}`);
            }
            
    return (    
        <div>
            <div>
                {/* Breadcrumb navigation for  */}
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
            </div>

            <EditDeckForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                deck={deck}
                deckId= {deckId}
                />
            </div>

    )
};

    
export default EditDeck;
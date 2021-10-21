import {useParams, useHistory} from "react-router-dom";
import React, {useState} from "react";
import { createCard } from "../../utils/api";

function AddCardForm(){

const {deckId} = useParams();

  const initialCardState = { 
    front: "", 
    back: "", 
    deckId: 0,
  }

  const [cardForm, setCardForm] = useState({...initialCardState})
  const history= useHistory();

  //called when changes made to form
  const handleChange = ({target}) => {
    setCardForm({
        ...cardForm,
        [target.name]: target.value
    })
  }; 

  
  //called when form submitted
   const handleSave = (event) => {
    event.preventDefault();
    setCardForm({
        ...cardForm,
        deckId: `${deckId}`
    })
    console.log(cardForm)
    async function newCard(){
        try{
            await createCard(deckId, cardForm) ;
            setCardForm({...initialCardState});
            history.push(0);
        } catch (error){
           console.log(error)
        }
       }
      newCard();
    };

 //returns the text boxes for the form
return (    
    <section>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="front" className="form-label">Front:</label>
          <textarea
            type="text"
            class="form-control" 
            id="front"
            rows="5"
            name="front"
            onChange={handleChange}
            value={cardForm.front} 
            required="required"
            placeholder="Front side of card"/>
         </div>
    
         <div class="form-group">
          <label htmlFor="back" className="form-label">Back:</label>
          <textarea 
            class="form-control" 
            id="back" 
            rows="5"
            name="back"
            onChange={handleChange}
            required="required"
            value={cardForm.back}
            placeholder="Back side of the card"/>
          </div>
    
          <button class="btn btn-primary" type="submit">Save</button>
          <button class="btn btn-secondary mx-2" type="button" onClick={()=> history.push(`/decks/${deckId}`)}>Done</button>
       </form>
     </section>
    )
   }

export default AddCardForm;
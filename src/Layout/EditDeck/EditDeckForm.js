import {useHistory} from "react-router-dom";
import React from "react";

function EditDeckForm({deckId, handleSubmit, handleChange, deck}){

  const history= useHistory();

  //Edit deck form input fields and associated buttons
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="name" className="form-label" >Name</label>
          <input 
            id="name"
            type="text"
            class="form-control" 
            name="name"
            onChange={handleChange}
            value={deck.name} 
            required="required"
          />
        </div>

        <div class="form-group">
          <label htmlFor="Description" className="form-label">Description</label>
          <textarea 
            class="form-control" 
            id="Description" 
            rows="5"
            name="description"
            onChange={handleChange}
            required="required"
            value={deck.description}
          />
        </div>

        <button class="btn btn-secondary mx-2" type="button" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
        <button class="btn btn-primary" type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  )
};

export default EditDeckForm;
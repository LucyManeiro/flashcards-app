import {useHistory, useParams} from "react-router-dom";


function EditCardForm({card, handleSubmit, handleChange}){

    const history= useHistory();
    const {deckId} = useParams();

    //form input fields and associated buttons
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea
                        class="form-control"
                        id="front"
                        rows="5"
                        name="front"
                        onChange={handleChange}
                        required="required"
                        value={card.front}
                    />
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea
                        class="form-control"
                        id="back"
                        rows="5"
                        name="back"
                        onChange={handleChange}
                        required="required"
                        value={card.back}
                    />
                    <button class="btn btn-secondary m-1" type="button" onClick={()=> history.push(`/decks/${deckId}`)}>Cancel</button>

                    <button class="btn btn-primary m-3" type="submit">Submit</button>
                </div>
            </form>
        </section>
   
    )
};

export default EditCardForm;
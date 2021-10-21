import {NavLink, useParams} from "react-router-dom";

//breadcrumb navigation at top of Study deck page
function StudyBreadcrumb({deck}){

    const {deckId} = useParams();

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
                  {deck.name}
                </NavLink>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                  Study
                </li>
            </ol>
        </nav>
    </>
    )
};

export default StudyBreadcrumb;
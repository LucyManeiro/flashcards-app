import React from "react";
import {Switch, Route} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Home/DeckList"
import CreateDeck from "./CreateDeck/CreateDeck";
import ViewDeck from "./DeckView/ViewDeck";
import StudyDeck from "./StudyDeck/StudyDeck";
import EditDeck from "./EditDeck/EditDeck";
import AddCards from "./AddCards/AddCards";
import EditCard from "./EditCard/EditCard";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
       <Switch>
        <Route exact path="/">
          <DeckList/>
        </Route> 
         
         <Route path="/decks/new">
          <CreateDeck/>
        </Route>
         
        <Route path="/decks/:deckId/cards/new"> 
          <AddCards/>
        </Route> 
         
         <Route path="/decks/:deckId/study"> 
          <StudyDeck/>
        </Route>
         
         <Route path="/decks/:deckId/edit"> 
          <EditDeck/>
         </Route>
         
          <Route path = "/decks/:deckId/cards/:cardId/edit">
          <EditCard/>
          </Route>
         
        <Route exact path="/decks/:deckId">
          <ViewDeck/>
        </Route>
       
        <Route>
          <NotFound />
        </Route>
    
      </Switch>
      </div>
    </div>
  );
}

export default Layout;

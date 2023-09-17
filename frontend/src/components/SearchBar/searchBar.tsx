import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons"


export default function CustomSearchBar({
  handleSearchBar,
  searchBarTerm,
  setSearchBarterm,
}:{
  handleSearchBar: () => void;
   searchBarTerm: string;
  setSearchBarterm: (searchBarTerm: string) => void;
}) {

  return(<div className="search-bar" style={{marginTop:"30px"}}>
       <InputGroup>
          <FormControl
            type="text"
            placeholder="Rechercher par voitures ou par piéces..."
            value={searchBarTerm}
            onChange={(e) => setSearchBarterm(e.target.value)}
          />
             <Button variant="outline-secondary" onClick={handleSearchBar}> 
            <Search />
        </Button>
        </InputGroup>
       </div>)
}


import { useState, useEffect } from "react";
import { Cocktail } from "../interfaces/Cocktail";
import {styled} from "styled-components";
import palm from "../palm.png";

const SingleCocktailDiv = styled.div`
  margin: 1rem;
  padding: 1rem;
  width: 20rem;
  background-color: #FFC067;
  border-radius: 1px;
  text-align: center;
  color: black;
`;

const ParentDiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width:90%;
    margin: auto; 
    
`;

/* Had to add more styling due to random boxes around text */
const StyledTitle = styled.h3`
  background-color: inherit; 
  padding: 0;
  border: none;
`;

const InstructionsText = styled.p`
  background-color: inherit; 
  padding: 0;
  margin: 10%;
  border: none;
  font-size: 1rem;
  text-align: center;
`;

const CocktailPreview = ({cocktail}: {cocktail: Cocktail}) => {
    return(
        <SingleCocktailDiv>
            <StyledTitle>{cocktail.strDrink}</StyledTitle>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="100" />
            <InstructionsText>{cocktail.strInstructions}</InstructionsText>
        </SingleCocktailDiv>
    );
};

export default function CocktailList(){
    const [searchQuery, setSearchQuery] = useState("");
    const [cocktails, setCocktails] = useState<Cocktail[]>([]);

    useEffect(() => {
        if (!searchQuery) return;

        async function getCocktails() {
            const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
            const data = await res.json();
        setCocktails(data.drinks || []);
    }
    getCocktails();
    },[searchQuery]);

    return(
        <div>
            <div id="title">
                <img src={palm} alt="palm" width="100"/>
                <h1> Welcome to my Cocktail Website!</h1>
                <img id="tree2" src={palm} alt="palm" width="100"/>
            </div>
            <h2> Please search a cocktail below </h2>
            <input
            type ="text"
            placeholder="Search Cocktail"
            value={searchQuery}
            onChange = {(e) => setSearchQuery(e.target.value)}
            />
            <ParentDiv>
                {cocktails.map((cocktail) => (
                 <CocktailPreview key={cocktail.idDrink} cocktail={cocktail} />
                ))}
            </ParentDiv>

        </div>
    );
}
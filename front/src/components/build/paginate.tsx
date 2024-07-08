// BUILDER
import Dropdown from "#components/build/global/dropdown";
import Button from "#components/build/global/button";
// DATA
import { Dropdown_option_recipe } from "#1_data/links";
// REACT
import { useState, useEffect } from "react";
// TYPAGE
import { paginate } from "#0_types/typages";
//
//
//
//
//
export default function Paginates ({
data,
requette,
showEntrie,
}:paginate){
//
//
// VARIABLE
//
//
const ShowEntries = showEntrie;
const [page, setPage] = useState(`1`);
const [numberPaginate, seNumberPaginate] = useState<number>(1);
const ShowEntriesMIN =  Math.ceil((parseInt(page) - 1) * ShowEntries);
const ShowEntriesMAX =  Math.ceil(parseInt(page) * ShowEntries);
//
//
// FUNCTION
//
//
//
useEffect(() => { 
requette("quantite_max", `${ShowEntriesMAX}`, "quantite_min", `${ShowEntriesMIN}`)
  }, [page]);
//
useEffect(() => { 
    seNumberPaginate(Math.ceil((typeof data === "number" ? data : 0)  / ShowEntries))
}, [data]);
//
// CHANGE PAGE
const nextPage = () =>{
    if(parseInt(page) < numberPaginate){
      setPage(`${parseInt(page) + 1}`)
    }
    }
  //
const previousPage = () =>{
      if(parseInt(page) > 1){
        setPage(`${parseInt(page) - 1}`)
      }
    } 
//
//
// BUILDER
//
//
// ALL PAGE
const Paginate = [];
for (let i = 1; i <= numberPaginate; i++) {
  Paginate.push({ name: `${i}`});
}
// ELEMENT NAVIGATION DE PAGE
const navigation_pagination = (
    <>
    {numberPaginate > 1 && (
        <div className="navigation_pagination">
    <Button
    variant="t2"
    fontSize="s2"
    item_i={true}
    children="retour"
    fonction={previousPage}
    />
    <div>
  <Dropdown
    variant="t12"
    placeholder="Rechercher"
    value={`${page}/${numberPaginate}`}
    text={`${page}/${numberPaginate}`}
    icon={Dropdown_option_recipe[0].icon}
    variable={Dropdown_option_recipe[0].variable}
    list={Paginate}
    fonction={setPage}
    search={true}
    filter={Dropdown_option_recipe[0].filter}
    modale={Dropdown_option_recipe[0].modale}
    show={true}
  />
  </div>
    <Button
    variant="t2"
    fontSize="s2"
    item_i={true}
    children="suivant"
    fonction={nextPage}
    />    
        </div>
    )}
    </>
  ) 
//
//
// RETURN
//
//
return navigation_pagination;
}
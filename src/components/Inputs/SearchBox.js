import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { searchRecipes } from "../../firebase/firebase";

function SearchBox() {
  const [search, setSearch] = useState("");

  function handleSearch(){
    console.log("called search handler")
    searchRecipes(search);
  }

  return (
    <>
      <CiSearch style={{cursor:"pointer"}} onClick={handleSearch} />{" "}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="searchBox"
      />
    </>
  );
}

export default SearchBox;

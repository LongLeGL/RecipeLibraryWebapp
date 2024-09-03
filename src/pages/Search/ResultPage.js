import "./ResultPage.css";
import React from "react";
import { useEffect, useState } from "react";
import { searchRecipes } from "../../firebase/firebase";
import { Link, useSearchParams } from "react-router-dom";
import SearchSortBar from "../../components/Inputs/SearchSortBar";
import ReactStars from "react-rating-stars-component";
import convertDateTime from "../../lib/convertDateTime";

function ResultPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const searchQuery = queryParameters.get("q");
  const tagsQuery =
    queryParameters.get("tags") !== ""
      ? queryParameters.get("tags").split(",")
      : [];
  const orderQuery = queryParameters.get("o");
  console.log(
    `Page search params: ${searchQuery} - ${tagsQuery} - ${orderQuery}`
  );
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchRecipes(searchQuery, tagsQuery, orderQuery)
      .then((recipes) => {
        setResults(recipes);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Err searching recipes on page load:", e.message);
      });
  }, []);

  return (
    <div className="ResultPage">
      <SearchSortBar kw={searchQuery} tags={tagsQuery} order={orderQuery} />
      <div className="ResultsContainer">
        {loading || results.length < 0 ? (
          <div className="NoResultFound">
            {loading ? "Loading..." : "No results found"}
          </div>
        ) : (
          <div className="ResultListItem">
            {results.map((item, index) => (
              <div className="Item" key={index}>
                <Link to={`/ViewRecipe/${item.id}`}>
                  <div className="ResultItemInfo">
                    <h2>{item.name}</h2>
                    <br />
                    <p>By: {item.author.name}</p>
                    <div
                      style={{
                        display: "flex",
                        alignitem: "center",
                        paddingTop: "0.5em",
                        paddingBottom: "0.3em",
                      }}
                    >
                      <p>Rating: {item.score?.toFixed(1)} </p>
                      <ReactStars
                        count={1}
                        size={15}
                        color="#ffd700"
                        className="ResultRateStars"
                      />
                    </div>
                    <span className="CreatedTimeDisplay">
                      {convertDateTime(item.createdTime)}
                    </span>
                  </div>
                  <div
                    id="ResultItemImage"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPage;

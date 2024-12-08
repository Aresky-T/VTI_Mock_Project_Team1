import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const PreviousSearch = ({ search, setSearch }) => {
  const searches = ["pizza", "kẹo", "cơm", "bún", "thịt", "súp"];
  const [text, setText] = useState("");
  const [isActiveSearchButton, setIsActiveSearchButton] = useState(false);

  const handleChangeSearch = useCallback(() => {
    if (!isActiveSearchButton) return;
    setSearch(text);
    setText("");
    //eslint-disable-next-line
  }, [text, isActiveSearchButton]);

  useEffect(() => {
    setIsActiveSearchButton(!!text.trim());
  }, [text]);

  return (
    <div className="previous-searches section">
      <h2 className="font-2 fw-600">Search Suggestions</h2>
      <div className="previous-searches-container">
        {searches.map((search, index) => (
          <div
            key={index}
            style={{ animationDelay: index * 0.1 + "s" }}
            className="search-item"
            onClick={() => {
              setText(search);
            }}
          >
            {search}
          </div>
        ))}
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search ..."
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={`btn${isActiveSearchButton ? " active" : ""}`}
          onClick={handleChangeSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default PreviousSearch;

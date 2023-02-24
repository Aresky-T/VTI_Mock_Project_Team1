import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const PreviousSearch = ({ search, setSearch }) => {

    const searches = ['pizza', 'kẹo', 'cơm', 'bún', 'thịt', 'Súp'];
    const [text, setText] = useState(search);

    function handleChangeSearch(text) {
        setSearch(text);
    }

    useEffect(() => {
        if (text.length < 1) {
            setSearch('');
        }
    })

    return (
        <div className='previous-searches section'>
            <h2>Previous Searches</h2>
            <div className="previous-searches-container">
                {searches.map((search, index) => (
                    <div key={index} style={{ animationDelay: index * .1 + "s" }}
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
                <input type="text" placeholder="Search ..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="btn"
                    onClick={() => handleChangeSearch(text)}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    )
}

export default PreviousSearch
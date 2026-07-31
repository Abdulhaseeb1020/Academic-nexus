import React, { useState } from "react";
import "./JudgeSearch.css";
import { FaSearch } from "react-icons/fa";

export default function JudgeSearchbar({judges}) {
    const [searchItem, setSearchItem] = useState("");
    const term = searchItem.toLocaleLowerCase().trim();

 

    const match = term === "" ? [] : (judges.filter((judge) =>
        judge.name?.toLowerCase().includes(term) ||
        judge.department?.toLowerCase().includes(term) ||
        judge.expertise?.toLowerCase().includes(term)));

    const handleView = (judge) => {
        setSearchItem("")
    }

    return (
        <div className="Search-container">
            <div className="Search-wrapper">
               <div className="Search-header">
        <div className="Search-input">
            <FaSearch className="search-icon" />
            <input
                className="search"
                type="search"
                placeholder="Search Evaluators by Name, Department or Expertise"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
            />
        </div>

        <h2>Profile</h2>
    </div>
                {term !== "" && (
                    <div className="Search-dropdown">
                        {match.length === 0 ? (
                            <p className="no-results">No search results found</p>
                        ) : (
                            match.map((judge) => (
                                <div className="search-result"
                                    key={judge.id}
                                    onClick={() => handleView(judge)}>
                                    <span className="search-result-name">{judge.name}</span>
                                    <span className="search-result-expertise">{judge.expertise}</span>
                                    <span className="search-result-department">{judge.department}</span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
import React from "react";
import { useState } from "react";
import "./judgeCard.css";

export default function JudgeCard({ role, judges, deleteJudge }) {
    const [showProfile, setShowProfile] = useState(false);
    const [selectedJudge, setSelectedJudge] = useState(null);

    if (!judges || judges.length === 0) {
        return <p className="no-judges">No judges added yet.</p>;
    }

    const handleViewProfile = (judge) => {
        setShowProfile(true);
        setSelectedJudge(judge);
    }
    const handleCloseProfile = () => {
        setShowProfile(false);
        setSelectedJudge(null);
    }

    return (
        <div className="overall-page">
            <div className="Card-container">
                {judges.map((judge) => {
                    const skillsArray = Array.isArray(judge.expertise)
                        ? judge.expertise
                        : typeof judge.expertise === "string"
                        ? judge.expertise.split(",").map((s) => s.trim())
                        : [];

                    return (
                        <div className="card" key={judge.id || judge.name}>
                            <div className="image-dev">
                                <h3>{judge.name}</h3>
                                <p>Dept of. {judge.department}</p>
                            </div>

                            <h3>Areas Of Interest</h3>

                            <ul className="judge-expertise">
                                {skillsArray.map((skill, index) => (
                                    <li key={`${skill}-${index}`}>{skill}</li>
                                ))}
                            </ul>
<div className="btnss">
  <button onClick={() => handleViewProfile(judge)}>
    ViewProfile
  </button>
  { role==="admin" &&(
  <button onClick={() => deleteJudge(judge.id)}>Delete Judge</button>)}
</div>
                        </div>
                    );
                })}
                {  selectedJudge && showProfile &&(
                    <div className="Judge-info" onClick={handleCloseProfile}>
                        <div className="info" onClick={(e)=>e.stopPropagation()} >
                      <h1>Profile Information</h1>
                      <label>Name:</label>
                      <h3>{selectedJudge.name}</h3>
                      <label>Department</label>
                      <h3>{selectedJudge.department}</h3>
                      <label>Expertise</label>
                      <h3>{selectedJudge.expertise}</h3>
                      <label>Email Address</label>
                      <h3>{selectedJudge.email}</h3>
                      <label>Contact Number</label>
                      <h3>{selectedJudge.contact}</h3>
                      <button onClick={handleCloseProfile}>Close</button>
                      </div>
                    </div>
                )}
            </div>
        </div>
    );
}
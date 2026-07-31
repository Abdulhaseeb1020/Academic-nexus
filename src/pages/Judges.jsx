import React, { useState } from "react";
import Sidebar from "../components/Sidebar"
import "./Judges.css";
import JudgeSearchbar from "../components/JudgeSearch";
import AddJudges from "../components/Add-judges-modal";
import JudgeCard from "../components/JudgeCard";




export default function Judges({ role, judges, addJudges, deleteJudge }) {
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  };
  return (
    <div className="container">
      <Sidebar role={role} />
      <div className="main-content">
        <JudgeSearchbar judges={judges} />
        <div className="h1-btn"> <h1>Meet The panel</h1>
        {role==="admin" &&(
          <button className="add-judge-btn" onClick={() => setShowModal(true)}>+ Add Judge</button>)}</div>
        <p>Connect with your fellow Evaluators and Academic experts. Collaborate on interdisciplinary project reviews and share Domain-specific insights Across the Academic Nexus network.</p>


        {showModal && (
          <AddJudges
            closeModal={closeModal}
            judges={judges}
            AddJudges={addJudges} />
        )
        }
        {
          judges.length===0 ?(<p>No judge to display</p>):(
            <JudgeCard
            judges={judges}
            deleteJudge={deleteJudge}
            role={role}
            />
          )
        }

        {/* your judge page content goes here */}

      </div>
      {/*End of Container*/}
    </div>
  )
}
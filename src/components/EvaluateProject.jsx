import React from "react";
import "./EvaluateProject.css";
import { useState } from "react";
import { GoProjectSymlink } from "react-icons/go";
import { FcIdea } from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
import { IoDocument } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";





export default function EvaluateProject({ project, updateProject, closeModal }) {

    const [innovation, setInnovation] = useState(
    project.evaluation?.innovation || 0
);

const [Implementation, setImplementation] = useState(
    project.evaluation?.Implementation || 0
);

const [documentation, setDocumentation] = useState(
    project.evaluation?.documentation || 0
);

const [presentation, setPresentation] = useState(
    project.evaluation?.presentation || 0
);

const [remarks, setRemarks] = useState(
    project.evaluation?.remarks || ""
);
const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleInnovationWheel = (e) => {
        e.preventDefault();
        setInnovation((prev) => Math.min(10, Math.max(0, prev + (e.deltaY < 0 ? 1 : -1))));

    }
    const handleImplementationWheel = (e) => {
        e.preventDefault();
        setImplementation((prev) => Math.min(10, Math.max(0, prev + (e.deltaY < 0 ? 1 : -1))));

    }
    const handleDocumentationWheel = (e) => {
        e.preventDefault();
        setDocumentation((prev) => Math.min(10, Math.max(0, prev + (e.deltaY < 0 ? 1 : -1))));

    }
    const handlePresenatationWheel = (e) => {
        e.preventDefault();
        setPresentation((prev) => Math.min(10, Math.max(0, prev + (e.deltaY < 0 ? 1 : -1))));
    }
    const savedEvaluation = () => {
        const updatedProject = {
            ...project,
            status: "Evaluated",
            evaluation: {
                innovation,
                Implementation,
                documentation,
                presentation,
                overallScore,
                remarks,


            }
        }
        updateProject(updatedProject);
        closeModal();
    }

    const handleSubmit = () => {
        if (project.evaluation) {
            setShowConfirmModal(true);
            return;
        }
        savedEvaluation();

    }

    const overallScore = ((Implementation + innovation + presentation + documentation) / 4).toFixed(1)
    return (
        <>
        <div className="Evaluation-dev">

            <h1>  <GoProjectSymlink className="icon" />Evaluate Project</h1>
            <div className="innovation-dev">
                <h2><FcIdea className="innovation icon" />Innovation: <span className="innovation">{innovation}/10</span></h2>
                <input type="range"
                    min="0" max="10"
                    value={innovation}
                    onChange={(e) => setInnovation(Number(e.target.value))}
                    step="0.1"
                    onWheel={handleInnovationWheel}
                />
            </div>
            <div className="implementation-dev">
                <h2>
                    <FcTodoList className="implementaion icon" />
                    Implemenation:     <span className="implementation"> {Implementation}/10</span>
                </h2>
                <input type="range"
                    max="10"
                    min="0"
                    step="0.1"
                    value={Implementation}
                    onChange={(e) => setImplementation(Number(e.target.value))}
                    onWheel={handleImplementationWheel} />

            </div>
            <div className="documentation-dev">
                <h2><IoDocument className="documentation icon" /> Documentation: <span className="documentation">{documentation}/10</span></h2>
                <input type="range"
                    max="10"
                    min="0"
                    step="0.1"
                    value={documentation}
                    onChange={(e) => setDocumentation(Number(e.target.value))}
                    onWheel={handleDocumentationWheel} />

            </div>
            <div className="presentation-dev">
                <h2><RiComputerLine className="prestation icon" />Presentation: <span className="presentation">{presentation}/10</span></h2>
                <input type="range"
                    max="10"
                    min="0"
                    value={presentation}
                    onChange={(e) => setPresentation(Number(e.target.value))}
                    onWheel={handlePresenatationWheel} />
            </div>
            <div className="overallScore-dev">
                <h2>Overall Score</h2>
                <h2 className="score">{overallScore}/10</h2>
            </div>
            <div className="remarks-dev">
                <h2>Remarks</h2>
                <textarea rows="2"
                    placeholder="Add remarks for the team"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)} />
            </div>
            {/* End of evaluation dev*/}
            <button type ="button" onClick={closeModal}> Cancel</button>
            <button type="button" onClick={handleSubmit}>Submit Evaluation</button>
        </div>
       {showConfirmModal && (
  <div className="confirm-overlay">
    <div className="confirm-modal">
      <h2>Update Evaluation?</h2>

      <p>
        This project has already been evaluated.
        <br />
        Updating it will replace the previous marks.
      </p>

      <div className="confirm-buttons">
        <button
        type="button"
          className="cancel-btn"
          onClick={() => setShowConfirmModal(false)}
        >
          Cancel
        </button>

        <button
        type="button"
          className="update-btn"
          onClick={() => {
            savedEvaluation();
            setShowConfirmModal(false);
          }}
        >
          Yes, Update
        </button>
      </div>
    </div>
  </div>
)}
    </>
    )
    
}
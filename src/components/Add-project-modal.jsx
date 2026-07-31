import React, { useState } from "react";

export default function AddProjectsModal({ addProjects, closeModal, newProject }) {
  const [projectName, setProjectName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription]=useState("")
  const [supervisor, setSupervisor]=useState("");
  const [toast, setToast]=useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim() || !studentName.trim() || !department.trim()) return;

    const newProject = {
      id: Date.now(),
      projectName: projectName.trim(),
      studentName: studentName.trim(),
      department: department.trim(),
description:description.trim(),
supervisor:supervisor.trim(),
      status: "Pending",
        createdAt: new Date().toISOString(),
    };

    addProjects(newProject);
    closeModal();
      
    
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Add Project</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>Enter Your Name</label>
          <input
            type="text"
            value={studentName}
            placeholder="Your Name Goes Here"
            onChange={(e) => setStudentName(e.target.value)}
          />

          <label>Enter Your Project Name</label>
          <input
            type="text"
            value={projectName}
            placeholder="Use Correct and Unique Name"
            onChange={(e) => setProjectName(e.target.value)}
          />
          <label>Enter Your Supervisor Name</label>
          <input type="text" value={supervisor}
          onChange={(e)=>setSupervisor(e.target.value)}/>

          <label>Department</label>
          <input
            type="text"
            value={department}
            placeholder="CS, English, BBA etc"
            onChange={(e) => setDepartment(e.target.value)}
          />
        <label>write a description about your project</label>
        <textarea placeholder="A brief into of your project"
        value={description}
        onChange={(e)=>setDescription(e.target.value)
          
        }

        rows={5}
        />
          <div className="modal-actions">
            <button className="modal-button primary" type="submit">
              Submit
            </button>
            <button className="modal-button secondary" type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        
        </form>
       
      </div>
    </div>
  );
}
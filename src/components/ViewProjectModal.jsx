import React from "react";
import { useState } from "react";
import "./ViewProject.css"
export default function ViewProjectModal({project, closeModal, updateProject, role}){
    const [isEditing, setIsEditing]= useState(false);
    const [studentName, setStudentName]=useState(project.studentName);
    const [projectName, setProjectName]= useState(project.projectName);
    const [department, setDepartment]=useState(project.department);
    const [supervisor, setSupervisor]=useState(project.supervisor);
    const [description, setDescription]=useState(project.description||"");
    const [status, setStatus]= useState(project.status);
    const handleSave=()=>{
    const updatedProject={
        ...project,
        studentName,
        department,
        projectName,
        description,
        supervisor,
        status
    };

    updateProject(updatedProject);
    setIsEditing(false);
    closeModal();
    }
    return(
        <div className="modal-overlay">
            <div className="modal-div">
<h2>Project Details</h2>
{
    isEditing ?(
        <>
        <label>Project Name</label>
        <input type="text"
        value={projectName}
        onChange={(e)=>setProjectName(e.target.value)}/>
        <label>Student Name</label>
        <input type="text"
        value={studentName}
        onChange={(e)=>setStudentName(e.target.value)}/>
        <label>Department</label>
        <input type="text"
        value={department}
        onChange={(e)=>setDepartment(e.target.value)}

        />
        <label>Supervisor</label>
        <input type="text" value={supervisor} onChange={(e)=>setSupervisor(e.target.value)}/>
        <label>Description</label>
        <textarea rows="5"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}/>
        <label>Status</label>
        <select value={status} onChange={(e)=>setStatus(e.target.value)}>
<option>Pending</option>
<option>Evaluated</option>

        </select>
                
<button onClick={handleSave}>Save</button>
<button onClick={()=>setIsEditing(false)}>Cancel</button>
        </>
    
    ):(
        <>
        <p>
            <strong>Project:</strong>{""}
            {project.projectName}
        </p>
        <p>
            <strong>Student Name:</strong>{" "}
            {project.studentName}
        </p>
        <p>
            <strong>Department:</strong>{" "}
            {project.department}
        </p>

        <p>
            <strong>Supervisor:</strong>{" "}
            {project.supervisor}
        </p>
        <p>
            <strong>Description:</strong>{" "}
            {project.description||"No description"}
        </p>
        <p><strong>Status:</strong>{" "}
        {project.status}
        </p>
        {role ==="admin"? (<button onClick={()=>setIsEditing(true)}>Edit</button>):""}
        <button onClick={closeModal}>Close</button>
        </>
    )
}

            </div>
        </div>
    )
}
import React from "react";
import DeleteBtn from "../Buttons/Delete-project-btn";
import ViewBtn from "../Buttons/ViewBtn";


export default function RecentProjects({ projects, deleteProject, viewProject }) {
  return (
    <div className="recent-projects-container">
      <table className="projects-table">
        <thead>
          <tr className="headings-row">
            <th>Project Name</th>
            <th>Student Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Supervisor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr>
              <td colSpan="6">No Projects to Display</td>
            </tr>
          ) : (
            projects.slice(-6).map((project) => {
            
              return (<tr key={project.id}>
                <td>{project.projectName}</td>
                <td>{project.studentName}</td>
                <td>{project.department}</td>
                <td>{project.status}</td>
                <td>{project.supervisor}</td>
                <td><DeleteBtn 
                onDelete={deleteProject}
                id={project.id}/>
               <ViewBtn project={project}
               onView={viewProject}
               />
                
                </td>
              </tr>)
})
          )}
        </tbody>
      </table>
    </div>
  );
}
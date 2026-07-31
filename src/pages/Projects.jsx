import "./Projects.css";
import React from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/Search-component";
import ViewProjectModal from "../components/ViewProjectModal";
import { useState } from "react";
import AddProjectsModal from "../components/Add-project-modal";
import DeleteBtn from "../Buttons/Delete-project-btn";
import ProjectCard from "../components/ProjectsCard";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import EvaluateProject from "../components/EvaluateProject";
export default function Projects({ role, projects, updateProject, deleteProject, addProjects })
 {
  const cardImages = [image1, image2, image3, image4];
  const [showModel, setShowModel] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModal, setActiveModal]=useState(null)
  const [departmentFilter, setDepartmentFilter] =useState("All");
  const [statusFilter, setStatusFilter] =useState("All");
  const viewProject = (project) => {
    setSelectedProject(project);
  setActiveModal("view")}


const departments=["All", ...new Set(projects.map((project)=>project.department))];
const statuses=["All", ...new Set(projects.map((project)=>project.status))];
const filteredProjects=projects.filter((project)=>{
  const matchedDepartment=departmentFilter==="All"||
  project.department===departmentFilter;
  const matchedStatus=statusFilter==="All"||
  project.status===statusFilter;
  return matchedDepartment && matchedStatus
})
const openEvaluationModal=(project)=>{
  setSelectedProject(project);
  setActiveModal("evaluate")
}
const closeModal=()=>{
  setSelectedProject(null);
  setActiveModal(null);
}

  return (
    <div className="projects-layout">
      <Sidebar role={role} />
      <div className="main-content">
        <SearchBar projects={projects} viewProject={viewProject} />
        {activeModal==="view" && (
          <ViewProjectModal
            project={selectedProject}
            closeModal={closeModal}
            updateProject={updateProject}
            role={role}
          />
        )}
        <div className="topbar">
          <h2>Research Projects</h2>

          {role === "admin" && (
            <button onClick={() => setShowModel(true)}>
              Add New Project
            </button>
          )}
          {showModel && (
            <AddProjectsModal
              addProjects={addProjects}
              closeModal={() => setShowModel(false)}
            />
          )}
          {/*End of the topbar */}
        </div>
        <div className="Filter-dev">  
          <label>Filter BY:</label>
          <div className="Department-filter">
            <label>DEPARTMENT</label>
            <select value={departmentFilter} onChange={(e)=>setDepartmentFilter(e.target.value)}>
              { departments.map((department)=>(
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
            {/*End of Department filter */}
          </div>
          <div className="Status-filter">
            <label>STATUS</label>
            <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
              {statuses.map((status)=>(
                <option value={status} key={status}>{status}</option>
              ))}
            </select>
            {/*End of the status dev */}
          </div>
</div>
          {/*End of the Filter Dev */}
                    <div className="projects-dev">
            {filteredProjects.map((project, index) => (
             <ProjectCard 
             key={project.id|| index}
             project={project}
             role={role}
              image={cardImages[index % cardImages.length]}
              viewProject={viewProject}
              deleteProject={deleteProject}
              openEvaluationModal={openEvaluationModal}
             />

                 
            ))}
            {activeModal==="evaluate" && (
<EvaluateProject 
project={selectedProject}
updateProject={updateProject}
closeModal={closeModal}
/>
            )}
          </div>
        
      </div>
    </div>
  );
}
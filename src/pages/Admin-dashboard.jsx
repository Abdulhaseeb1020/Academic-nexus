import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/Search-component";
import "./Admin-dashboard.css";
import ViewProjectModal from "../components/ViewProjectModal";
import { HiBriefcase, HiClipboardList } from "react-icons/hi";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { BsPersonBadgeFill } from "react-icons/bs";
import RecentProjects from "../components/Recently-added-projects";
import AddProjectsModal from "../components/Add-project-modal";
import { NavLink } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import ProjectCard from "../components/ProjectsCard";
import image1 from "../images/image1.jpg";
import image2 from "../images/image2.jpg";
import image3 from "../images/image3.jpg";
import image4 from "../images/image4.jpg";
import EvaluateProject from "../components/EvaluateProject";

export default function AdminDashboard({
  projects = [],
  addProjects,
  updateProject,
  deleteProject,
  role,
  judges
}) {
  const cardImages = [image1, image2, image3, image4];
  const [showModel, setShowModel] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModal, setActiveModal]=useState(null);
  const [filterOption, setFilterOption] = useState("Newest");

  const viewProject = (project) => {
    setSelectedProject(project);
    setActiveModal("view");
  };

  const totalProjects = projects.length;
  const pendingProjects = projects.filter(
    (project) => project.status === "Pending"
  ).length;
  const evaluatedProjects = projects.filter(
    (project) => project.status === "Evaluated"
  ).length;


  let displayedProjects = [...projects];
console.log(displayedProjects.map(p => p.createdAt));
  switch (filterOption) {
    case "Newest":
      displayedProjects.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "Oldest":
      displayedProjects.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case "Alphabetical":
      displayedProjects.sort((a, b) =>
        (a.projectName || "").localeCompare(b.projectName || "")
      );
      break;
    case "Evaluated":
      displayedProjects = displayedProjects.filter(
        (project) => project.status === "Evaluated"
      );
      break;
    case "Pending":
      displayedProjects = displayedProjects.filter(
        (project) => project.status === "Pending"
      );
      break;
    default:
      break;
  }
  const evaluated = projects.filter(project => project.evaluation);
const total =
evaluated.length
    ? (
        evaluated.reduce(
            (sum, project) => sum + Number(project.evaluation.overallScore),
            0
      ) / evaluated.length
      ).toFixed(2)
    : "0.00";
  const openEvaluationModal=(project)=>{
  setSelectedProject(project);
  setActiveModal("evaluate");
}
const closeModal=()=>{
  setSelectedProject(null);
  setActiveModal(null);
}
const recentProjects = displayedProjects.slice(0, 6);


  return (
    <div className="container">
      <Sidebar role={role} />

      <div className="main-content">
        <SearchBar projects={projects} viewProject={viewProject} />

        {role === "admin" ? (
          <>
            <h2>Administrative Overview</h2>
            <p>
              Monitoring real-time evaluation metrics across several departments
            </p>
          </>
        ) : (
          <>
            <h2>Judge Dashboard</h2>
            <p>Review and score your assigned engineering capstones.</p>
          </>
        )}

        <div className="evaluation-status-container">
          <div className="total-projects box">
            <HiBriefcase className="total-projects-icon icon" />
            {role === "admin" ? (
              <>
                <p>Total Projects</p>
                <h4>{totalProjects}</h4>
              </>
            ) : (
              <>
                <h4>{totalProjects}</h4>
                <p>Assigned Projects</p>
              </>
            )}
          </div>

          <div className="pending-evaluation box">
            <HiClipboardList className="pending-icon icon" />
            {role === "admin" ? (
              <>
                <p>Pending Evaluation</p>
                <h4>{pendingProjects}</h4>
              </>
            ) : (
              <>
                <h4>{pendingProjects}</h4>
                <p>Pending  </p>
              </>
            )}
          </div>

          <div className="evaluated box">
            {role==="admin" || role==="judge" ? (
              <>
            <IoCheckmarkDoneCircle className="evaluated-icon icon" />
            <p>Evaluated</p>
            <h4>{evaluatedProjects}</h4> </>): ("")
}
          </div>

          <div className="active-judges box">
            {role === "admin" ? (
              <>
                <BsPersonBadgeFill className="judge-icon icon" />
                <p>Active Judges</p>
                <h4>{judges.length}</h4>
              </>
            ) : (
              <>
                <h3>Average Score</h3>
                <h3>{total}</h3>
              </>
            )}
          </div>
        </div>

        {role === "admin" && (
          <div className="recently-uploaded-projects">
            <div className="top-line">
              <h3>Recently Uploaded Projects</h3>
              <NavLink to="/projects">
                <h3>View All Projects</h3>
              </NavLink>
            </div>

            <button onClick={() => setShowModel(true)}>
              <span>Add New Project</span>
            </button>

            <RecentProjects
              projects={projects}
              deleteProject={deleteProject}
              viewProject={viewProject}
            />

            {showModel && (
              <AddProjectsModal
                addProjects={addProjects}
                closeModal={() => setShowModel(false)}
              />
            )}

            {selectedProject && (
              <ViewProjectModal
                project={selectedProject}
                closeModal={() => setSelectedProject(null)}
                updateProject={updateProject}
              />
            )}
          </div>
        )}

        {role === "judge" && (
          <>
            <div className="judge-filter">
              <h3>Queue: Review Required</h3>
              <label>
                <MdFilterList className="filter-icon" />
                <select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                >
                  <option value="Newest">Newest First</option>
                  <option value="Oldest">Oldest First</option>
                  <option value="Alphabetical">Alphabetical A-Z</option>
                  <option value="Evaluated">Evaluated Projects</option>
                  <option value="Pending">Pending Projects</option>
                </select>
              </label>
            </div>

            <div className="projects-dev">
              {activeModal==="view" && (
                <ViewProjectModal
                  project={selectedProject}
                  closeModal={closeModal}
                  updateProject={updateProject}
                  role={role}
                />
              )}
              {recentProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  image={cardImages[index % cardImages.length]}
                  role={role}
                  viewProject={viewProject}
                   openEvaluationModal={openEvaluationModal}
                />

              ))}
              {
                activeModal==="evaluate" &&(
                  <EvaluateProject
                  project={selectedProject}
                  updateProject={updateProject}
                  closeModal={closeModal}
                  />
                )
              }
            </div>
          </>
        )}
      </div>
    </div>
  );
}
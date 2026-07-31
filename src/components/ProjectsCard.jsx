import DeleteBtn from "../Buttons/Delete-project-btn";
import "./ProjectCard.css"
import { IoCheckmarkDoneCircle } from "react-icons/io5";
<IoCheckmarkDoneCircle />
export default function ProjectCard({
  project,
  role,
  image,
  viewProject,
  deleteProject,
  openEvaluationModal
}) {
  return (
    <div className="project-card">
      <div
        className="project-img"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="project-details">
        {project.evaluation &&(
          <h3>
            <IoCheckmarkDoneCircle className="icon"/>
            EVALUATED
          </h3>
        )}
        <h4>{project.projectName}</h4>

        <p>
          <strong>Name:</strong> {project.studentName}
        </p>

        <p>
          <strong>Dept:</strong> {project.department}
        </p>

        <p>
          <strong>Supervisor:</strong> {project.supervisor}
        </p>

        <div className="project-btns">
          {role === "admin" ? (
            <>
              <button
                className="view-btn"
                onClick={() => viewProject(project)}
              >
                View
              </button>

              <button
                className="edit-btn"
                onClick={() => viewProject(project)}
                        
              >
                Edit
              </button>

              <div className="delete-btn-wrapper">
                <DeleteBtn
                  id={project.id}
                  onDelete={deleteProject}
                />
              </div>
            </>
          ) : (
            <>
            <button
              className="eval-btn"
              onClick={() => viewProject(project)}
            >
              viewProject

            </button>
           <button onClick={() => openEvaluationModal(project)}>
    Evaluate
</button></>
            
          )}
        </div>
      </div>
    </div>
  );
}
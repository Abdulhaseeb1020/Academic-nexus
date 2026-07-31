import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/Admin-dashboard.jsx";
import { useState, useEffect } from "react";
import Projects from "./pages/Projects.jsx";
import Judges from "./pages/Judges.jsx";
import AddJudges from "./components/Add-judges-modal.jsx";
import Settings from "./pages/Settings.jsx";
const STORAGE_KEY = "academic-nexus-setting";

function applyTheme(theme) {
  const root = document.documentElement;
  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  root.setAttribute("data-theme", effectiveTheme);
}

export default function App(){

  
  
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const theme = stored ? JSON.parse(stored).theme : "system";
    applyTheme(theme);
  }, []);
  
  const [role, setRole] = useState("admin");
     const [projects, setProjects] = useState(() => {
        const savedProjects = localStorage.getItem("projects");
        return savedProjects ? JSON.parse(savedProjects) : []
      })


     const[ judges, setJudges]=useState(()=>{
      const savedJudges=localStorage.getItem("judges");
      return savedJudges ? JSON.parse(savedJudges):[]
     })
      const updateProject=(updatedProject)=>{
        setProjects((prev)=>
        prev.map((project)=>
        project.id===updatedProject.id? updatedProject:project))
      }
      const deleteProject = (id) => {
      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );
    };
    const deleteJudge=(id)=>{
      setJudges((prev)=>
      prev.filter((judge)=>judge.id!==id))
    }
      useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects))
      }, [projects])
      const addProjects = (project) => {
        setProjects((prev) => [...prev, project]);
        
      };
      useEffect(()=>{
        localStorage.setItem("judges", JSON.stringify(judges))
      },[judges])
      const addJudges=(judge)=>{
        setJudges((prev)=>[...prev, judge])
      }

  
    return(
<>


    
    <BrowserRouter>
    <Routes>
        <Route
  path="/"
  element={<Login role={role} setRole={setRole} />}
/>
        <Route path="/admin-dashboard" element={<AdminDashboard role={role}
        projects={projects}
        addProjects={addProjects}
        deleteProject={deleteProject}
        updateProject={updateProject}
        judges={judges}
        />}/>
        
        <Route path="/projects" element={<Projects role={role} 
        projects={projects}
        addProjects={addProjects}
        deleteProject={deleteProject}
        updateProject={updateProject}
        />}/>
        <Route path="/judges" element={
        <Judges role={role}
      judges={judges}
        deleteJudge={deleteJudge}
        addJudges={addJudges}/>}/>
            <Route path="/settings" element={
              <Settings role={role}/>
            }/>
    </Routes>

    </BrowserRouter>
    

</>)
    }

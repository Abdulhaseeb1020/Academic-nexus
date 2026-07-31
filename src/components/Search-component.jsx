import React,{useState} from "react";

import { FaSearch } from "react-icons/fa";

import { MdAccountCircle } from "react-icons/md";
import "./Searchbar.css";
export default function SearchBar({projects, viewProject}){
  const [searchItem, setSearchItem]=useState("");
  const term=searchItem.toLowerCase().trim();
const matches=term===""?[]:projects.filter((project)=>
project.projectName?.toLowerCase().includes(term)||
project.supervisor?.toLowerCase().includes(term)||
project.department?.toLowerCase().includes(term)||
project.studentName?.toLowerCase().includes(term));
const handleView=(project)=>{
  
viewProject(project)
setSearchItem("");}
    



    return(
      <>
      {term !== "" && (
  <div className="search-blur-overlay" onClick={() => setSearchItem("")} />
)}
        <div className="search-bar">
        <div className="search-container">
                  <div className="search-input-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                      className="search-input"
                      type="search"
                      placeholder="Search projects or judges"
                      value={searchItem}
                        onChange={(e)=>setSearchItem(e.target.value)}
                    />
                    {term!==""&& (
                      <div className="search-result-dropdown">
{
  matches.length===0?(
    <p className="no-result">NO result to display</p>
  ):(
    matches.map( (project)=>(
      <div key ={project.id}
      className="search-result-item"
      onClick={()=>handleView(project)}> 
<span className="result-name"> STUDENT NAME: {project.studentName}</span>
<span className="result-meta">Project details: {project.projectName} </span>

      </div>
    ))
  )
}
                      </div>
                    )}
                  </div>
        
                  <div className="remaining-icons">
                   
                    <div className="profile-pill">
                      <span>Profile</span>
                      <MdAccountCircle className="icon-btn" />
                    </div>
                  </div>
                </div>
                </div>
                </>
    )
    
}

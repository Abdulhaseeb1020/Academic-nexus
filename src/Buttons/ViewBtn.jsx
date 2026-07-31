import React from "react";
import { FaEye } from "react-icons/fa";
export default function ViewBtn({project, onView}){

    
    return(
        <FaEye className="icon"
        onClick={()=>onView(project)}
        />
    )
}
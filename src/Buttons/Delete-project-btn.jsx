import React from "react";
import { MdDelete } from "react-icons/md";
export default function DeleteBtn({id, onDelete}){
    const handleDelete=()=>{
        const confirmDelete=window.confirm("Are Your Sure you Wanna delete this project?");
        if(!confirmDelete) return;
        onDelete(id)
    };
    return(
        <MdDelete
        className="icon"
        onClick={handleDelete}
        style={{cursor:"pointer"}}/>
    )
}
import React, { useState } from "react";
import "./JudgeModal.css";
export default function AddJudges({ closeModal, judges, AddJudges }) {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [expertise, setExpertise] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !department.trim() || !expertise.trim() || !email.trim() || !contact.trim()) return;
        const newJudge = {
            id: `${name}-${department}`,
            name: name.trim(),
            department: department.trim(),
            expertise: expertise.trim(),
            email: email.trim(),
            contact: contact.trim(),
            
        };
        AddJudges(newJudge);
        closeModal();
    }
     const expertiseList = expertise
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

    return (
        <div className="modal-dev" onClick={closeModal}>
            <div className="modal-cards" onClick={(e) => e.stopPropagation()}>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Add Judge</h1>
                    <label>Enter Judge Name</label>
                    <input type ="text"
                    placeholder="Name goes here" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                    <label>Enter Department Name</label>
                    <input type="text"
                    placeholder="CS, AI, SE etc"
                    value={department}
                    onChange={(e)=>setDepartment(e.target.value)}/>
                    <label>Enter Expertise of the Judge</label>
                    <input type="text"
                    placeholder="Expertise can be more than one."
                    value={expertise}
                    onChange={(e)=>setExpertise(e.target.value)}/>
                    <label> Enter Email Address</label>
                    <input type="email"
                    placeholder="abc@gamil.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Enter Phone Number</label>
                    <input type="tel"
                    placeholder="03xxxxxxxxx"
                    value={contact}
                    onChange={(e)=>setContact(e.target.value)}/>
                    <div className="modal-btns">
<button type="submit" className="submit-btn">Submit</button>
<button className="cancel-btn" onClick={closeModal}>Cancel</button>

                    </div>

                    
                </form>
                </div>

        </div>
    )
}

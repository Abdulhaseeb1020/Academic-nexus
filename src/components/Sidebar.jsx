import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { MdPersonOutline } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";




  const menuItems = [
  {
    icon: <MdOutlineDashboardCustomize />,
    label: "Dashboard",
    path: "/admin-dashboard",
  },
  {
    icon: <GoProjectSymlink />,
    label: "Projects",
    path: "/projects",
  },
  {
    
    icon: <MdPersonOutline />,
    label: "Judges",
    path: "/judges",
  },
  {
    icon: <IoMdSettings />,
    label: "Settings",
    path: "/settings",
  },
];


export default function Sidebar({role}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Academic Nexus</h3>
        <p>Evaluation Portal</p>
        {role==="admin"?<h2>Admin Dashboard</h2>:<h2>Judge dashboard</h2>}
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
             <NavLink to={item.path}  className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }>
  <span className="sidebar-icon">{item.icon}</span>
  <span className="sidebar-label">{item.label}</span>
</NavLink>
               
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
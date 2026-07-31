import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Settings.css";
import { Bell, Check, CircleUserRound, Sun, Moon, Monitor, User, Settings as SettingsIcon, Palette,Info,Lock } from 'lucide-react';
const Storage_key = "academic-nexus-setting"
const defaultSettings = {
    fullName: "Admin/Judge",
    email: "Admin123@gmail.com",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    timeZone: "Pakistan",
    theme: "system"
}
function Toggle({ onChange, checked }) {
    return (
        <button className={`toggle ${checked ? "toggle-on" : "toggle-off"}`}
            onClick={onChange}
            type="button"
            aria-pressed={checked}


        >
            <span className="toggle-knob"></span>
        </button>
    )
}
function Card({ title, icon, children }) {
    return (
        <div className="Card-component">
            <div className="card-header">
                <span className="card-icon">{icon}</span>
                <h2 className="card-title">{title}</h2>
            </div>
            {children}
        </div>
    )
}
function SavedNote({ show }) {
    if (!show) return null;
    return (
        <span className="saved-note">
            <Check size={14} />
            Saved
        </span>
    )

}


export default function Settings({ role }) {
    const [settings, setSettings] = useState(() => {
        try {
            const stored = localStorage.getItem(Storage_key);
            return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
        }
        catch {
            return defaultSettings;

        }

    })
    const [profileDraft, setProfileDraft] = useState(() => ({
        fullName: settings.fullName,
        email: settings.email
    }))
    const [prefsDraft, setPrefsDraft] = useState({
        language: settings.language,
        dateFormat: settings.dateFormat,
        timeZone: settings.timeZone,
    });
    const [profileSaved, setProfileSaved] = useState(false);
    const [prefSaved, setPrefSaved] = useState(false);
    useEffect(() => {
        localStorage.setItem(Storage_key, JSON.stringify(settings));
        const root = document.documentElement;
        const effectiveTheme =
            settings.theme === "system" ?
                window.matchMedia('(prefers-color-scheme:dark)').matches ? "dark" : "light" : settings.theme;
        root.setAttribute("data-theme", effectiveTheme)

    }, [settings])
    const saveProfile = () => {
        setSettings((prev) => ({ ...prev, ...profileDraft }))
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 2000)
    }


    const savePrefrences = () => {
        setSettings((prev) => ({ ...prev, ...prefsDraft }))
        setPrefSaved(true);
        setTimeout(() => setPrefSaved(false), 2000)
    }
    const notifRows = [
        {
            key: "emailNotif",
            label: "Email Notifications",
            desc: "Receive email updates for important activities",
        },
        {
            key: "projectNotif",
            label: "Project Updates",
            desc: "Get notified about project status changes",
        },
        {
            key: "evalNotif",
            label: "Evaluation Alerts",
            desc: "Receive alerts for new evaluations",
        },
    ];
    const themeOptions = [
        { key: "light", label: "Light", icon: <Sun size={20} /> },
        { key: "dark", label: "Dark", icon: <Moon size={20} /> },
        { key: "system", label: "System", icon: <Monitor size={20} /> },
    ];
    const updateSetting = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <>
            <div className="container">
                <Sidebar />
                <div className="main-content">
                    <div className="topbarS">
                        <Bell />
                        <h2> <CircleUserRound /> {role}</h2>
                    </div>
                    <div className="setting">
                        <h1>Settings</h1>
                        <p>Manage Your account and Application preferences</p>
                        <Card icon={<User size={20} />} title={"Profile Information"}>
                            <div className="profile-information">
                                <div className="profile-photo">
                                    <User size={40} />
                                    <button type="button"> Change Profile Photo</button>
                                </div>
                                <div className="profile-info">
                                    <label>Full Name</label>
                                    <input type="text"
                                        value={profileDraft.fullName}
                                        onChange={(e) => setProfileDraft((d) => ({ ...d, fullName: e.target.value }))} />
                                    <label>Email:</label>
                                    <input type="email"
                                        value={profileDraft.email}
                                        onChange={(e) => setProfileDraft((d) => ({ ...d, email: e.target.value }))} />
                                    <div className="actions">
                                        <SavedNote show={profileSaved} />
                                        <button type="button" onClick={saveProfile}>Save Changes</button>
                                    </div>
                                </div>

                            </div>
                        </Card>

                        <Card icon={<SettingsIcon size={16} />} title="Settings">

                            <div className="setting-devs">
                                <h2>language</h2>
                                <p>English</p>

                            </div>
                            <div className="setting-devs">
                                <h2>Date Formate</h2>
                                <p>DD/MM/YYYY</p>

                            </div>
                            <div className="setting-devs">
                                <h2>Time Zone</h2>
                                <p>Pakistan</p>

                            </div>
                            <SavedNote show={prefSaved} />
                            <button type="button" onClick={savePrefrences}>Save Changes</button>
                        </Card>

                        <Card icon={<Bell size={18} />} title="Notification Settings">
                            <div className="rows">
                                {
                                    notifRows.map((row) => (
                                        <div className="key" key={row.key}>
                                            <div>
                                                <div className="row-label">{row.label}</div>
                                                <div className="row-description">{row.desc}</div>

                                            </div>
                                            <Toggle checked={settings[row.key]}
                                                onChange={() => updateSetting(row.key, !settings[row.key])} />

                                        </div>
                                    ))
                                }
                            </div>

                        </Card>
                        
              <Card icon={<Palette size={18} />} title="Appearance">
                <div className="row-label">Theme</div>
                <div className="row-desc" style={{ marginBottom: "12px" }}>
                  Choose your preferred theme
                </div>
                <div className="theme-grid">
                  {themeOptions.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => updateSetting("theme", t.key)}
                      className={`theme-btn ${
                        settings.theme === t.key ? "theme-btn-active" : ""
                      } ${t.key === "dark" ? "theme-btn-dark" : ""}`}
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </Card>
                      <Card icon={<Lock size={18} />} title="Security">
                <div className="row">
                  <div className="row-label">Change Password</div>
                  <button className="btn-outline btn-small">
                    <Lock size={14} /> Update Password
                  </button>
                </div>
                <div className="row">
                  <div>
                    <div className="row-label">Two-Factor Authentication</div>
                    <div className="row-desc">Add an extra layer of security</div>
                  </div>
                  <Toggle
                    checked={settings.twoFactor || false}
                    onChange={() =>
                      updateSetting("twoFactor", !settings.twoFactor)
                    }
                  />
                </div>
              </Card>
 
              <Card icon={<Info size={18} />} title="System Information">
                <div className="info-rows">
                  <div className="info-row">
                    <span>System Version</span>
                    <span>v1.0.0</span>
                  </div>
                  <div className="info-row">
                    <span>Last Updated</span>
                    <span>20 July 2026</span>
                  </div>
                  <div className="info-row">
                    <span>Database Status</span>
                    <span className="status-badge">Connected</span>
                  </div>
                  <div className="info-row">
                    <span>Total Projects</span>
                    <span>48</span>
                  </div>
                  <div className="info-row">
                    <span>Evaluated Projects</span>
                    <span>26</span>
                  </div>
                </div>
              </Card>

                    </div>

                </div>
            </div>
        </>
    )
}

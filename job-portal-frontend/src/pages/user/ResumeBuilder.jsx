import React, { useMemo, useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import "./ResumeBuilder.css";

export default function ResumeBuilder() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    links: "",
  });
  const [template, setTemplate] = useState("classic"); // "classic" | "modern"
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const previewRef = useRef(null);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  const splitLines = (text = "") =>
    text
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

  const skillList = useMemo(
    () =>
      (data.skills || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    [data.skills]
  );

  // Save resume to backend (MongoDB)
  const handleSaveToDB = async () => {
    if (!data.fullName?.trim() || !data.email?.trim()) {
      setMessage("❗ Please provide at least your name and email before saving.");
      return;
    }
    setIsSaving(true);
    setMessage("");

    const payload = {
      name: data.fullName,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      summary: data.summary,
      skills: skillList,
      education: splitLines(data.education),
      experience: splitLines(data.experience),
      projects: splitLines(data.projects),
      links: splitLines(data.links),
      format: template,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/resumes", payload, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Resume saved successfully to MongoDB!");
      } else {
        setMessage("⚠️ Unexpected response from server.");
      }
    } catch (err) {
      const errMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err.message ||
        "Failed to save resume.";
      setMessage(`❌ ${errMsg}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(""), 6000);
    }
  };

  // Download preview as PDF
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    await new Promise((r) => setTimeout(r, 120));
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      windowWidth: 1080,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft - imgHeight;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${data.fullName || "resume"}.pdf`);
  };

  return (
    <div className={`rb-wrapper ${darkMode ? "dark" : ""}`}>
      <h1 className="rb-title">📄 Resume Builder</h1>

      {/* Controls */}
      <div className="rb-controls">
        <div className="rb-template-select">
          <label>Resume Format / Template:</label>
          <select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="classic">Classic (Clean & Compact)</option>
            <option value="modern">Modern (Accent & Sidebar)</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            className="rb-download-btn"
            type="button"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button
            className="rb-save-btn"
            type="button"
            onClick={handleSaveToDB}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save to Database"}
          </button>
          <button
            className="rb-dark-btn"
            type="button"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      {message && <div className="rb-message">{message}</div>}

      <div className="rb-grid">
        {/* Form */}
        <form
          className="rb-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveToDB();
          }}
        >
          <h2>Personal Info</h2>
          <div className="rb-row">
            <label>Full Name</label>
            <input
              name="fullName"
              value={data.fullName}
              onChange={onChange}
              placeholder="Asmita Sharma"
              required
            />
          </div>
          <div className="rb-row rb-2col">
            <div>
              <label>Email</label>
              <input
                name="email"
                value={data.email}
                onChange={onChange}
                placeholder="asmita@example.com"
                type="email"
                required
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                name="phone"
                value={data.phone}
                onChange={onChange}
                placeholder="+91 98xxxxxxx"
              />
            </div>
          </div>
          <div className="rb-row">
            <label>Address</label>
            <input
              name="address"
              value={data.address}
              onChange={onChange}
              placeholder="City, State, Country"
            />
          </div>

          <h2>Summary</h2>
          <div className="rb-row">
            <textarea
              name="summary"
              value={data.summary}
              onChange={onChange}
              placeholder="2–3 lines about your strengths, tech stack, and goals."
              rows={3}
            />
          </div>

          <h2>Skills (comma separated)</h2>
          <div className="rb-row">
            <input
              name="skills"
              value={data.skills}
              onChange={onChange}
              placeholder="React, Node.js, Express, MongoDB, CSS, Git"
            />
          </div>

          <h2>Education (one per line)</h2>
          <div className="rb-row">
            <textarea
              name="education"
              value={data.education}
              onChange={onChange}
              placeholder={`B.Tech CSE — XYZ University (2021–2025)\n12th — ABC School (PCM, 90%)`}
              rows={4}
            />
          </div>

          <h2>Experience (one item per line)</h2>
          <div className="rb-row">
            <textarea
              name="experience"
              value={data.experience}
              onChange={onChange}
              placeholder={`SDE Intern — Company (06/2024–08/2024): Built MERN app, improved load time by 30%.\nFreelance — Built e-commerce site in React.`}
              rows={5}
            />
          </div>

          <h2>Projects (one per line)</h2>
          <div className="rb-row">
            <textarea
              name="projects"
              value={data.projects}
              onChange={onChange}
              placeholder={`Job Portal (MERN): Auth, job search, employer dashboard.\nFood Ordering App (MERN): Admin panel, payments, order tracking.`}
              rows={4}
            />
          </div>

          <h2>Links (one per line)</h2>
          <div className="rb-row">
            <textarea
              name="links"
              value={data.links}
              onChange={onChange}
              placeholder={`GitHub: github.com/asmita\nPortfolio: asmitaportfolio.vercel.app\nLinkedIn: linkedin.com/in/asmita`}
              rows={3}
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <button type="submit" className="rb-save-btn" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save to Database"}
            </button>
          </div>
        </form>

        {/* Preview */}
        <div className="rb-preview-wrapper">
          <div
            ref={previewRef}
            className={`rb-preview a4 ${
              template === "modern" ? "tpl-modern" : "tpl-classic"
            }`}
          >
            {template === "modern" ? (
              <div className="tpl-modern-grid">
                <aside className="tpl-modern-sidebar">
                  <div className="m-name">{data.fullName || "Your Name"}</div>
                  <div className="m-contact">
                    <div>{data.email || "email@example.com"}</div>
                    <div>{data.phone || "+91 9xxxxxxxxx"}</div>
                    <div>{data.address || "City, State"}</div>
                  </div>
                  <div className="m-section">
                    <h4>Skills</h4>
                    <ul className="pill-list">
                      {skillList.length
                        ? skillList.map((s, i) => <li key={i}>{s}</li>)
                        : <li>React</li>}
                    </ul>
                  </div>
                  {data.links && (
                    <div className="m-section">
                      <h4>Links</h4>
                      <ul className="bullet-list">
                        {splitLines(data.links).map((l, i) => (
                          <li key={i}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </aside>
                <main className="tpl-modern-main">
                  {data.summary && (
                    <section>
                      <h3>Summary</h3>
                      <p>{data.summary}</p>
                    </section>
                  )}
                  {data.experience && (
                    <section>
                      <h3>Experience</h3>
                      <ul className="bullet-list">
                        {splitLines(data.experience).map((e, i) => (
                          <li key={i}>{e}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {data.projects && (
                    <section>
                      <h3>Projects</h3>
                      <ul className="bullet-list">
                        {splitLines(data.projects).map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {data.education && (
                    <section>
                      <h3>Education</h3>
                      <ul className="bullet-list">
                        {splitLines(data.education).map((ed, i) => (
                          <li key={i}>{ed}</li>
                        ))}
                      </ul>
                    </section>
                  )}
                </main>
              </div>
            ) : (
              <div className="tpl-classic-inner">
                <header className="c-header">
                  <h2>{data.fullName || "Your Name"}</h2>
                  <div className="c-sub">
                    {data.email || "email@example.com"} •{" "}
                    {data.phone || "+91 9xxxxxxxxx"} •{" "}
                    {data.address || "City, State"}
                  </div>
                </header>
                {data.summary && (
                  <section className="c-section">
                    <h3>Summary</h3>
                    <p>{data.summary}</p>
                  </section>
                )}
                {skillList.length > 0 && (
                  <section className="c-section">
                    <h3>Skills</h3>
                    <div className="chip-row">
                      {skillList.map((s, i) => (
                        <span className="chip" key={i}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
                {data.experience && (
                  <section className="c-section">
                    <h3>Experience</h3>
                    <ul>
                      {splitLines(data.experience).map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {data.projects && (
                  <section className="c-section">
                    <h3>Projects</h3>
                    <ul>
                      {splitLines(data.projects).map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {data.education && (
                  <section className="c-section">
                    <h3>Education</h3>
                    <ul>
                      {splitLines(data.education).map((ed, i) => (
                        <li key={i}>{ed}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {data.links && (
                  <section className="c-section">
                    <h3>Links</h3>
                    <ul>
                      {splitLines(data.links).map((l, i) => (
                        <li key={i}>{l}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>
          <div className="rb-note">
            Tip: Switch templates from the dropdown before downloading.
          </div>
        </div>
      </div>
    </div>
  );
}

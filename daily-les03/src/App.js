import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";

const url = "https://course-api.com/react-tabs-project";
function App() {
  const [loaidng, setLoading] = useState(true);
  const [jobs, setJob] = useState([]);
  const [value, setValue] = useState(0);

  const fetchJob = async () => {
    const response = await fetch(url);
    const jobData = await response.json();
    setJob(jobData);
    setLoading(false);
  };

  useEffect(() => {
    fetchJob();
  }, []);

  if (loaidng) {
    return (
      <section className="loading section">
        <h1>Welcome is Loading....</h1>
      </section>
    );
  }
  const { company, dates, title, duties } = jobs[value];

  return (
    <section className="section">
      <div className="title">
        <h2>Wonderful Job</h2>
        <div className="underline"></div>
      </div>
      <div className="jobs-center">
        {/* Btn container */}
        <div className="btn-container">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-Btn"}`}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        <artical className="job-info">
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className="job-date">{dates}</p>

          {/* Duties Container */}
          {duties.map((duty, id) => {
            return (
              <div key={id} className="job-desc">
                <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            );
          })}
        </artical>
      </div>
    </section>
  );
}

export default App;

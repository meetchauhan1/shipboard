
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNotifications } from "./NotificationContext"; 
const JobsContext = createContext();
export const useJobs = () => useContext(JobsContext);

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const { addNotification } = useNotifications(); 

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(stored);
  }, []);

  const save = (updated) => {
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  const addJob = (job) => {
    save([...jobs, job]);
    addNotification({ message: "Job Created", type: "success" }); 
  };

  const updateJob = (job) => {
    save(jobs.map(j => j.id === job.id ? job : j));
    addNotification({ message: "Job Updated", type: "info" }); 
  };

  const deleteJob = (id) => {
    save(jobs.filter(j => j.id !== id));
    
  };

  const markJobCompleted = (id) => {
    const updatedJobs = jobs.map((job) =>
      job.id === id ? { ...job, status: "Completed" } : job
    );
    save(updatedJobs);
    addNotification({ message: "Job Completed", type: "success" }); 
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob, markJobCompleted }}>
      {children}
    </JobsContext.Provider>
  );
};

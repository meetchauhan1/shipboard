import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = () => {
  const navigate = useNavigate();
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];


  const events = jobs
    .filter(job => job.scheduledDate)
    .map(job => ({
      id: job.id,
      title: job.jobType || "Job",
      start: new Date(job.scheduledDate),
      end: new Date(job.scheduledDate),
      status: job.status,
    }));


  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

 
  const eventStyleGetter = (event) => {
    let bgColor = "#1976d2"; 
    if (event.status === "Completed") bgColor = "green";
    else if (event.status === "In Progress") bgColor = "red";

    return {
      style: {
        backgroundColor: bgColor,
        borderRadius: "5px",
        color: "white",
        border: "none",
        display: "block",
        paddingLeft: "5px",
      },
    };
  };

  return (
    <div style={{ height: 600, marginTop: 20 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week"]}
        view={view}
        onView={setView}
        date={date}
        onNavigate={setDate}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => navigate(`/jobs/${event.id}`)}
      />
    </div>
  );
};

export default MaintenanceCalendar;

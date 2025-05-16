import React, { useState, useMemo } from "react";
import { useJobs } from "../../contexts/JobsContext";
import {
  Calendar,
  dateFnsLocalizer
} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@mui/material";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const JobCalendar = () => {
  const { jobs } = useJobs();
  const [selectedDate, setSelectedDate] = useState(null);

 
  const events = useMemo(() => {
    return jobs
      .filter(job => job.scheduledDate)
      .map(job => ({
        id: job.id,
        title: job.jobType,
        start: new Date(job.scheduledDate),
        end: new Date(job.scheduledDate),
        allDay: true,
        job,
      }));
  }, [jobs]);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const jobsOnSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return jobs.filter(job =>
      new Date(job.scheduledDate).toDateString() ===
      new Date(selectedDate).toDateString()
    );
  }, [selectedDate, jobs]);

  return (
    <Box p={3}>
      <Typography variant="h5" mb={2}>
        Maintenance Calendar
      </Typography>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 500, marginBottom: 20 }}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => setSelectedDate(event.start)}
        views={["month", "week"]}
      />

      {selectedDate && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Jobs on {new Date(selectedDate).toDateString()}
          </Typography>
          <List>
            {jobsOnSelectedDate.length > 0 ? (
              jobsOnSelectedDate.map((job) => (
                <ListItem key={job.id}>
                  <ListItemText
                    primary={job.jobType}
                    secondary={`Engineer: ${job.assignedEngineer} | Ship: ${job.shipId}`}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No jobs scheduled.</Typography>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default JobCalendar;

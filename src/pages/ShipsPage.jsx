import React from "react";
import { useShips } from "../contexts/ShipsContext";
import { Button, Card, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/ShipsPage.css";

const ShipsPage = () => {
  const { ships, deleteShip } = useShips();
  const navigate = useNavigate();

  return (
    <Box className="ships-container">
      
      <Box className="ships-header" display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Ships</Typography>
        <Box display="flex" gap={2}>
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Home
          </Button>
          <Button variant="contained" onClick={() => navigate("/ships/new")}>
            Add Ship
          </Button>
        </Box>
      </Box>

      
      {ships.map((ship) => (
        <Card key={ship.id} className="ship-card">
          <Box>
            <Typography variant="h6">{ship.name}</Typography>
            <Typography variant="body2">
              IMO: {ship.imo} | Flag: {ship.flag} | Status: {ship.status}
            </Typography>
          </Box>
          <Box className="ship-actions" display="flex" gap={1}>
            <Button onClick={() => navigate(`/ships/edit/${ship.id}`)}>Edit</Button>
            <Button color="error" onClick={() => deleteShip(ship.id)}>Delete</Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default ShipsPage;

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsError, setTermsError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (!acceptedTerms) {
      setTermsError("You must accept the terms and conditions.");
      return;
    }
    setTermsError("");

    const result = login(email, password);
    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      className="login-container"
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      
      <Box
        className="login-image-container"
        sx={{
          flex: { xs: "none", md: 3 },
          height: { xs: "40vh", md: "auto" },
          width: { xs: "100%", md: "auto" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={`/ships.jpg`}
          alt="Login Visual"
          className="login-image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Right - Login Form */}
      <Box
        className="login-form-container"
        sx={{
          flex: { xs: "none", md: 2 },
          width: { xs: "100%", md: "auto" },
          backgroundColor: "#fce3fe",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: 2, md: 4 },
        }}
      >
        <Box className="login-form-box">
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: "1.8rem", md: "2.5rem" } }}
          >
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  name="terms"
                  color="primary"
                />
              }
              label="By continuing, you agree to our terms and conditions."
              sx={{ mt: 2 }}
            />
            {termsError && (
              <Typography color="error" sx={{ fontSize: "0.9rem", mb: 1 }}>
                {termsError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 1, backgroundColor: 'red' }}
            >
              Login
            </Button>
          </form>
          
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;

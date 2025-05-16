import React from "react";

const NotificationCenter = ({ notifications, onDismiss }) => {
  if (!notifications.length) return null;

  // Color style based on type (optional)
  const getBackgroundColor = (type) => {
    switch (type) {
      case "success":
        return "#4caf50"; // green
      case "error":
        return "#f44336"; // red
      case "warning":
        return "#ff9800"; // orange
      default:
        return "#2196f3"; // blue (info)
    }
  };

  return (
    <div style={{ position: "fixed", top: 20, right: 20, width: 300, zIndex: 9999 }}>
      <h3 style={{ marginBottom: 10 }}>Notifications</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {notifications.map(({ id, message, type = "info" }, index) => (
          <li
            key={id || index}
            style={{
              backgroundColor: getBackgroundColor(type),
              color: "white",
              padding: "10px 15px",
              borderRadius: 5,
              marginBottom: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
            }}
          >
            <span>{message}</span>
            <button
              onClick={() => onDismiss(id)}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 16,
                lineHeight: 1,
                padding: 0,
                marginLeft: 10,
              }}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;

import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key', key, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage key', key, error);
    }
  };

  return [storedValue, setValue];
};


export const initializeMockData = () => {
  

  const mockData = {
    users: [
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
      { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" },
    ],
    ships: [
      { id: "s1", name: "INS Vikrant" },
      { id: "s2", name: "INS Arihant" },
    ],
    components: [
      {
        id: "c1",
        shipId: "s1",
        name: "Main Engine",
        lastMaintenanceDate: "2023-10-01",
      },
      {
        id: "c2",
        shipId: "s2",
        name: "Radar System",
        lastMaintenanceDate: "2025-02-01",
      },
    ],
    jobs: [
      { id: "j1", title: "Inspect Hull", status: "In Progress" },
      { id: "j2", title: "Replace Engine Filter", status: "Completed" },
      { id: "j3", title: "Check Navigation System", status: "In Progress" },
    ],
    notifications: [],
  };

  Object.entries(mockData).forEach(([key, value]) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(value));
      }
  });

  localStorage.setItem("mockDataInitialized", "true");
};


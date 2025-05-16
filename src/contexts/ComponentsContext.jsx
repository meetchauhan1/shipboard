import React, { createContext, useState, useContext, useEffect } from 'react';

const ComponentsContext = createContext();

export const useComponents = () => useContext(ComponentsContext);

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('components')) || [];
    setComponents(stored);
  }, []);

  const saveToStorage = (items) => {
    localStorage.setItem('components', JSON.stringify(items));
    setComponents(items);
  };

  const addComponent = (component) => {
    const updated = [...components, component];
    saveToStorage(updated);
  };

  const deleteComponent = (id) => {
    const updated = components.filter((comp) => comp.id !== id);
    saveToStorage(updated);
  };

  const updateComponent = (updatedComponent) => {
    const updated = components.map((comp) =>
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    saveToStorage(updated);
  };

  return (
    <ComponentsContext.Provider
      value={{ components, addComponent, deleteComponent, updateComponent }}
    >
      {children}
    </ComponentsContext.Provider>
  );
};
import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../utils/localStorageUtils';

const ShipsContext = createContext();

export const useShips = () => useContext(ShipsContext);

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useLocalStorage('ships', []);

  
  useEffect(() => {

  }, [ships]);

  const addShip = (ship) => {
    setShips((prevShips) => {
      const updated = [...prevShips, ship];
      console.log('Adding ship:', ship);
      return updated;
    });
  };

  const updateShip = (updatedShip) => {
    setShips((prevShips) => {
      const updated = prevShips.map((ship) =>
        ship.id === updatedShip.id ? updatedShip : ship
      );
      console.log('Updating ship:', updatedShip);
      return updated;
    });
  };

  const deleteShip = (id) => {
    setShips((prevShips) => {
      const updated = prevShips.filter((ship) => ship.id !== id);
      console.log('Deleting ship with ID:', id);
      return updated;
    });
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

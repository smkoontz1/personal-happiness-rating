import React, { createContext, useState } from 'react';
import * as SQLite from 'expo-sqlite';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const defaultDb = SQLite.openDatabase('happiness.db');
  
  const [db] = useState(defaultDb);

  return (
    <AppContext.Provider
      value={{
        db,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
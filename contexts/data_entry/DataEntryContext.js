import React, { createContext, useState } from 'react';

export const DataEntryContext = createContext();

export const DataEntryProvider = ({ children }) => {
  const defaultRatings = [];
  
  const [ratings, setRatings] = useState(defaultRatings);

  return (
    <DataEntryContext.Provider
      value={{
        ratings,
        setRatings,
      }}
    >
      {children}
    </DataEntryContext.Provider>
  );
}
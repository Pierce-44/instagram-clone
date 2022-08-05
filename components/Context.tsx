import React from 'react';

type authContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};
const authContextDefaultValues: authContextType = {
  darkMode: false,
  setDarkMode: () => {},
};

const dataProps = React.createContext<authContextType>(
  authContextDefaultValues
);

export default dataProps;

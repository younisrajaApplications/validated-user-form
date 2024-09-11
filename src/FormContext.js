import React, { createContext, useState } from 'react';

// Create a context for the form configuration
export const FormContext = createContext();

// Create a Provider component
export const FormProvider = ({ children }) => {
  // Form configuration could include validation rules or required fields
  const [formConfig, setFormConfig] = useState({
    requiredFields: ['name', 'email'],
    maxInputLength: 50,
    minAge: 18,
  });

  return (
    <FormContext.Provider value={{ formConfig, setFormConfig }}>
      {children}
    </FormContext.Provider>
  );
};

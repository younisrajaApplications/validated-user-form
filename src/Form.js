import React, { useReducer, useContext } from 'react';
import { FormContext } from './FormContext'; // Import FormContext

// Define the reducer function for form state management
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.field]: action.value, // Update specific field
      };
    case 'RESET_FORM':
      return {
        name: '',
        email: '',
        age: '',
      };
    default:
      throw new Error('Unhandled action type: ' + action.type);
  }
}

function Form() {
  // Use useReducer to manage form state
  const [state, dispatch] = useReducer(formReducer, { name: '', email: '', age: '' });

  // Consume the form configuration context
  const { formConfig } = useContext(FormContext);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= formConfig.maxInputLength) { // Respect max input length
        dispatch({ type: 'SET_FIELD_VALUE', field: name, value });
    } else {
        alert(name + ' cannot be longer than 50 characters!');
        return;
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formConfig.requiredFields.every((field) => state[field]) && state.age >= formConfig.minAge;
    if (!isValid) {
        if (state.age < 18) {
            alert('Minimum age is 18!')
            return;
        }
        alert('Please fill in all required fields.');
        return;
    }
    console.log('Form Submitted:', state);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="number"
        name="age"
        value={state.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => dispatch({ type: 'RESET_FORM' })}>
        Reset
      </button>
    </form>
  );
}

export default Form;

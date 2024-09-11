import logo from './logo.svg';
import './App.css';
import { FormProvider } from './FormContext';
import Form from './Form';

function App() {
  return (
    <FormProvider>
      <div className="App">
        <Form/>
      </div>
    </FormProvider>
  );
}

export default App;

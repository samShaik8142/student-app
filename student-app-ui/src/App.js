import './App.css';
import React from "react"
import DisplaySchools from './components/DisplaySchools';
import CreateSchool from './components/CreateSchool';
import CreateStudent from './components/CreateStudent';

function App() {

  return (
    <div>
      <CreateSchool />
      <DisplaySchools />
      <CreateStudent />
    </div>
  );
}

export default App;

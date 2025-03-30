'use client'
import { useState, useEffect } from 'react'
import './App.css'
import { Person } from './assets/schema'
import axios from 'axios'

function App() {

  const [employees,setEmployees] = useState<Person[]>([]);
  const [name, setName] = useState<string>(); 
  const [manager, setManager] = useState<string>();
  const [salary, setSalary] = useState<number>();

  useEffect(() => {
    getAllEmployees();

  }, []); // Only run once when the component mounts

    const rows = employees.map((person, index) => (
      <tr key={index}>
        <td>{person.employeeId}</td>
        <td>{person.name}</td>
        <td>{person.manager}</td>
        <td>{person.salary}</td>
      </tr>
    ));

    const getAllEmployees=()=>{
      axios.get("http://localhost:8085/employees").then(((res)=>{
        console.log(res.data);
        setEmployees(res.data);
      }))
    }


  return (
    <>
      <div className='main-container'>
        <h3>Full stack Application using Spring Boot, Vite, React, TS & PostgreSQL</h3>
        <div className='add-panel'>
          <div className='addpaneldiv'>
            <label htmlFor='name'>Name</label><br></br>
            <input className='addpanelinput' value={name} type='text' name="name" id="name"></input>
          </div>
          <div className='addpaneldiv'>
            <label htmlFor='manager'>Manager</label><br></br>
            <input className='addpanelinput' value={manager} type='text' name="manager" id="manager"></input>
          </div>
          <div className='addpaneldiv'>
            <label htmlFor='salary'>Salary</label><br></br>
            <input className='addpanelinput' value={salary}  type='text' name="salary" id="salary"></input>
          </div>
          <button className='addbtn' > Add</button>
          <button className='cancelbtn' >Cancel</button>
        </div>
        <input className='searchinput' type='search' name='inputsearch' id='inputsearch' placeholder='Search Employee by Name'></input>
      </div>
      <div className='tablediv'>
      <table className='table' border={1}>
      <thead className='tableheader'>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Manager</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
    </div>

    </>
  )

}

export default App;

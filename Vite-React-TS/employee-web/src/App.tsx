'use client'
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import { Person } from './schema'



function App() {

  const [employees,setEmployees] = useState<Person[]>([]);
  const [id, setId] = useState<string>(''); 
  const [name, setName] = useState<string>(''); 
  const [manager, setManager] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [search, setSearch] = useState<string>("");
  const [filteredrows, setFilteredRows] = useState<Person[]>([]);

  useEffect(() => {
    getAllEmployees();
    setFilteredRows(employees);
  }, []); // Only run once when the component mounts

  useEffect(()=>{
    setFilteredRows(employees.filter(person =>
      person.name.toLowerCase().includes(search.toLowerCase())
    )); 
  },[search,employees]);

    const rows = filteredrows.map((person, index) => (
      <tr key={index}>
        <td>{person.employeeId}</td>
        <td>{person.name}</td>
        <td>{person.manager}</td>
        <td>{person.salary}</td>
        <td>{<button className='editbtn' onClick={()=>editEmployee(person)}>Edit</button>}</td>
        <td>{<button className='delbtn' onClick={()=>delEmployee(person.employeeId)}>Delete</button>}</td>
      </tr>
    ));

    function editEmployee (person: Person) {
      setId(String(person.employeeId)); 
      setName(person.name);
      setManager(person.manager);
      setSalary(String(person.salary));
    }

    async function delEmployee (id?:number) {
      const isConfirmed = window.confirm("Are you sure you want to Delete this row?")
      if(isConfirmed) {
        try{
          const response = await axios.delete(`http://localhost:8085/employees/${id}`)
          console.log(response);
          handleCancel();
          getAllEmployees(); 
          }catch(error){
            console.log(error);
          }
      }
    }

    const getAllEmployees= async ()=>{
      axios.get("http://localhost:8085/employees").then(((res)=>{
        console.log(res.data);
        setEmployees(res.data);
      }))
    }

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const handleManagerChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setManager(e.target.value);
    };

    const handleSalaryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSalary(e.target.value);
    };

    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };

    const handleNewEmpSubmit = async () => {
      if(!name || !manager || !salary){
        alert("Please Fill in All Fields!");
        return;
      }
      if(typeof salary != "string"){
        alert("Salary must be a Number!!");
        return;
      }
      let newemp : Person; 
      if (id){
        newemp = {
          employeeId: Number(id),
          name: name,
          manager: manager,
          salary: Number(salary),
        }
      }
      else{
         newemp = {
          name: name,
          manager: manager,
          salary: Number(salary),
        }
      }
        
        try{
          if(!id){
            const response = await axios.post("http://localhost:8085/employees", newemp)
            console.log(response);
            handleCancel();
            getAllEmployees();
          }
          else{
            const response = await axios.patch(`http://localhost:8085/employees/${id}`, newemp)
            console.log(response);
            handleCancel();
            getAllEmployees();
          }
          
         }catch(error){
           console.log(error);
         }
    }

    function handleCancel () {
      setId("");
      setName("");
      setManager("");
      setSalary("");
    }
  return (
    <>
      <div className='main-container'>
        <h3>Full stack Application using Spring Boot, Vite, React, TS & PostgreSQL</h3>
        <div className='add-panel'>
          <div className='addpaneldiv'>
            <label htmlFor='name'>Name</label><br></br>
            <input className='addpanelinput' value={name} onChange={handleNameChange} type='text' name="name" id="name"></input>
          </div>
          <div className='addpaneldiv'>
            <label htmlFor='manager'>Manager</label><br></br>
            <input className='addpanelinput' value={manager} onChange={handleManagerChange} type='text' name="manager" id="manager"></input>
          </div>
          <div className='addpaneldiv'>
            <label htmlFor='salary'>Salary</label><br></br>
            <input className='addpanelinput' value={salary} onChange={handleSalaryChange} type='text' name="salary" id="salary"></input>
          </div>
          <button className='addbtn' onClick={handleNewEmpSubmit}>{id ? "Update" : "Add"}</button>
          <button className='cancelbtn' onClick={handleCancel}>Cancel</button>
        </div>
        <input className='searchinput' type='search' value={search} onChange={handleSearchChange} name='inputsearch' id='inputsearch' placeholder='Search Employee by Name'></input>
      </div>
      <div className='tablediv'>
      <table className='table' border={1}>
      <thead className='tableheader'>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Manager</th>
          <th>Salary</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    </div>

    </>
  )
}

export default App;

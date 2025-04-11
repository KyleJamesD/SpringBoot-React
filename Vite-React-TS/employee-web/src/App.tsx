'use client'
import { useState } from 'react'
import './App.css'
import { Person } from './schema'
import Header from './Components/Header/Header'
import Addpanel from './Components/Addpanel/Addpanel'
import Emptable from './Components/Emptable/Emptable'
import Searchemployee from './Components/Searchemployee/Searchemployee'


function App() {

  const [employees,setEmployees] = useState<Person[]>([]);
  const [id, setId] = useState<string>(''); 
  const [name, setName] = useState<string>(''); 
  const [manager, setManager] = useState<string>('');
  const [salary, setSalary] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filteredrows, setFilteredRows] = useState<Person[]>([]);

  return (
    <>
      <div className='main-container'>
        <Header/>
        <Addpanel 
        id={id} setId={setId} 
        name={name} setName={setName} 
        manager={manager} setManager={setManager} 
        salary={salary} setSalary={setSalary} 
        setEmployees={setEmployees}
        />
        <Searchemployee search={search} setSearch={setSearch}/>
      </div>
        <Emptable 
        search={search} 
        employees={employees} setEmployees={setEmployees} 
        setId={setId} setName={setName} 
        setManager={setManager} setSalary={setSalary} 
        filteredrows={filteredrows} setFilteredRows={setFilteredRows}
        />
    </>
  )
}

export default App;

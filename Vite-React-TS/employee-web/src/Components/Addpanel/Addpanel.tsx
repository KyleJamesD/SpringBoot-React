'use client'
import '../../App.css'
import axios from 'axios'
import { Person } from '../../schema'

interface setpropstype {
    id:string;
    setId: React.Dispatch<React.SetStateAction<string>>;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    manager: string;
    setManager: React.Dispatch<React.SetStateAction<string>>;
    salary: string;
    setSalary: React.Dispatch<React.SetStateAction<string>>;
    setEmployees: React.Dispatch<React.SetStateAction<Person[]>>;
  }

export default function Addpanel ( {id,setId,name,setName,manager,setManager,salary,setSalary,setEmployees}:setpropstype ) {

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    };

    const handleManagerChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setManager(e.target.value);
    };

    const handleSalaryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setSalary(e.target.value);
    };

    function handleCancel () {
        setId("");
        setName("");
        setManager("");
        setSalary("");
      }

        async function handleNewEmpSubmit () {
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

          async function getAllEmployees () {
            axios.get("http://localhost:8085/employees").then(((res)=>{
              console.log(res.data);
              setEmployees(res.data);
            }))
          }

    return (
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
    ); 
}
import { useEffect } from 'react'
import { Person } from '../../schema';
import axios from 'axios'

interface setpropstype {
    search: string;
    employees: Person[];
    setEmployees: React.Dispatch<React.SetStateAction<Person[]>>;
    setId: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setManager: React.Dispatch<React.SetStateAction<string>>;
    setSalary: React.Dispatch<React.SetStateAction<string>>;
    filteredrows: Person[];
    setFilteredRows: React.Dispatch<React.SetStateAction<Person[]>>;
  }



export default function Emptable ({search,employees,setEmployees,setId,setName,setManager,setSalary,filteredrows,setFilteredRows}:setpropstype) {

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

          async function getAllEmployees () {
            axios.get("http://localhost:8085/employees").then(((res)=>{
              console.log(res.data);
              setEmployees(res.data);
            }))
          }

          function handleCancel () {
            setId("");
            setName("");
            setManager("");
            setSalary("");
          }

    return (
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
    );
}
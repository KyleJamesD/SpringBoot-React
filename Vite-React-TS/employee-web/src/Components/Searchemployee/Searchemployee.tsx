

interface setpropstype {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}
export default function Searchemployee ({search,setSearch}:setpropstype) {

    const handleSearchChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
      };

    return (
    <>
              <input className='searchinput' type='search' 
              value={search} onChange={handleSearchChange} 
              name='inputsearch' id='inputsearch' 
              placeholder='Search Employee by Name'>
              </input>
    </>);
}
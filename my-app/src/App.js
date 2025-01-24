import './App.css';
import PokeCard from './components/PokeCard';
import {useState,useEffect} from 'react';

function App() {
  const [pokeList, setpokeList] = useState([]);
  const [urlList, seturlList] = useState([]);
  const[attriList, setattriList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(()=>{
      fetch("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then((response)=>response.json())
      .then((data)=>{
        setpokeList(data["results"]);
      })
  },[])
  useEffect(() => {
    if (pokeList.length !== 0) {
      const urls= pokeList.map((ele) => ele["url"]);
      seturlList(urls);
    }
  }, [pokeList]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(
        urlList.map((url) =>
          fetch(url).then((response) => response.json())
        )
      );
      setattriList(results); 
      setFilteredList(results);// Update the entire array at once
    };
  
    if (urlList.length > 0) {
      fetchData();
    }
  }, [urlList]);
  

  const [searchquery, setsearchquery] = useState("");
  
  const searchQuery = ()=>{
      const result = attriList.filter((element) => element["name"] === searchquery);
      setFilteredList(result);
  }
  return (
    <div className="App">
      <div className="search-bar">
        ⚽ PokeMon Cards
          <div className="search-holder">
              <input className="inpt" type="text" onChange={(e)=>{if(e.target.value.length === 0)(setFilteredList(attriList)); setsearchquery(e.target.value)}} placeholder="search bar"/>
              <button className="button" onClick={searchQuery} name="search">search</button>
          </div>
      </div>
      <div className="white-section">
      <div className="body">
        <div className="cards-container">
          {filteredList.map((ele,i)=>{
              
              return(
                <PokeCard key={`${ele}- ${i}`}name={ele["name"]} hp={ele["stats"][0]["base_stat"]} imagelink={ele["sprites"]["other"]["showdown"]["front_default"]} abilities={ele["abilities"]} type = {ele["types"][0]["type"]["name"]}/>
              )
          })}
        
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;

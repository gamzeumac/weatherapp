import './App.css';
import {useState , useEffect} from "react";
import {Card, Button,InputGroup, FormControl} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.min.css";
require('dotenv').config();
 
 
function App() {

  const getCurrentDate =(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month= months[d.getMonth()];
    let year = d.getFullYear();     
    return `${day} ${date} ${month} ${year}`
  }

  const [weatherData, setWeatherData] = useState({});
  const [inputCity,setInputCity] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState("Berlin")
  

  const API_key = process.env.REACT_APP_API_key;
 
 
  const submitHandler = async  (e) =>{
   e.preventDefault();
   const weatherApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_key}`);
   const weatherApiJson = await weatherApi.json();  
   setWeatherData(weatherApiJson);
   setInputCity("");
   setIsVisible(true);   
   setQuery("") 
 };


/*  useEffect( async () => {
  const urlonLoad = (`https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=${API_key}`)
  const weatherApionLoad = await fetch(urlonLoad);
  const weatherApiJsononLoad = await weatherApionLoad.json();  
  setWeatherData(weatherApiJsononLoad);
  setInputCity("");
  setIsVisible(true);   
  setQuery("") 

  }, []); */


 const inputHandler = (e)=>{
   setInputCity(e.target.value);

 }

 
  return (
    <div className="container"  >
      <h1 className=" text-center mt-5 text-warning">Weather App</h1>
      <InputGroup className="mb-3 inputGroup" style={{width:"30rem"}}  >
        <FormControl
          placeholder="City name.."
          aria-label="City name"
          aria-describedby="basic-addon2"
          onChange ={inputHandler}
          value={inputCity}
        />
        <Button type="submit" className="btn btn-warning text-dark" onClick={submitHandler} variant="outline-warning" id="button-addon2">
          Search
        </Button>
      </InputGroup>

      
        < >
        {!weatherData.name ?(
          <h4 className="text-center text-dark">"Please write a city name"</h4>
          
        ): (
          <Card className="cards mt-5" style={{width:"30rem", visibility: isVisible ? "visible" : "hidden"}}>
            <div className="d-flex justify-content-center">
        <h3 className="text-center mt-3 m-1 ">{ weatherData.name}</h3>
        <h3 className="text-center mt-3 m-1">{weatherData.sys.country}</h3>
        </div>
        <h6 className="text-center ">{getCurrentDate(new Date())}</h6>
        <Card.Body className="cardBody text-center">
          <Card.Text>
            <i className="wi wi-day-sunny display-1 mt-4"></i>
          </Card.Text>
          <Card.Title> <h4>{weatherData.weather[0].description}</h4></Card.Title>
          <Card.Text>
            <h1> {Math.floor(weatherData.main.temp - 273.15)}°</h1>
          </Card.Text>
        </Card.Body>
        <Card.Body className="cardBody2">
          <Card.Text>
            max: {Math.floor(weatherData.main.temp_max - 273.15)}°
          </Card.Text>
          <Card.Text>
            min: {Math.floor(weatherData.main.temp_min - 273.15)}°
          </Card.Text>
          <Card.Text>
           humidity: {weatherData.main.humidity}
          </Card.Text>
        </Card.Body>
      </Card>
        )}
        </>
     
    </div>
  );
}

export default App;
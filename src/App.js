import './App.css';
import {useState} from "react";
import {Card, Button,InputGroup, FormControl} from "react-bootstrap";


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
  

  const API_KEY = process.env.REACT_APP_API_KEY;

 
  const submitHandler = async (e)=>{
   e.preventDefault();

   const weatherApi = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}`);
   const weatherApiJson = await weatherApi.json();
   console.log(weatherApiJson);
   setWeatherData(weatherApiJson);
   setInputCity("");
   setIsVisible(true);
 
   
 };
 const inputHandler = (e)=>{
   setInputCity(e.target.value);

 }
  return (
    <div className="App">
    <div className="container">
      <div className="row ">
       
      <h1 className=" text-center mt-5">Weather App</h1>
      <div className="justify-content-center d-flex align-items-center">
      <InputGroup className="mb-3 inputGroup" style={{width:"30rem"}}  >
        <FormControl
          placeholder="City name.."
          aria-label="City name"
          aria-describedby="basic-addon2"
          onChange ={inputHandler}
          value={inputCity}
        />
        <Button type="submit" onClick={submitHandler} variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
      </div>
        < >
        {!weatherData.name ?(
          <h4 className="text-center">"Please write a city name"</h4>
          
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
        </div>
    </div>
    
  );
}

export default App;
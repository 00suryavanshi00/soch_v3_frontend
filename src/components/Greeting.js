import "./Greeting.css";

function Greeting() {
    const date = new Date();
  const currentTime = date.getHours();

  const customStyle = {
    color: ""
  };

  let greeting;
//   const image = document.querySelector("img");
  let imageURL = "";

  if (currentTime < 12) {
    greeting = "Good morning";
    imageURL="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-02-512.png";
    
    
  } else if (currentTime < 16) {
    greeting = "Good Afternoon";
    imageURL = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-512.png";
    
  } else if(currentTime < 20) {
    greeting = "Good Evening";
    imageURL ="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-09-512.png";
    
  } else {
    greeting = "Good Night";
    imageURL ="https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-16-512.png";
    

  }




    return(
      <>
      <div className="greeting">
        <a className="dp" href="index.html">
            {/* <img src="./images/lgo.svg" />x */}
          </a>
          <h1 className="greet">{greeting}</h1>
          <a>
            <img className="weather" src={imageURL}/>
          </a>  
    </div>
    <div className="pick" >
      <h2>Pick Story</h2>
    </div>

      </>
    
     

    )
}

export default Greeting;
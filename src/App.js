import { useEffect, useState } from "react";
import "./App.css";
import image0 from "./Images/0.jpg";
import image1 from "./Images/1.jpg";
import image2 from "./Images/2.jpg";
import image3 from "./Images/3.jpg";
import image4 from "./Images/4.jpg";
import image5 from "./Images/5.jpg";
import image6 from "./Images/6.jpg";

function App() {
  const [ word, setWord ] = useState("guess")
  const [ errorcounter, setErrorcounter ] = useState(0)
  const [ image, setImage ] = useState(image0)
  const fetchWord = async() =>{
    const response = await fetch("https://random-word-api.herokuapp.com/word")
    const data = await response.json()
    setWord(data);
  }
  useEffect(()=>{
    fetchWord();
  },[])
  console.log(word)

  let lettersArray = [];
  if(word){
    for(let i=0;i<word[0].length;i++){
      lettersArray.push(((word[0])[i]).toUpperCase());
    }
  }
  console.log(lettersArray)

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const handleclick = (e) =>{
    e.preventDefault();
    if(lettersArray.includes(e.target.name)===false){
      if(errorcounter===0){
        setErrorcounter(1)
        setImage(image1)
      } else if(errorcounter===1){
        setErrorcounter(2)
        setImage(image2)
      } else if(errorcounter===2){
        setErrorcounter(3)
        setImage(image3)
      } else if(errorcounter===3){
        setErrorcounter(4)
        setImage(image4)
      } else if(errorcounter===4){
        setErrorcounter(5)
        setImage(image5)
      } else if(errorcounter===5){
        setErrorcounter(6)
        setImage(image6)
        setTimeout(alertFunc,1);
        function alertFunc() {
          alert("YOU LOSE !!!!!");
        }
      }
    }
  }

  return (
    <>
      <div>
        <div className="headingContainer">
          <p>HANGMAN</p>
        </div>
      <div className="mainContainer">
        <div className="imageContainerBox">
          <img src={image} alt="hangman"/>
        </div>
        <div className="interfaceContainerBox">
          <div className="outcomeBox">
            {lettersArray.map((eachLetter)=>(
              <div className="eachBoxOfOutcomeBox">

              </div>
            ))}
          </div>
          <div className="guessingBox">
              {alphabet.map((eachAlphabet)=>(
                <button onClick={handleclick} key={eachAlphabet} name={eachAlphabet}>{eachAlphabet}</button>
              ))}
          </div> 
        </div>
      </div>
      </div>
    </>
  );
}

export default App;

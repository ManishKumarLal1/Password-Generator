import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client"


 
const App =() =>{
    let [password, setPassword] = useState("");
    let [numbers , setNumbers] = useState(false);
    let [characters, setCharacters] = useState(false);
   let [length, setLength] = useState(8);
     
     const passwordGenerator = useCallback(()=>{
        let pass="";
     let s= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numbers){
        s+="1234567890"
     }
     if(characters){
        s+="`~!@#$%^&*()_+=-\|[]{}/?.,<>;:"
     }
     for(let i=1;i<=length;i++){
        const char= Math.floor(Math.random()*s.length+1 )
        pass+= s.charAt(char)
     }
     setPassword(pass);
     },
        [numbers,characters,length,setPassword])
        const passRef = useRef(null);
        useEffect(()=>{passwordGenerator()},[length,numbers,characters,passwordGenerator])
        const clickToCopy = useCallback(()=>{
         passRef.current?.select();
         passRef.current?.setSelectionRange(0,3);
         window.navigator.clipboard.writeText(password);
        },[password])
        return (
         <div className="container">
         <h1>Password Generator</h1>
         <div className="password-box">
            <input type="text"
             value={password}
             placeholder="Password"
             className="pass"></input>
             <button className="copy" onClick={clickToCopy}>Copy</button>
         </div>
         <div className="set">
            <input type="range"
            min={8}
            max={100}
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label className="len"> length: {length}</label>
            <input type="checkbox"
            defaultChecked ={characters}
            onChange={()=>{setCharacters((prev)=>!prev)}}/>
            <label className="len">Characters</label>
            <input type="checkbox"
            defaultChecked ={numbers}
            onChange={()=>{setNumbers((prev)=>!prev)}}/>
            <label className="len">Numbers</label>
         </div>
         </div>
        )

}
const root= ReactDOM.createRoot(document.getElementById("root"))
root.render(
   <App />
)
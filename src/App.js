
import './App.css';
import {useState,useCallback} from 'react';

function App() {

  const [data,setname]= useState([])
  //https://filthy-battledress-tuna.cyclic.app/country/?q=us
  
  const debounce=(func)=>{
    let timer
      return function(...args){
        const context= this
        if(timer) clearTimeout(timer)
          timer= setTimeout(() => {
            timer=null
            func.apply(context,args);
          },200)
      }
  }

  const handlechange=(e)=>{

    const {value} = e.target
    fetch(`https://filthy-battledress-tuna.cyclic.app/country/?q=${value}`)
      .then((res)=>res.json())
      .then((res)=>{
        setname(res.country)
      })
  }

  const magic= useCallback(debounce(handlechange),[])
  return (
    <div className="App">
      <input placeholder="Enter country name"  onChange={magic}></input>
      <div>
        {data.map((e)=>{
        return  <p key={e._id}>{e.country}</p>
        })}
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import Weather from "./components/weather";
import Loading from './components/loadepage'
function App (){
    const [loaded,isLoading] = useState(false);
         setTimeout(()=>{
            isLoading(true)
         },5000)
 return  <div className="app">

       {loaded ? <Weather />: <Loading />}
 </div>
}
export default App;

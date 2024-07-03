import { useEffect } from "react";



function App() {
  const tg = window.Telegram.WebApp

  useEffect(()=> {
    tg.ready()
  },[])

  const handleClose = ()=> {
    tg.close()
  }
  
  return (
    <div className="App">
     work
     <button onClick={handleClose} >Close</button>
    </div>
  );
}

export default App;

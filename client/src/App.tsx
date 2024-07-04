import { useEffect } from "react";
import { Header } from "./widgets/header";
import { useTelegram } from "./shared/hooks/useTelegram";
import Button from "./shared/ui/button";
import { Route, Routes } from "react-router-dom";
import { ProductList } from "./pages/productList";
import { Form } from "./pages/form";


function App() {
  const {onToggleButton, tg} = useTelegram()

useEffect(()=> {
  tg.ready()
}, [])
  
  return (
    <div className="App">
     <Header/>
      <Routes>
        <Route index element={<ProductList/>} />
        <Route path='/form' element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;

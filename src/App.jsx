import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SingleGp from "./SingleGp";

import Layout from "./Layout";
import ResetPassword from "./ResetPassword";
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>} >
            <Route index element={<Home />} />
            
            <Route path="/project/:searchParm" element={<SingleGp />} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import {Route, Routes } from "react-router-dom";
import Aes from './components/Aes';
import Des from './components/Des';
import Hmac from './components/Hmac';
import Md5 from './components/Md5';
import RSA from './components/Rsa';
import Sha1 from './components/Sha1';
import Sha256 from './components/Sha256';
import Navbar from './components/Navbar';
import Home from './components/Home';
import HybridEncryption from './components/Rsa';
function App() {

  return (
    <div>
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/aes" element={<Aes />} />
      <Route path="/des" element={<Des />} />
      <Route path="/hmac" element={<Hmac />} />
      <Route path="/md5" element={<Md5/>} />
      <Route path="/rsa" element={<HybridEncryption />} />
      <Route path="/sha1" element={<Sha1 />} />
      <Route path="/Sha256" element={<Sha256 />} />

    </Routes>
    </div>
  )
}
export default App
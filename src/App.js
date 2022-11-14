import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Home, Login, Register, Dashboard } from "./components";
import { Routes, Route } from "react-router-dom";
import './App.css';
import authUser from "./components/auth/AuthUser";

function App() {

  const { getToken } = authUser();

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        { getToken() && <Route path="/Dashboard" element={<Dashboard />} /> }
      </Routes>
    </div>
  );
}

export default App;

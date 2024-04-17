import React, { Component } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import RegistrarClienteForm from "./components/cliente/RegistrarCliente";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/api/cliente" element={<Home />} />
          <Route path="/registrar-cliente" element={<RegistrarClienteForm />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
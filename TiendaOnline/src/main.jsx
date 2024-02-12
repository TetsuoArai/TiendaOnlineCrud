import React from "react";
import { render } from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./Layout";
import { Index } from "./routes/Index";

import "./index.css";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Forms } from "./routes/Form";

import FormsPutData, {} from "../src/components/FormsPutData"

render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/"  element={<Index/>} />
            <Route path="/forms"  element={<Forms/>} />
          </Route>
          <Route path="/FormsPutData/:idProduct/:foto/:nombre/:descripcion/:precio" element={<FormsPutData/>}></Route>
        </Routes>
      </BrowserRouter>      
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

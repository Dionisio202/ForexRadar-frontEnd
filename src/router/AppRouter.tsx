import React from "react";
import { Route, Routes } from "react-router-dom";
import Form from '../form.tsx';
import DivisaInformation from '../divisaInfromation.tsx';
export const AppRouter=()=>{
    return(
      <Routes>
        <Route index element={<Form></Form>} />
        <Route path="/home" element={<DivisaInformation></DivisaInformation>} />
      </Routes>
    )
}
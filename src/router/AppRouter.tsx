import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Form from '../form.tsx';
import DivisaInformation from '../divisaInfromation.tsx';
import { useGlobalContext } from '../globalProvider.tsx';

export const AppRouter = () => {
  const { isLogin } = useGlobalContext(); 
  return (
    <Routes>
      <Route
        index
        element={isLogin ? <Navigate to="/home" /> : <Form />}
      />
      <Route
        path="/home"
        element={isLogin ? <DivisaInformation /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default AppRouter;

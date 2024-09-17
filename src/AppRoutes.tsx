// import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Card from './pages/Card';
import BarChart from './pages/BarChart';
import TidyTree from './pages/TidyTree';


const AppRoutes = () => {
  return (
        <Routes>
            <Route path="/card" element={<Card />} />
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/tidytree" element={<TidyTree />} />
        </Routes>
  )
}

export default AppRoutes
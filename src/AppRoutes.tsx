// import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Card from './pages/Card';
import BarChart from './pages/BarChart';
import TidyTree from './pages/TidyTree';
import CTree from './pages/CTree';


const AppRoutes = () => {
  return (
        <Routes>
            <Route path="/card" element={<Card />} />
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/tidytree" element={<TidyTree />} />
            <Route path="/ctree" element={<CTree />} />
        </Routes>
  )
}

export default AppRoutes
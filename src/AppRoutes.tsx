// import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Card from './pages/Card';
import BarChart from './pages/BarChart';
import TidyTree from './pages/TidyTree';
import CTree from './pages/CTree';
import MagicCircle from './pages/MagicCircle';
import StaticTree from './pages/StaticTree';
import OldDataNewTree from './pages/oldDataNewTree';
import DynamicCard from './pages/DynamicCard';
import VersionOne from './pages/VersionOne';


const AppRoutes = () => {
  return (
        <Routes>
            <Route path="/card" element={<Card />} />
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/tidytree" element={<TidyTree />} />
            <Route path="/ctree" element={<CTree />} />
            <Route path="/mcircle" element={<MagicCircle />} />
            <Route path="/statictree" element={<StaticTree />} />
            <Route path="/odnt" element={<OldDataNewTree />} />
            <Route path="/dc" element={<DynamicCard />} />
            <Route path = "/vone" element={<VersionOne />} />
        </Routes>
  )
}

export default AppRoutes
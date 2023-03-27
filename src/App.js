import React from "react";
import Home from "./components/Home";
import Bucket from "./components/Bucket";
import History from "./components/History";
import { Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buckets" element={<Bucket />} />
            <Route path="/history" element={<History />} />
        </Routes>
    );
};

export default App;

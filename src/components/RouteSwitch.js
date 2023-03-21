import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Endgame from "./Endgame";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/endgame" element={<Endgame />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;
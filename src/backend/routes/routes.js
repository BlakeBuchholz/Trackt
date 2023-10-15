import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "../../pages/profile";
import Features from "../../pages/features";
import Pricing from "../../pages/pricing";
import AppContent from "../../pages/AppContent";


function Routesjs() {
    return (
        <Routes>
            <Route path="/" element={<AppContent />} /> {/* Add this */}
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    );
}

export default Routesjs;
/**
 * Central routing for the app.
 * Keeps App.tsx clean by moving Route definitions here.
 */
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import UploadPage from "@/pages/UploadPage";
import LightcurveListPage from "@/pages/LightcurveListPage";
import AnalysisResultsPage from "@/pages/AnalysisResultsPage";
import ChatPage from "@/pages/ChatPage";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/lightcurve-list" element={<LightcurveListPage />} />
      <Route path="/analysis-results" element={<AnalysisResultsPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
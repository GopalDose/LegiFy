// App.jsx
import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from './pages/Dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import DocumentViewer from './pages/DocumentViewer/DocumentViewer';
import { useTranslation } from "react-i18next";
import "./i18n"; // Import i18n config


const queryClient = new QueryClient();

const App = () => (
  // const { t, i18n } = useTranslation();


  <QueryClientProvider client={queryClient}>
    <ToastContainer/>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/viewer" element={<DocumentViewer />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
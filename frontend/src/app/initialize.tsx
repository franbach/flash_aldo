import { ReactNode } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";

import { initializeApollo, initializeActionCable } from "@/app/helpers";

export const initialize = (root: ReactNode) => {

  initializeActionCable('ws://localhost:3000/cable')
  initializeApollo("http://localhost:3000/graphql", "same-origin");

  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={root /** React App and Layout*/}>
        <Route path="/" index element={<Home /> } />
        <Route path="/dashboard" element={<Dashboard />} loader={() => null} />
      </Route>
    ),
  );
};
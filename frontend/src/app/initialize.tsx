import { ReactNode } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Error from "@/ui/modules/error";

import { initializeApollo, initializeActionCable } from "@/app/helpers";

import { getStoresData } from "@/pages/dashboard";

export const initialize = (root: ReactNode) => {
  initializeApollo("http://localhost:3000/graphql", "same-origin");
  initializeActionCable("ws://localhost:3000/cable");

  return createBrowserRouter(
    createRoutesFromElements(
      <Route element={root /** React App and Layout*/}>
        <Route path="/" index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} loader={getStoresData} errorElement={<Error />} />
      </Route>,
    ),
  );
};

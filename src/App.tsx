import React, { useRef, useEffect } from 'react';
import RootLayout from './components/RootLayout/RootLayout';
import Main from "./components/Main/Main";
import UserBoard from './components/UserBoard/UserBoard';
import PlanTaskboard from './components/PlanTaskboard/PlanTaskboard';
import Classes from './App.module.css';
import { createBrowserRouter, RouterProvider, RouteObject } from 'react-router-dom';

const App: React.FC = () => {

  const appRef = useRef<HTMLDivElement>(null);

  const RoutesArr: RouteObject[] = [
    {path: "planhub", element: <Main />},
    {path: "userboard", element: <UserBoard />},
    {path: "planboard", element: <PlanTaskboard />}
  ];

  const router = createBrowserRouter([
    { path: "/", element: <RootLayout />, children: RoutesArr}
  ]);

  return (
    <div ref={appRef} className={Classes.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

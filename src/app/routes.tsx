import { Navigate, type RouteObject } from "react-router";
import { Launcher } from "../launcher/Launcher";
import { workshopRoutes } from "@workshop/routes";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Launcher />,
  },
  // {
  //   path: "/roleplay/*",
  //   children: roleplayRoutes,
  // },
  {
    path: "/workshop/*",
    children: workshopRoutes,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

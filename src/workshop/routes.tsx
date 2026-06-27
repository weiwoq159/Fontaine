import type { RouteObject } from "react-router";
import { WorkshopLayout } from "./layout/WorkshopLayout";
import { HomePage } from "./features/home/home";
// import { getProductMeta } from "@core/app-meta";

// const workshopTone = getProductMeta("workshop").tone;

export const workshopRoutes: RouteObject[] = [
  {
    element: <WorkshopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "agent",
        element: <>123123</>,
      },
    ],
  },
];

import { createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RouterProvider } from "react-router";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import AddCompanyForm from "./components/admin/AddCompanyForm";
import CreateJobs from "./components/admin/CreateJobs";
import CompanyDetail from "./components/admin/CompanyDetail";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home />
    </ThemeProvider>,
  },
  {
    path: "/signin",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Signin />
    </ThemeProvider>,
  },
  {
    path: "/jobs",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Jobs />
    </ThemeProvider>,
  },
  {
    path: "/description/:id",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <JobDescription />
    </ThemeProvider>,
  },
  {
    path: "/browse",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Browse />
    </ThemeProvider>,
  },
  {
    path: "/profile",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Profile />
    </ThemeProvider>,
  },

  //Recruiter Paths

  {
    path: "/companies",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Companies />
    </ThemeProvider>,
  },
  {
    path: "/companies/:id",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CompanyDetail />
    </ThemeProvider>,
  },
  {
    path: "/companies/create",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AddCompanyForm />
    </ThemeProvider>,
  },
  {
    path: "/jobs/create",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CreateJobs />
    </ThemeProvider>,
  },
]
);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
import { createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RouterProvider } from "react-router";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/recruiter/Companies";
import AddCompanyForm from "./components/recruiter/AddCompanyForm";
import CreateJobs from "./components/recruiter/CreateJobs";
import CompanyDetail from "./components/recruiter/CompanyDetail";
import JobApplicants from "./components/recruiter/JobApplicants";
import ProtectedRoute from "./components/recruiter/ProtectedRoute";


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
      <ProtectedRoute> <Companies /></ProtectedRoute>
    </ThemeProvider>,
  },
  {
    path: "/companies/:id",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProtectedRoute> <CompanyDetail /> </ProtectedRoute>
    </ThemeProvider>,
  },
  {
    path: "/companies/create",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProtectedRoute> <AddCompanyForm /> </ProtectedRoute>
    </ThemeProvider>,
  },
  {
    path: "/jobs/create",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProtectedRoute> <CreateJobs /> </ProtectedRoute>
    </ThemeProvider>,
  },
  {
    path: "/jobs/:id/applicants",
    element: <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ProtectedRoute> <JobApplicants /> </ProtectedRoute>
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
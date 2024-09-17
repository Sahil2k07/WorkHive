import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import OpenRoute from "./components/auth/OpenRoute";
import Browse from "./pages/Browse";
import JobDescription from "./components/job/JobDescription";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/auth/PrivateRoute";
import Error from "./pages/Error";
import Jobs from "./pages/Jobs";
import Companies from "./pages/admin/Companies";
import RecruiterRoute from "./components/auth/RecruiterRoute";
import CompanySetup from "./pages/admin/CompanySetup";
import CompanyCreate from "./pages/admin/CompanyCreate";
import AdminJobs from "./pages/admin/AdminJobs";
import { Toaster } from "sonner";
import PostJobs from "./pages/admin/PostJobs";
import UpdateJob from "./pages/admin/UpdateJob";
import Applicants from "./pages/admin/Applicants";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "login",
    element: (
      <OpenRoute>
        <Login />
      </OpenRoute>
    ),
  },
  {
    path: "signup",
    element: (
      <OpenRoute>
        <Signup />
      </OpenRoute>
    ),
  },
  { path: "browse", element: <Browse /> },
  { path: "description/:id", element: <JobDescription /> },
  {
    path: "profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  { path: "jobs", element: <Jobs /> },
  {
    path: "admin/companies",
    element: (
      <RecruiterRoute>
        <Companies />
      </RecruiterRoute>
    ),
  },
  {
    path: "admin/companies/update/:id",
    element: (
      <RecruiterRoute>
        <CompanySetup />
      </RecruiterRoute>
    ),
  },
  {
    path: "admin/companies/create",
    element: (
      <RecruiterRoute>
        <CompanyCreate />
      </RecruiterRoute>
    ),
  },
  {
    path: "admin/jobs",
    element: (
      <RecruiterRoute>
        <AdminJobs />
      </RecruiterRoute>
    ),
  },
  {
    path: "admin/jobs/create",
    element: (
      <RecruiterRoute>
        <PostJobs />
      </RecruiterRoute>
    ),
  },
  {
    path: "admin/jobs/update/:id",
    element: (
      <RecruiterRoute>
        <UpdateJob />
      </RecruiterRoute>
    ),
  },
  {
    path: "admin/jobs/applicants/:id",
    element: (
      <RecruiterRoute>
        <Applicants />
      </RecruiterRoute>
    ),
  },
  { path: "*", element: <Error /> },
]);

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;

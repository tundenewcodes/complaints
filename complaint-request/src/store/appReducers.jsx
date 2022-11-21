import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const defaultState = {
  reports: [],
  fullname: "",
  email: "",
  department: "",
  signIn: (data) => {},
  error: "",
  signUp: (data) => {},
  makeComplaintHandler: () => {},
  getReports: () => {},
  postReport: (data) => {},
  isLoading: false,
  complaintData: [],
  updateProfile: (userData) => {},
  updatePassword: (userData) => {},
  makeComplaint: true,
  logout: () => {},
  totalItems: 0,
  recieved: 0,
  pending: 0,
  username: "",
  useremail: "",
  userdepartment: "",
  getFullname: () => {},
};

export const AppContext = React.createContext(defaultState);

const AppContextProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [userdepartment, setUserDepartment] = useState("");
  const [complaintData, setComplaintData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [authLoading, setAuthLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [makeComplaint, setMakeComplaint] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [recieved, setRecieved] = useState(0);
  const [pending, setPending] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    const fullname = localStorage.getItem("fullname");
    const email = localStorage.getItem("email");
    const department = localStorage.getItem("department");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logout();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    setIsAuth(true);
    setToken(token);
    setUserId(userId);

    setFullname(fullname);
    setEmail(email);
    setAutoLogout(remainingMilliseconds);
  }, [
    reports,
    token,
    totalItems,
    recieved,
    pending,
    fullname,
    email,
    department,
  ]);

  const getReports = async () => {
    const response = await axios.get("/reports", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.data;
    setReports(data.reports);
    setTotalItems(data.totalItems);
    setPending(data.pending);
    setRecieved(data.recieved);
    console.log(data);
    console.log(reports);
  };

  const postReport = async (complaintData) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/report",
        complaintData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Creating a complaint failed!");
      }
      const data = await response.data;
      setComplaintData(data);
      setIsLoading(false);
      console.log(data);
      const myDate = new Date(data.report.createdAt).toLocaleDateString();
      const myTime = new Date(data.report.createdAt).toLocaleTimeString();
      console.log(myDate);
      console.log(myTime);
      navigate("/complaint-summary");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuth(false);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("department");
    navigate("/");
  };
  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logout();
    }, milliseconds);
  };

  const signUp = async (userData) => {
    setIsLoading(true);
    try {
      setAuthLoading(true);
      const response = await axios.post(
        "/signup",
        userData
      );
      if (response.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log("Error!");
        throw new Error("Creating a user failed!");
      }
      const data = await response.data;

      setIsAuth(false);
      setIsLoading(false);
      console.log(data);
      navigate("/signin");
    } catch (err) {
      console.log(err);
      setIsAuth(false);
      setIsLoading(false);
      setError(err.message);
      setAuthLoading(false);
    }
  };
  const makeComplaintHandler = () => {
    setMakeComplaint(false);
  };
  const signIn = async (userData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "/login",
        userData
      );
      if (response.status === 422) {
        throw new Error("Validation failed.");
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log("Error!");
        throw new Error("Could not authenticate you!");
      }
      const data = await response.data;
      setIsAuth(true);
      setToken(data.token);
      setUserId(data.userId);
      setIsLoading(false);
      console.log(data);
      setFullname(data.fullname);
      setEmail(data.email);
      setDepartment(data.department);
      setUserInfo(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("fullname", data.fullname);
      localStorage.setItem("email", data.email);
      localStorage.setItem("department", data.department);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);

      navigate("/complaint-summary");
    } catch (err) {
      console.log(err);
      setIsAuth(false);
      setError(err.message);
      setIsLoading(false);
    }
  };

  const getFullname = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/userinfo", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.data;
      if (!data) {
        throw new Error("failed to load userdata");
      }
      setUsername(data.fullname);
      setUseremail(data.email);
      setUserDepartment(data.department);
      console.log(data);
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const updateProfile = async (userData) => {
    setIsLoading(true);
    try {
      setAuthLoading(true);
      const response = await axios.put(
        "/updateProfile",
        userData
      );
      if (response.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log("Error!");
        throw new Error("Creating a user failed!");
      }
      const data = await response.data;

      setAuthLoading(false);
      console.log(data);
      navigate("/complaint-summary");
    } catch (err) {
      console.log(err);
      setIsAuth(false);
      setError(err.message);
      setIsLoading(false);
    }
  };
  const updatePassword = async (userData) => {
    // try {
    //   setAuthLoading(true);
    //   const response = await axios.put(
    //     "/updatePassword",
    //     userData
    //   );
    //   if (response.status === 422) {
    //     throw new Error(
    //       "Validation failed. Make sure the email address isn't used yet!"
    //     );
    //   }
    //   if (response.status !== 200 && response.status !== 201) {
    //     console.log("Error!");
    //     throw new Error("Creating a user failed!");
    //   }
    //   const data = await response.data;

    //   setAuthLoading(false);
    //   console.log(data);
    navigate("/complaint-summary");
    // } catch (err) {
    //   console.log(err);
    //   setIsAuth(false);
    //   setError(err.message);
    //   setAuthLoading(false);
    // }
  };

  const value = {
    reports,
    signUp,
    signIn,
    getFullname,
    getReports,
    fullname,
    email,
    department,
    postReport,
    isLoading,
    complaintData,
    username,
    useremail,
    userdepartment,
    logout,
    totalItems,
    recieved,
    pending,
    updateProfile,
    updatePassword,
    makeComplaint,
    makeComplaintHandler,error
  };
  return <AppContext.Provider value={value}> {children} </AppContext.Provider>;
};

export default AppContextProvider;

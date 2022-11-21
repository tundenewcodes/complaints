import React, { useContext, useRef, useState, useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AppContext } from "../store/appReducers";
import Error from "./Error";
import Loading from "./Loading";
const ProfileEdit = () => {





  const [realDepartment, setRealDepartment] = useState("");
 
  const appCtx = useContext(AppContext);


useEffect(() => {
appCtx.getFullname()
}, [])



  const fullnameRef = useRef("");
  const emailRef = useRef("");
  const oldPasswordRef = useRef("");
  const newPasswordRef = useRef("");

  const changeDepartment = (e) => {
    setRealDepartment(e.target.value);
  };

  const updateUserInfoHandler = () => {
    const enteredFullname = fullnameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enterdDepartment = realDepartment;

    const userData = {
      fullname: enteredFullname,
      email: enteredEmail,
      department: enterdDepartment,
    };

    appCtx.updateProfile(userData);
    appCtx.getFullname()
    
  };


  const updatePasswordHandler = ()=>{
    const enteredOldPassword = oldPasswordRef.current.value
    const enteredNewPassword = newPasswordRef.current.value

const userData = {
  oldPassword: enteredOldPassword,
  newPassword:enteredNewPassword
}

appCtx.updatePassword(userData)


  }

  return (
    <div className="w-full h-[1000px] flex justify-center items-center">
      <div className="h-full w-9/12 flex justify-center items-center flex-col">
        <div className="flex justify-start items-center w-full h-[40px] border-b-2 border-red-400">
          <BsArrowLeft className="text-gray-600 w-8" />
          <h1 className="text-gray-900 text-md md:text-4xl ml-4">PROFILE SETTING</h1>
          {appCtx.error && <Error message={appCtx.error}/>}
        </div>
        <div className="w-full h-3/5 flex flex-col mt-8">
          <div className="w-full h-[40px] bg-gray-900 justify-start items-center">
            <h1 className="text-white ml-4 md:text-xl text-xl">PERSONAL DETAILS</h1>
          </div>
          <div className="w-full h-4/5 flex shadow-lg">
        
            <form
              action="" onSubmit={updateUserInfoHandler}
              className="h-full w-full flex flex-col justify-start items-start"
            >
              <div className="w-full h-[200px] justify-start items-center flex ml-4">
                <input
                  type="text"
                
                  placeholder={appCtx.username} name='fullname'
                  ref={fullnameRef}
                  className="w-5/12 h-[50px] p-4 border-2 border-gray-500 outline-0"
                />
                <input
                  type="text"
               
                  placeholder={appCtx.useremail} name='email'
                  ref={emailRef}
                  className="w-5/12 h-[50px]  ml-4 p-4 border-2 border-gray-500"
                />
              </div>
              <div className="w-full h-[200px] justify-start items-center flex ml-4">
                <div className="w-5/12 flex flex-col h-[60px]">
                  <label htmlFor="">DEPARTMENT</label>
                  <select
                    name="department"
                    placeholder={appCtx.userdepartment}
                    id="department"
                    onChange={changeDepartment}
                    className="w-full h-[70px] p-4 border-2 border-gray-500 outline-0"
                  >
                    <option value="staff">Staff</option>
                    <option value="executive">Executive</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div className="w-5/12 flex flex-col mt-8  h-[7px]">
                  <label htmlFor="" className="ml-2 hidden">
                    DATE OF APPLICATION
                  </label>
                  <input
                    type="date" min='1970-12-01' max='2022-12-25'
                    className="date-picker w-full h-full ml-2 p-4 border-2 border-gray-500 outline-0"
                  />
                </div>
              </div>
              <button
                type="button" onClick={updateUserInfoHandler}
                className="bg-red-600 p-2 flex items-center justify-center text-center mb-8 w-32 ml-4 text-white text-2xl font-semibold h-12 rounded-xl cursor-pointer"
              >
                Save
              </button>
              {appCtx.isLoading && <Loading/>}
            </form>
          </div>
        </div>
        <div className="w-full h-2/5 flex flex-col mt-8">
          <div className="w-full h-[40px] bg-gray-900 justify-start items-center">
            <h1 className="text-white ml-4 text-3xl">SECURITY</h1>
          </div>
          <div className="w-full h-4/5 flex shadow-lg">
            <form
              action=""
              className="h-full w-full flex flex-col justify-start items-start"
            >
              <div className="w-full h-[200px] justify-start items-center flex ml-4">
                <input
                  type="password" ref={oldPasswordRef} name='oldPassword'
                  placeholder="Old password"
                  className="w-5/12 h-[50px] p-4 border-2 border-gray-500 outline-0"
                />
                <input
                  type="password" ref={newPasswordRef}
                  placeholder="new password" name='newPassword'
                  className="w-5/12 h-[50px]  ml-4 p-4 border-2 border-gray-500"
                />
              </div>

              <button
                type="button" onClick={updatePasswordHandler}
                className="bg-red-600 p-2 flex items-center justify-center text-center  w-32 ml-4 text-white text-2xl font-semibold h-12 rounded-xl cursor-pointer"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;

import React, { useContext } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { AppContext } from "../../store/appReducers";
const SummaryTable = () => {
  const appCtx = useContext(AppContext)

  return (
    <div className="w-full h-[800px] bg-white shadow-xl flex flex-col items-center justify-start">
      <div className="flex h-full w-4/5 md:w-3/5 mt-8 flex-col">
        <h1 className="text-3xl font-semibold">Report Summary</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 mt-12 bg-black">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-left"
                      >
                        <div className="flex justify-between w-full h-4">
                          <p className='text-xs md:text-lg'> Date</p>
                          <AiFillCaretDown className="text-xs md:text-lg text-red-700 cursor-pointer" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-left"
                      >
                        <div className="flex justify-between w-full h-4">
                          <p className='text-xs md:text-lg'> Time</p>
                          <AiFillCaretDown className=" text-xs md:text-lg text-red-700 cursor-pointer" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-left"
                      >
                        <div className="flex justify-between w-full h-4">
                          <p className='text-xs md:text-lg'><span className='hidden '>Report</span>  Title</p>
                          <AiFillCaretDown className=" text-xs md:text-lg text-red-700 cursor-pointer" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-left"
                      >
                        <div className="flex justify-between w-full h-4">
                          <p className='text-xs md:text-lg'> Status</p>
                          <AiFillCaretDown className=" text-xs md:text-lg text-red-700 cursor-pointer" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appCtx.reports.map((complaint) => ( 
                      <tr className="border-b" key={complaint.createdAt}>
                        <td className="px-6 py-4 whitespace-nowrap text-xs md:text-md font-medium text-white">
                          {new Date(complaint.createdAt).toLocaleDateString()}
                        </td>
                        <td className="text-xs md:text-md text-white font-light px-6 py-4 whitespace-nowrap">
                        {new Date(complaint.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="text-xs md:text-md text-white font-light px-6 py-4 whitespace-nowrap">
                        {complaint.reportTitle}
                        </td>
                        <td className="text-xs md:text-md text-white font-light px-6 py-4 whitespace-nowrap">
                        {complaint.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryTable;

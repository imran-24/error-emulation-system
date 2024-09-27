/* eslint-disable react/prop-types */

// import { useEffect, useState } from "react";
import Loading from "./loading";

const Table = ({ data, loading }) => {
  if (!data.length) {
    return null;
  }

  // const [dataSet, setDataSet] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = "https://docs.sheetjs.com/executive.json";
  //       const response = await fetch(url);
  //       const rawData = await response.json();
  //       setDataSet(rawData);  // Store the fetched data in state
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } 
  //   };

  //   fetchData();  // Call the fetch function inside useEffect
  // }, []);
  // console.log(dataSet);
  
  return (
    <div className='max-w-5xl w-full mx-auto mt-4'>
      <table className='table-auto border-collapse border w-full border-gray-200'>
        <thead className='bg-gray-100 text-xs sm:text-sm'>
          <tr>
            <th className='border p-3 text-xs text-left'>No</th>
            <th className='border p-3 text-xs text-left'>Id</th>
            <th className='border p-3 text-xs text-left'>Name</th>
            <th className='border p-3 text-xs text-left'>Address</th>
            <th className='border p-3 text-xs text-left'>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr
              key={item.id}
              className={`border ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className='p-3 text-xs truncate text-left border-r'>
                {index + 1}
              </td>
              <td className='p-3 text-xs truncate text-left max-w-40'>
                {item.id}
              </td>
              <td className='p-3 capitalize  text-xs truncate text-left'>
                {(item.name)}
              </td>
              <td className='p-3 text-xs capitalize  truncate text-left'>
                {item.address}
              </td>
              <td className='p-3 text-xs truncate text-left'>
                <div className='border border-neutral-200 bg-slate-100  rounded-lg p-[2px] w-fit'>
                  <p>{item.phone}</p>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={4} className="flex-1 p-3">{loading && <Loading />}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;

import { setSearchQuery } from "@/redux/slices/jobSlice";
import type { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Noida",
      "Gurugram",
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Mumbai",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Web Developer",
      "Backend Developer",
      "FullStack Developer",
      "Android Developer",
      "Data Analyst",
      "Graphic Designier",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

export default function FilterComponent() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, [pathname, dispatch]);

  return (
    <div className="left-0 w-full min-h-screen p-1 text-white bg-hivebg-200 sm:p-8">
      <h1 className="mb-4 text-2xl font-extrabold text-hiveblue-300">
        Filter Jobs
      </h1>
      <div className="space-y-6">
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="text-lg font-bold text-white">{data.filterType}</h1>
            <div className="flex flex-col gap-4 mt-2">
              {data.array.map((item, idx) => {
                const itemId = `radio-${index}-${idx}`;
                return (
                  <div key={itemId} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={itemId}
                      name={data.filterType} // Group the radio buttons by filter type
                      value={item}
                      checked={selectedValue === item}
                      onChange={changeHandler}
                      className="radio-button"
                    />
                    <label htmlFor={itemId} className="text-gray-200">
                      {item}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

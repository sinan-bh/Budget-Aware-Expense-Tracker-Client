import React from "react";
import useCalendarStore from "../hooks/store/calendarStore";

const NavbarLayout = () => {
  const { currentMonth, setSelectedMonthYear } = useCalendarStore();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const displayMonth = `${
    monthNames[currentMonth.getMonth()]
  } ${currentMonth.getFullYear()}`;

  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setSelectedMonthYear(new Date(year, month - 1));
  };

  return (
    <nav className="bg-white shadow-md p-3 mb-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-gray-800">{displayMonth}</h1>
      <input
        type="month"
        value={`${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`}
        onChange={handleMonthChange}
        className="p-2 border rounded-md"
      />
    </nav>
  );
};

export default NavbarLayout;

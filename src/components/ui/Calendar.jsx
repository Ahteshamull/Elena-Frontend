import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const Calendar = ({ className, selectedDates = [], onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
  
  // Get first day of month (0 = Sunday in JS, we want 0 = Monday)
  let firstDayOfMonth = new Date(year, month, 1).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get number of days in prev month
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const dates = [];

  // Previous month trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    dates.push({ value: daysInPrevMonth - i, inactive: true });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    // Format YYYY-MM-DD
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const isSelected = selectedDates.includes(dateStr);
    dates.push({ value: i, inactive: false, dateStr, isSelected });
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const toggleDate = (dateStr) => {
    if (!dateStr || !onChange) return;
    if (selectedDates.includes(dateStr)) {
      onChange(selectedDates.filter(d => d !== dateStr));
    } else {
      onChange([...selectedDates, dateStr]);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className={cn("w-full max-w-[280px]", className)}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-widest text-primary-900 uppercase">
            {monthNames[month]}
          </span>
          <span className="text-[10px] font-medium text-gray-400">{year}</span>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={handlePrevMonth} className="text-gray-400 hover:text-primary-900">
            <ChevronLeft size={14} />
          </button>
          <button type="button" onClick={handleNextMonth} className="text-gray-400 hover:text-primary-900">
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-4 text-center">
        {days.map(day => (
          <span key={day} className="text-[8px] font-black text-gray-300 tracking-widest">{day}</span>
        ))}
        {dates.map((date, index) => (
          <div key={index} className="flex justify-center items-center h-8">
            <button
              type="button"
              onClick={() => !date.inactive && toggleDate(date.dateStr)}
              disabled={date.inactive}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                date.inactive && "text-gray-200 cursor-default",
                date.isSelected ? "bg-black text-white" : (!date.inactive && "text-primary-900 hover:bg-gray-50 cursor-pointer")
              )}
            >
              {date.value}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Calendar };

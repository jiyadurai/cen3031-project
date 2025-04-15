// DateSelector.jsx
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    // If no date is selected, set selectedDate to an empty array
    if (!date) {
        setSelectedDate([]);
        return;
    }

    setSelectedDate(date);
  };

  // Returns a date string in the format of "MM/DD/YYYY"
  // NOTE: toLocaleDateString() REQUIRES date to be a new Date, not the base Date object to work
  function formatDate(date) {
    return date
    .map(d => {
        const parsedDate = new Date(d);
        return isNaN(parsedDate) ? 'Invalid Date' : parsedDate.toLocaleDateString();
    })
    .join(', ');
  }
  

  return (
    <div className="relative inline-block">
      <button
        className="btn btn-sm btn-outline rounded-full px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        🗓️ {formatDate(selectedDate)}
      </button>

      {isOpen && (
        <div className="absolute mt-2 ml-[-13rem] z-50 bg-white border rounded-xl shadow-lg p-4">
          <DayPicker
            mode="multiple" // Change to 'single' if you only want one
            selected={selectedDate} // Currently selected date MUST be an array of DATE object even if it only holds one
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}


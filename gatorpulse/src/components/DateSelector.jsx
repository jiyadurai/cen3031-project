// DateSelector.jsx
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateSelector({ selectedDates, setSelectedDate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    // Toggle select for multiple dates
    if (Array.isArray(selectedDates)) {
      const exists = selectedDates.find(d => d.toDateString() === date.toDateString());
      setSelectedDate(exists
        ? selectedDates.filter(d => d.toDateString() !== date.toDateString())
        : [...selectedDates, date]
      );
    } else {
      setSelectedDate(date);
    }
  };

  const formatDate = (date) =>
    Array.isArray(date)
      ? date.map(d => d.toLocaleDateString()).join(', ')
      : date?.toLocaleDateString() || 'Select date';

  return (
    <div className="relative inline-block">
      <button
        className="btn btn-sm btn-outline rounded-full px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        🗓️ {formatDate(selectedDates)}
      </button>

      {isOpen && (
        <div className="absolute mt-2 ml-[-13rem] z-50 bg-white border rounded-xl shadow-lg p-4">
          <DayPicker
            mode="multiple" // Change to 'single' if you only want one
            selected={selectedDates}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}


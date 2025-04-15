// DateSelector.jsx
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateSelector({ selectedDate, setSelectedDate }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    // // console.log('Selected date RAW:', date);
    // // console.log('Selected date DATE OBJ:', new Date(date));
    // // console.log(new Date(date).toDateString());
    // // console.log('Selected date toDateString:', date.toDateString());
    // // Toggle select for multiple dates
    // if (!date) return;

    // // Ensure selectedDate is always an array
    // const currentDates = Array.isArray(selectedDate) ? selectedDate : [];

    // const exists = currentDates.find(d => new Date(d).toDateString() === new Date(date)?.toDateString());

    // if (exists) {
    //     // Remove the date
    //     setSelectedDate(currentDates.filter(d => new Date(d).toDateString() !== new Date(date)?.toDateString()));
    // } else {
    //     // Add the date
    //     setSelectedDate([...currentDates, date]);
    // }

    // Make sure it’s always an array (can be null if nothing is selected)
    if (!date) {
        setSelectedDate([]);
        return;
    }

    setSelectedDate(date);
  };

  function formatDate(date) {
    // console.log(date);
    if (Array.isArray(date)) {
      return date
        .map(d => {
          const parsedDate = new Date(date);
          return isNaN(date) ? 'Invalid Date' : parsedDate.toLocaleDateString();
        })
        .join(', ');
    } else {
      const parsedDate = new Date(date);
    //   console.log('Parsed date 1:', new Date(date).toDateString());
    //   console.log('Parsed date 2:', parsedDate);
    //   console.log('Parsed date 3:', parsedDate.toLocaleDateString());
    //   console.log('Parsed date 4:', date);
      return isNaN(date) ? 'Select date' : parsedDate.toDateString();
    }
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
            selected={selectedDate}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}


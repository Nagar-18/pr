
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRangePicker = ({ value, onChange }) => {
  return (
    <div>
      <DatePicker
        selected={value.startDate}
        onChange={(date) => onChange({ startDate: date, endDate: value.endDate })}
        selectsStart
        startDate={value.startDate}
        endDate={value.endDate}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={value.endDate}
        onChange={(date) => onChange({ startDate: value.startDate, endDate: date })}
        selectsEnd
        startDate={value.startDate}
        endDate={value.endDate}
        minDate={value.startDate}
        placeholderText="End Date"
      />
    </div>
  );
};

export default DateRangePicker;

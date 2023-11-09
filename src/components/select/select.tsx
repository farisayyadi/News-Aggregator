import React from "react";
import "./select.scss";

interface SelectModel {
  id: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (key: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ id, options, value, onChange }: SelectModel) => (
  <select onChange={onChange} value={value} id={id} className="select">
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;

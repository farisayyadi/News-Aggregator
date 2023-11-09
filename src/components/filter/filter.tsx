import React, { useState } from "react";
import { Source } from "../articles/types";
import Select from "../select/select";
import "./filter.scss";

interface FilterModel {
  onSearchChange: (key: string) => string;
  onSourceChange: (key: string) => string;
  onCategoryChange: (key: string) => string;
  onDateChange: (key: string) => string;
}

const Filter = ({
  onSearchChange,
  onSourceChange,
  onCategoryChange,
  onDateChange,
}: FilterModel) => {
  const [search, setSearch] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSearch = () => {
    onSearchChange(search);
  };

  const handleSource = (source: string) => {
    setSource(source);
    onSourceChange(source);
  };

  const handleCategory = (category: string) => {
    setCategory(category);
    onCategoryChange(category);
  };

  const handleDate = (date: any) => {
    setDate(date);
    onDateChange(date);
  };

  const categories = [
    { value: "", label: "Select a Category" },
    { value: "world", label: "World" },
    { value: "business", label: "Business" },
    { value: "economy", label: "Economy" },
    { value: "politic", label: "Politic" },
    { value: "sport", label: "Sports" },
    { value: "technology", label: "Technology" },
  ];

  const sources = [
    { value: "", label: "Select a Source" },
    { value: Source.NewsAPI, label: "News API" },
    { value: Source.NewYorkTimes, label: "New York Times" },
  ];

  return (
    <div id="filter">
      <h1>News Aggregator</h1>
      <div className="filter">
        <section>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </section>

        <div className="filterSection">
          <Select
            id={"category"}
            options={categories}
            value={category}
            onChange={(e) => handleCategory(e.currentTarget.value)}
          />
          <Select
            id={"source"}
            options={sources}
            value={source}
            onChange={(e) => handleSource(e.currentTarget.value)}
          />

          <input
            type="date"
            onChange={(e) => handleDate(e.currentTarget.value)}
            value={date}
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;

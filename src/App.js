import React, { useState } from "react";
import Filter from "./components/filter/filter";
import Articles from "./components/articles/articles";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const onSearchChange = (search) => {
    setSearch(search);
  };

  const onSourceChange = (source) => {
    setSource(source);
  };

  const onCategoryChange = (category) => {
    setCategory(category);
  };

  const onDateChange = (date) => {
    setDate(date);
  };

  return (
    <div id="app">
      <Filter
        onSearchChange={onSearchChange}
        onSourceChange={onSourceChange}
        onCategoryChange={onCategoryChange}
        onDateChange={onDateChange}
      />
      <Articles
        search={search}
        source={source}
        category={category}
        date={date}
      />
    </div>
  );
}

export default App;

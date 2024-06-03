import { React, useState, useEffect } from "react";

const Search = ({
  data,
  onNameSelect,
  selectedName,
  setSelectedName,
  setNoName,
  ids,
  size
}) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);

  useEffect(() => {
    setInputValue(selectedName);
    console.log("data:", data);
  }, []);

  useEffect(() => {
    setSelectedSuggestion(-1);
  }, [suggestion]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setNoName(true);
      setInputValue("");
      setSelectedName("");
    } else {
      setInputValue(value);
      const filterName = data.filter(
        (name) => name && name.toLowerCase().includes(value.toLowerCase())
      );
      console.log(filterName);
      setNoName(false);

      if (filterName.length === 0) {
        setNoName(true);
      }

      setSuggestion(filterName);
    }
    console.log(suggestion);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedSuggestion !== -1) {
        handleNameSelect(suggestion[selectedSuggestion]);
      } else if (suggestion.length > 0) {
        handleNameSelect(suggestion[0]);
      } else {
        setInputValue("");
        setNoName(true);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestion((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : suggestion.length - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestion((prevIndex) =>
        prevIndex < suggestion.length - 1 ? prevIndex + 1 : 0
      );
    }
  };

  const handleNameSelect = (name) => {
    {
      setInputValue(name);
      setSuggestion([]);
      onNameSelect(name);
    }
  };

  return (
    <div className="">
      <input
        className={`max-w-${size?size:'60'} border p-1 rounded-[0.4rem]`}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="select name"
      />
      {inputValue && suggestion.length > 0 && (
        <div className="p-2 absolute w-[19%] mx-1 glass  border ">
          <ul>
            {suggestion.map((name, index) => {
              return (
                <li
                  key={index}
                  className={
                    index === selectedSuggestion
                      ? "bg-accent-content text-white p-1"
                      : "p-1"
                  }
                  onClick={() => handleNameSelect(name)}
                >
                  {name}{" "}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;

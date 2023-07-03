import { Fragment } from "react";

const SortBy = ({ onSortBy }) => {
  const handleChange = (ev) => {
    onSortBy(ev.target.value);
  };
  return (
    <Fragment>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleChange}
      >
        <option>Sort by:</option>
        <option value="0">Normal price</option>
        <option value="1">Price from low to high</option>
        <option value="2">Price from high to low</option>
      </select>
    </Fragment>
  );
};

export default SortBy;

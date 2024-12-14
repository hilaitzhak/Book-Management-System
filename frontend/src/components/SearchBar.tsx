import { FC } from "react";
import { SearchBarProps } from "../interfaces/interface";

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => (
  <div className="mb-6">
    <input
      type="text"
      placeholder="Search books by title or author..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full p-2 border rounded"
    />
  </div>
);

export default SearchBar;
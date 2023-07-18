interface Props {
  setFilter: Function;
  genres: string[];
}

const FilterSelector = ({ setFilter, genres }: Props) => {
  return (
    <select
      name="genre"
      id="genre"
      className="bg-slate-800"
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value={""}>Select Genre</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default FilterSelector;

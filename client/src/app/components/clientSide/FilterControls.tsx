"use client";

interface FilterOption {
  id: string | number;
  name: string;
}

interface FilterConfig {
  genres?: FilterOption[];
  sortOptions?: FilterOption[];
  yearRange?: { min: number; max: number };
  ratingRange?: { min: number; max: number };
}

interface FilterValues {
  genre?: string;
  sortBy?: string;
  yearFrom?: number;
  yearTo?: number;
  rating?: number;
}

type OnFilterChange = <K extends keyof FilterValues>(
  key: K,
  value: FilterValues[K]
) => void;

interface FilterControlsProps {
  filters: FilterConfig;
  values: FilterValues;
  onFilterChange: OnFilterChange;
  onClearFilters: () => void;
}

export default function FilterControls({
  filters,
  values,
  onFilterChange,
  onClearFilters,
}: FilterControlsProps) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-end  ">
        {filters.genres && (
          <div className="flex flex-col flex-grow">
            <label className="text-white text-sm mb-2">Genre</label>
            <select
              value={values.genre || ""}
              onChange={(e) => onFilterChange("genre", e.target.value)}
              className="px-3 py-2 bg-gray-800 text-white rounded"
            >
              <option value="">All Genres</option>
              {filters.genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {filters.sortOptions && (
          <div className="flex flex-col flex-grow">
            <label className="text-white text-sm mb-2">Sort By</label>
            <select
              value={values.sortBy || ""}
              onChange={(e) => onFilterChange("sortBy", e.target.value)}
              className="px-3 py-2 bg-gray-800 text-white rounded"
            >
              {filters.sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {filters.yearRange && (
          <>
            <div className="flex flex-col ">
              <label className="text-white text-sm mb-2">Year From</label>
              <input
                type="number"
                min={filters.yearRange.min}
                max={filters.yearRange.max}
                value={values.yearFrom || ""}
                onChange={(e) =>
                  onFilterChange(
                    "yearFrom",
                    parseInt(e.target.value) || undefined
                  )
                }
                className="px-3 py-2 bg-gray-800 text-white rounded w-24"
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-white text-sm mb-2">Year To</label>
              <input
                type="number"
                min={filters.yearRange.min}
                max={filters.yearRange.max}
                value={values.yearTo || ""}
                onChange={(e) =>
                  onFilterChange(
                    "yearTo",
                    parseInt(e.target.value) || undefined
                  )
                }
                className="px-3 py-2 bg-gray-800 text-white rounded w-24"
              />
            </div>
          </>
        )}

        {filters.ratingRange && (
          <div className="flex flex-col flex-grow">
            <label className="text-white text-sm mb-2">Min Rating</label>
            <select
              value={values.rating || ""}
              onChange={(e) =>
                onFilterChange(
                  "rating",
                  parseFloat(e.target.value) || undefined
                )
              }
              className="px-3 py-2 bg-gray-800 text-white rounded"
            >
              <option value="">Any Rating</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((rating) => (
                <option key={rating} value={rating}>
                  {rating}+ Stars
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

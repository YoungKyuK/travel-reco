// components/search/FilterSidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { FilterState } from "../../../types/index"; // FilterState 타입 임포트

interface FilterSidebarProps {
  regions: string[];
  themes: { name: string; description: string; image: string }[];
  onFilterChange: (filters: FilterState) => void;
  initialFilters: FilterState;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  regions,
  themes,
  onFilterChange,
  initialFilters,
}) => {
  const [region, setRegion] = useState(initialFilters.region);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    initialFilters.selectedThemes
  );
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);

  // 초기 필터 상태가 변경될 때마다 내부 상태 업데이트
  useEffect(() => {
    setRegion(initialFilters.region);
    setSelectedThemes(initialFilters.selectedThemes);
    setSortBy(initialFilters.sortBy);
  }, [initialFilters]);

  const handleThemeChange = (themeName: string) => {
    setSelectedThemes((prevThemes) => {
      if (prevThemes.includes(themeName)) {
        return prevThemes.filter((t) => t !== themeName);
      } else {
        return [...prevThemes, themeName];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      region,
      selectedThemes,
      sortBy,
      searchTerm: initialFilters.searchTerm,
    });
  };

  return (
    <aside className="w-full md:w-1/4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <Filter className="w-5 h-5" /> 필터
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="filter-region"
              className="block font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              지역
            </label>
            <select
              id="filter-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">전체</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">
              여행 테마
            </label>
            <div className="space-y-2">
              {themes.map((t) => (
                <div key={t.name} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`theme-${t.name}`}
                    name="theme"
                    value={t.name}
                    checked={selectedThemes.includes(t.name)}
                    onChange={() => handleThemeChange(t.name)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
                  />
                  <label
                    htmlFor={`theme-${t.name}`}
                    className="ml-3 text-gray-700 dark:text-gray-300"
                  >
                    {t.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="filter-sort"
              className="block font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              정렬
            </label>
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "rating" | "popular")
              }
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rating">평점순</option>
              <option value="popular">인기순</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md"
          >
            필터 적용
          </button>
        </form>
      </div>
    </aside>
  );
};

export default FilterSidebar;

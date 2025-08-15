// types/index.ts
export interface Destination {
  id: number;
  name: string;
  location: string;
  theme: string;
  description: string;
  image: string;
  rating: number;
  reviews: { rating: number; text: string }[];
}

export interface FilterState {
  region: string;
  selectedThemes: string[];
  sortBy: "rating" | "popular";
  searchTerm: string; // 검색 결과 페이지에서 검색어 유지
}

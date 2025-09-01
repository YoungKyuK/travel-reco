// app/search/page.tsx
"use client"; // 이 컴포넌트는 클라이언트 컴포넌트입니다. useSearchParams, useRouter, useState, useEffect, useMemo 등을 사용하기 때문입니다.

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Next.js App Router에서 라우팅 및 URL 쿼리 파라미터 접근을 위한 훅
import FilterSidebar from "../search/FilterSidebar"; // 필터 사이드바 컴포넌트 임포트
import DestinationCard from "../search/DestinationCard"; // 여행지 카드 컴포넌트 임포트
import { Destination, FilterState } from "../../../types/index"; // 여행지 및 필터 상태 타입 임포트

// --- 목업 데이터 (실제 데이터는 Firebase에서 가져올 예정) ---
// 모든 여행지 데이터를 배열로 정의합니다.
const allDestinations: Destination[] = [
  // ... (기존 여행지 데이터)
  {
    id: 1,
    name: "제주도",
    location: "대한민국",
    theme: "자연",
    description:
      "화산섬 제주는 독특한 자연 경관과 아름다운 해변, 그리고 맛있는 음식으로 가득합니다. 한라산 등반, 올레길 걷기 등 다양한 액티비티를 즐길 수 있습니다.",
    image: "/images/nature.jpg",
    rating: 4.8,
    reviews: [
      { rating: 5, text: "최고의 여행지!" },
      { rating: 4, text: "풍경이 아름다워요." },
      { rating: 5, text: "음식이 맛있어요." },
    ],
  },
  {
    id: 2,
    name: "교토",
    location: "일본",
    theme: "역사",
    description:
      "일본의 옛 수도인 교토는 수많은 사원과 신사, 그리고 전통적인 목조 가옥들이 보존되어 있는 역사적인 도시입니다. 기모노를 입고 거리를 거닐어보세요.",
    image: "/images/history.jpg",
    rating: 4.7,
    reviews: [
      { rating: 5, text: "고즈넉하고 아름다워요." },
      { rating: 4, text: "볼거리가 많아요." },
    ],
  },
  {
    id: 3,
    name: "파리",
    location: "프랑스",
    theme: "문화",
    description:
      "예술과 낭만의 도시 파리. 에펠탑, 루브르 박물관 등 세계적인 명소와 함께 센 강변의 여유로운 분위기를 만끽할 수 있습니다.",
    image: "/images/culture.jpg",
    rating: 4.9,
    reviews: [
      { rating: 5, text: "꿈에 그리던 도시!" },
      { rating: 5, text: "모든 것이 예술 같아요." },
    ],
  },
  {
    id: 4,
    name: "경주",
    location: "대한민국",
    theme: "역사",
    description:
      "신라의 천년 고도 경주는 도시 전체가 거대한 박물관입니다. 불국사, 석굴암, 첨성대 등 수많은 유적지를 탐방하며 역사의 숨결을 느껴보세요.",
    image: "/images/history.jpg",
    rating: 4.6,
    reviews: [
      { rating: 5, text: "역사를 좋아한다면 필수 코스." },
      { rating: 4, text: "자전거 여행하기 좋아요." },
    ],
  },
  {
    id: 5,
    name: "방콕",
    location: "태국",
    theme: "미식",
    description:
      "활기 넘치는 도시 방콕은 저렴하고 맛있는 길거리 음식부터 고급 레스토랑까지, 미식가들을 위한 천국입니다. 화려한 왕궁과 사원도 놓치지 마세요.",
    image: "/images/food.webp",
    rating: 4.5,
    reviews: [
      { rating: 4, text: "음식이 정말 다양하고 맛있어요." },
      { rating: 5, text: "활기찬 분위기가 좋아요." },
    ],
  },
  {
    id: 6,
    name: "스위스 인터라켄",
    location: "스위스",
    theme: "액티비티",
    description:
      "알프스의 심장, 인터라켄에서 패러글라이딩, 스카이다이빙 등 짜릿한 액티비티를 즐겨보세요. 융프라우의 설경은 평생 잊지 못할 경험을 선사합니다.",
    image: "/images/activity.jpg",
    rating: 4.9,
    reviews: [
      { rating: 5, text: "인생 최고의 경험!" },
      { rating: 5, text: "자연이 경이로워요." },
    ],
  },
];

// 모든 테마 데이터를 배열로 정의합니다.
const allThemes = [
  {
    name: "자연",
    description: "일상에서 벗어나 특별한 경험을 해보세요.",
    image: "/images/theme-nature.jpg",
  },
  {
    name: "역사",
    description: "과거의 숨결을 느끼는 여행.",
    image: "/images/theme-history.jpg",
  },
  {
    name: "문화",
    description: "예술과 문화를 탐험하는 여정.",
    image: "/images/theme-culture.jpg",
  },
  {
    name: "미식",
    description: "오감을 만족시키는 맛의 향연.",
    image: "/images/theme-food.jpg",
  },
  {
    name: "액티비티",
    description: "짜릿한 모험과 활동으로 가득한 여행.",
    image: "/images/theme-activity.jpg",
  },
];

// 필터에 사용할 지역 목록을 정의합니다.
const allRegions = ["국내", "아시아", "유럽"];

const SearchPage: React.FC = () => {
  const router = useRouter(); // 페이지 이동을 위한 useRouter 훅
  const searchParams = useSearchParams(); // URL 쿼리 파라미터(예: ?q=제주도&theme=자연)를 읽기 위한 훅

  // --- 데이터 흐름: URL 쿼리 파라미터 -> 초기 필터 상태 설정.. ---
  // URL에서 'q' (검색어) 파라미터를 가져오거나 없으면 빈 문자열로 초기화
  const initialSearchQuery = searchParams.get("q") || "";
  // URL에서 'theme' 파라미터를 가져오거나 없으면 null!
  const initialTheme = searchParams.get("theme");

  // 필터 상태를 관리하는 useState 훅. URL 파라미터로 초기값을 설정합니다.
  const [filters, setFilters] = useState<FilterState>({
    region: "all", // 초기 지역은 '전체'
    selectedThemes: initialTheme ? [initialTheme] : [], // URL에 테마가 있으면 해당 테마를 선택된 상태로
    sortBy: "rating", // 초기 정렬은 '평점순'
    searchTerm: initialSearchQuery, // URL에서 가져온 검색어를 필터 상태에 유지
  });

  // --- 데이터 흐름: FilterSidebar -> SearchPage -> filteredDestinations ---
  // FilterSidebar 컴포넌트로부터 필터 변경 이벤트를 받아 SearchPage의 필터 상태를 업데이트하는 함수
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // --- 데이터 흐름: DestinationCard -> SearchPage -> 상세 페이지 이동 ---
  // 여행지 카드 클릭 시 해당 여행지의 상세 페이지로 이동하는 함수
  const handleCardClick = (id: number) => {
    router.push(`/destinations/${id}`); // Next.js의 동적 라우팅을 사용하여 상세 페이지로 이동
  };

  // --- 데이터 흐름: allDestinations + filters -> filteredDestinations ---
  // useMemo 훅을 사용하여 필터링된 여행지 목록을 효율적으로 계산합니다.
  // filters 상태가 변경될 때만 이 로직이 다시 실행되어 성능을 최적화합니다//
  const filteredDestinations = useMemo(() => {
    const filtered = allDestinations.filter((dest) => {
      // 1. 검색어 필터링: 여행지 이름, 지역, 설명에 검색어가 포함되어 있는지 확인
      const matchesSearch = filters.searchTerm
        ? dest.name.includes(filters.searchTerm) ||
          dest.location.includes(filters.searchTerm) ||
          dest.description.includes(filters.searchTerm)
        : true; // 검색어가 없으면 모든 여행지 포함

      // 2. 지역 필터링: 선택된 지역에 해당하는 여행지만 포함
      const matchesRegion =
        filters.region === "all"
          ? true // '전체' 지역이면 모든 여행지 포함
          : filters.region === "국내" && dest.location === "대한민국" // '국내' 선택 시 '대한민국'만
          ? true
          : dest.location.includes(filters.region); // '아시아', '유럽' 등은 location에 포함되는지 확인

      // 3. 테마 필터링: 선택된 테마가 없으면 모든 여행지 포함, 있으면 해당 테마의 여행지만 포함
      const matchesThemes =
        filters.selectedThemes.length === 0
          ? true
          : filters.selectedThemes.includes(dest.theme);

      return matchesSearch && matchesRegion && matchesThemes; // 모든 필터 조건을 만족하는 여행지만 반환
    });

    // 4. 정렬: 선택된 정렬 기준에 따라 여행지 목록을 정렬
    if (filters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating); // 평점 높은 순
    } else if (filters.sortBy === "popular") {
      filtered.sort((a, b) => b.reviews.length - a.reviews.length); // 리뷰 많은 순 (인기순)
    }

    return filtered; // 최종 필터링 및 정렬된 여행지 목록 반환
  }, [filters]); // filters 상태가 변경될 때마다 이 useMemo 블록이 다시 실행됩니다.

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* --- 필터 사이드바 컴포넌트 --- */}
        {/* FilterSidebar에 필요한 데이터(regions, themes)와 필터 변경 콜백 함수(onFilterChange), 현재 필터 상태(initialFilters)를 props로 전달합니다. */}
        <FilterSidebar
          regions={allRegions}
          themes={allThemes}
          onFilterChange={handleFilterChange}
          initialFilters={filters} // 현재 필터 상태를 초기값으로 전달하여 FilterSidebar 내부 상태와 동기화
        />

        {/* --- 검색 결과 목록 영역 --- */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            {/* 홈으로 돌아가기 버튼: 클릭 시 useRouter를 이용해 '/' 경로로 이동 */}
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              &larr; 홈으로 돌아가기
            </button>
            {/* 현재 검색 결과 제목: 필터 상태의 검색어 또는 선택된 테마를 표시 */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              검색 결과:{" "}
              <span className="text-blue-600">
                {filters.searchTerm ||
                  filters.selectedThemes.join(", ") ||
                  "전체"}
              </span>
            </h2>
          </div>
          {/* 여행지 카드 목록을 그리드 형태로 표시 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 필터링된 여행지 목록이 비어있지 않으면 DestinationCard 컴포넌트들을 맵핑하여 렌더링 */}
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((dest) => (
                // 각 DestinationCard에 여행지 데이터와 클릭 핸들러를 props로 전달
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  onClick={handleCardClick}
                />
              ))
            ) : (
              // 필터링된 결과가 없을 경우 "검색 결과가 없습니다." 메시지 표시
              <div className="lg:col-span-3 text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                <p className="text-xl text-gray-500 dark:text-gray-300">
                  검색 결과가 없습니다.
                </p>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  다른 키워드나 필터를 시도해보세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

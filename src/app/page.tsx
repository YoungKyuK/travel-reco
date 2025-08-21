// app/(main)/page.tsx
"use client"; // 이 컴포넌트는 클라이언트 컴포넌트입니다.

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // App Router의 useRouter 임포트

// components/home/ThemeCard 컴포넌트 임포트
import ThemeCard from "../../components/home/ThemeCard";

// types/index.ts에서 Destination 타입 임포트 (아직은 목업 데이터에 사용)
import { Destination } from "../../types/index";

// Mock Data (실제 데이터는 Firebase에서 가져올 예정)
const destinations: Destination[] = [
  {
    id: 1,
    name: "제주도",
    location: "대한민국",
    theme: "자연",
    description:
      "화산섬 제주는 독특한 자연 경관과 아름다운 해변, 그리고 맛있는 음식으로 가득합니다. 한라산 등반, 올레길 걷기 등 다양한 액티비티를 즐길 수 있습니다.",
    image: "/images/jeju.jpg",
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
    image: "/images/kyoto.jpg",
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
    image: "/images/paris.jpg",
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
    image: "/images/gyeongju.jpg",
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
    image: "/images/bangkok.jpg",
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
    image: "/images/interlaken.jpg",
    rating: 4.9,
    reviews: [
      { rating: 5, text: "인생 최고의 경험!" },
      { rating: 5, text: "자연이 경이로워요." },
    ],
  },
];
// 테마 데이터도 목업으로 정의
const themes = [
  {
    name: "자연",
    description: "일상에서 벗어나 특별한 경험을 해보세요.",
    image: "/images/nature.jpg",
  },
  {
    name: "역사",
    description: "과거의 숨결을 느끼는 여행.",
    image: "/images/history.jpg",
  },
  {
    name: "문화",
    description: "예술과 문화를 탐험하는 여정.",
    image: "/images/culture.jpg",
  },
  {
    name: "미식",
    description: "오감을 만족시키는 맛의 향연.",
    image: "/images/food.webp",
  },
  {
    name: "액티비티",
    description: "짜릿한 모험과 활동으로 가득한 여행.",
    image: "/images/activity.jpg",
  },
];

const HomePageContent: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter(); // App Router의 useRouter 훅 사용

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${searchInput}`); // search 페이지로 이동
  };

  const handleThemeClick = (theme: string) => {
    router.push(`/search?theme=${theme}`); // search 페이지로 이동 (테마 필터 적용)
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* 히어로 섹션 */}
      <section className="hero-section h-96 rounded-xl flex items-center justify-center text-white text-center p-4 relative overflow-hidden">
        {/* 배경 이미지 */}
        <Image
          src="/images/main-bg.jpg"
          alt="여행 배경 이미지"
          layout="fill" // 부모 요소에 맞게 채움
          objectFit="cover" // 이미지 비율 유지하며 채움
          quality={90} // 이미지 품질
          priority // 메인 페이지 로딩 시 우선 로드
          className="z-0"
        />
        {/* 오버레이 (텍스트 가독성 향상)*/}
        <div className="absolute inset-0 from-black/60 to-transparent z-10"></div>

        <div className="z-20 relative">
          {/* 텍스트와 검색바를 오버레이 위에 배치 */}
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            당신을 위한 완벽한 여행지를 찾아보세요!
          </h1>
          <p className="text-xl mb-8 drop-shadow-md">
            관심사, 예산, 스타일에 맞는 최고의 여행지를 추천해 드립니다.
          </p>
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="도시, 국가, 또는 키워드로 검색..."
                className="w-full p-4 rounded-full text-gray-800 border-5 border-solid border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md"
              >
                검색
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 테마별 여행지 추천 섹션 */}
      <section className="mt-16">
        {" "}
        {/* 마진 상단 증가 */}
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          테마별 여행지 추천 🌟
        </h2>{" "}
        {/* 제목 강조 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.name}
              theme={theme.name}
              imageUrl={theme.image}
              description={theme.description}
              onClick={handleThemeClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePageContent;

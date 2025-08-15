// components/home/ThemeCard.tsx
"use client"; // 이 컴포넌트는 클라이언트 컴포넌트입니다.

import React from "react";
import Image from "next/image";

interface ThemeCardProps {
  theme: string;
  imageUrl: string;
  description: string;
  onClick: (theme: string) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  imageUrl,
  description,
  onClick,
}) => {
  return (
    <div
      className="theme-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={() => onClick(theme)}
    >
      <Image
        src={imageUrl}
        alt={`${theme} 테마 이미지`}
        width={400} // 최적화를 위해 width, height 필수
        height={250}
        className="w-full h-40 object-cover"
        priority // 메인 페이지 로딩 시 우선 로드
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {theme} 여행
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ThemeCard;

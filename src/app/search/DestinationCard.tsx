// components/search/DestinationCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Destination } from "../../../types/index"; // Destination 타입 임포트..

interface DestinationCardProps {
  destination: Destination;
  onClick: (id: number) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onClick,
}) => {
  return (
    <div
      className="destination-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700"
      onClick={() => onClick(destination.id)}
    >
      <Image
        src={destination.image}
        alt={destination.name}
        width={600} // 최적화를 위해 width, height 필수
        height={400}
        className="w-full h-48 object-cover"
        priority={false} // 초기 로딩 시에는 priority 낮춤
      />
      <div className="p-4">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
          {destination.name}
        </h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
          {destination.location}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-amber-500 text-lg">★</span>
          <span className="ml-1 font-bold text-gray-800 dark:text-gray-100">
            {destination.rating}
          </span>
          <span className="ml-2 text-gray-400 text-sm">
            ({destination.reviews.length} 리뷰)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

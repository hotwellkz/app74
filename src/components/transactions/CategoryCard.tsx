import React, { useState } from 'react';
import { CategoryCardType } from '../../types';
import { useDraggable } from '@dnd-kit/core';
import { formatAmount } from '../../utils/formatUtils';

interface CategoryCardProps {
  category: CategoryCardType;
  onHistoryClick: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  onHistoryClick,
  onContextMenu
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: category.id,
    data: category
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  
  const handleContextMenu = (e: React.MouseEvent) => {
    if (category.row === 2 || category.row === 4) {
      onContextMenu(e);
    } else {
      onHistoryClick(e);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      {...attributes}
      {...listeners}
      onContextMenu={handleContextMenu}
      className="flex flex-col items-center space-y-1 py-1 cursor-grab active:cursor-grabbing"
    >
      <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center shadow-lg`}>
        {category.icon}
      </div>
      <div className="text-center">
        <div className="text-[10px] font-medium text-gray-700 truncate max-w-[60px]">
          {category.title}
        </div>
        <div className={`text-[10px] font-medium ${
          category.amount.includes('-') ? 'text-red-500' : 'text-emerald-500'
        }`}>
          {formatAmount(parseFloat(category.amount.replace(/[^\d.-]/g, '')))}
        </div>
      </div>
    </div>
  );
};
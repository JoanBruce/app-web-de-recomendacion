import React from 'react';
import { Category } from '../types';
import * as Icons from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
          selectedCategory === null
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Icons.Layout size={20} />
        <span>All</span>
      </button>
      {categories.map((category) => {
        // Verificar si el icono existe
        const IconComponent = Icons[category.icon as keyof typeof Icons];

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {/* Si IconComponent es undefined, renderiza un icono por defecto o null */}
            {IconComponent ? (
              <IconComponent size={20} />
            ) : (
              <Icons.AlertCircle size={20} /> // Ejemplo de icono por defecto, cámbialo según sea necesario
            )}
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

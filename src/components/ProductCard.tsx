import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void; // Nueva prop para manejar clics
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onMouseEnter,
  onMouseLeave,
  onClick, // Recibe la función para manejar clics
}) => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
    console.log(`Clicked ${clickCount + 1} times`);
    onClick(); // Llama a la función recibida para manejar el clic
  };

  return (
    <div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
            onClick={handleClick} // Maneja el clic en el botón
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

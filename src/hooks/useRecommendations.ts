import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

export const useRecommendations = (products: Product[]) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [hoverTimers, setHoverTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});
  const [hoverCounts, setHoverCounts] = useState<{ [key: string]: number }>({});
  const [mostInteractedProducts, setMostInteractedProducts] = useState<Product[]>([]);


  const updateMostInteractedProducts = useCallback(() => {
    const allCounts = Object.entries(clickCounts).map(([id, clicks]) => {
      const hover = hoverCounts[id] || 0;
      const totalInteractions = clicks + hover;
      console.log(`Producto ${id}: ${clicks} clics, ${hover} hovers, Total: ${totalInteractions}`); // Log para interacciones
      return {
        id,
        interactions: totalInteractions,
      };
    });

    const sortedProducts = allCounts
      .sort((a, b) => b.interactions - a.interactions)
      .map(({ id }) => products.find((product) => product.id === id))
      .filter((product): product is Product => product !== undefined)
      .slice(0, 4);

    console.log('Productos más interactuados:', sortedProducts);
    console.log('ClickCounts:', clickCounts);
    console.log('HoverCounts:', hoverCounts);
 // Log para productos más interactuados
    setMostInteractedProducts(sortedProducts);
  }, [clickCounts, hoverCounts, products]);

  useEffect(() => {
    const savedRecommendations = localStorage.getItem('recommendations');
    if (savedRecommendations) {
      setRecommendations(JSON.parse(savedRecommendations));
    }
  }, []);

  const startHoverTimer = (product: Product) => {
    const timer = setTimeout(() => {
      setRecommendations(prev => {
        const newRecommendations = [...prev];
        if (!newRecommendations.find(p => p.id === product.id)) {
          newRecommendations.unshift(product);
          if (newRecommendations.length > 4) {
            newRecommendations.pop();
          }
          localStorage.setItem('recommendations', JSON.stringify(newRecommendations));
        }
        return newRecommendations;
      });
    }, 3000); // Espera 3 segundos antes de agregar a recomendaciones

    setHoverTimers(prev => ({ ...prev, [product.id]: timer }));
  };

  const clearHoverTimer = (productId: string) => {
    if (hoverTimers[productId]) {
      clearTimeout(hoverTimers[productId]);
      setHoverTimers(prev => {
        const newTimers = { ...prev };
        delete newTimers[productId];
        return newTimers;
      });
    }
  };

  const handleProductClick = (productId: string) => {
    setClickCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
    console.log(`Click en producto ${productId}. Total de clics: ${clickCounts[productId] + 1}`);
    updateMostInteractedProducts(); // Actualiza la lista después de un clic
  };

  const handleMouseEnter = (productId: string) => {
    setHoverCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
    console.log(`Hover en producto ${productId}. Total de hovers: ${hoverCounts[productId] + 1}`);
    updateMostInteractedProducts(); // Actualiza la lista después de un hover
  };

  

  const resetInteractionCounts = () => {
    setClickCounts({});
    setHoverCounts({});
    setMostInteractedProducts([]);
  };

  return {
    recommendations,
    mostInteractedProducts,
    startHoverTimer,
    clearHoverTimer,
    handleProductClick,
    handleMouseEnter,
    resetInteractionCounts,
  };
};

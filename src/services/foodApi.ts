import axios from 'axios';

const API_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

export interface FoodProduct {
  product_name: string;
  product_name_fr?: string;
  nutriments: {
    energy_100g?: number;
    energy_kcal_100g?: number;
  };
}

export const searchFood = async (query: string): Promise<FoodProduct[]> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 50,
        lc: 'fr',
        countries: 'France',
      }
    });
    
    return response.data.products
      .filter((product: FoodProduct) => {
        const hasName = !!(product.product_name || product.product_name_fr);
        const hasCalories = !!(product.nutriments?.energy_100g || product.nutriments?.energy_kcal_100g);
        return hasName && hasCalories;
      })
      .map((product: FoodProduct) => ({
        ...product,
        // Préférer le nom français si disponible
        product_name: product.product_name_fr || product.product_name
      }))
      .slice(0, 10); // Limiter à 10 résultats pour une meilleure lisibilité
  } catch (error) {
    console.error('Erreur lors de la recherche d\'aliments:', error);
    return [];
  }
};
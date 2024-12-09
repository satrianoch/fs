export interface Food {
  name: string;
  calories: number;
  portion: string;
}

export interface FoodCategory {
  name: string;
  foods: Food[];
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    name: "Plats",
    foods: [
      { name: "Boulettes sauce tomate", calories: 625, portion: "" },
      { name: "Tikka masala", calories: 450, portion: "" }
    ]
  },
  {
    name: "Féculents",
    foods: [
      { name: "Baguette blanche", calories: 700, portion: "250g" },
      { name: "Baguette grise", calories: 600, portion: "250g" },
      { name: "Naan", calories: 280, portion: "100g" },
      { name: "Pain blanc", calories: 87, portion: "30g" },
      { name: "Pain gris", calories: 77, portion: "30g" },
      { name: "Pâtes", calories: 140, portion: "100g" },
      { name: "Riz", calories: 130, portion: "100g" },
      { name: "Sandwich mou", calories: 142, portion: "45g" }
    ]
  },
  {
    name: "Protéines",
    foods: [
      { name: "Emmental râpé", calories: 148, portion: "40g" },
      { name: "Fromage fines herbes", calories: 98, portion: "40g" },
      { name: "Gouda", calories: 140, portion: "40g" },
      { name: "Jambon", calories: 45, portion: "40g" },
      { name: "Leerdamer", calories: 79, portion: "22g" },
      { name: "Saumon fumé", calories: 65, portion: "40g" },
      { name: "Thon", calories: 50, portion: "40g" }
    ]
  },
  {
    name: "Fruits",
    foods: [
      { name: "Banane", calories: 110, portion: "" },
      { name: "Clémentine", calories: 40, portion: "" },
      { name: "Pomme", calories: 70, portion: "" },
      { name: "Raisin", calories: 70, portion: "100g" }
    ]
  },
  {
    name: "Légumes",
    foods: [
      { name: "Aubergine", calories: 62, portion: "" },
      { name: "Carotte", calories: 28, portion: "" },
      { name: "Oignon", calories: 60, portion: "" },
      { name: "Poireau", calories: 30, portion: "" }
    ]
  },
  {
    name: "Sauces",
    foods: [
      { name: "Ketchup", calories: 60, portion: "50g" },
      { name: "Margarine", calories: 190, portion: "50g" },
      { name: "Mayonnaise", calories: 350, portion: "50g" }
    ]
  },
  {
    name: "Snacks",
    foods: [
      { name: "Grills", calories: 197, portion: "40g" },
      { name: "Lay's paprika", calories: 201, portion: "40g" },
      { name: "Lay's sel", calories: 205, portion: "40g" }
    ]
  },
  {
    name: "Boissons",
    foods: [
      { name: "Café au lait sans sucre", calories: 50, portion: "25cl" },
      { name: "Café au lait sucré", calories: 70, portion: "25cl" },
      { name: "Coca-cola", calories: 140, portion: "33cl" },
      { name: "Schweppes Agrum", calories: 63, portion: "33cl" }
    ]
  },
  {
    name: "Autre",
    foods: []
  }
];
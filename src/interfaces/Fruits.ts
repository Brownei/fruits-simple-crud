export type Fruits = {
    id: number;
    genus: string;
    name: string;
    family: string;
    order: string;
    nutritions: Nutrition;
};

export type Nutrition = {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
};

export type Params = {
    name: string;
};
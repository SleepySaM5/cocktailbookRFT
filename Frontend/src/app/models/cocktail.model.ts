export interface Cocktail {
    cocktailId: number;
    cocktailName: string;
    ingredientList: Array<string>;
    description: string;
    imgPath?: string;
    imgAlt?: string;
}

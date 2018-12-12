export interface Cocktail {
    cocktailID: number;
    cocktailName: string;
    ingredientList: Array<string>;
    description: string;
    imgPath?: string;
    imgAlt?: string;
}

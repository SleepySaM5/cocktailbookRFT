
export class Cocktail {
  constructor (
    public cocktailName: string,
    public ingredientList: Array<string>,
    public description: string,
    public imgPath?: string,
    public imgAlt?: string,
    public cocktailID?: number) {

  }
}

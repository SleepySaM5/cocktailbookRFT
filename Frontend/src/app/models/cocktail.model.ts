
export class Cocktail {
  constructor (
    public name: string,
    public ingredientList: Array<string>,
    public description: string,
    public imgPath?: string,
    public imgAlt?: string,
    public id?: number) {
  }
}

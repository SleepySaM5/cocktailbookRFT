export class Comment {
  constructor (
    public cocktailId: string,
    public commentDate: Date,
    public commentContent: string,
    public commentAuthor: string) {
  }
}

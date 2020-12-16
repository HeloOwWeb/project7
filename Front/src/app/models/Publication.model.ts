export class Publication {
  constructor(
    public id : string,
    public createdAt: Date,
    public textPost: string,
    public imagePost: string,
    public gifPost: string,
    public likes: number,
    public dislikes: number
  ) { }
}

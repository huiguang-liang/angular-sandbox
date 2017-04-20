export class Ident {

  protected id: number;
  protected static Id: Ident;

  constructor () {
    this.id = 0;
  }

  static getInstance(): Ident {
    if (!this.Id) {
      this.Id = new Ident();
    }
    return this.Id;
  }

  public getNextId() {
    return this.id++;
  }
}

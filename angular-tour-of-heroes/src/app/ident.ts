export class Ident {

  protected id: number;
  protected static Id: Ident;

  static getInstance(): Ident {
    this.Id = this.Id || new Ident();
    this.Id.id = this.Id.id || 0;
    return this.Id;
  }

  public getNextId() {
    return this.id++;
  }
}

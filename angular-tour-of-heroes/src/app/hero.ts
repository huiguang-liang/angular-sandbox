import { Ident } from './ident';

export class Hero {

  readonly id: number;

  constructor ( public name: string ) {
    this.id = Ident.getInstance().getNextId();
  }

  isEqual(h: Hero) {
    return h.id === this.id && h.name === this.name;
  }

  listHeroesExcluding(h: Hero[]) {
    var r: Hero = this;

    var heroes = h.filter(function(x) {
      return !x.isEqual(r);
    });

    var heroNames = Array.from(heroes, x => x.name);

    return heroNames.splice(0, heroNames.length - 2).concat(heroNames.splice(-2).join(" & ")).join(", ");
  }

  valueOf() {
    return JSON.stringify({
      id: this.id,
      name: this.name
    });
  }
}

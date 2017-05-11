import { Ident } from './ident';

export class Hero {

  constructor ( public name: string, public id = Ident.getInstance().getNextId() ) {}

  isEqual(h: Hero) {
    return h.id === this.id && h.name === this.name;
  }

  listHeroesExcluding(h: Hero[]) {
    var heroes = this.getHeroesExcluding(h);
    var heroNames = Array.from(heroes, x => x.name);
    return heroNames.splice(0, heroNames.length - 2).concat(heroNames.splice(-2).join(" & ")).join(", ");
  }

  getHeroesExcluding(h: Hero[]) {
    var r: Hero = this;
    var heroes = h.filter(function(x) {
      return !x.isEqual(r);
    });
    return heroes;
  }

  valueOf() {
    return JSON.stringify({
      id: this.id,
      name: this.name
    });
  }

  toJson(): JSON {
    return JSON.parse(this.valueOf());
  }
}

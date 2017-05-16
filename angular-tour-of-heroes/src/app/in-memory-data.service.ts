import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      (new Hero('Windstorm')).toJson(),
      (new Hero('Bombasto')).toJson(),
      (new Hero('Mr. Nice')).toJson(),
      (new Hero('Narco')).toJson(),
      (new Hero('Celeritas')).toJson(),
      (new Hero('Magneta')).toJson(),
      (new Hero('RubberMan')).toJson(),
      (new Hero('Dynama')).toJson(),
      (new Hero('Dr. IQ')).toJson(),
      (new Hero('Magma')).toJson(),
      (new Hero('Tornado')).toJson(),
    ];
    return { heroes };
  }
}

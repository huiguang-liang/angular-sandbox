import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 1, name: 'Mr. Nice'},
      {id: 2, name: 'Narco'},
      {id: 3, name: 'Bombasto'},
      {id: 4, name: 'Celeritas'},
      {id: 5, name: 'Magneta'},
      {id: 6, name: 'RubberMan'},
      {id: 7, name: 'Dynama'},
      {id: 8, name: 'Dr IQ'},
      {id: 9, name: 'Magma'},
      {id: 10, name: 'Tornado'}
      // (new Hero('Windstorm')).toJson(),
      // (new Hero('Bombasto')).toJson(),
      // (new Hero('Mr. Nice')).toJson(),
      // (new Hero('Narco')).toJson(),
      // (new Hero('Celeritas')).toJson(),
      // (new Hero('Magneta')).toJson(),
      // (new Hero('RubberMan')).toJson(),
      // (new Hero('Dynama')).toJson(),
      // (new Hero('Dr. IQ')).toJson(),
      // (new Hero('Magma')).toJson(),
      // (new Hero('Tornado')).toJson(),
    ];
    return { heroes };
  }
}

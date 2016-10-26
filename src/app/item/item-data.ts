import { InMemoryDbService } from 'angular-in-memory-web-api';

export class ItemData implements InMemoryDbService {
  createDb() {
    let items = [
      { id: 11, title: 'Boots' },
      { id: 12, title: 'Gloves' },
      { id: 13, title: 'Cap' },
      { id: 14, title: 'Jacket' }
    ];
    return {items};
  }
}

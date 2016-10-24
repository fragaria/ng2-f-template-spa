import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'sa-item-list',
  templateUrl: 'item-list.component.html'
})
export class ItemListComponent implements OnInit {
  items: Promise<Item[]>;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onSelect(item: Item) {
    this.router.navigate([item.id], {relativeTo: this.route});
  }

}

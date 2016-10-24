import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'sa-item-detail',
  templateUrl: 'item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: Item;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService) {
  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'], 10);
    this.itemService.getItem(id).then(item => this.item = item);
  }
}

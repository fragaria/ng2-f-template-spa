import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpError } from '../core';

import { Item } from './item.model';
import { ItemService } from './item.service';

@Component({
  selector: 'sa-item-detail',
  templateUrl: 'item-detail.component.html'
})
export class ItemDetailComponent implements OnInit {
  item: Item;
  errorMsg: string;

  constructor(private route: ActivatedRoute,
              private itemService: ItemService) {
  }

  processErrorMsg(error: HttpError) {
    console.log(error);
    if (error.status = 404) {
      this.errorMsg = 'Item does not exist';
    }
    else {
      this.errorMsg = 'Server error';
    }
  }

  ngOnInit() {
    let id = parseInt(this.route.snapshot.params['id'], 10);
    this.itemService.getItem(id).subscribe(
                                  item => this.item = item,
                                  error => this.processErrorMsg(error));
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from './item.model';
import { ItemService } from './item.service';

import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';
import { LanguageService, createTranslateProviders } from '../language';


@Component({
  selector: 'sa-item-list',
  templateUrl: 'item-list.component.html',
  providers:[createTranslateProviders('item')]
})
export class ItemListComponent implements OnInit {
  items: Observable<Item[]>;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              languageService: LanguageService,
              translateService: TranslateService) {

    languageService.langChanged$.subscribe(lang => {
      // translateService.resetLang(lang); uncomment if you want to call API everytime
      translateService.use(lang);
    });
  }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onSelect(item: Item) {
    this.router.navigate([item.id], {relativeTo: this.route});
  }

}

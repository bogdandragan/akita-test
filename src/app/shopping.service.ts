import { Injectable } from '@angular/core';
import { ID, update } from '@datorama/akita';
import {ListStore} from "./state";
import {List, Item} from "./state";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private listStore: ListStore) { }

  addList(list: List){
    this.listStore.add(list);
  }

  updateList(data: List, item: Item, purchased: boolean){
    this.listStore.update(data.id, list => {
      return {
          ...list,
          items: update(data.items, item, {purchased})
      }
    })
  }

  selectList(id: ID){
    this.listStore.setActive(id);
  }

  deleteList(id: ID){
    this.listStore.remove(id);
  }
}

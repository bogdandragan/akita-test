import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import {List, Item} from '../state';
import {ListQuery} from '../state';
import {ShoppingService} from "../shopping.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  listForm: FormGroup;
  list: List;

  constructor(private formBuilder: FormBuilder,
              private listQuery: ListQuery,
              private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.list = this.listQuery.getActive();
  }

  createForm(): void {
    this.listForm = this.formBuilder.group({
      name: this.list.name,
      items: this.formBuilder.array(this.createItems(this.list.items))
    })
  }

  createItems(items: Item[]): FormGroup[] {
    const itemsForm = [];
    for (let i = 0; i < items.length; i++) {
      itemsForm.push({
        id: items[i].id,
        label: items[i].label,
        quantity: items[i].quantity,
        purchased: items[i].purchased
      })
    }
    return itemsForm;

  }

  saveItem(purchased, item){
    this.shoppingService.updateList(this.list, item, purchased);
  }


  get items(): FormArray {
    return this.listForm.get('items') as FormArray;
  }
}

import { Component, OnInit } from '@angular/core';
import {List, Item} from '../state';
import {ShoppingService} from "../shopping.service";
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  listForm: FormGroup;
  initialId = 0;
  saved = false;

  constructor(private shoppingService: ShoppingService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  get items(): FormArray {
    return this.listForm.get('items') as FormArray;
  }

  get hasSaved(): boolean {
    return this.saved;
  }

  createForm(): void {
    this.listForm = this.formBuilder.group({
      id: this.createId(),
      name: '',
      items: this.formBuilder.array([this.createItem()])
    })
    console.log(this.listForm)
  }

  private createId(): number {
    this.initialId = Math.floor(Math.random() * 20);
    return this.initialId
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: this.initialId++,
      label: '',
      quantity: 1,
      purchased: false
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  saveList(){
    this.saved = true;
    this.shoppingService.addList(this.listForm.value)
    this.router.navigate(['lists']);
  }

}

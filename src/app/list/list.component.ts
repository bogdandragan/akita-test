import { ListQuery } from '../state';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {ShoppingService} from "../shopping.service";
import {List} from "../state";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  lists$: Observable<List[]>;

  constructor(private listQuery: ListQuery,
              private shoppingService: ShoppingService,
              private router: Router
  ) { }

  ngOnInit() {
    this.lists$ = this.listQuery.selectAll();
  }

  select(id: ID){
    this.shoppingService.selectList(id);
    this.router.navigate(['lists/edit']);
  }

  delete(id: ID){
    this.shoppingService.deleteList(id);
  }

}

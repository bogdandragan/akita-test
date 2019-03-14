import { QueryEntity } from '@datorama/akita';
import {ListStore, ListsState} from './store';
import {List, Item} from './model';
import {Injectable} from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class ListQuery extends QueryEntity<ListsState, List>{
    constructor(protected store: ListStore){
        super(store);
    }
}

import { IUser } from './../../models/i-user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CombinedService } from '../../services/combined.service';
import { Observable } from 'rxjs';
import { CombinedTodo } from '../../models/combined-todo';
import { SearchService } from '../../services/search.service';
import { switchMap, map } from 'rxjs/operators';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  combinedTodos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione

  constructor(private userService: UserService, private combinedService: CombinedService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.combinedTodos$ = this.searchService.searchTerm$.pipe(
      switchMap(term => {
        console.log('Search term in user-list:', term); // Log del termine di ricerca
        return this.combinedService.getCombinedTodos().pipe(
          map((todos: CombinedTodo[]) => {
            const filteredTodos = this.getFilteredTodos(todos, term);
            console.log('Filtered user todos:', filteredTodos); // Log dei TODO filtrati
            return filteredTodos;
          })
        );
      })
    );
  }

  getTodosForUser(userId: number): Observable<CombinedTodo[]> {
    return this.combinedTodos$.pipe(
      map(todos => todos.filter(todo => todo.userId === userId))
    );
  }

  updateTodoStatus(id: number, event: any): void {
    const status = event.target.checked;
    this.combinedService.updateTodoStatus(id, status);
  }

  getFilteredTodos(todos: CombinedTodo[], term: string): CombinedTodo[] {
    if (!term) {
      console.log('No search term provided, returning all user todos.');
      return todos;
    }
    const filtered = todos.filter(todo => {
      return `${todo.user.firstName} ${todo.user.lastName}`.toLowerCase().includes(term.toLowerCase());
    });
    console.log('Filtered user todos within getFilteredTodos:', filtered);
    return filtered;
  }
}


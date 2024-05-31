import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';
import { SearchService } from '../../services/search.service';
import { CombinedTodo } from '../../models/combined-todo';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione
  searchTerm: string = '';

  constructor(private combinedService: CombinedService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.todos$ = this.searchService.searchTerm$.pipe(
      switchMap(term => {
        console.log('Search term in todo-list:', term); // Log del termine di ricerca
        return this.combinedService.getCombinedTodos().pipe(
          map((todos: CombinedTodo[]) => {
            const filteredTodos = this.getFilteredTodos(todos, term);
            console.log('Filtered todos:', filteredTodos); // Log dei TODO filtrati
            return filteredTodos;
          })
        );
      })
    );
  }

  updateTodoStatus(id: number, event: any): void {
    const status = event.target.checked;
    this.combinedService.updateTodoStatus(id, status);
  }

  getFilteredTodos(todos: CombinedTodo[], term: string): CombinedTodo[] {
    if (!term) {
      console.log('No search term provided, returning all todos.');
      return todos;
    }
    const filtered = todos.filter(todo => {
      return `${todo.user.firstName} ${todo.user.lastName}`.toLowerCase().includes(term.toLowerCase());
    });
    console.log('Filtered todos within getFilteredTodos:', filtered);
    return filtered;
  }
}

import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';
import { CombinedTodo } from '../../models/combined-todo';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-pending-todos',
  templateUrl: './pending-todos.component.html',
  styleUrls: ['./pending-todos.component.scss']
})
export class PendingTodosComponent implements OnInit {
  pendingTodos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione

  constructor(private combinedService: CombinedService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.pendingTodos$ = this.searchService.searchTerm$.pipe(
      switchMap(term => {
        console.log('Search term in pending-todos:', term); // Log del termine di ricerca
        return this.combinedService.getCombinedTodos().pipe(
          map((todos: CombinedTodo[]) => {
            const filteredTodos = this.getFilteredTodos(todos.filter(todo => !todo.completed), term);
            console.log('Filtered pending todos:', filteredTodos); // Log dei TODO filtrati
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
      console.log('No search term provided, returning all pending todos.');
      return todos;
    }
    const filtered = todos.filter(todo => {
      return `${todo.user.firstName} ${todo.user.lastName}`.toLowerCase().includes(term.toLowerCase());
    });
    console.log('Filtered pending todos within getFilteredTodos:', filtered);
    return filtered;
  }
}


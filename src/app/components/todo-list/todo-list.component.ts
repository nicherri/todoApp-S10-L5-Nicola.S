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
      switchMap(term => this.combinedService.getCombinedTodos().pipe(
        map((todos: CombinedTodo[]) => this.getFilteredTodos(todos, term))
      ))
    );
  }

  updateTodoStatus(id: number, event: any): void {
    const status = event.target.checked;
    this.combinedService.updateTodoStatus(id, status);
  }

  getFilteredTodos(todos: CombinedTodo[], term: string): CombinedTodo[] {
    if (!term) {
      return todos;
    }
    return todos.filter(todo => {
      return `${todo.user.firstName} ${todo.user.lastName}`.toLowerCase().includes(term.toLowerCase());
    });
  }
}

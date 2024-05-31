import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';
import { Observable } from 'rxjs';
import { CombinedTodo } from '../../models/combined-todo';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione
  searchTerm: string = '';

  constructor(private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.todos$ = this.combinedService.getCombinedTodos();
  }

  updateTodoStatus(id: number, event: any): void {
    const status = event.target.checked;
    this.combinedService.updateTodoStatus(id, status);
  }

  getFilteredTodos(todos: CombinedTodo[]): CombinedTodo[] {
    if (!this.searchTerm) {
      return todos;
    }
    return todos.filter(todo => {
      return `${todo.user.firstName} ${todo.user.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}

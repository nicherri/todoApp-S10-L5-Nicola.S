import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';
import { CombinedTodo } from '../../models/combined-todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pending-todos',
  templateUrl: './pending-todos.component.html',
  styleUrls: ['./pending-todos.component.scss']
})
export class PendingTodosComponent implements OnInit {
  pendingTodos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione

  constructor(private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.pendingTodos$ = this.combinedService.getCombinedTodos().pipe(
      map((todos: CombinedTodo[]) => todos.filter(todo => !todo.completed))
    );
  }

  updateTodoStatus(id: number, event: any): void {
    const status = event.target.checked;
    this.combinedService.updateTodoStatus(id, status);
  }
}


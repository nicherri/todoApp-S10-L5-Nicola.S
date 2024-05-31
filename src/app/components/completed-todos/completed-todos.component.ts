import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';
import { CombinedTodo } from '../../models/combined-todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.scss']
})
export class CompletedTodosComponent implements OnInit {
  completedTodos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione

  constructor(private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.completedTodos$ = this.combinedService.getCombinedTodos().pipe(
      map((todos: CombinedTodo[]) => todos.filter(todo => todo.completed))
    );
  }
}

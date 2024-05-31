import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';

@Component({
  selector: 'app-completed-todos',
  templateUrl: './completed-todos.component.html',
  styleUrls: ['./completed-todos.component.scss']
})
export class CompletedTodosComponent implements OnInit {
  completedTodos: any[] = [];

  constructor(private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.completedTodos = this.combinedService.getCombinedTodos().filter(todo => todo.completed);
  }
}

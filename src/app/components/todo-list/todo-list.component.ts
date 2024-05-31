import { ITodo } from './../../models/i-todo';
import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../services/combined.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: any[] = [];
  searchTerm: string = '';

  constructor(private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.todos = this.combinedService.getCombinedTodos();
  }

  updateTodoStatus(id: number, event: any): void {
    const status = event.target.checked;
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = status;
      }
      return todo;
    });
  }

  filteredTodos(): any[] {
    if (!this.searchTerm) {
      return this.todos;
    }
    return this.todos.filter(todo => {
      return `${todo.user.firstName} ${todo.user.lastName}`.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
}


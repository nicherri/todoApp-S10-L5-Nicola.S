import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CombinedService {

  constructor(private todoService: TodoService, private userService: UserService) {}

  getCombinedTodos(): any[] {
    const todos = this.todoService.getTodos();
    const users = this.userService.getUsers();

    return todos.map(todo => {
      const user = users.find(user => user.id === todo.userId);
      return {
        ...todo,
        user: user ? { firstName: user.firstName, lastName: user.lastName } : { firstName: 'Unknown', lastName: '' }
      };
    });
  }

  getCombinedTodosByUserId(userId: number): any[] {
    return this.getCombinedTodos().filter(todo => todo.userId === userId);
  }
}

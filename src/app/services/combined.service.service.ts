import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class CombinedServiceService {

  constructor(private todoService: TodoService, private userService: UserService) { }
  getCombinedTodos() {
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

  // Metodo per filtrare i todo combinati in base all'ID utente
  getCombinedTodosByUserId(userId: number) {
    return this.getCombinedTodos().filter(todo => todo.userId === userId);
  }
}

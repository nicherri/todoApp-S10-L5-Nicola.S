import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CombinedTodo } from '../models/combined-todo';
import { ITodo } from '../models/i-todo';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root'
})
export class CombinedService {


  constructor(private todoService: TodoService, private userService: UserService) {}

  getCombinedTodos(): Observable<CombinedTodo[]> {
    return this.todoService.todos$.pipe(
      map((todos: ITodo[]) => {
        const users: IUser[] = this.userService.getUsers();
        return todos.map((todo: ITodo) => {
          const user = users.find(user => user.id === todo.userId);
          return {
            ...todo,
            user: user ? { firstName: user.firstName, lastName: user.lastName } : { firstName: 'Unknown', lastName: '' }
          } as CombinedTodo;
        });
      })
    );
  }

  getCombinedTodosByUserId(userId: number): Observable<CombinedTodo[]> {
    return this.getCombinedTodos().pipe(
      map((todos: CombinedTodo[]) => todos.filter((todo: CombinedTodo) => todo.userId === userId))
    );
  }

  updateTodoStatus(id: number, status: boolean): void {
    this.todoService.updateTodoStatus(id, status);
  }
}

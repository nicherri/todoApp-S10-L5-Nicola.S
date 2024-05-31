import { IUser } from './../../models/i-user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CombinedService } from '../../services/combined.service';
import { Observable } from 'rxjs';
import { CombinedTodo } from '../../models/combined-todo';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  combinedTodos$: Observable<CombinedTodo[]> = new Observable<CombinedTodo[]>(); // Inizializzazione

  constructor(private userService: UserService, private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.combinedTodos$ = this.combinedService.getCombinedTodos();
  }

  getTodosForUser(userId: number): Observable<CombinedTodo[]> {
    return this.combinedService.getCombinedTodosByUserId(userId);
  }
}

import { IUser } from './../../models/i-user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CombinedService } from '../../services/combined.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private userService: UserService, private combinedService: CombinedService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  getTodosForUser(userId: number): any[] {
    return this.combinedService.getCombinedTodosByUserId(userId);
  }
}

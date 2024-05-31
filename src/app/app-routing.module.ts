import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CompletedTodosComponent } from './components/completed-todos/completed-todos.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PendingTodosComponent } from './components/pending-todos/pending-todos.component';

const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'completed', component: CompletedTodosComponent },
  { path: 'users', component: UserListComponent },
  { path: 'tocomplete', component: PendingTodosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

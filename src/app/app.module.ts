import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CompletedTodosComponent } from './components/completed-todos/completed-todos.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NavbarComponent } from './components/navbar/navbar.component'; // Importa il componente navbar
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { CombinedService } from './services/combined.service';
import { PendingTodosComponent } from './components/pending-todos/pending-todos.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CompletedTodosComponent,
    UserListComponent,
    NavbarComponent,
    PendingTodosComponent // Dichiara il componente navbar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [TodoService, UserService, CombinedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

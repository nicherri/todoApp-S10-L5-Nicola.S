import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CompletedTodosComponent } from './components/completed-todos/completed-todos.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { TodoService } from './services/todo.service';
import { UserService } from './services/user.service';
import { CombinedService } from './services/combined.service';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CompletedTodosComponent,
    UserListComponent,
    NavbarComponent
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

import { IUser } from './i-user';
import { ITodo } from './i-todo';


export interface CombinedTodo extends ITodo {
  user: {
    firstName: string;
    lastName: string;
  };
}

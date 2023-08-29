import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  modal = false;
  editModal = false;
  todos: any= []
  editContent: any;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    this.mainService.getTodos().subscribe((data: any) => {
      this.todos = data.result;
    })
  }


  updatelist(todo:any) {
    todo.completed = !todo.completed
    let params = {
      "completed": todo.completed
    }
    console.log(params);
    
    this.todos.forEach((item:any) => {
      if(item._id == todo._id) {
        this.mainService.updateStatus(todo._id, params).subscribe((response: any) => {
          this.getTodos()
        });
      }
    });
    
  }

  addNewItem(todo:any) {
    let params = {
      "title": todo,
      "completed": false
    }
    this.mainService.addTodo(params).subscribe((data: any) => {
      if(data){
        console.log(data);
        this.getTodos()
        this.modal = false;
      }
    })
  }

  editItem(todo:any) {
    this.editContent = todo
    this.editModal = true;
  }

  saveEditItem(value: any) {
    let params = { "title": value }
    this.mainService.updateTitle(this.editContent._id, params).subscribe((result: any) => {
      if(result) {
        this.editModal = false;
        this.getTodos()
      }
    })
  }

  deleteItem(todo: any) {
    this.mainService.deleteTodo(todo._id).subscribe((data:any) => {
      if(data) {
        this.getTodos()
      }
    })
  }
}

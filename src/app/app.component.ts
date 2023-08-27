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
  todos = [
    {"id": 1,"title":"Buy milk", "completed":false},
    {"id": 2,"title":"Wash the car", "completed":true},
  ]
  editContent: any;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.getTodos()
  }

  getTodos() {
    
  }


  updatelist(todo:any) {
    this.todos.forEach(item => {
      if(item.id == todo.id) {
        item.completed = !item.completed
      }
    });
  }

  addNewItem(todo:any) {
    let newId = Math.max(...this.todos.map((item: any)=>{return parseInt(item.id)}))
    let newTodo = {
      "id": newId + 1,
      "title": todo,
      "completed": false
    }
    this.todos.unshift(newTodo);
    this.modal = false;
  }

  editItem(todo:any) {
    this.editContent = todo
    this.editModal = true;
  }

  saveEditItem(value: any) {
    this.todos.forEach(element => {
      if (element.id === this.editContent.id) {
        element.title = value;
      }
    })
    this.editModal = false;
  }

  deleteItem(todo: any) {
    this.todos.forEach(item => {
      if (item.id == todo.id) {
        const index = this.todos.indexOf(item);
        this.todos.splice(index, 1);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Category } from './Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryC = new Category();
  UserList: any[]=[];
  Id:number=-1;
  SaveUpdateView: boolean=false;

  constructor(private Services:ApiService) { }

  ngOnInit(){
    this.GetAllCategory();
  }
  CategoryDeletedMethod(){
    if(this.Id>0){
      this.Services.Deletedcategory(this.Id).subscribe(
        (res)=>{
          this.GetAllCategory();
        }
      )
    }else{
      alert("Plase Secetd a Row")
    }
  }

  UpdateCategoryMethod(){
    this.Services.Putcategory(this.categoryC).subscribe(
      (res)=>{
      this.GetAllCategory();
      }
    )
    document.getElementById("ModelClose").click();
  }

  RowClickMethod(item:any){
    if(this.Id==item.id){
      this.Id=-1;
    }else{
      this.Id=item.id;
    }
  }
  DblClickMethod(CateObjec: any){
    this.categoryC.Name=CateObjec.name;
    this.categoryC.id=CateObjec.id;
    document.getElementById("categoryModel").click();

  }

  AddSaveChangeMethod(){
    this.Services.Postcategory(this.categoryC).subscribe(
      (res)=>{
        this.GetAllCategory();
      }
    )
    document.getElementById("ModelClose").click();
  }

  CloseMethod(){
    this.SaveUpdateView=false;
  }

  ModelOpernMethod(){
    this.categoryC.Name="";
    this.SaveUpdateView=true;
    document.getElementById("categoryModel").click();
  }


  GetAllCategory(){
    
    this.Services.Getcategory().subscribe(
      (res)=>{
        this.UserList=res;
      }
    )
  }


}

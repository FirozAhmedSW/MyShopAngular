import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ApiService } from '../api.service';
import jspdf from 'jspdf';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  gridApi: GridApi;
  contact: any;
  id = 0;
  name = "";
  email = "";
  password = "";
  address = "";
  number = "";
  about = "";
  public modalid = "";
  constructor(private injectApi: ApiService) { }



  ngOnInit() {
    this.GetUserMethod();
  }

  makePdf() {
    var imgData = 'assets/my.jpg';
    const header = 'Report 2014';
    var pdf = new jspdf();
    pdf.setFontSize(20);
    pdf.setTextColor("blue");
    pdf.text("Name : Md Firoz Ali", 15, 20);
    pdf.text("Address : khokhsha Mollik Para", 15, 35);
    pdf.text("Mail : mdfirozahmed698@gmail.com", 15, 50);
    pdf.text("Number : 01984913698", 15, 65);
    pdf.addImage(imgData, 150, 15, 50, 60);
    pdf.save("sample.pdf")
  }





  OnselectionChanged() {
    var data = this.gridApi.getSelectedRows()[0];
    if (data.id > 0) {
      this.modalid = "exampleModal";
    }
    else {
      this.modalid = "";
    }
  }
  SaveChangeMethod() {


  }
  GetUserMethod() {
    // this.injectApi.GetUser().subscribe(
    //   (Response) => {
    //     console.log(Response)
    //     this.rowData = Response;
    //   })
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  AddUserMethod() {
    this.id = 0;
    this.name = "";
    this.email = "";
    this.password = "";
    this.address = "";
    this.number = "";
    this.about = "";
  }

  EditUserMethod() {
    var Obj = this.gridApi.getSelectedRows();
    if (Obj.length > 0) {
      let data = Obj[0];
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      this.address = data.address;
      this.number = data.number;
      this.about = data.about;
    } else {
      this.modalid = "";
      alert("Place Select a Id")
    }
  }

  DeletedUserMethod() {
    var Obj = this.gridApi.getSelectedRows();
    if (confirm("Do You Want to Deleted?")) {
      if (Obj.length > 0) {
        let removData = Obj[0];
        this.id = removData.id;
        this.injectApi.DeletedUser(this.id).subscribe(
          (Response) => {
            console.log(Response)
            this.GetUserMethod();
          })
      } else {
        alert("Place Select a Id")
      }
    }
  }

}

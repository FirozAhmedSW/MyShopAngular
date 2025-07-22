import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import jspdf from 'jspdf';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  gridApi!: GridApi;
  id = 0;
  name = "";
  email = "";
  password = "";
  address = "";
  number = "";
  about = "";
  public modalid = "";

  public rowData: any[] = [];
  public colDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'email', headerName: 'Email', flex: 3 },
    { field: 'password', headerName: 'Password', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 3 },
    { field: 'number', headerName: 'Number', flex: 2 },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      cellRenderer: (params: any) => {
        const base64 = params.value;
        if (!base64) {
          return `<img src="assets/placeholder.jpg" style="width: 50px; height: 50px;" />`;
        }
        return `<img src="data:image/jpeg;base64,${base64}" style="width: 50px; height: 50px; border-radius: 5px;" />`;
      }
    }
  ];

  constructor(
    private injectApi: ApiService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.GetUserMethod();
  }

  makePdf() {
    const doc = new jspdf();
    doc.setFontSize(16);
    doc.setTextColor("black");

    let y = 20;
    doc.text("User Report", 15, y);
    y += 10;

    // Table Header
    doc.setFontSize(12);
    doc.setTextColor("blue");
    doc.text("ID", 15, y);
    doc.text("Name", 30, y);
    doc.text("Email", 70, y);
    doc.text("Number", 120, y);
    y += 7;
    doc.setDrawColor(0);
    doc.line(15, y, 200, y); // Line under header
    y += 5;

    doc.setTextColor("black");

    this.rowData.forEach((user, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(String(user.id), 15, y);
      doc.text(user.name || '', 30, y);
      doc.text(user.email || '', 70, y);
      doc.text(user.number || '', 120, y);
      y += 7;
    });

    doc.save("UserReport.pdf");
  }

  OnselectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows.length > 0 && selectedRows[0].id > 0) {
      this.modalid = "exampleModal";
    } else {
      this.modalid = "";
    }
  }

  SaveChangeMethod() {
    // Save logic
  }

  GetUserMethod() {
    this.injectApi.GetUser().subscribe(
      (Response) => {
        this.rowData = Response;
      },
      (error) => {
        this.toaster.error('Failed to load users', 'Error');
        console.error(error);
      }
    );
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
    const Obj = this.gridApi.getSelectedRows();
    if (Obj.length > 0) {
      const data = Obj[0];
      this.id = data.id;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      this.address = data.address;
      this.number = data.number;
      this.about = data.about;
    } else {
      this.modalid = "";
      this.toaster.warning('Please select an ID', 'Warning');
    }
  }

  DeletedUserMethod() {
    const Obj = this.gridApi.getSelectedRows();
    if (confirm("Do You Want to Delete?")) {
      if (Obj.length > 0) {
        const removData = Obj[0];
        this.id = removData.id;
        this.injectApi.DeletedUser(this.id).subscribe(
          (Response) => {
            this.toaster.success('User Deleted Successfully', 'Success');
            this.GetUserMethod(); // Refresh data here
          },
          (error) => {
            this.toaster.error('Failed to delete user', 'Error');
            console.error('Delete error:', error);
          }
        );
      } else {
        this.toaster.warning('Please select an ID', 'Warning');
      }
    }
  }
}

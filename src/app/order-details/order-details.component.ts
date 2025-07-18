import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public modalid = "";
  gridApi: GridApi;
  colDefs: ColDef[] = [
    { field: 'Name',headerName: "User Name"},
    { field: 'Number'},
    { field: 'Address' },
    { field: 'OrderNo',width: 350 },
    { field: 'CreatedAt',headerName: "Order Time"},
    { field: 'Total',headerName: "Total Amount" }
  ]
  rowData: any[] = [];
  constructor(private services: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.GetOrderDeteils();
  }
  GetOrderDeteils() {
    
    var Obj = localStorage.getItem("UserData")
    var UsernameObj = JSON.parse(Obj);
    var id = UsernameObj.id;
    this.services.GetOrder(id).subscribe(
      (res) => {
        console.log(res);
        this.rowData =res;
        // this.gridApi.setRowData(res);
      }
    )
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
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

}

import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import { generate } from 'rxjs';
import { ApiService } from '../api.service';
import { JsPdfHelperService } from '../jspdf.service';
@Component({
  selector: 'app-main-contant',
  templateUrl: './main-contant.component.html',
  styleUrls: ['./main-contant.component.css']
})
export class MainContantComponent implements OnInit {
  // public UserList: User[] = [];
  public _oPdfTable: any = null;
  _nTotalCol = 0;
  oHeights: any;
  nFixedHeight = 0;
  nFontsize = 0;
  dataOne="I am firoz ali"
  public _oTmpWidth: number[] = [];
  dataName:any;

  constructor(private injectApi: ApiService, private Jspdf: JsPdfHelperService) { }
  ngOnInit(){ }


  //make pdf start
  makePdf() {
    // this.injectApi.GetUser().subscribe(
    //   (Response) => {
    //     console.log(Response)
    //     // this.UserList = Response;
    //     var imgData = 'assets/my.jpg';
    //     var mageTwo = 'assets/logoTwo.png';
    //     var doc = new jsPDF('p', 'pt', [842, 595]);
    //     doc.setFontSize(10);
    //     doc.addImage(imgData, 430, 40, 120, 120); 
    //     doc.addImage(mageTwo, 300, 50, 90, 90); 
    //     doc.setFontSize(20);
    //     doc.setTextColor("blue");
    //     doc.text("Name : Md Firoz Ali " + this.dataOne, 30, 60);
    //     doc.text("Address : Khokshs Mollik Para", 30, 90);
    //     doc.text("Number : 01984913698", 30, 120);
    //     doc.text("About : I Am a Student", 30, 150);
      
    //     // doc = this.MapPDFReport(doc, this.UserList);
    //     doc.setProperties({
    //       title: "MyShopReport.pdf",
    //     });
    //     doc.output('dataurlnewwindow');
      
    //   })
  }
  public MapPDFReport(doc: any, oBondUD: any) {
    var _oBondUD = oBondUD;
    this.dataName=oBondUD.name;
    this._oTmpWidth = [];
    this._nTotalCol = 0;
    this.oHeights = [];
    this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32);this._oTmpWidth.push(32);
    this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32);this._oTmpWidth.push(32); this._oTmpWidth.push(32); 
    this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32);this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32);
    this._oTmpWidth.push(32); this._oTmpWidth.push(32);this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32); this._oTmpWidth.push(32);
    this._oTmpWidth.push(32);
    this._nTotalCol = this._oTmpWidth.length;
    this._oPdfTable = this.Jspdf.icsPDFTable({ colCount: this._nTotalCol });
    this._oPdfTable.SetWidths(this._oTmpWidth);
    //--------------------Header--------------------------------------
    this.nFixedHeight = 140;
    this._oPdfTable.AddCell({ ColSpan: this._nTotalCol, Border: false, FixedHeight: this.nFixedHeight });
    this._oPdfTable.CompleteRow();
    //this line User For Space Uering

    this._oPdfTable.AddCell({ Text: this.dataOne, ColSpan: this._nTotalCol, HorizontalAlignment: 'center', Border: false, FontSize: 20, FixedHeight: 40 });
    this._oPdfTable.CompleteRow(); 

    // this._oPdfTable.AddCell({ Text: 'My Company User Data List', ColSpan: this._nTotalCol, VerticalAlignment: 'bottom', HorizontalAlignment: 'center', Border: false, BorderWidthLeft: 0, BorderWidthRight: 0, BorderWidthTop: 0, BorderWidthBottom: 0, FontSize: 20, IsBanglaFont: false, IsBold: true, FixedHeight: 200 });//SL
    // this._oPdfTable.CompleteRow();
    //---------------------Header End--------------------------------------
    //----------------------------------Blank Row--------------------------------
    this.nFixedHeight = 0;
    this._oPdfTable.AddCell({ ColSpan: this._nTotalCol, Text: '', VerticalAlignment: 'bottom', HorizontalAlignment: 'left', Border: false, BorderWidthLeft: 0, BorderWidthRight: 0, BorderWidthTop: 0, BorderWidthBottom: 0, FontSize: 10, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.CompleteRow();

    this.nFixedHeight = 30;
    this.nFontsize = 10;
    this._oPdfTable.AddCell({ ColSpan: 1, Text: 'Id No', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.AddCell({ ColSpan: 3, Text: 'Name', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.AddCell({ ColSpan: 6, Text: 'Email Address', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.AddCell({ ColSpan: 3, Text: 'Password', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.AddCell({ ColSpan: 5, Text: 'Address', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.AddCell({ ColSpan: 4, Text: 'Number', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.AddCell({ ColSpan: 3, Text: 'About', VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.CompleteRow();
    var count = 0;
    for (let i = 0; i < _oBondUD.length; i++) {
      count++;
      this._oPdfTable.AddCell({ ColSpan: 1, Text: count.toString(), VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.AddCell({ ColSpan: 3, Text: _oBondUD[i].name, VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.AddCell({ ColSpan: 6, Text: _oBondUD[i].email, VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.AddCell({ ColSpan: 3, Text: _oBondUD[i].password, VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.AddCell({ ColSpan: 5, Text: _oBondUD[i].address, VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.AddCell({ ColSpan: 4, Text: _oBondUD[i].number, VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.AddCell({ ColSpan: 3, Text: _oBondUD[i].about, VerticalAlignment: 'middle', HorizontalAlignment: 'center', Border: true, FontSize: this.nFontsize, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
      this._oPdfTable.CompleteRow();
    }
    //----------------------------------Blank Row--------------------------------
    this.nFixedHeight = 8;
    this._oPdfTable.AddCell({ ColSpan: this._nTotalCol, Text: '', VerticalAlignment: 'bottom', HorizontalAlignment: 'left', Border: false, BorderWidthLeft: 0, BorderWidthRight: 0, BorderWidthTop: 0.1, BorderWidthBottom: 0, FontSize: 10, IsBanglaFont: false, IsBold: true, FixedHeight: this.nFixedHeight });
    this._oPdfTable.CompleteRow();
    //----------------------------------Blank Row End -----------------------------
    doc = this.Jspdf.icsPDFGenerate(doc, this._oPdfTable, 30, 30, 30, 50);
    var pageCount = doc.internal.getNumberOfPages(); //Total Page Number
    for (var i = 0; i < pageCount; i++) {
      doc.setTextColor("red");
      doc.addImage("assets/logoTwo.png", 510, 765, 90, 90); 
      doc.setPage(i);
      var pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //Current Page
      doc.setFontSize(10);
      doc.text("Page" + pageCurrent + '/' + pageCount, 10, 835);
    }
    return doc;
  }
}


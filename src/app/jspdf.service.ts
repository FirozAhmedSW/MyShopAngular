
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root'
})

export class JsPdfHelperService {

  public _xPosition = 1.0;
  public _yPosition = 1.0;
  public nTotalPageNum = 0;
  //-------------------------------E2B----------------------------------------
  public cEtoB = {
    'A': 'G', 'B': 'we', 'C': 'wm', 'D': 'wW', 'E': 'B', 'F': 'Gd', 'G': 'wR',
    'H': 'GBP', 'I': 'AvB', 'J': '‡R', 'K': '†K', 'L': 'Gj', 'M': 'Gg', 'N': 'Gb', 'O': 'I',
    'P': 'wc', 'Q': 'wKD', 'R': 'Avi', 'S': 'Gm', 'T': 'wU', 'U': 'BD',
    'V': 'wf', 'W': 'WweøD', 'X': 'G·', 'Y': 'IqvB', 'Z': '‡RW',
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
  };
  public specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  constructor() { }

  public icsPDFTable(options: any): any {
    var object = {
      colCount: 0,
      ColWidths: [],
      WidthPercentage: 100,
      HeaderRows: 0,
      PdfRows: [],
      PdfCells: []
    }
    var oPdfTable = { ...object, ...options };

    oPdfTable.SetWidths = function (aColWidths: any) {
      oPdfTable.ColWidths = aColWidths;
    }

    oPdfTable.AddCell = function (oPdfCell: any) {
      var oTempCell = icsPDFCell(oPdfCell);

      oPdfTable.PdfCells.push(oTempCell);
    }
    oPdfTable.CompleteRow = function (options: any) {

      var oHDPdfTable = {
        ...{
          AddNewPage: false
        }, ...options
      };
      var oPdfCells = [];
      if (oPdfTable.PdfCells != null && oPdfTable.PdfCells.length > 0) {
        for (var i = 0; i < oPdfTable.PdfCells.length; i++) {
          var oTempCell = icsPDFCell(oPdfTable.PdfCells[i]);
          oPdfCells.push(oTempCell);
        }
      }
      var oPdfRow = {
        PdfCells: oPdfCells,
        CellCount: oPdfCells.length,
        AddNewPage: oHDPdfTable.AddNewPage
      };

      var oTempRow = icsPDFRow(oPdfRow);
      oPdfTable.PdfRows.push(oTempRow);
      oPdfTable.PdfCells = [];
    }

    return oPdfTable;
  }


  public HeaderRowsPrint(icsPDFdoc: any, oPdfTable: any, marginLeft: any, marginRight: any, marginTop: any, marginBottom: any, NumOfHeaderRows: any) {
    
    for (var i = 0; i < NumOfHeaderRows; i++) {
      var oPdfRow = icsPDFRow(oPdfTable.PdfRows[i]);
      var obj = CellPrint(icsPDFdoc, oPdfTable, oPdfRow, i, marginLeft, marginRight, marginTop, marginBottom, this._yPosition);
      icsPDFdoc = obj.Doc;
      this._yPosition = obj.PosiionY;
    }
    return icsPDFdoc;
  }


  public icsPDFGenerate(this: any, icsPDFdoc: any, oPdfTable: any, marginLeft: any, marginRight: any, marginTop: number, marginBottom: any, oFooterPdfTable?: any, IsShowPageNumber = false, IsFirstTime = true) {
    if (IsFirstTime == true) {
      this.nTotalPageNum = 0;
    }
    this._xPosition = marginLeft;
    this._yPosition = marginTop;
    if (oPdfTable.WidthPercentage == 100) {
      oPdfTable = ResizeWidth(oPdfTable, icsPDFdoc.internal.pageSize.getWidth() - marginLeft - marginRight);
      if (oFooterPdfTable != null && oFooterPdfTable != 'undefined' && oFooterPdfTable.PdfRows.length > 0) {
        oFooterPdfTable = ResizeWidth(oFooterPdfTable, icsPDFdoc.internal.pageSize.getWidth() - marginLeft - marginRight);
      }

    }
    if (oPdfTable != null && oPdfTable != 'undefined' && oPdfTable.PdfRows.length > 0) {
      for (var nRowIndex = 0; nRowIndex < oPdfTable.PdfRows.length; nRowIndex++) {
        var nAlreadyPrintHeader = false;
        var nAlreadyPrintFooter = false;
        if (this._yPosition > icsPDFdoc.internal.pageSize.getHeight() - (marginBottom + 10)) {
          if (oFooterPdfTable != null && oFooterPdfTable != 'undefined' && oFooterPdfTable.PdfRows.length > 0) {
            this._yPosition = icsPDFdoc.internal.pageSize.getHeight() - marginBottom;
            for (var nFooterRowIndex = 0; nFooterRowIndex < oFooterPdfTable.PdfRows.length; nFooterRowIndex++) {
              var oFooterPdfRow = icsPDFRow(oFooterPdfTable.PdfRows[nFooterRowIndex]);
              var obj = CellPrint(icsPDFdoc, oFooterPdfTable, oFooterPdfRow, nFooterRowIndex, marginLeft, marginRight, marginTop, marginBottom, this._xPosition);
              icsPDFdoc = obj.Doc;
              this._yPosition = obj.PosiionY;
            }
          }

          if (IsShowPageNumber == true) {
            icsPDFdoc.text((++this.nTotalPageNum).toString(), marginLeft, this._yPosition - 4, { align: 'left', maxWidth: 100, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
          }

          icsPDFdoc.addPage();
          this._yPosition = marginTop;
          icsPDFdoc = this.HeaderRowsPrint(icsPDFdoc, oPdfTable, marginLeft, marginRight, marginTop, marginBottom, oPdfTable.HeaderRows);
          nAlreadyPrintHeader = true;
        }

        const _xPosition = marginLeft;

        var oPdfRow = icsPDFRow(oPdfTable.PdfRows[nRowIndex]);
        var data = CellPrint(icsPDFdoc, oPdfTable, oPdfRow, nRowIndex, marginLeft, marginRight, marginTop, marginBottom, this._yPosition);
        icsPDFdoc = data.Doc;
        this._yPosition = data.PosiionY;
        if (oPdfTable.PdfRows[nRowIndex].AddNewPage == true) {
          if (oFooterPdfTable != null && oFooterPdfTable != 'undefined' && oFooterPdfTable.PdfRows.length > 0) {
            this._yPosition = icsPDFdoc.internal.pageSize.getHeight() - marginBottom;
            for (var nFooterRowIndex = 0; nFooterRowIndex < oFooterPdfTable.PdfRows.length; nFooterRowIndex++) {
              var oFooterPdfRow = icsPDFRow(oFooterPdfTable.PdfRows[nFooterRowIndex]);
              var object = CellPrint(icsPDFdoc, oFooterPdfTable, oFooterPdfRow, nFooterRowIndex, marginLeft, marginRight, marginTop, marginBottom, this._yPosition);
              icsPDFdoc = object.Doc;
              this._yPosition = object.PosiionY;
            }
          }
          if (IsShowPageNumber == true) {
            icsPDFdoc.text((++this.nTotalPageNum).toString(), marginLeft, this._yPosition - 4, { align: 'left', maxWidth: 100, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
          }

          if (nAlreadyPrintHeader == false) {
            icsPDFdoc.addPage();
            this._yPosition = marginTop;
            if (nRowIndex != oPdfTable.PdfRows.length - 1) {
              icsPDFdoc = this.HeaderRowsPrint(icsPDFdoc, oPdfTable, marginLeft, marginRight, marginTop, marginBottom, oPdfTable.HeaderRows);
            }
          }
          nAlreadyPrintFooter = true;

        }

        if (nRowIndex == oPdfTable.PdfRows.length - 1 && nAlreadyPrintFooter == false) {
          if (oFooterPdfTable != null && oFooterPdfTable != 'undefined' && oFooterPdfTable.PdfRows.length > 0) {
            this._yPosition = icsPDFdoc.internal.pageSize.getHeight() - marginBottom;
            for (var nFooterRowIndex = 0; nFooterRowIndex < oFooterPdfTable.PdfRows.length; nFooterRowIndex++) {
              var oFooterPdfRow = icsPDFRow(oFooterPdfTable.PdfRows[nFooterRowIndex]);
              icsPDFdoc = CellPrint(icsPDFdoc, oFooterPdfTable, oFooterPdfRow, nFooterRowIndex, marginLeft, marginRight, marginTop, marginBottom, this._xPosition);
            }

          }
          if (IsShowPageNumber == true) {
            icsPDFdoc.text((++this.nTotalPageNum).toString(), marginLeft, this._yPosition - 4, { align: 'left', maxWidth: 100, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
          }


        }
      }
    }
    return icsPDFdoc;
  }

  public icsConvertE2B(this: any, sCharecter: any) {
    var sResult = "";
    sCharecter = sCharecter.trim();
    if (sCharecter.length > 0) {
      for (var i = 0; i < sCharecter.length; i++) {

        if (!this.specialChar.test(sCharecter[i])) {

          if (!isNaN(sCharecter[i])) {
            sResult += this.cEtoB[sCharecter[i]];

          } else {

            sResult += this.cEtoB[sCharecter[i].toUpperCase()];
          }

        } else {
          sResult += sCharecter[i];
        }

      }

    } else {
      sResult = "";
    }
    return sResult;
  }


}

function icsPDFCell(options: any): any {
  let defaultOptions = {
    Border: true,
    BorderWidthLeft: 0,
    BorderWidthRight: 0,
    BorderWidthTop: 0,
    BorderWidthBottom: 0,
    HorizontalAlignment: 'left',
    VerticalAlignment: 'middle',
    BackgroundColor: 'White',
    Text: '',
    ColSpan: 1,
    FixedHeight: 26,
    TextRotated: 0,
    RowSpan: 0,
    IsBold: false,
    FontSize: 10,
    IsBanglaFont: true,
    IsNewLine: false,
    IsTextOnly: false,//Used For Normal Large Text Without Border
    MarginTop: 0//For Remove Table Border Problem with New Blank Row
  }
  var obj = { ...defaultOptions, ...options };

  return obj;
}

function icsPDFRow(options: any) {

  var obj = {
    ...{
      CellCount: 0,
      PdfCells: [],
      AddNewPage: false
    }, ...options
  };

  return obj;
}
function CellPrint(icsPDFdoc, oPdfTable, oPdfRow, RowIndex, marginLeft, marginRight, marginTop, marginBottom, _yPosition) {
  var nColIndex = 0;
  var _xPosition = marginLeft;
  var nMinHeightInRows = icsPDFCell(oPdfRow.PdfCells[0]).FixedHeight;

  for (var nCellIndex = 0; nCellIndex < oPdfRow.PdfCells.length; nCellIndex++) {
    var oPdfCell = icsPDFCell(oPdfRow.PdfCells[nCellIndex]);
    //nColIndex = (nColIndex + parseInt(oPdfCell.ColSpan) - 1);
    var nCellWidth = icsCellWidth(oPdfTable, oPdfCell, nColIndex);
    var nCellHeight = oPdfCell.FixedHeight;
    if (oPdfCell.RowSpan > 1) {
      nCellHeight = icsCellHeight(oPdfTable, oPdfCell, nColIndex, RowIndex);
    }
    if (nCellHeight < nMinHeightInRows) {
      nMinHeightInRows = nCellHeight;
    }
    var xPosition = marginLeft;
    nColIndex = (nColIndex + parseInt(oPdfCell.ColSpan));
    var yPosition = (_yPosition + nCellHeight); //bottom
    if (oPdfCell.VerticalAlignment === 'middle') {
      if (oPdfCell.TextRotated == 0) {
        yPosition = (_yPosition + (nCellHeight / 2)); //middle
      }
      else {
        yPosition = yPosition - 10; //middle
      }
    }
    if (oPdfCell.VerticalAlignment === 'top') {//added by fatema 29.03.2022
      yPosition = _yPosition + 10; //top
    }

    if (oPdfCell.HorizontalAlignment === 'center') {
      xPosition = (_xPosition + (nCellWidth / 2));
    }

    if (oPdfCell.HorizontalAlignment === 'left') {
      xPosition = (_xPosition + 2);
    }

    if (oPdfCell.RowSpan != 1) {
      if (oPdfCell.IsBanglaFont == false) {
        icsPDFdoc.setFontSize(oPdfCell.FontSize);
      }

      else {
        if (oPdfCell.IsBold == true) {
          icsPDFdoc.setFontSize(oPdfCell.FontSize);
        }
        else {
          icsPDFdoc.setFontSize(oPdfCell.FontSize);
        }
      }

      if (oPdfCell.IsTextOnly == true) {
        var nFontSize = parseFloat(oPdfCell.FontSize);

        var head2Text = icsPDFdoc.splitTextToSize(oPdfCell.Text, nCellWidth, { fontSize: nFontSize });
        var head2FinalHeight = icsPDFdoc.getTextDimensions(head2Text, { fontSize: nFontSize });
        var nCellHeight1 = parseFloat(head2FinalHeight.h);
        var yTempPosition = yPosition;
        var xTempPosition = xPosition;
        if (nCellHeight > nMinHeightInRows) {
          nMinHeightInRows = nCellHeight1;
        }
        if (oPdfCell.HorizontalAlignment === 'center') {
          xTempPosition = xTempPosition + ((nCellWidth) / 2);
        }
        else if (oPdfCell.HorizontalAlignment === 'right') {
          xTempPosition = xTempPosition + (nCellWidth);
        }
        if (oPdfCell.VerticalAlignment === 'top') {//added by fatema 29.03.2022
          yTempPosition = (yTempPosition + (nCellHeight / 2)) - 5; //top
        }
        if (oPdfCell.BackgroundColor == "Gray") {
          icsPDFdoc.setFillColor(211, 211, 211);
          icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight, 'F');
          icsPDFdoc.setTextColor(0, 0, 0);
        }

        icsPDFdoc.text(oPdfCell.Text, xTempPosition, yTempPosition, { align: oPdfCell.HorizontalAlignment, maxWidth: nCellWidth, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
        xPosition = xPosition + (nCellWidth);
      }

      else {
        if (oPdfCell.TextRotated == 0) {
          if (oPdfCell.HorizontalAlignment == 'right') {
            if (oPdfCell.BackgroundColor == "Gray") {
              icsPDFdoc.setFillColor(211, 211, 211);
              icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight, 'F');
              icsPDFdoc.setTextColor(0, 0, 0);
            }
            icsPDFdoc.text(oPdfCell.Text, xPosition + nCellWidth - 2, yPosition, { align: oPdfCell.HorizontalAlignment, maxWidth: nCellWidth, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
          }
          else {
            if (oPdfCell.IsNewLine == true) { //added by fatema 29.03.2022

              var nFontSize2 = parseFloat(oPdfCell.FontSize);
              var txt1 = oPdfCell.Text.split("\n")[0];
              var tempCellWidth = icsPDFdoc.getTextWidth(txt1) + 4;
              if (tempCellWidth <= 0) {
                tempCellWidth = nCellWidth;
              }
              //var head2Text2 = oPdfCell.Text.split("\n");
              var head2Text2 = icsPDFdoc.splitTextToSize(oPdfCell.Text, tempCellWidth, { fontSize: nFontSize2 });
              var head2FinalHeight2 = icsPDFdoc.getTextDimensions(head2Text2, { fontSize: nFontSize2 });
              var nCellHeight2 = parseFloat(head2FinalHeight2.h);
              var yTempPosition2 = yPosition;
              var xTempPosition2 = xPosition;

              if (nCellHeight2 > nMinHeightInRows) {
                nMinHeightInRows = nCellHeight2;
                xTempPosition2 = xTempPosition2 + (nCellHeight2);
              }

              if (oPdfCell.HorizontalAlignment === 'center') {
                xTempPosition2 = (_xPosition + (nCellWidth / 2));
              }
              if (oPdfCell.VerticalAlignment === 'top') {//added by fatema 29.03.2022
                yTempPosition2 = (yTempPosition2 + (nCellHeight2 / 2)) - 5; //top
              }

              if (oPdfCell.BackgroundColor == "Gray") {
                icsPDFdoc.setFillColor(211, 211, 211);
                icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight, 'F');
                icsPDFdoc.setTextColor(0, 0, 0);
              }
              icsPDFdoc.text(oPdfCell.Text, xTempPosition2, yTempPosition2, { align: oPdfCell.HorizontalAlignment, maxWidth: tempCellWidth + 3, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
              xPosition = xTempPosition2 + parseFloat(tempCellWidth);
            }
            else {
              if (oPdfCell.BackgroundColor == "Gray") {
                icsPDFdoc.setFillColor(211, 211, 211);
                icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight, 'F');
                icsPDFdoc.setTextColor(0, 0, 0);
              }
              icsPDFdoc.text(oPdfCell.Text, xPosition, yPosition, { align: oPdfCell.HorizontalAlignment, maxWidth: nCellWidth, charSpace: 0, rotationDirection: 1, baseline: "alphabetic" }, 0);
            }
          }
        }
        else {
          if (oPdfCell.HorizontalAlignment == 'right') {
            if (oPdfCell.BackgroundColor == "Gray") {
              icsPDFdoc.setFillColor(211, 211, 211);
              icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight, 'F');
              icsPDFdoc.setTextColor(0, 0, 0);
            }
            icsPDFdoc.text(oPdfCell.Text, (xPosition + nCellWidth), yPosition, null, oPdfCell.TextRotated);
          }
          else {
            if (oPdfCell.BackgroundColor == "Gray") {
              icsPDFdoc.setFillColor(211, 211, 211);
              icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight, 'F');
              icsPDFdoc.setTextColor(0, 0, 0);
            }
            icsPDFdoc.text(oPdfCell.Text, (xPosition + (icsPDFdoc.getFontSize()) / 2), yPosition, null, oPdfCell.TextRotated);
          }
        }
      }

      if (oPdfCell.IsTextOnly == false) {
        icsPDFdoc.setDrawColor(0, 0, 0);
        if (oPdfCell.Border === false) {
          icsPDFdoc.setDrawColor(255, 255, 255);
        }

        if (oPdfCell.BackgroundColor == "White") {
          icsPDFdoc.setTextColor(0, 0, 0);
          icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, nCellHeight);
        }


      }

      if (oPdfCell.Border == false) {
        icsPDFdoc.setDrawColor(0, 0, 0);
        if (oPdfCell.BorderWidthLeft > 0) {
          icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), oPdfCell.BorderWidthLeft, nCellHeight);
        }
        if (oPdfCell.BorderWidthRight > 0) {
          icsPDFdoc.rect(_xPosition + nCellWidth, (_yPosition + 2.0 + oPdfCell.MarginTop), oPdfCell.BorderWidthRight, nCellHeight);
        }
        if (oPdfCell.BorderWidthTop > 0) {
          icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop), nCellWidth, oPdfCell.BorderWidthTop);
        }
        if (oPdfCell.BorderWidthBottom > 0) {
          icsPDFdoc.rect(_xPosition, (_yPosition + 2.0 + oPdfCell.MarginTop) + nCellHeight, nCellWidth, oPdfCell.BorderWidthBottom);
        }

      }

    }
    _xPosition = _xPosition + nCellWidth;
  }
  _yPosition = _yPosition + parseFloat(nMinHeightInRows);
  var obj = {
    PosiionY: _yPosition,
    Doc: icsPDFdoc
  }
  return obj;
}


function icsCellWidth(oPdfTable: any, oPdfCell: any, nCellIndex: any) {
  var nCellWidth = 0.00;
  var nColSpanEnd = (nCellIndex + oPdfCell.ColSpan);
  for (var nIndex = nCellIndex; nIndex < nColSpanEnd; nIndex++) {
    nCellWidth = nCellWidth + parseFloat(oPdfTable.ColWidths[nIndex]);
  }
  return nCellWidth;
}
function icsCellHeight(oPdfTable: any, oPdfCell: any, nCellIndex: any, nRowIndex: any) {
  var nCellHeight = 0.00;
  var nRowSpanEnd = (nRowIndex + oPdfCell.RowSpan);
  for (var nIndex = nRowIndex; nIndex < nRowSpanEnd; nIndex++) {
    var oTPdfCell = icsPDFCell(oPdfTable.PdfRows[nIndex].PdfCells[nCellIndex]);
    nCellHeight = nCellHeight + parseFloat(oTPdfCell.FixedHeight);
  }
  return nCellHeight;
}
function ResizeWidth(oPdfTable: any, nWidth: any) {
  var nCurrentWidth = 0;
  for (var nRowIndex = 0; nRowIndex < oPdfTable.ColWidths.length; nRowIndex++) {
    nCurrentWidth += oPdfTable.ColWidths[nRowIndex];
  }
  if (nCurrentWidth != nWidth) {
    for (var nRowIndex = 0; nRowIndex < oPdfTable.ColWidths.length; nRowIndex++) {
      oPdfTable.ColWidths[nRowIndex] = (oPdfTable.ColWidths[nRowIndex] * nWidth) / nCurrentWidth;
    }
  }

  return oPdfTable;
}

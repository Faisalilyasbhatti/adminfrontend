import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import { ShellComponent } from '../shell/shell.component';
@Injectable()
export class ExcelService {

  constructor() {
  }

  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'customers': worksheet}, SheetNames: ['customers']};
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
}

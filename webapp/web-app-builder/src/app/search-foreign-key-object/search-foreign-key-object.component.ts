import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { FieldConfig } from "src/app/config/field-config";
import { DataService } from "src/app/services/data.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, MatDialog, MatSnackBar } from '@angular/material';
import { DataMap } from "../data/data-map";
import { ConfigService } from "../services/config.service";
import { TableConfig, TableColumn } from "../config/table-config";
import { SelectionModel } from "@angular/cdk/collections";
import { ViewDataComponent } from "../view-data/view-data.component";
import { FormConfig } from "../config/form-config";

@Component({
  selector: 'app-search-foreign-key-object',
  templateUrl: './search-foreign-key-object.component.html',
  styleUrls: ['./search-foreign-key-object.component.css'],
  providers: [DataService]
})
export class SearchForeignKeyObjectComponent implements OnInit {
  dataMapItems: DataMap<any>[] = [];
  formFields: FieldConfig[] = [];
  formConfig: FormConfig;
  foreignKeyInputField: FieldConfig;
  relatedForeignKeysFormFields: FieldConfig[] = [];
  tableConfig: TableConfig;
  loadingData: boolean = true;
  typeData: string;
  dialogTitle: string;
  searchForm: FormGroup;
  dataSource: MatTableDataSource<DataMap<any>>;
  selection: SelectionModel<DataMap<any>>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  filterValues: any = {};
  tableColumns: TableColumn[] = [];
  displayedColumns: Array<string>;
  viewDataFormFields: FieldConfig[];
  restServiceBaseUrl: string;

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private dataService: DataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public searchDialogRef: MatDialogRef<SearchForeignKeyObjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.foreignKeyInputField = data["field"];
    this.relatedForeignKeysFormFields = data["relatedFields"];
  }

  ngOnInit() {
    this.typeData = this.foreignKeyInputField.foreignKeyConfig.referencedTable;
    this.dialogTitle = "Select " + this.typeData.toLowerCase().replace(/[\_\-\\\/\*\+]+/gi, ' ');
    this.configService.getAppConfig()
      .subscribe((respConfig: any) => {
        this.formConfig = respConfig["formConfigDbObjects"][this.typeData];
        this.formFields = this.formConfig.formFieldsConfig;
        this.tableConfig = this.formConfig.dataTableConfig;
        this.restServiceBaseUrl = respConfig["restServiceBaseUrl"];
        this.tableConfig.crudActionsConfig = {
          "showCreateAction": false,
          "showReadAction": true,
          "showUpdateAction": false,
          "showDeleteAction": false
        };
        this.tableConfig.showSelectionActionColumn = true;
        if ((typeof this.formFields !== 'undefined')) {
          this.dataMapItems = [];
          this.getData();
        }
      });
    this.searchDialogRef.beforeClosed().subscribe(() => {
      if (this.selection.selected && this.selection.selected.length != 0) {
        this.relatedForeignKeysFormFields.forEach(field => {
          field.foreignKeyConfig.value = this.selection.selected[0].dataObject[field.foreignKeyConfig["referencedColumn"]];
          field.value = this.selection.selected[0].dataObject[field.foreignKeyConfig.columnToShow];
        });
      }
    });
  }

  getData() {
    this.loadingData = true;
    this.dataService.getData(this.restServiceBaseUrl + "/" + this.typeData)
      .subscribe((respData: DataMap<any>[]) => {
        this.dataMapItems = respData;
        this.fillOutDataTable();
      },
      error => {
        this.snackBar.open("Server error while reading data.", "X",);
      });
  }

  fillOutDataTable() {
    this.searchForm = this.fb.group({});
    this.dataSource = new MatTableDataSource<DataMap<any>>(this.dataMapItems);
    this.dataSource.sortingDataAccessor = (item, property) => {
      return item.dataObject[property];
    };
    this.tableColumns = [];
    this.filterValues = {};
    if (this.tableConfig.showSelectionActionColumn) {
      let multiSelect = false;
      if (this.tableConfig.selectionActionConfig) {
        multiSelect = this.tableConfig.selectionActionConfig.multiSelect;
      }
      this.selection = new SelectionModel<DataMap<any>>(multiSelect, []);
      this.tableColumns.push(
        { columnDef: 'cdSelectionActionMatColumn', header: '' }
      );
    }
    this.tableColumns.push(
      {
        columnDef: 'cdOrdinalNumberMatColumn', header: 'No.',
        cell: "",
        searchField: null
      }
    );
    this.formFields.forEach(element => {
      if (element.showInTable) {
        let searchColumnField = Object.assign({}, element);
        searchColumnField.validators = null;
        searchColumnField.readonly = false;
        searchColumnField.placeholder = "Search";
        searchColumnField.floatLabel = "never";
        searchColumnField.label = "Search";
        searchColumnField.value = "";
        searchColumnField.disabled = false;
        if (element.isForeignKey) {
          searchColumnField.name = searchColumnField.foreignKeyConfig.columnToShow;
          searchColumnField.type = "input";
          this.tableColumns.push(
            {
              columnDef: element.foreignKeyConfig.columnToShow, header: element.label,
              cell: (data: DataMap<any>) => `${data.dataObject[element.foreignKeyConfig.columnToShow]}`,
              searchField: searchColumnField
            }
          );
        } else {
          if (element.type === 'datetime') {
            searchColumnField.readonly = true;
            this.tableColumns.push(
              {
                columnDef: element.name, header: element.label,
                cell: (data: DataMap<any>) => (data.dataObject[element.name] != null) ? (new Date(data.dataObject[element.name])).toLocaleDateString("sr-RS") : "",
                searchField: searchColumnField
              }
            );
          } else if (element.type === 'checkbox') {
            searchColumnField.label = "";
            this.tableColumns.push(
              {
                columnDef: element.name, header: element.label,
                cell: (data: DataMap<any>) => data.dataObject[element.name],
                searchField: searchColumnField
              }
            );
          } else {
            if (element.type === 'radiobutton') {
              searchColumnField.label = "";
            }
            this.tableColumns.push(
              {
                columnDef: element.name, header: element.label,
                cell: (data: DataMap<any>) => `${data.dataObject[element.name]}`,
                searchField: searchColumnField
              }
            );
          }
        }
        let control = this.fb.control(
          searchColumnField.value
        );
        let searchColumnFieldName = element.isForeignKey ? element.foreignKeyConfig.columnToShow : element.name;
        control.valueChanges
          .subscribe((value) => {
            if (value != null) {
              this.filterValues[searchColumnFieldName] = value;
            } else {
              this.filterValues[searchColumnFieldName] = "";
            }
            this.dataSource.filter = JSON.stringify(this.filterValues);
          }
          );
        this.searchForm.addControl(searchColumnFieldName, control);
        this.filterValues[searchColumnFieldName] = "";
      }
    }
    );
    if (this.tableConfig.showCrudActionsColumn) {
      this.tableColumns.push(
        { columnDef: 'cdCrudActionsMatColumn', header: 'Actions' }
      );
    }
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = this.tableColumns.map(col => col.columnDef);
    this.dataSource.sort = this.sort;
    this.loadingData = false;
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      let searchFields = Object.keys(searchTerms);
      let validRow = true;
      for (let i = 0; i < searchFields.length; i++) {
        let value = data.dataObject[searchFields[i]];
        let searchValue = searchTerms[searchFields[i]];
        if ((value != null) && ((value.toString().toLowerCase().startsWith(searchValue.toString().toLowerCase())) !== true)) {
          validRow = false;
          break;
        }
      }
      return validRow;
    }
    return filterFunction;
  }

  get isEmptyTable() {
    return this.dataMapItems.length == 0;
  }

  get isDataSelected() {
    return this.selection.isEmpty();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: DataMap<any>) => this.selection.select(row));
  }

  viewDataDetails(element: DataMap<any>) {
    this.viewDataFormFields = this.formFields.map(x => ({ ...x }));
    this.viewDataFormFields.forEach(field => {
      if (field.isForeignKey) {
        field.disabled = true;
        field.foreignKeyConfig.showForeignKeyDetails = true;
        field.value = element.dataObject[field.foreignKeyConfig.columnToShow];
        field.foreignKeyConfig.value = element.dataObject[field.foreignKeyConfig["referencedColumn"]];
      }
      else {
        if (field.type === 'datetime') {
          field.disabled = true;
          field.value = new Date(element.dataObject[field.name]);
        }
        else {
          field.value = element.dataObject[field.name];
        }
      }
    });
    const dialogRef = this.dialog.open(ViewDataComponent, {
      data: {
        fields: this.viewDataFormFields,
        typeData: this.typeData
      }
    });
  }

  clearSearch() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.get(key).setValue("");
      this.filterValues[key] = "";
    });
  }

  onCancel() {
    this.searchDialogRef.close();
  }

}

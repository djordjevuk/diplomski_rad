import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ConfigService } from '../services/config.service';
import { MatTableDataSource, MatDialog, MatSnackBar, MatSort, MatPaginator } from '@angular/material';
import { DataService } from '../services/data.service';
import { FieldConfig } from '../config/field-config';
import { DataMap } from '../data/data-map';
import { DeleteDataComponent } from '../delete-data/delete-data.component';
import { ViewDataComponent } from '../view-data/view-data.component';
import { TableColumn, TableConfig } from '../config/table-config';
import { UpdateDataComponent } from '../update-data/update-data.component';
import { InsertDataComponent } from '../insert-data/insert-data.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { SelectionModel } from '@angular/cdk/collections';
import { FormConfig } from '../config/form-config';
import { TIME_OPTIONS } from '../form-elements/datetime/datetime.component';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {
  //show
  typeData: string;
  tableColumns: TableColumn[] = [];
  tableConfig: TableConfig;
  displayedColumns: Array<string>;
  dataMapItems: DataMap<any>[] = [];
  dataSource: MatTableDataSource<DataMap<any>>;
  selection: SelectionModel<DataMap<any>>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  formFields: FieldConfig[] = [];
  fieldAppearance: string;
  formConfig: FormConfig;
  primaryKeyFormFields: FieldConfig[] = [];
  searchForm: FormGroup;
  filterValues: any = {};
  loadingData: boolean = true;
  baseTitle: string = "";
  currentTitle: string = "";
  currentShowDataLabel = "";
  restServiceBaseUrl: string;
  navigateEnable: boolean = false;

  //view
  viewDataFormFields: FieldConfig[];

  //insert
  showInsertDataForm: boolean = false;
  hideInsertDataFormOnSave: boolean = true;
  insertDataFormFields: FieldConfig[] = [];
  @ViewChild(InsertDataComponent) insertDataComponent: InsertDataComponent;

  //update
  showUpdateDataForm: boolean = false;
  hideUpdateDataFormOnSave = true;
  updateDataFormFields: FieldConfig[];
  selectedDataForUpdate: DataMap<any>;
  @ViewChild(UpdateDataComponent) updateDataComponent: UpdateDataComponent;

  //delete
  selectedDeleteData: DataMap<any>;
  showDeleteDataForm: boolean = false;

  constructor(private configService: ConfigService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private titleService: Title) {
    router.events.subscribe((event) => {
      if (!this.navigateEnable) {
        this.detectedChangeInUrl(event);
      }
    });
  }

  ngOnInit() {
  }

  detectedChangeInUrl(event: any) {
    if (event instanceof NavigationEnd) {
      this.typeData = this.route.snapshot.paramMap.get('typeData');
      this.configService.getAppConfig()
        .subscribe((respConfig: any) => {
          let formConfigDbObjects = respConfig["formConfigDbObjects"];
          let exist: boolean = false;
          Object.keys(formConfigDbObjects).forEach(key => {
            if (key === this.typeData) {
              exist = true;
            }
          })
          if (exist) {
            this.formConfig = respConfig["formConfigDbObjects"][this.typeData];
            this.formFields = this.formConfig.formFieldsConfig;
            this.fieldAppearance = this.formConfig.formFieldAppearance;
            this.primaryKeyFormFields = [];
            this.tableConfig = this.formConfig.dataTableConfig;
            this.restServiceBaseUrl = respConfig["restServiceBaseUrl"];
            this.baseTitle = respConfig["title"];
            let menu: FieldConfig[] = respConfig["menu"];
            if (menu) {
              for (let i = 0; i < menu.length; i++) {
                if (menu[i].name === this.typeData) {
                  this.currentTitle = this.baseTitle + " - " + menu[i].label;
                  this.currentShowDataLabel = menu[i].label;
                  this.titleService.setTitle(this.currentTitle);
                  break;
                }
              }
            }
            if (this.showInsertDataForm) {
              this.completeInsert('cancelInsert');
            }
            if (this.showUpdateDataForm) {
              this.completeUpdate('cancelUpdate');
            }
            this.formFields.forEach(field => {
              if (field.isPrimaryKey) {
                this.primaryKeyFormFields.push(field);
              }
            });
            this.primaryKeyFormFields.sort((a, b) => a.primaryKeyPosition - b.primaryKeyPosition);
            this.dataMapItems = [];
            this.getData();
          }
          else {
            this.navigateEnable = true;
            this.router.navigate(['/page-not-found']);
          }
        });
    }
  }

  getData() {
    this.loadingData = true;
    this.dataService.getData(this.restServiceBaseUrl + "/" + this.typeData)
      .subscribe((respData: DataMap<any>[]) => {
        this.dataMapItems = respData;
        this.fillOutDataTable();
        this.showDeleteDataForm = false;
      },
        error => {
          this.snackBar.open("Server error while reading data.", "X",);
        });
  }

  fillOutDataTable() {
    if (!this.showInsertDataForm && !this.showUpdateDataForm && !this.showDeleteDataForm) {
      this.searchForm = this.fb.group({});
    }
    this.dataSource = new MatTableDataSource<DataMap<any>>(this.dataMapItems);
    this.dataSource.sortingDataAccessor = (item, property) => {
      return item.dataObject[property];
    };
    this.selection = new SelectionModel<DataMap<any>>(false, []);
    this.tableColumns = [];
    this.filterValues = {};
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
        searchColumnField.hint = "";
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
                cell: (data: DataMap<any>) => {
                  if (data.dataObject[element.name] != null) {
                    let date = new Date(data.dataObject[element.name]);
                    date.setHours(date.getUTCHours());
                    date.setMinutes(date.getUTCMinutes());
                    if (!element.datetimepickerType || element.datetimepickerType === 'both') {
                      return date.toLocaleDateString("sr-RS") + ' ' + date.toLocaleTimeString("sr-RS", TIME_OPTIONS);
                    } else if (element.datetimepickerType === 'timer') {
                      let todayDate = new Date();
                      date.setDate(todayDate.getDate());
                      date.setMonth(todayDate.getMonth());
                      date.setFullYear(todayDate.getFullYear());
                      return date.toLocaleTimeString("sr-RS", TIME_OPTIONS);
                    } else {
                      return date.toLocaleDateString("sr-RS");
                    }
                  } else {
                    return "";
                  }
                },
                searchField: searchColumnField
              }
            );
          } else if (element.type === 'checkbox') {
            searchColumnField.label = "";
            searchColumnField["labelPosition"] = "after";
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
        let searchColumnFieldName = element.isForeignKey ? element.foreignKeyConfig.columnToShow : element.name;
        if (!this.showInsertDataForm && !this.showUpdateDataForm && !this.showDeleteDataForm) {
          let control = this.fb.control(
            searchColumnField.value
          );
          control.valueChanges
            .subscribe((value) => {
              if (value != null && value !== "") {
                this.filterValues[searchColumnFieldName] = value;
              } else {
                this.filterValues[searchColumnFieldName] = "";
              }
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
            );
          this.searchForm.addControl(searchColumnFieldName, control);
        }
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

  insert() {
    this.insertDataFormFields = JSON.parse(JSON.stringify(this.formFields));
    this.insertDataFormFields.sort((a, b) => a.order - b.order);
    this.showInsertDataForm = true;
    this.hideInsertDataFormOnSave = false;
  }

  completeInsert(event: any) {
    this.hideInsertDataFormOnSave = true;
    this.titleService.setTitle(this.currentTitle);
    if (event === 'okInsert') {
      this.dataMapItems.push(this.insertDataComponent.insertedData);
      this.fillOutDataTable();
      this.showInsertDataForm = false;
      this.snackBar.open("You have successfully inserted the data!", "", {
        duration: 2000,
      });
    } else {
      if (event === 'wrongInsert') {
        this.showInsertDataForm = false;
        this.snackBar.open("Unsuccessfully data entry!", "", {
          duration: 2000,
        });
      }
      if (event === 'cancelInsert') {
        this.showInsertDataForm = false;
      }
    }
  }

  viewDataDetails(element: DataMap<any>) {
    this.viewDataFormFields = [];
    this.viewDataFormFields = JSON.parse(JSON.stringify(this.formFields));
    this.viewDataFormFields.forEach(field => {
      if (field.isForeignKey) {
        field.disabled = true;
        field.foreignKeyConfig.showForeignKeyDetails = true;
        field.value = element.dataObject[field.foreignKeyConfig.columnToShow];
        field.foreignKeyConfig["value"] = element.dataObject[field.name];
      }
      else {
        if (field.type === 'datetime') {
          field.disabled = true;
          if (element.dataObject[field.name] != null) {
            field.value = new Date(element.dataObject[field.name]);
          }
        }
        else {
          field.value = element.dataObject[field.name];
        }
      }
    });
    const dialogRef = this.dialog.open(ViewDataComponent, {
      width: '50%',
      data: {
        fields: this.viewDataFormFields,
        typeData: this.typeData
      }
    });
  }

  update(updateData: DataMap<any>) {
    this.selectedDataForUpdate = updateData;
    this.updateDataFormFields = JSON.parse(JSON.stringify(this.formFields));
    this.updateDataFormFields.sort((a, b) => a.order - b.order);
    this.updateDataFormFields.forEach(field => {
      if (field.type === 'datetime') {
        if (updateData.dataObject[field.name] != null) {
          field.value = new Date(updateData.dataObject[field.name]);
        }
      }
      else {
        if (field.isForeignKey) {
          field.value = updateData.dataObject[field.foreignKeyConfig.columnToShow];
          field.foreignKeyConfig["value"] = updateData.dataObject[field.name];
        } else {
          field.value = updateData.dataObject[field.name];
        }
      }
    });
    this.showUpdateDataForm = true;
    this.hideUpdateDataFormOnSave = false;
  }

  completeUpdate(event: any) {
    this.hideUpdateDataFormOnSave = true;
    this.titleService.setTitle(this.currentTitle);
    if (event === 'okUpdate') {
      for (let i = 0; i < this.dataMapItems.length; i++) {
        let flegFounded = true;
        for (let j = 0; j < this.primaryKeyFormFields.length; j++) {
          if (this.dataMapItems[i].dataObject[this.primaryKeyFormFields[j].name] !== this.selectedDataForUpdate.dataObject[this.primaryKeyFormFields[j].name]) {
            flegFounded = false;
            break;
          }
        }
        if (flegFounded) {
          this.dataMapItems[i] = JSON.parse(JSON.stringify(this.updateDataComponent.dataForUpdate));
          this.fillOutDataTable();
          this.showUpdateDataForm = false;
          this.snackBar.open("You have successfully updated the data!", "", {
            duration: 2000,
          });
          break;
        }
      }
    } else {
      if (event === 'wrongUpdate') {
        this.showUpdateDataForm = false;
        this.snackBar.open("Unsuccessfully update data!", "", {
          duration: 2000,
        });
      }
      if (event === 'cancelUpdate') {
        this.showUpdateDataForm = false;
      }
    }
  }

  deleteData(element: DataMap<any>) {
    this.selectedDeleteData = element;
    this.showDeleteDataForm = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataComponent, {
      width: '300px',
      data: { confirmDeleteData: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let arrayPrimaryKeys = "";
        for (let j = 0; j < this.primaryKeyFormFields.length; j++) {
          arrayPrimaryKeys += "/" + this.selectedDeleteData.dataObject[this.primaryKeyFormFields[j].name];
        }
        this.dataService.delete(this.restServiceBaseUrl + "/" + this.typeData + arrayPrimaryKeys)
          .subscribe(resp => {
            if (resp.status == 200) {
              this.dataMapItems = [];
              this.getData();
              this.snackBar.open("You have successfully delete the data!", "", {
                duration: 2000
              });
            } else {
              this.snackBar.open("Unsuccessfully delete the data!", "", {
                duration: 2000
              });
            }
          },
            error => {
              this.snackBar.open("Unsuccessfully delete the data!", "", {
                duration: 2000
              });
            });
      }
    });
  }

  clearSearch() {
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.get(key).setValue("");
      this.filterValues[key] = "";
    });
  }
}

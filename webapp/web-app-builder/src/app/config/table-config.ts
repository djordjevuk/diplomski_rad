import { FieldConfig } from "./field-config";

//column in the table
export interface TableColumn {
  columnDef: string;
  header: string;
  cell?: any;
  searchField?: FieldConfig;
}

//CRUD and selection columns in the table
export interface TableConfig {
  showCrudActionsColumn: boolean;
  crudActionsConfig?: {
    showCreateAction: boolean;
    showReadAction: boolean;
    showUpdateAction: boolean;
    showDeleteAction: boolean;
  }
  showSelectionActionColumn?: boolean;
  selectionActionConfig?: {
    multiSelect: boolean
  }
}
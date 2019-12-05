export interface ForeignKeyConfig{
    referencedTable: string;
    referencedColumn: string;
    columnToShow: string;
    value?: string;
    showForeignKeyDetails?: boolean;
}
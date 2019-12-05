//MODULES
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS } from 'ng-pick-datetime-moment';

//MY MODULES
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing/app-routing.module';

//COMPONENTS
import { AppComponent } from './app.component';

//MY COMPONENTS
import { ShowDataComponent } from './show-data/show-data.component';
import { InputComponent } from './form-elements/input/input.component';
import { InputForeignKeyComponent } from './form-elements/inputforeignkey/inputforeignkey.component';
import { SelectComponent } from './form-elements/select/select.component';
import { DatetimeComponent, LOCAL_FORMATS } from './form-elements/datetime/datetime.component';
import { RadiobuttonComponent } from './form-elements/radiobutton/radiobutton.component';
import { CheckboxComponent } from './form-elements/checkbox/checkbox.component';
import { TextareaComponent } from './form-elements/textarea/textarea.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { InsertDataComponent } from './insert-data/insert-data.component';
import { UpdateDataComponent } from './update-data/update-data.component';
import { DeleteDataComponent } from './delete-data/delete-data.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { HyperlinkComponent } from "./form-elements/hyperlink/hyperlink.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchForeignKeyObjectComponent } from './search-foreign-key-object/search-foreign-key-object.component';
import { HeaderComponent } from './navigation/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowDataComponent,
    InputComponent,
    InputForeignKeyComponent,
    SelectComponent,
    DatetimeComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    InsertDataComponent,
    UpdateDataComponent,
    DeleteDataComponent,
    ViewDataComponent,
    TextareaComponent,
    HyperlinkComponent,
    PageNotFoundComponent,
    SearchForeignKeyObjectComponent,
    HeaderComponent,
    LayoutComponent,
    SidenavListComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CustomMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule
  ],
  providers: [
    { provide: OWL_DATE_TIME_FORMATS, useValue: LOCAL_FORMATS },
    { provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    Title
  ],
  bootstrap: [AppComponent, FooterComponent],
  entryComponents: [
    InputComponent,
    InputForeignKeyComponent,
    SelectComponent,
    DatetimeComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    TextareaComponent,
    DeleteDataComponent,
    HyperlinkComponent,
    ViewDataComponent,
    SearchForeignKeyObjectComponent
  ]
})
export class AppModule {
}

import { Component } from '@angular/core';
import { ConfigService } from './services/config.service';
import { FieldConfig } from './config/field-config';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent {
  title = "";
  menu: FieldConfig[];
  sideMenu: FieldConfig[];

  constructor(private configService: ConfigService, private router: Router, private titleService: Title) {
    this.configService.getAppConfig()
      .subscribe((respConfig: any) => {
        this.menu = respConfig["menu"];
        this.menu.map(link => { link.type = "hyperlink"; link.inputType = "headerLink" });
        this.sideMenu = respConfig["menu"];
        this.sideMenu.map(link => { link.type = "hyperlink"; link.inputType = "sideLink" });
        this.title = respConfig["title"];
        this.titleService.setTitle(this.title);
        this.menu.sort((a, b) => a.order - b.order);
        if (this.router.url === '/') {
          this.router.navigate(['/show-data', this.menu[0].name]);
        }
      });
  }

}

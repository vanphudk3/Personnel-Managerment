import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import { cilCheckCircle } from '@coreui/icons';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {
  change: boolean = false;
  icons = { cilCheckCircle };
  constructor() {
    super();
  }
  ngOnInit(): void {
  }
  

  show() {
    this.change = true;
    console.log(this.change);
    setTimeout(() => {
      this.change = false;
    }, 3000);
  }
  
  hide() {
    this.change = false;
  }
  
}

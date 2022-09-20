import { NgModule } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";

const material = [
    MatMenuModule
];

@NgModule({
    
  imports: [material],
  exports: [material]
})
export class MaterialModule{}
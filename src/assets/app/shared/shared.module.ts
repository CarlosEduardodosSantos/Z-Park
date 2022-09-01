import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesPipe } from './pipes.pipe';



@NgModule({
  declarations: [
    PipesPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

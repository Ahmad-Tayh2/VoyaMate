import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  } 

  query : string = "";
  suggestions : any[] = [];
  selectedDate : any;
  status : string = "All";
  onDateChange(){}
  onSearch(){}
  onSelectSuggestion(s : any){}
  
}

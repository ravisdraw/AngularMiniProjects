import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css'],
})
export class AddCustomersComponent {
  @ViewChild('deleteLocal') deleteLocalElement!: ElementRef;

  newCustomer: string = '';
  buttonText: string = 'Add Customer';
  customerList: string[] = [];
  editIndex = null;

  ngOnInit() {
    const getCustomerList = localStorage.getItem('addCustomer');
    if (getCustomerList) {
      this.customerList = JSON.parse(getCustomerList);
    }
  }

  ngAfterViewInit() {
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (this.customerList.length === 0) {
      this.deleteLocalElement.nativeElement.disabled = true;
    } else {
      this.deleteLocalElement.nativeElement.disabled = false;
    }
  }

  addCustomer() {
    this.deleteLocalElement.nativeElement.disabled = true;
    if (this.editIndex !== null) {
      this.customerList.splice(this.editIndex, 1, this.newCustomer);
      this.buttonText = 'Add Customer';
      this.editIndex = null;
      this.newCustomer = '';
    } else {
      this.customerList.push(this.newCustomer);
      this.newCustomer = '';
      console.log(this.customerList);
    }
    //Store data array in Local storage
    localStorage.setItem('addCustomer', JSON.stringify(this.customerList));
    this.checkLocalStorage();
  }

  deleteCustomer(index: any) {
    this.customerList.splice(index, 1);
    localStorage.setItem('addCustomer', JSON.stringify(this.customerList));
    this.checkLocalStorage();
  }

  editCustomer(index: any) {
    this.buttonText = 'Edit Customer';
    this.newCustomer = this.customerList[index];
    this.editIndex = index;
  }

  deleteLoc() {
    const checkDelete = confirm(
      'It will Delete Entire Customer Data! Do you want to continue ?'
    );
    if (checkDelete) {
      localStorage.removeItem('addCustomer');
      this.customerList = [];
    }
    this.checkLocalStorage();
  }
}

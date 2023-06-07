import { Component } from '@angular/core';
import { CustomerDetailsService } from './service/customer-details.service';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css'],
})
export class SearchCustomersComponent {
  constructor(private customerDetailsService: CustomerDetailsService) {}

  customerList: any[] = [];
  searchItem: string = '';

  ngOnInit() {
    this.getLocalData();
    this.customerDetailsService.getCustomerDetails().subscribe(
      (data) => {
        this.customerList = data.data;
        localStorage.setItem(
          'CustomerOpenAPI',
          JSON.stringify(this.customerList)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getLocalData() {
    const locStorageCustomerList = localStorage.getItem('CustomerOpenAPI');
    if (locStorageCustomerList) {
      this.customerList = JSON.parse(locStorageCustomerList);
    }
  }

  searchCustomer() {
    if (this.searchItem.trim() === '') {
      return this.customerList;
    } else {
      return this.customerList.filter((item) => {
        return (
          item.first_name
            .toLowerCase()
            .includes(this.searchItem.toLowerCase()) ||
          item.last_name
            .toLowerCase()
            .includes(this.searchItem.toLowerCase()) ||
          item.email.toLowerCase().includes(this.searchItem.toLowerCase())
        );
      });
    }
  }
}

import { Component, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CanActivate } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { User } from 'src/models/user';
import { ProductsService } from '../../shared/products.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileFormConfig: FormlyFieldConfig[];
  profileForm = new FormGroup({});
  profileFormModel: any = {};
  profileDetail: User;
  profileData: any;
  pending: boolean = false;
  tabIndex: number;
  constructor(private productSrv: ProductsService) {}
  ngOnInit(): void {
    this.profileForminitForm();
    this.getPersonalInformation();
  }
  getPersonalInformation() {
    this.productSrv
      .getPersonal(localStorage.getItem('user_id'))
      .subscribe((data: any) => {
        this.pending = true;
        this.profileDetail =  new User(data.data[0].user[0]);
        this.profileData = [
          { filedLabel: 'name', fieldData: this.profileDetail.user_nickname },
          { filedLabel: 'Email', fieldData: this.profileDetail.user_email },
          { filedLabel: 'Gender', fieldData: this.profileDetail.gender_name  },
          { filedLabel: 'Role', fieldData: this.profileDetail.user_roleid == 2 ? 'Customer' : 'Admin' },
        ];
      });
  }
  goToEdit() {
    this.tabIndex = 1;
  }
  getTabIndex(event) {
    this.tabIndex = event;
  }
  profileForminitForm() {
    this.profileFormConfig = [
      {
        fieldGroupClassName: 'flex-container',
        fieldGroup: [
          {
            className: 'flex-100 padding-10',
            key: 'user_email',
            type: 'input',
            templateOptions: {
              pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$',
              type: 'email',
              label: 'Email',
              Placeholder: 'Ex@Example.com',
              required: true,
            },
            validation: {
              messages: {
                pattern: (error, field: FormlyFieldConfig) => `Email invalid`,
              },
            },
          },
          {
            className: 'flex-100 padding-10',
            key: 'password',
            type: 'input',

            templateOptions: {
              minLength: 8,

              type: 'password',
              label: 'Password',
              Placeholder: 'Password',
              required: true,
            },
          },
          {
            className: 'flex-100 padding-10',
            key: 'user_nickname',
            type: 'input',

            templateOptions: {
              label: 'name',
              Placeholder: 'Password',
              required: true,
            },
          },
          {
            className: 'flex-100 padding-10',
            key: 'user_gender',
            type: 'radio',
            templateOptions: {
              type: 'radio',
              label: 'Gender',
              required: true,
              name: 'gender',
              options: [
                { value: 'Male', key: '1' },
                { value: 'Female', key: '2' },
                { value: 'Other', key: '3' },
              ],
            },
          },
        ],
      },
    ];
  }
}

import {Component, ElementRef, OnInit, ViewChild, ɵConsole} from '@angular/core';
import {APIService} from '../api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrls: ['./voucher-list.component.css']
})
export class VoucherListComponent implements OnInit {

  private voucher: object = {};
  private voucher_list: Array<object> = [];
  selectedFile: File;
  filesToUpload: Array<File> = [];

  @ViewChild('avatar') avatar: ElementRef;


  constructor(private apiService: APIService) {}

  ngOnInit() {
    this.getVoucher();
  }

  public getVoucher() {
    this.apiService.getVoucherList().subscribe((data: object) => {
      console.log(data);
      this.voucher = data;
      // console.log(this.voucher);
      // console.log('API response status: ' + this.voucher.success);
      // console.log('API response message: ' + this.voucher.result.msg);
      // console.log('Voucher API count: ' + this.voucher.result.data.vouchers.length);
      // this.voucher_list = this.voucher.result.data.vouchers;
    }, error => {
      console.error('Error faching voucher');
      return Observable.throw(error);
    });
  }
  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    // console.log(event.target.files);
    console.log(event.target);
    console.log(event.target.files[0]);
    console.log(event.target.files[0].name);
  }

  onUpload() {
    // upload code goes here
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    this.apiService.uploadImage(uploadData).subscribe((data: object) => {
      console.log(data);
    }, error => {
      console.error('Error uploading Image');
    });
  }

  onSubmit() {
    console.log('hit success');
    const formData = new FormData();
    formData.append('image',
      this.selectedFile,
      this.selectedFile.name);
    const abc: object = {'image': this.selectedFile};
    this.apiService.uploadImage(abc).subscribe((data: object) => {
      console.log(data);
    }, error => {
      console.error('Error uploading Image');
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log('file', this.filesToUpload);
    // this.product.photo = fileInput.target.files[0]['name'];
  }
  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append('image', files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());


    this.apiService.uploadImage(formData).subscribe((data: object) => {
      console.log(data);
    }, error => {
      console.error('Error uploading Image');
    });
  }
}

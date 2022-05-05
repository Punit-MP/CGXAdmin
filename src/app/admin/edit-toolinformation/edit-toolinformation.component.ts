import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-toolinformation',
  templateUrl: './edit-toolinformation.component.html',
  styleUrls: ['./edit-toolinformation.component.css']
})
export class EditToolinformationComponent implements OnInit {
  currentUser: any;
  submitted = false;
  tool: any;
  editToolform: FormGroup;
  imageSrc: any;
  imageSrc2: any;
  imageSrc3: any;
  selectedPdfFile = null;
  selectedFile = null;
  selectedFile2 = null;
  selectedFile3 = null;
  toolName: any;
  description: any = '';
  imageFlag = false;
  imageFlag2 = false;
  imageFlag3 = false;
  // tslint:disable-next-line:variable-name
  edit_id: any;
  config = {
    // extraPlugins: "autogrow",
    // resize_enabled: false,
    // autoGrow_maxHeight: 200,
    // autoGrow_maxWidth: 200,
    // removePlugins: "resize"
  };
  @ViewChild('PdffileInput') pdfFileUploader: ElementRef;
  @ViewChild('fileInput') fileUploader: ElementRef;
  @ViewChild('fileInput2') fileUploader2: ElementRef;
  @ViewChild('fileInput3') fileUploader3: ElementRef;
  constructor(private activatedRoute: ActivatedRoute, public cgxService: CgxService, private router: Router,
              private messageService: MessageService, private authService: AuthService, formBuilder: FormBuilder) {

    this.editToolform = formBuilder.group({

      toolName: ['', Validators.required],
      version: ['', Validators.required],
      creator: ['', Validators.required],
      device: ['', Validators.required],
      term: ['', Validators.required],
      subscription: ['', Validators.required],
      format: ['', Validators.required],
      clearance: ['', Validators.required],
      cost: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|)')],
      place_image_1: [''],
      place_image_2: [''],
      place_image_3: [''],
      pdf: [''],
    });

  }

  ngOnInit(): void {
    this.edit_id = this.activatedRoute.snapshot.params.id;
    this.currentUser = localStorage.getItem('user');
    this.adminToolsDetails(this.edit_id);
    /*this.imageSrc = this.tool.image1;
    console.log(this.tool);*/
  }
  adminToolsDetails(id) {
    this.cgxService.admintoolDetails(id).subscribe(res => {

      this.tool = res.result;
      if (this.tool.url == 'null') {
        this.tool.url = '';
      }
      // console.log(this.tool.image1);
      this.toolName = this.tool.tool_name;
      this.imageSrc = this.tool.image1;
      this.imageSrc2 = this.tool.image2;
      this.imageSrc3 = this.tool.image3;
    });

  }
  get toolform() {
    return this.editToolform.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.editToolform.invalid) {
      console.log('m invalid');
      return;
    }

    const payload = new FormData();
    payload.append('id', this.edit_id);
    payload.append('tool_name', this.toolform.toolName.value);
    payload.append('description_name', this.toolform.device.value);
    payload.append('short_description', this.toolform.version.value);
    const file = new Blob([this.toolform.description.value], { type: 'text/plain' });
    payload.append('long_description', file);
    payload.append('format', this.toolform.format.value);
    payload.append('clearance', this.toolform.clearance.value);
    payload.append('version', this.toolform.version.value);
    payload.append('price', this.toolform.cost.value);
    payload.append('term', this.toolform.term.value);
    payload.append('url', this.toolform.url.value);
    payload.append('subscription', this.toolform.subscription.value);
    payload.append('creator', this.toolform.creator.value);
    if (this.selectedPdfFile && this.selectedPdfFile.name) {
      payload.append('pdf', this.selectedPdfFile, this.selectedPdfFile.name);
    } else {
      payload.append('pdf', '');
    }
    if (this.selectedFile) {
      payload.append('place_image_first', this.selectedFile, this.selectedFile.name);
    } else {
      payload.append('place_image_first', '');
    }
    if (this.selectedFile2) {
      payload.append('place_image_second', this.selectedFile2, this.selectedFile2.name);
    } else {
      payload.append('place_image_second', '');
    }
    if (this.selectedFile3) {
      payload.append('place_image_third', this.selectedFile3, this.selectedFile3.name);
    } else {
      payload.append('place_image_third', '');
    }
    if (!this.selectedFile && this.imageFlag == true) {
      payload.append('image_flag1', 'true');
    }
    if (!this.selectedFile2 && this.imageFlag2 == true) {
      payload.append('image_flag2', 'true');
    }
    if (!this.selectedFile3 && this.imageFlag3 == true) {
      payload.append('image_flag3', 'true');
    }
    // console.log(payload);
    this.cgxService.adminUpdateTool(payload).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 200) {
        this.router.navigate(['/admin/crunchboxtools']);
      }
      else {
        this.messageService.add({ detail: 'Something went wrong' });
      }
      // this.signout();*/
    }, () => {
      this.messageService.add({ detail: 'Something went wrong' });
    });

  }

  onPdfFileChange(event) {
    this.selectedPdfFile = event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      reader.readAsDataURL(this.selectedPdfFile);
    }
  }

  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      // console.log(file);
      // this.addToolform.patchValue({
      // fileSource: file
      // });
      // console.log(fileSource);
      reader.readAsDataURL(this.selectedFile);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
        // console.log('img'+this.imageSrc);
        /*this.addToolform.patchValue({
          fileSource: reader.result
        });*/
      };


    }
  }

  onFileChange2(event) {
    this.selectedFile2 = event.target.files[0];
    // console.log(this.selectedFile);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      // console.log(file);
      // this.addToolform.patchValue({
      // fileSource: file
      // });
      // console.log(fileSource);
      reader.readAsDataURL(this.selectedFile2);

      reader.onload = () => {

        this.imageSrc2 = reader.result as string;
        // console.log('img'+this.imageSrc);
        /*this.addToolform.patchValue({
          fileSource: reader.result
        });*/
      };


    }
  }

  onFileChange3(event) {
    this.selectedFile3 = event.target.files[0];
    // console.log(this.selectedFile);
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      // console.log(file);
      // this.addToolform.patchValue({
      // fileSource: file
      // });
      // console.log(fileSource);
      reader.readAsDataURL(this.selectedFile3);

      reader.onload = () => {

        this.imageSrc3 = reader.result as string;
        // console.log('img'+this.imageSrc);
        /*this.addToolform.patchValue({
          fileSource: reader.result
        });*/
      };


    }
  }
  resetform() {
    this.editToolform.reset();
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/admin']);
  }
  removeImage() {
    this.selectedFile = null;
    this.imageSrc = null;
    this.fileUploader.nativeElement.value = null;
    this.imageFlag = true;
  }
  removeImage2() {
    this.selectedFile2 = null;
    this.imageSrc2 = null;
    this.fileUploader2.nativeElement.value = null;
    this.imageFlag2 = true;
  }
  removeImage3() {
    this.selectedFile3 = null;
    this.imageSrc3 = null;
    this.fileUploader3.nativeElement.value = null;
    this.imageFlag3 = true;
  }
}

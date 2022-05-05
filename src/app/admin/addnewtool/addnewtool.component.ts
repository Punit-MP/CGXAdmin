import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CgxService } from '../../services/cgx.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-addnewtool',
  templateUrl: './addnewtool.component.html',
  styleUrls: ['./addnewtool.component.css']
})
export class AddnewtoolComponent implements OnInit {
  constructor(public cgxService: CgxService, private router: Router,
              private messageService: MessageService, private authService: AuthService, formBuilder: FormBuilder) {
    this.addToolform = formBuilder.group({

      toolName: ['', Validators.required],
      version: ['', Validators.required],
      creator: ['', Validators.required],
      device: ['', Validators.required],
      term: ['', Validators.required],
      subscription: ['', Validators.required],
      format: ['', Validators.required],
      clearance: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(2000), Validators.pattern('^[0-9]*$')]],
      description: ['', Validators.required],
      url: ['', Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|)')],
      place_image_1: [''],
      place_image_2: [''],
      place_image_3: [''],
      pdf: [''],
    });

  }
  get tool() {
    return this.addToolform.controls;
  }
  currentUser: any;
  submitted = false;
  addToolform: FormGroup;
  // tslint:disable-next-line:variable-name
  place_image: File;
  resData: any;
  selectedFile = null;
  selectedPdfFile = null;
  selectedFile2 = null;
  selectedFile3 = null;
  imageFlag = false;
  imageFlag2 = false;
  imageFlag3 = false;
  toolName: any = '';
  crunchtools: any = [];
  @ViewChild('PdffileInput') pdfFileUploader: ElementRef;
  @ViewChild('fileInput') fileUploader: ElementRef;
  @ViewChild('fileInput2') fileUploader2: ElementRef;
  @ViewChild('fileInput3') fileUploader3: ElementRef;
  imageSrc: any;
  imageSrc2: any;
  imageSrc3: any;
  mycontent: string;
  description: string;
  config = {
    // extraPlugins: "autogrow",
    // resize_enabled: false,
    // autoGrow_maxHeight: 200,
    // autoGrow_maxWidth: 200,
    // removePlugins: "resize"
  };
  ngOnInit(): void {
    this.currentUser = localStorage.getItem('user');
    this.cgxService.getTools().subscribe(res => {
      this.crunchtools = res.result;
    });
  }
  onSubmit() {
    // debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.addToolform.invalid) {
      console.log('m invalid');
      this.messageService.add({ key: 'invalidToolList', detail: 'Please enter valid details' });
      return;
    }
    /*  const data = {
     tool_name: this.tool.toolName.value,
     description_name: this.tool.device.value,
     short_description: this.tool.version.value,
     long_description: this.tool.description.value,
     format: this.tool.format.value,
     clearance: this.tool.clearance.value,
     version: this.tool.version.value,
     subscription: this.tool.term.value,
     price: this.tool.cost.value,
   //  place_image_first : [],
   }*/
    for (let i = 0; i < this.crunchtools?.length; i++) {
      if (this.crunchtools[i].description_name === this.toolName) {
        this.messageService.add({ key: 'invalidToolList', detail: 'This Tool already exist. Please enter new tool.' });
        return;
      }
    }
    this.description = this.tool.description.value;
    // console.log('value', this.tool.description.value);
    const payload = new FormData();
    payload.append('tool_name', this.tool.toolName.value);
    payload.append('description_name', this.tool.device.value);
    payload.append('short_description', this.tool.version.value);
    const file = new Blob([this.tool.description.value], {type: 'text/plain'});
    payload.append('long_description', file);
    payload.append('format', this.tool.format.value);
    payload.append('clearance', this.tool.clearance.value);
    payload.append('version', this.tool.version.value);
    payload.append('price', this.tool.cost.value);
    payload.append('subscription', this.tool.subscription.value);
    payload.append('url', this.tool.url.value);
    payload.append('creator', this.tool.creator.value);
    payload.append('term', this.tool.term.value);
    if (this.selectedPdfFile && this.selectedPdfFile.name) {
      payload.append('pdf', this.selectedPdfFile, this.selectedPdfFile.name);
    } else {
      payload.append('pdf', '');
    }
    // payload.append('place_image_first', this.selectedFile, this.selectedFile.name);
    // payload.append('place_image_second', this.selectedFile2, this.selectedFile2.name);
    // payload.append('place_image_third', this.selectedFile3, this.selectedFile3.name);
    if (this.selectedFile && this.selectedFile.name) {
      payload.append('place_image_first', this.selectedFile, this.selectedFile.name);
    } else {
      payload.append('place_image_first', '');
    }
    if (this.selectedFile2 && this.selectedFile2.name) {
      payload.append('place_image_second', this.selectedFile2, this.selectedFile2.name);
    } else {
      payload.append('place_image_first', '');
    }
    if (this.selectedFile3 && this.selectedFile3.name) {
      payload.append('place_image_third', this.selectedFile3, this.selectedFile3.name);
    } else {
      payload.append('place_image_first', '');
    }
    /* payload.append('place_image_first', this.selectedFile, this.selectedFile.name);
       const formData = new FormData();
        formData.append('file', this.addToolform.get('fileSource').value);
       console.log(formData);*/
    this.cgxService.adminAddTool(payload).subscribe((response: any) => {
      // console.log(response);
      if (response.status == 200) {
        this.messageService.add({detail: 'Tool added successfully' });
        this.router.navigate(['/admin/crunchboxtools']);
      }
      else {
        this.messageService.add({ key: 'invalidToolList', detail: 'Something went wrong' });
      }
      // this.signout();*/
    }, err => {
      this.messageService.add({ key: 'invalidToolList', detail: 'Something went wrong' });
    });
  }
  /*imgUrl:any = [];
imageFile:any;
multiImg:string[] = [];
onFileChange(event)  {
for (var i = 0; i < event.target.files.length; i++) {
 if (this.multiImg.length <= 4) {
   this.multiImg.push(event.target.files[i]);
   // this.rmoveImg(i);
   const fileData = <File>event.target.files[i]
   const reader = new FileReader();
   reader.readAsDataURL(fileData);
   reader.onload = () => {
     if(this.imgUrl.length <= 2){
       this.imgUrl.push(reader.result as string);
       // this.rmoveImg(i)
     }else if(this.imgUrl.length>2){
       alert('max 3 img uploaded')
     }
     };
   console.log(reader,'yyy')
   console.log('zzz', this.multiImg);
 } else if (this.multiImg.length > 4) {
   alert('max 3 images uploaded')
 }
 console.log('fileUplo',this.imgUrl);
}

}*/
  /*rmoveImg(i,id){
    console.log(id)
    // this.imgUrl.splice(i,1);
    this.imgUrl.splice(i,1);
    console.log(i);
    this.CountService.deleteFileData(id,ApiUrl.deleteFile, true).subscribe((deleteFile)=>{
      console.log(deleteFile);
    })
  }*/
  // @ViewChild('fileInput') el: ElementRef;
  onPdfFileChange(event) {
    this.selectedPdfFile = event.target.files[0];
    const ext = this.selectedPdfFile.name.split('.').pop();
    if (ext == 'pdf' || ext == 'PDF') {
      // console.log('suc', ext);
    } else {
      this.addToolform.get('pdf').reset();
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: 'Add only PDF file' });
    }
    const reader = new FileReader();
    if (event.target.files && event.target.files?.length) {
      reader.readAsDataURL(this.selectedPdfFile);
    }
  }
  onFileChange(event) {
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    const reader = new FileReader();

    if (event.target.files && event.target.files?.length) {
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
        if (this.imageSrc) {
          this.imageFlag = true;
        }
      };


    }
  }
  onFileChange2(event) {
    this.selectedFile2 = event.target.files[0];
    // console.log(this.selectedFile);
    const reader = new FileReader();

    if (event.target.files && event.target.files?.length) {
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
        if (this.imageSrc2) {
          this.imageFlag2 = true;
        }
      };


    }
  }
  onFileChange3(event) {
    this.selectedFile3 = event.target.files[0];
    // console.log(this.selectedFile);
    const reader = new FileReader();

    if (event.target.files && event.target.files?.length) {
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
        if (this.imageSrc3) {
          this.imageFlag3 = true;
        }
      };


    }
  }
  resetform() {
    this.addToolform.reset();
  }
  signout() {
    this.authService.signout();
    this.router.navigate(['/admin']);
  }

  removeImage() {
    this.selectedFile = null;
    this.imageSrc = null;
    this.fileUploader.nativeElement.value = null;
    this.imageFlag = false;
  }
  removeImage2() {
    this.selectedFile2 = null;
    this.imageSrc2 = null;
    this.fileUploader2.nativeElement.value = null;
    this.imageFlag2 = false;
  }
  removeImage3() {
    this.selectedFile3 = null;
    this.imageSrc3 = null;
    this.fileUploader3.nativeElement.value = null;
    this.imageFlag3 = false;
  }
}

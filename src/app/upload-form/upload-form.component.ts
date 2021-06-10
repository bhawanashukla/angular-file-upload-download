import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient,HttpHeaders  } from "@angular/common/http";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFiles: boolean = false;
  private fileName='';
  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private http: HttpClient) {

    this.uploadForm = this.fb.group({
      userfile: ['', Validators.required],
      fileName: ['']
    });

  }
  ngOnInit() {}

  onFileChange(event:any) {
    const reader = new FileReader();
    this.spinner.show();

   if (event.target.files && event.target.files.length) {
     this.fileName = event.target.files[0].name;
    const [file] = event.target.files;
     reader.readAsDataURL(file);
     
     reader.onload = () => {
      this.spinner.hide();
       this.uploadForm.patchValue({
        userfile: reader.result,
        fileName: this.fileName
       });
     };
   }
  }

  upload() {
    this.spinner.show();
    let jsonStr = {name: this.uploadForm.value.fileName, content: this.uploadForm.value.userfile}
    this.http.put('http://localhost:3000/api/upload', jsonStr).subscribe((res:any)=>{
      this.spinner.hide();
      console.log(res);
      alert(res.msg);
    },(err:any)=>{console.log(err);alert(err.msg);this.spinner.hide();})
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient, } from "@angular/common/http";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFiles: boolean = false;

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
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.uploadForm.patchValue({
          userfile: reader.result
       });
      };
    }
  }

  upload() {
    this.spinner.show();
    this.http.post('/api/upload', this.uploadForm.value).subscribe((res:any)=>{
      this.spinner.hide();
      console.log(res);
      alert(res.msg);
    },(err:any)=>{alert(err.msg)})
  }
}

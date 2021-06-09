import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  uploadForm: FormGroup;
  selectedFiles: boolean = false;

  constructor(private fb: FormBuilder,
    private spinner: NgxSpinnerService) {

    this.uploadForm = this.fb.group({
      userfile: ['', Validators.required],
      fileName: ['']
    });

  }
  ngOnInit() {
    console.log(this.uploadForm.controls.userfile)
  }

  get userfile() {
    return this.uploadForm.get('userfile');
  }

  upload(event: any) {
    this.spinner.show();
    const reader = new FileReader();
    console.log('upload')
    if (event.target.files && event.target.files.length) {
      let fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      console.log(event.target.files)
      reader.onload = () => {
        console.log(reader.result)
        this.uploadForm.patchValue({
          userfile: reader.result,
          fileName: fileName
        });
      };
    }
  }
}

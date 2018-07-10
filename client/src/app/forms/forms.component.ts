import { Component, OnInit, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';

import 'rxjs/add/operator/map';
import { User } from '../shared/user';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnInit {

  constructor(@Inject('Window') window: Window, public http: Http) { 
    (<any>window).page = 3
  }

	model = new User();

	submitted = false;
	
	files : object;

	onSubmit() { this.submitted = true; console.log('onsubmittttt::');}

  downloadTable(event){
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });

    //nao esta funcionando!
    this.http.get('/service/extable', options)
    .subscribe(
      data => console.log('success'),
      error => console.log(error)
    )
  }

  fileChange(event) {
    this.files = event.target.files;
  }

  enviarDados(event){

    if(this.model.name != null && this.model.email != null && this.files !=undefined){
      let file: File = this.files[0]

      let formData:FormData = new FormData();
          formData.append('nome', this.model.name)
          formData.append('email', this.model.email)
          formData.append('uploadFile', file, file.name)
          formData.append('date', new Date().toLocaleString("pt-BR"));

      let headers = new Headers();

      let options = new RequestOptions({ headers: headers });

      this.http.post('/service/upload', formData, options)
        .map(res => res.json())
        .subscribe(
          data => console.log('success'),
          error => alert('Ocorreu um erro na requisiçao!')
        )

      alert(this.model.name+' você receberá um e-mail com os dados!!!')
      window.location.reload(true);
      
    }else{
      alert(' Dados inválidos, repita a operação')
      window.location.reload(true);
    }
  }

  ngOnInit() {
  	
  }

}

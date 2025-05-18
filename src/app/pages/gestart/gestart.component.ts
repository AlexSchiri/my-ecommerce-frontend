import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';

import { ApiMsg } from 'src/app/models/ApiMsg';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent implements OnInit {

  title : string = "";
  isModifica : boolean = false;
  imageShow: any= '';
  file: any = '';

  CodArt: string = '';
  articolo: IArticoli = {
    codArt: '',
    descrizione: '',
    um: '-1',
    codStat: '',
    pzCart: 0,
    pesoNetto: 0,
    prezzo: 0,
    idStatoArt: '1',
    desStatoArt: '',
    dataCreazione: new Date(),
    imageUrl: '',
    idIva: -1,
    idFamAss: -1,
    categoria: '',
    ean: []
  };

  Iva: IIva[] = [];
  Cat: ICat[] = [];

  ean: string = "";

  apiMsg!: ApiMsg;

  Conferma: string = '';
  Errore: string = '';

  constructor(private route: ActivatedRoute, private articoliService: ArticoliService,
    private router: Router) { }

  ngOnInit(): void {

    this.CodArt =  this.route.snapshot.params['codart'];

    if (this.CodArt) {
      console.log("Selezionato articolo " + this.CodArt);

      this.title = "Modifica Articolo";
      this.isModifica = true;

      this.articoliService.getArticoliByCode(this.CodArt).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    }
    else {
      this.title = "Creazione Articolo";
      this.isModifica = false;
    }

    this.articoliService.getIva().subscribe(
      response => {
        this.Iva = response;
        console.log(response);
      }
    )

    this.articoliService.getCat().subscribe(
      response => {

        this.Cat = response;
        console.log(response);
      }
    )

  }

  handleResponse(response : any) {
    this.articolo = response;

    this.ean = (this.articolo.ean) ? this.articolo.ean[0].barcode : "";

    console.log(this.articolo);
  }

  handleError(error: any) {
    console.log(error);
  }

  salva = () => {
    console.log(this.articolo);

    this.Errore = "";
    this.Conferma = "";

    if (this.isModifica) {
      //modifico l'immagine sono se inserita
      if (this.imageShow != '' && this.imageShow != null)
      {
        this.articolo.imageUrl = this.imageShow;
      }
      
      this.articoliService.updArticolo(this.articolo).subscribe({
        next: (response) => {
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
        },
        error: (error) => {
          console.log(error);
          this.apiMsg = error.error;
          this.Errore = this.apiMsg.message;
        }
      });
    }
    else {
      this.articolo.imageUrl = this.imageShow;
      this.articoliService.insArticolo(this.articolo).subscribe({
        next: (response) => {
          this.apiMsg = response;
          this.Conferma = this.apiMsg.message;
        },
        error: (error) => {
          console.log(error);
          this.apiMsg = error.error;
          this.Errore = this.apiMsg.message;
        }
      });
    }
  }

  abort = () => {

    if (this.isModifica)
      this.router.navigate(['articoli'], {queryParams: {filter : this.CodArt}});
    else
      this.router.navigate(['articoli']);

  }


handleFileInput(event:any) {
    this.file = event.target.files[0]
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
    this.imageShow = (<FileReader>event.target).result;
  }
}
}

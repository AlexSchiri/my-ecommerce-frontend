import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';

import { ApiMsg } from 'src/app/models/ApiMsg';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticoliService {

  server : string = "localhost";
  port : string = "5000";

  constructor(private httpClient : HttpClient) { }

  getArticoliByDesc = (descrizione : string) => {

    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`) //ALT + 0096 | ALT GR + '
    .pipe(
      map(response => {
        response.forEach(item => item.desStatoArt = this.getDesStatoArt(item.idStatoArt))
        return response;
      })
    )
  }

  getDesStatoArt = (idStato: string) : string => {

    if (idStato === '1')
      return 'Attivo'
    else if (idStato === '2')
      return 'Sospeso'
    else
      return 'Eliminato'
  }

  getArticoliByCode = (codart: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/codice/${codart}`)
    .pipe(
      map(response => {
        response.desStatoArt = this.getDesStatoArt(response.idStatoArt)
        return response;
      })
    );
  }

  getArticoliByEan = (barcode: string) => {
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/barcode/${barcode}`)
    .pipe(
      map(response => {
        response.desStatoArt = this.getDesStatoArt(response.idStatoArt)
        return response;
      })
    );
  }

getAllArticoli = () => {
    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/all`) //ALT + 0096 | ALT GR + '
    .pipe(
      map(response => {
        response.forEach(item => item.desStatoArt = this.getDesStatoArt(item.idStatoArt))
        return response;
      })
    )
  }

  delArticoloByCodArt = (codart: string) =>
    this.httpClient.delete(`http://${this.server}:${this.port}/api/articoli/elimina/${codart}`);

  getIva = () => this.httpClient.get<IIva[]>(`http://${this.server}:${this.port}/api/iva`);

  getCat = () => this.httpClient.get<ICat[]>(`http://${this.server}:${this.port}/api/cat`);

  updArticolo = (articolo: IArticoli) =>
      this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/modifica`, articolo);

  insArticolo = (articolo: IArticoli) =>
      this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/inserisci`, articolo);

}

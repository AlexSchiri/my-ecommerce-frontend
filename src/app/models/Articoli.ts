export interface IArticoli {
  codArt: string
  descrizione: string
  um: string
  codStat: string
  pzCart: number
  pesoNetto: number
  prezzo: number
  idStatoArt: string
  desStatoArt: string
  dataCreazione: Date
  imageUrl: string
  idFamAss: number  //categoria
  categoria: string
  idIva: number
  ean: IBarcode[]
}

export interface IIva {

  idIva: number,
  descrizione: string,
  aliquota: number

}

export interface ICat {
  id: number,
  descrizione: string
}

export interface IBarcode {
  barcode: string,
  idTipoArt: string
}

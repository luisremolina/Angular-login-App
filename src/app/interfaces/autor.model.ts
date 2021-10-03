import { Genero } from "../componentes/autores/autor-dialog/autor-dialog.component";

export interface Autor {
  _id?: number;
  nombreCompleto: string;
  nacionalidad: string;
  descripcion: string;
  ocupacion: string;
  imgFoto: string;
  obrasDestacadas: string;
  genero: Genero [];
}

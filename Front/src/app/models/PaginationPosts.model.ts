import { Publication } from './Publication.model';
//Créez un model adapté pour le ALL POSTS avec l'apparition dans publications
export class Pagination {
  constructor(
    public publications: [],
    public currentPage: number,
    public totalItems: number,
    public totalPages: number
  ) { }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../Model/Categoria';
import { Produto } from '../Model/Produto';
import { AlertasService } from '../service/alertas.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  key ='data';
  reverse = true;
  
  pesquisa: boolean = true;
  categoria: Categoria = new Categoria();
  listaCategorias: Categoria[];
  idCategoria: number;
  nomeCategoria: string;

  produto: Produto = new Produto();
  listaProdutos: Produto[];
  nomeProduto: string;
  
  constructor(
    private produtoService: ProdutosService,
    private categoriaService: CategoriaService,
    private alert: AlertasService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.findAllProdutos()
    this.findAllCategorias()
  }

  findAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
      console.log("lista de produtos "+JSON.stringify(this.listaProdutos))
    })
  }

  findAllCategorias() {
    this.categoriaService.getAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp
    })
  }

  findByIdCategoria() {
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) => {
      this.categoria =resp;
    })
  }

  findByNomeProduto() {
    if( this.nomeProduto === '') {
      this.findAllProdutos()
    } else {
      this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[]) => {
        this.listaProdutos = resp;
        console.log()
      })
    }
  }

  findByNomeCategoria() {
    if (this.nomeCategoria === '') {
      this.findAllCategorias()
    } else {
      this.categoriaService.getByNomeCategoria(this.nomeCategoria).subscribe((resp: Categoria[]) => {
        this.listaCategorias = resp;
      })
    } 
  }

  ativaCategoria(){
    this.pesquisa  = false;
    console.log(this.pesquisa)
  }

  ativaProduto(){
    this.pesquisa = true;
    console.log(this.pesquisa)
  }

}

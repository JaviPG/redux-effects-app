import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  public userHttpSub: Subscription;
  public users: Usuario[];



  constructor(private userSrv: UsuarioService) { }

  ngOnInit(): void {
    this.userHttpSub = this.userSrv.getUsers().subscribe(
      (users) => {
        this.users = users;
        console.log('Usuarios:', this.users);
      }
    )
  }

  ngOnDestroy(): void {
      this.userHttpSub?.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [],
})
export class ListaComponent implements OnInit, OnDestroy {
  public userSubs: Subscription;
  public users: Usuario[];
  public isLoading: boolean = false;
  public error: any;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('usuarios')
      .subscribe(({ users, loading, error }) => {
        this.users = users;
        this.isLoading = loading;
        this.error = error;
      });

    this.store.dispatch(cargarUsuarios());
    // this.userHttpSub = this.userSrv.getUsers().subscribe(
    //   (users) => {
    //     this.users = users;
    //     console.log('Usuarios:', this.users);
    //   }
    // )
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  private routSub: Subscription;
  private userSub: Subscription;

  public usuario: Usuario | null;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('usuario')
      .subscribe(({ user }) => (this.usuario = user));

    this.routSub = this.router.params.subscribe(({ id }) => {
      console.log('ID:', id);
      this.store.dispatch(cargarUsuario({ id }));
    });
  }

  ngOnDestroy(): void {
    this.routSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as usuarioActions from '../actions/usuario.actions';
import { UsuarioService } from '../../services/usuario.service';

@Injectable()
export class UsuarioEffects {
  constructor(private actions$: Actions, private userSrv: UsuarioService) {}

  cargarUsuario$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usuarioActions.cargarUsuario),
      tap((data) => console.log('Acción que ha encadenado este efecto:', data)),
      mergeMap((action) =>
        this.userSrv.getUserByid(action.id).pipe(
          map((user) =>
            usuarioActions.cargarUsuarioSuccess({ usuario: user })
          ),
          catchError((err) =>
            of(usuarioActions.cargarUsuarioError({ payload: err }))
          )
        )
      )
    )
  );
}

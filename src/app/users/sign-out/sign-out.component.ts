import { Component, OnDestroy, OnInit } from "@angular/core";

// @ngrx
import { Store } from "@ngrx/store";
import { go } from "@ngrx/router-store";

// rxjs
import { Observable } from "rxjs/Observable";

// actions
import { SignOutAction } from "../users.actions";

// reducers
import {
  getSignOutError,
  isAuthenticated,
  isAuthenticationLoading,
  State
} from "../../app.reducers";

@Component({
  templateUrl: "./sign-out.component.html",
  styleUrls: ["./sign-out.component.scss"]
})
export class SignOutComponent implements OnDestroy, OnInit {

  /**
   * Component state.
   * @type {boolean}
   */
  private alive = true;

  /**
   * @constructor
   * @param {Store<State>} store
   */
  constructor(private store: Store<State>) { }

  /**
   *  Lifecycle hook that is called when a directive, pipe or service is destroyed.
   */
  public ngOnDestroy() {
    this.alive = false;
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit() {
    this.store.dispatch(new SignOutAction());
  }

  /**
   * Go to the home page.
   */
  public home() {
    this.store.dispatch(go("/"));
  }

  /**
   * To to the sign up page.
   */
  public signIn() {
    this.store.dispatch(go("/users/sign-in"));
  }

}

/* tslint:disable:no-unused-variable */
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { By } from "@angular/platform-browser";

// rxjs
import { Observable } from "rxjs/Observable";

// ngrx
import { Store, StoreModule } from "@ngrx/store";
import { go } from "@ngrx/router-store";

// reducers
import { reducer } from "../../app.reducers";

// services
import { GroupService } from "../../core/services/group.service";
import { MockGroupService } from "../../../testing/mock.group.service";
import { USER } from "../../../testing/mock.user.service";

// models
import { User } from "../../models/user";

// component to test
import { SignUpComponent } from "./sign-up.component";

describe("Component: Signup", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let page: Page;
  let user: User = new User();

  beforeEach(() => {
    user = USER;
  });

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        StoreModule.provideStore(reducer)
      ],
      declarations: [
        SignUpComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: Observable.of({})
          }
        },
        { provide: GroupService, useClass: MockGroupService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(SignUpComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    // create page
    page = new Page(component, fixture);
    fixture.whenStable().then(() => {
      page.addPageElements();
    });
  });

  it("should create a FormGroup comprised of FormControls", () => {
    fixture.detectChanges();
    expect(component.signupForm instanceof FormGroup).toBe(true);
  });

  it("should authenticate", () => {
    fixture.detectChanges();

    // set FormControl values
    component.signupForm.controls["firstName"].setValue(user.firstName);
    component.signupForm.controls["lastName"].setValue(user.lastName);
    component.signupForm.controls["email"].setValue(user.email);
    component.signupForm.controls["password"].setValue(user.password);

    // submit form
    component.submit();

    // verify Store.dispatch is invoked
    expect(page.navigateSpy.calls.any()).toBe(true, "Store.dispatch not called");
  });
});

/**
 * I represent the DOM elements and attach spies.
 *
 * @class Page
 */
class Page {

  public emailInput: HTMLInputElement;
  public firstNameInput: HTMLInputElement;
  public lastNameInput: HTMLInputElement;
  public navigateSpy: jasmine.Spy;
  public passwordInput: HTMLInputElement;

  constructor(private component: SignUpComponent, private fixture: ComponentFixture<SignUpComponent>) {
    // ese component"s injector to get services
    const injector = fixture.debugElement.injector;
    const store = injector.get(Store);

    // add spies
    this.navigateSpy  = spyOn(store, "dispatch");
  }

  public addPageElements() {
    const firstNameInputSelector = "md-input-container input[formcontrolname=\"firstName\"]";
    this.firstNameInput = this.fixture.debugElement.query(By.css(firstNameInputSelector)).nativeElement;

    const lastNameInputSelector = "md-input-container input[formcontrolname=\"lastName\"]";
    this.lastNameInput = this.fixture.debugElement.query(By.css(lastNameInputSelector)).nativeElement;

    const emailInputSelector = "md-input-container input[formcontrolname=\"email\"]";
    this.emailInput = this.fixture.debugElement.query(By.css(emailInputSelector)).nativeElement;

    const passwordInputSelector = "md-input-container input[formcontrolname=\"password\"]";
    this.passwordInput = this.fixture.debugElement.query(By.css(passwordInputSelector)).nativeElement;
  }
}

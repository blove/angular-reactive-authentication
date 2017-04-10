/* tslint:disable:no-unused-variable */
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { StoreModule } from "@ngrx/store";

// reducers
import { reducer } from "../../app.reducers";

// services
import { UserService } from "../../core/services/user.service";

// this component to test
import { MyAccountComponent } from "./my-account.component";

describe("MyAccountComponent", () => {

  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;

  beforeEach(async(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore(reducer)
      ],
      declarations: [
        MyAccountComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    // create component and test fixture
    fixture = TestBed.createComponent(MyAccountComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  }));

  it("should create an instance", () => {
   expect(component).toBeTruthy();
  });
});

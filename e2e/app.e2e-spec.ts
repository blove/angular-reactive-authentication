import { ReactiveAuthenticationExamplePage } from './app.po';

describe('reactive-authentication-example App', () => {
  let page: ReactiveAuthenticationExamplePage;

  beforeEach(() => {
    page = new ReactiveAuthenticationExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { AngularBootstrapv4Page } from './app.po';

describe('angular-bootstrapv4 App', () => {
  let page: AngularBootstrapv4Page;

  beforeEach(() => {
    page = new AngularBootstrapv4Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

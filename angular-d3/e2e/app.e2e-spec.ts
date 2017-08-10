import { StarlightVizPage } from './app.po';

describe('starlight-viz App', () => {
  let page: StarlightVizPage;

  beforeEach(() => {
    page = new StarlightVizPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

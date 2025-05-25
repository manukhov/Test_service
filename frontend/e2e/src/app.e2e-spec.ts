import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display ecommerce component', () => {
    page.navigateTo();
    expect(page.getEcommerceComponent()).toBeTruthy();
  });
});

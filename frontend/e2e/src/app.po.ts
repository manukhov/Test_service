import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getEcommerceComponent() {
    return element(by.css('app-ecommerce')).isPresent();
  }
}

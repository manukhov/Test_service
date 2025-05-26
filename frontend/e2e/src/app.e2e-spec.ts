import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  beforeEach(async () => {
    await browser.get('http://localhost:7860/'); // Используем порт 7860 из CI
  });

  it('should display ecommerce component', async () => {
    // Обрабатываем алерт, если он есть
    try {
      const alert = await browser.switchTo().alert();
      const alertText = await alert.getText();
      console.log(`Alert found: ${alertText}`);
      await alert.accept(); // Закрываем алерт
    } catch (e) {
      console.log('No alert present or error handling alert:', e);
    }

    // Проверяем наличие компонента ecommerce
    const ecommerceComponent = element(by.css('app-ecommerce'));
    expect(await ecommerceComponent.isPresent()).toBeTruthy();
  });
});

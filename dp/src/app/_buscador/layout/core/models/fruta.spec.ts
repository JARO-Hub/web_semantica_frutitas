import { FrutaModel } from './fruta.model';

describe('Fruta', () => {
  it('should create an instance', () => {
    const fruta: FrutaModel = {
      uri: 'http://example.com/fruta',
      nombre: 'Manzana',
      vitC: 5,
      orac: 100,
      abstract: 'Una fruta deliciosa y saludable.',
      thumbnail: 'http://example.com/fruta-thumbnail.jpg'
    };
    expect(fruta).toBeTruthy();
  });
});

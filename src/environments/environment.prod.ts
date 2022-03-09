const baseUrl = 'http://localhost:3000';

export const environment = {
  production: true,
  baseUrl: 'http://localhost:3000/',

  url: {
    getCards: `${baseUrl}/cards`,
    deleteCard: `${baseUrl}/delete`,
    saveCard: `${baseUrl}/saveCard`
  }
};

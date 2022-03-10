export const Months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export const YearLength = 8;

export const CVVLength = 3;

export const CardNumberLength = 19;

export const CardTypes = {
    amex: {
        cardNumberLength: 18,
        cvvLength: 4,
        name: 'amex'
    },
    visa: {
        cardNumberLength: 19,
        cvvLength: 3,
        name: 'visa'
    },
    master: {
        cardNumberLength: 19,
        cvvLength: 3,
        name: 'master'
    }
  };
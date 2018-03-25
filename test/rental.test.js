var assert = require('assert');
var Rental = require('../src/rental').rental;

describe('Rental', function () {
  var myRental = new Rental();
  var properResult =
    'Rental Record for Per' +
    'Ran     3.5' +
    'Trois Couleurs: Bleu    2' +
    'Amount owed is 5.5' +
    'You earned 2 frequent renter points';

  it('should return the proper result', function () {
    properResult = properResult.replace(/\s+/g, '');

    var customer = {
      name: 'Per',
      rentals: [{ movieID: 'F001', days: 3 }, { movieID: 'F002', days: 1 }]
    };

    var actualResult = myRental.statement(customer).replace(/\s+/g, '');
    assert.equal(actualResult, properResult);
  });
});

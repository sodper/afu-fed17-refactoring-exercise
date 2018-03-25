// Example usage:
// --------------
// var customer = {
//   name: 'martin',
//   rentals: [{ movieID: 'F001', days: 3 }, { movieID: 'F002', days: 1 }]
// };
//
// var result = new Rental().statement(customer)

var Rental = function () { };

Rental.prototype.statement = function (customer) {

  var movies = {
    F001: { title: 'Ran', code: 'regular' },
    F002: { title: 'Trois Couleurs: Bleu', code: 'regular' },
    F003: { title: 'Cars 2', code: 'childrens' },
    F004: { title: 'Latest Hit Release', code: 'new' },
    //EXERCISE NOTE: add more movies if you need
  };

  let total = 0;
  let points = 0;
  let result = `Rental Record for ${customer.name}\n`;
  for (let r of customer.rentals) {
    let m = movies[r.movieID];
    let amount = 0;

    // determine amount for each movie
    switch (m.code) {
      case 'regular':
        amount = 2;
        if (r.days > 2) {
          amount += (r.days - 2) * 1.5;
        }
        break;
      case 'new':
        amount = r.days * 3;
        break;
      case 'childrens':
        amount = 1.5;
        if (r.days > 3) {
          amount += (r.days - 3) * 1.5;
        }
        break;
    }

    //add frequent renter points
    points++;
    // add bonus for a two day new release rental
    if (m.code === 'new' && r.days > 2) points++;

    //print figures for this rental
    result += `\t${m.title}\t${amount}\n`;
    total += amount;
  }
  // add footer lines
  result += `Amount owed is ${total}\n`;
  result += `You earned ${points} frequent renter points\n`;

  return result;
};


exports.rental = Rental;

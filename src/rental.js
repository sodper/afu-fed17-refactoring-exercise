// Example usage:
// --------------
// var customer = {
//   name: 'martin',
//   rentals: [{ movieID: 'F001', days: 3 }, { movieID: 'F002', days: 1 }]
// };
//
// var result = new Rental().statement(customer)

var Rental = function () {
  this.statementPresenter = new StatementStringPresenter();
};

Rental.prototype.statement = function (customer) {

  var movies = {
    F001: { title: 'Ran', code: 'regular' },
    F002: { title: 'Trois Couleurs: Bleu', code: 'regular' },
    F003: { title: 'Cars 2', code: 'childrens' },
    F004: { title: 'Latest Hit Release', code: 'new' },
    //EXERCISE NOTE: add more movies if you need
  };

  let statement = {
    customerName: customer.name,
    total: 0,
    frequentRenterPoints: 0,
    movies: []
  };

  customer.rentals.forEach((rental) => {
    let movie = movies[rental.movieID];
    let statementMovie = {
      title: movie.title,
      amount: determineAmountForMovie(movie, rental),
    }

    statement.frequentRenterPoints = calculateFrequentRenterPoints();
    statement.total += statementMovie.amount;
    statement.movies.push(statementMovie);
  });

  return this.statementPresenter.build(statement);
};

var StatementStringPresenter = function() {};

StatementStringPresenter.prototype.build = function (statement) {
  let result = `Rental Record for ${statement.customerName}\n`;

  for (let i=0; i < statement.movies.length; i++) {
    result += `\t${statement.movies[i].title}\t${statement.movies[i].amount}\n`;
  }

  result += `Amount owed is ${statement.total}\n`;
  result += `You earned ${statement.frequentRenterPoints} frequent renter points\n`;

  return result;
}

function calculateFrequentRenterPoints(movie, rental) {
  let frequentRenterPoints = 1;

  if (isEligibleForNewMovieBonus(movie, rental)) frequentRenterPoints++;

  return frequentRenterPoints;
}

function isEligibleForNewMovieBonus(movie, rental) {
  return movie.code === 'new' && rental.days > 2;
}

function determineAmountForMovie(movie, rental) {
  let amount = 0;

  switch (movie.code) {
    case 'regular':
      amount = 2;
      if (rental.days > 2) {
        amount += (rental.days - 2) * 1.5;
      }
      break;
    case 'new':
      amount = rental.days * 3;
      break;
    case 'childrens':
      amount = 1.5;
      if (rental.days > 3) {
        amount += (rental.days - 3) * 1.5;
      }
      break;
  }

  return amount;
}

exports.rental = Rental;

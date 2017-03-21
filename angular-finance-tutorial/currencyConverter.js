var app = angular.module('currencyConverter', []);

app.factory('currencyConverter', ['$http', function($http) {

  // Yahoo API URL
  var YAHOO_URL = '//query.yahooapis.com/v1/public/yql?q=select * from '
        + 'yahoo.finance.xchange where pair in ("PAIRS")&format=json&'
        + 'env=store://datatables.org/alltableswithkeys';

  var currencies = ['USD', 'SGD', 'EUR', 'CNY'];

  // Initialize an empty var and fetch the results later
  var sgdToForeignRates = {};
  // var sgdToForeignRates = {
  //   SGD: 1,
  //   USD: 0.7,
  //   EUR: 0.5,
  //   CNY: 4.8
  // };

  var currencyConverter = function currencyConverter(amount, inputCurr, outputCurr) {
    return amount * (1 / sgdToForeignRates[inputCurr]) * sgdToForeignRates[outputCurr];
  };

  var getRates = function getRates() {
    var YAHOO_URL_RATES = YAHOO_URL.replace('PAIRS', 'SGD' + currencies.join('","SGD'));
    return $http.get(YAHOO_URL_RATES).then(function(response) {
      var returnedRates = {};
      angular.forEach(response.data.query.results.rate, function(rate) {
        var currency = rate.id.substring(3,6);
        var rate = window.parseFloat(rate.Rate);
        returnedRates[currency] = rate;
      });
      // console.log(returnedRates);
      sgdToForeignRates = returnedRates;
    });
  };

  getRates();

  return {
    currencies: currencies,
    currencyConverter: currencyConverter
  };
}]);

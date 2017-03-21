var app = angular.module('finance', ['currencyConverter']);

// app.controller('financeController', function financeController() {
app.controller('financeController', ['currencyConverter', function financeController(currencyConverter) {
  this.quantity = 1;
  this.cost = 5;
  this.inputCurr = 'SGD';
  this.currencies = currencyConverter.currencies;
  
  // this.currencies = ['USD', 'SGD', 'EUR', 'CNY'];
  // this.sgdToForeignRates = {
  //   SGD: 1,
  //   USD: 0.7,
  //   EUR: 0.5,
  //   CNY: 4.8
  // };

  this.total = function total(outputCurr) {
    // return this.currencyConverter(this.quantity * this.cost, this.inputCurr, outputCurr);
    return currencyConverter.currencyConverter(this.quantity * this.cost, this.inputCurr, outputCurr);
  };

  // this.currencyConverter = function currencyConverter(amount, inputCurr, outputCurr) {
  //   return amount * (1 / this.sgdToForeignRates[inputCurr]) * this.sgdToForeignRates[outputCurr];
  // };

  this.pay = function pay() {
    window.alert('Thank you for paying ' + this.inputCurr + this.total(this.inputCurr) + '!');
  };

}]);
// });

angular.module("app", ["ui.router"])
  .config(function config($stateProvider) {
    $stateProvider.state("index", {
      url:         "",
      controller:  "FirstCtrl as first",
      templateUrl: "templates/first.html"
    });
    $stateProvider.state("second", {
      url:         "/second",
      controller:  "SecondCtrl as second",
      templateUrl: "templates/second.html"
    });
  })

  .service("greeting", function Greeting() {
    var greeting     = this;
    greeting.message = "Hello";
  })

  .service("Months", function Months() {
    this.list = [
      { num: 1,  name: "January"   },
      { num: 2,  name: "February"  },
      { num: 3,  name: "March"     },
      { num: 4,  name: "April"     },
      { num: 5,  name: "May"       },
      { num: 6,  name: "June"      },
      { num: 7,  name: "July"      },
      { num: 8,  name: "August"    },
      { num: 9,  name: "September" },
      { num: 10, name: "October"   },
      { num: 11, name: "November"  },
      { num: 12, name: "December"  }
    ];
  })

  .filter("reverse", function (greeting) {
    return function reverse(text) {
      return text.split("").reverse().join("") + greeting.message;
    };
  })

  .directive("superMan", function superMan() {
    return {
      restrict: "E",
      template: "<div>Here I am to save the day</div>"
    };
  })

  .directive("myFirstDirective", function () {
    return function (scope, element, attrs) {
      element.text(scope.first.greeting.message + " " + attrs.message);
    };
  })

  .controller("FirstCtrl", function FirstCtrl($scope, greeting, Months) {
    var first      = this;
    first.greeting = greeting;
    $scope.months  = Months;
  })

  .controller("SecondCtrl", function SecondCtrl($scope, greeting) {
    var second      = this;
    second.greeting = greeting;

    $scope.reversedMessage = function reversedMessage(message) {
      return message.split("").reverse().join("");
    };
  });

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

  // Directive Restrictions
  .directive("batman", function () {
    return {
      restrict: "M",
      link: function () {
        alert("I'm working");
      }
    };
  })
  .directive("flash", function () {
    return {
      restrict: "C",
      link: function () {
        alert("I'm working faster");
      }
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
  })

  // Basic/Useful Behaviours
  .directive("enter", function () {
    // return {
    //   restrict: "A"            // this is the default
    //   link:     function () {} // if this is all, don't need the object
    // };
    return function (scope, element, attrs) {
      element.bind("mouseenter", function () {
        console.log("I'm inside of you");
        element.addClass(attrs.enter);
      });
    };
  })
  .directive("leave", function () {
    return function (scope, element, attrs) {
      element.bind("mouseleave", function () {
        console.log("I'm leaving on a jet plane");
        element.removeClass(attrs.enter);
      });
    };
  })

  // Understanding Isolate Scope / &
  .controller("ChoreCtrl", function ($scope) {
    $scope.logChore = function (chore) {
      alert(chore + " is done!");
    };
    $scope.callHome = function (message) {
      alert(message);
    };
    $scope.ctrlFlavour = "blackberry";
  })
  .directive("kid", function () {
    return {
      restrict: "E",
      scope: {
        done: "&"
      },
      template: '<input type="text" ng-model="chore"/>' +
        ' {{chore}}' +
        ' <div class="button" ng-click="done({chore:chore})">I\'m done!</div>'
    };
  })
  .directive("phone", function () {
    return {
      scope: {
        dial: "&"
      },
      template: '<input type="text" ng-model="value"/>' +
        '<div class="button" ng-click="dial({message:value})">Call home!</div>'
    };
  })
  .directive("drink", function () {
    return {
      scope: {
        flavour: "="
      },
      template: '<input type="text" ng-model="flavour"/>'
    };
  });

var trackingApp = angular.module('trackingApp', ['ngRoute']);

trackingApp.config(['$routeProvider', function ($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './views/candidateform.html',
      controller: 'mainController'
    })
    .when('/candidateList', {
      templateUrl: './views/candidatelist.html',
      controller: 'listController'
    })
    .when('/configTable', {
      templateUrl: './views/configtable.html',
      controller: 'columnsController'
    })

}]);

// controller for candidate form
trackingApp.controller('mainController', ['dataApi', '$scope','$location', function (dataApi, $scope, $location) {
  console.log('hello from controller!!');
  $scope.candidate = {
    name: '',
    experience: '',
    jobLocation: '',
    joinDate: '',
    skills: {
      java: false,
      python: false,
      html: false,
      css: false,
      javascript: false
    },
    gender: ''
  };
  $scope.candidate.gender = 'Male';
  $scope.addCandidate = () => {
    console.log($scope.candidate);
    dataApi.addCandidate($scope.candidate).then(function () {
      console.log('candidate added successfully');
      alert('Candidate successfully added to list');
      $location.path('/candidateList');
    }).catch(function (err) {
      console.log('Error : ' + err);
    });
  };

  $scope.resetForm = () => {
    $scope.candidate = {
      name: '',
      experience: '',
      jobLocation: '',
      joinDate: '',
      skills: {
        java: false,
        python: false,
        html: false,
        css: false,
        javascript: false
      },
      gender: ''
    };
  }

}]);


// controller for candidate table
trackingApp.controller('listController', ['dataApi', '$scope', function (dataApi, $scope) {
  $scope.fixDate = function (date) {
    return new Date(date);
  };
  $scope.columnsToShow = () => {
    dataApi.getColumns().then(function (data) {
      $scope.columnList = data[0];
      console.log($scope.columnList);
    }).catch(function (err) {
      console.log('Error: ' + err);
    });

  };
  $scope.columnsToShow();

  $scope.getCandidateList = () => {
    dataApi.getAll().then(function (data) {
      $scope.candidateList = data;
      console.log($scope.candidateList);
    }).catch(function (err) {
      console.log('Error: ' + err);
    });
  };
  $scope.getCandidateList();

}]);

trackingApp.filter('stringToDate', function ($filter) {
  return function (ele, dateFormat) {
    return $filter('date')(new Date(ele), dateFormat);
  }
});

// controller for configuration of table columns
trackingApp.controller('columnsController', ['dataApi', '$scope','$location', function (dataApi, $scope, $location) {
  

  $scope.columnsToShow = () => {
    dataApi.getColumns().then(function (data) {
      $scope.columnList = data;
      $scope.columns = data[0];
      console.log($scope.columns);
    }).catch(function (err) {
      console.log('Error: ' + err);
    });

  };
  $scope.columnsToShow();

  $scope.updateColumns = () => {
    
    console.log('columns to be updated');
    console.log($scope.columns);
    dataApi.updateColumns($scope.columns).then(function () {     
      console.log('columns updated successfully');
      alert('Table Updated!!');
      $location.path('/candidateList');
    }).catch(function (err) {
      console.log('Error : ' + err);
    });
  };

  

}]);
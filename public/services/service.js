trackingApp.service('dataApi', ['$http', function ($http) {
  this.getAll = () => {
    return $http({
      method: 'GET',
      url: '/api/candidateList',
    }).then((data) => {
      return data.data;
    });
  };

  this.addCandidate = (dataman) => {
    var config = {
      method: "POST",
      url: '/api/candidateList',
      data: dataman,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
    return $http(config);
  };

  this.getColumns = () => {
    return $http({
      method: 'GET',
      url: '/api/tableColumns',
    }).then((data) => {
      return data.data;
    });
  };

  this.updateColumns = (data) => {
    var config = {
      method: "PUT",
      url: '/api/tableColumns',
      data: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
    return $http(config);
  }

}]);
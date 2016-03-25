var angular = angular.module('order', [])
  .controller('orderController', function ($scope) {
    $scope.ORDER = []
    $scope.addOrder = function (data) {
      if (checkRepeat(data)) {
        var find = findRepeat(data)
        $scope.ORDER[find].amount++
      } else {
        $scope.ORDER.push(data)
      }
      $scope.Total = promotion($scope.ORDER)
      $scope.TAM = Totalamount($scope.ORDER)
    }

    $scope.addAmount = function (index) {
      $scope.ORDER[index].amount++
      $scope.Total = promotion($scope.ORDER)
    }
    $scope.delAmount = function (index) {
      if ($scope.ORDER[index].amount === 1) {
        $scope.ORDER.splice(index, 1)
        $scope.Total = promotion($scope.ORDER)
        $scope.TAM = Totalamount($scope.ORDER)
      } else {
        $scope.ORDER[index].amount--
        $scope.Total = promotion($scope.ORDER)
        $scope.TAM = Totalamount($scope.ORDER)
      }
    }
    $scope.deleteOrder = function (index) {
      $scope.ORDER.splice(index, 1)

      $scope.Total = promotion($scope.ORDER)
      $scope.TAM = Totalamount($scope.ORDER)
    }

    var checkRepeat = function (data) {
      for (var i = 0; i < $scope.ORDER.length; i++) {
        if ($scope.ORDER[i].sector === data.sector) {
          return (true)
        }
      }
      return (false)
    }
    var findRepeat = function (data) {
      for (var i = 0; i < $scope.ORDER.length; i++) {
        if ($scope.ORDER[i].sector === data.sector) {
          return (i)
        }
      }
    }
    var promotion = function (order) {
      var length = order.length
      var price = 0
      for (var i = 0; i < order.length; i++) {
        price += order[i].amount * 100
      }
      var delAmount = []
      var discount = 0
      for (var x = 0; x < order.length; x++) {
        delAmount.push({price: order[x].price, sector: order[x].sector, amount: order[x].amount})
      }

      while (length > 1) {
        if (length === 2) {
          discount += 20
        } else if (length === 3) {
          discount += 60
        } else if (length === 4) {
          discount += 120
        } else if (length === 5) {
          discount += 200
        } else if (length === 6) {
          discount += 300
        } else if (length === 7) {
          discount += 420
        }

        for (var l = 0; l < delAmount.length; l++) {
          delAmount[l].amount--
        }
        for (var s = delAmount.length - 1; s >= 0; s--) {
          if (delAmount[s].amount === 0) {
            delAmount.splice(s, 1)
          }
        }

        length = delAmount.length
      }
      return ({discount: discount, sumPrice: price - discount})
    }
    var Totalamount = function (amount) {
      var TA = 0
      for (var A = 0; A < $scope.ORDER.length; A++) {
        TA += $scope.ORDER[A].amount
      }
      return (TA)
    }
  })

var angular = angular.module('order', [])
  .controller('orderController', function ($scope) {
    $scope.ORDER = []
    $scope.add = function (data) {
      if (check(data)) {
        var count = find(data)
        $scope.ORDER[count].amount++
      } else {
        $scope.ORDER.push(data)
      // console.log($scope.ORDER)
      }
      $scope.sum = promotion($scope.ORDER)
    }
    var find = function (data) {
      for (var i = 0; i < $scope.ORDER.length; i++) {
        if ($scope.ORDER[i].sector === data.sector) {
          return (i)
        }
      // console.log('find')
      }
    }
    var check = function (data) {
      for (var i = 0; i < $scope.ORDER.length; i++) {
        if ($scope.ORDER[i].sector === data.sector) {
          return (true)
        }
      // console.log('check')
      }
      return (false)
    }

    var promotion = function (order) {
      var length = order.length
      var price = 0
      for (var i = 0; i < order.length; i++) {
        price += order[i].amount * 100
      // console.log('price')
      }
      var discount = 0
      var delAmount = []

      for (var p = 0; p < order.length; p++) {
        delAmount.push({price: order[p].price, sector: order[p].sector, amount: order[p].amount})
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

        for (var a = 0; a < delAmount.length; a++) {
          delAmount[a].amount--
        // console.log('hey')
        }
        for (var j = delAmount.length - 1; j >= 0; j--) {
          if (delAmount[j].amount === 0) {
            delAmount.splice(j, 1)
            console.log('splice')
          }
        }
        // delAmount = delAmount.filter((element) => element.amount !== 0)

        length = delAmount.length
      }
      console.log(price - discount)
      return ({discount: discount, sum: price - discount})
    }
  })

// API SERVICE
angular
	.module('mhApp')
	.service('phpServices', ['$http', ($http) => {

		return {
			getAllAds : () => {
				return $http.get('built/scripts/service.data.php');
			},

			logout : () => {
				return $http.get('built/scripts/sessiondestroy.php');
			}
		}
	}]);

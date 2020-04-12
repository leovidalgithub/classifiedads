// ANGULAR JS 1.6.9 starts here!
angular
	.module('mhApp', ['pascalprecht.translate'])
	.config(['$translateProvider', ($translateProvider) => {
		angular.lowercase = text => text.toLowerCase(); // Angular 1.6.7 version conflict trick 
		$translateProvider
			.registerAvailableLanguageKeys(['br-BR', 'en-US'], {
				'en*': 'en-US',
				'us*': 'en-US',
				'uk*': 'en-US',
				'br*': 'br-BR',
			})
			.useStaticFilesLoader({
				prefix: 'built/locale/lang_',
				suffix: '.json'
			})

			.preferredLanguage('en-US')
			.fallbackLanguage('en-US') // if some language is missing, this one will be used instead
			// .determinePreferredLanguage()
			.useSanitizeValueStrategy(null);
	}])
	.run([() => { }]) // not in use
	.controller('mainController', ['$scope', 'phpServices', '$timeout', '$translate', ($scope, phpServices, $timeout, $translate) => {

		$scope.currentLang = 'en-US';
		$scope.currentLang = 'br-BR';
		$timeout(() => {
			$translate.use($scope.currentLang);
		});

		$scope.username = username;

		switch (adminType) {
			case '1':
				$scope.loggedAs = 'ADMINISTRATOR';
				break;
			case '2':
				$scope.loggedAs = 'EMPLOYEE';
				break;
			case '5':
				$scope.loggedAs = 'MEMBER';
				break;
			default:
				$scope.loggedAs = 'NOT REGISTERD';
				break;
		}

		$scope.selectedCategory = {id:0,name:'loading...'};
		$scope.dropboxitemselected = function (item) {
			$scope.selectedCategory = item;
		}

		const getAll = () =>{ // CALLING API GET ALL DATA
			$scope.loading = true;
			phpServices.getAllAds()
			.then(loadingDataModels)
			.catch((err) => {if (err.status == 403) {}})
			.finally(() => { $scope.loading = false });
		}

		const loadingDataModels = (data) => {
			$scope.cats  = data.data.cats;
			$scope.ads  = data.data.ads;
			$scope.cats.push({id:'11',name:'All'});
			$scope.selectedCategory = $scope.cats[9];
		};

		angular.element(document).ready(() => { // INIT FUNCTION AFTER HTML ALREADY LOADED
			$timeout(()=>{
				getAll();
			},500);
		});

		$scope.logout = () => { // $SCOPE LOGOUT
			phpServices.logout()
			.then((data) => {
				location.replace('login.php');
			});
	}

		$scope.languageChanged = () => {
			if ($scope.currentLang == 'en-US') {
				$scope.currentLang = 'br-BR'
			} else {
				$scope.currentLang = 'en-US'
			}
			$translate.use($scope.currentLang);
		};
	}]);

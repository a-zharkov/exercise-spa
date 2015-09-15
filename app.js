(function(){
    var app = angular.module('bookingApp', []);

    app.constant('pages', [
            {
                title: 'flights',
                searchType: 'flight',
                contentUrl: 'templates/flightsTab.html'
            },
            {
                title: 'hotels',
                searchType: 'hotel',
                contentUrl: 'templates/hotelsTab.html'
            },
            {
                title: 'cars',
                searchType: 'car',
                contentUrl: 'templates/carsTab.html'
            }
        ]
    );

    app.constant('icons', {
            flight: 'plane',
            hotel: 'bed',
            car: 'car'
        }
    );

    app.controller('TabController',function($scope, pages, icons){
        $scope.icons = icons;
        this.tabs = pages;
        this.setTab = function(newTab){
            this.current = newTab;
        };
        this.isSet = function(checkTab){
            return this.current === checkTab;
        };
    });

    app.controller('SearchController', function() {
        this.history = [];

        this.initQuery = function(){
            this.query = {
                type: 'flight',
                hotelAmenities: {stars: "3"},
                carType: 'standard'
            };
        };

        this.newSearch = function() {
            var pastQuery = {
                    type: this.query.type,
                    dates: this.query.startDate + ' - ' + this.query.endDate
                };
            switch(this.query.type){
                case 'flight':
                    pastQuery.option1 = this.query.flightFrom + ' → ' + this.query.flightTo;
                    pastQuery.option2 = '';
                    break;
                case 'hotel':
                    pastQuery.option1 = this.query.hotelLocation;
                    pastQuery.option2 = (new Array(+this.query.hotelAmenities.stars + 1).join('★')) + (this.query.hotelAmenities.higherAllowed ? '+':'');
                    break;
                case 'car':
                    pastQuery.option1 = this.query.carLocation;
                    pastQuery.option2 = this.query.carType;
                    break;
            }
            
            //MV1: I believe this should de-duplicate searches, but it doesn't. Why?
            //Answer: The reason is because Angular ng-repeat adds $$hashKey for each object in array for tracking.
            //We can fix it by specifying 'track by $index' in ng-repeat. So, $$hashKey will not be added, and comparison will work correctly.
            if(JSON.stringify(this.history[0]) != JSON.stringify(pastQuery)) {
                this.history.unshift(pastQuery);
            }
        };

        this.resetQuery = function(){
            var currentType = this.query.type;
            //MV2: Does this look familiar?
            //Answer: Yes, it will be better to move out a query initialization in separated method and only save current type here.
            this.initQuery();
            this.query.type = currentType;
        };

        this.removeQueryFromHistory = function(index) {
            //MV3: How would you avoid an index lookup?
            //Answer: We can use $index value from ng-repeat scope
            this.history.splice(index, 1);
        };
    });
})();


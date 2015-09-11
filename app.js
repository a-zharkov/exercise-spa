(function(){
    var app = angular.module('bookingApp', []);

    app.controller('TabController',function(){
        this.current = 1;
        this.setTab = function(newTab){
            this.current = newTab || 1;
        };
        this.isSet = function(checkTab){
            return this.current === checkTab;
        };
    });

    app.controller('SearchController', function() {
        this.query = {
                        type: 'flight',
                        hotelAmenities: {stars: "3"},
                        carType: 'standard'
                    };
        this.history = [];

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
            if(JSON.stringify(this.history[0]) != JSON.stringify(pastQuery)) {
                this.history.unshift(pastQuery);
            }
        };

        this.resetQuery = function(){
            var currentType = this.query.type;
            this.query = {
                type: currentType,
                hotelAmenities: {stars: "3"},
                carType: 'standard'
            }
        };

        this.removeQueryFromHistory = function(item) {
            var index = this.history.indexOf(item);
            this.history.splice(index, 1);
        }
    });
})();


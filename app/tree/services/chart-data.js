angular
    .module('myApp.chartData', [])
    .factory('chartData', function(){
        function chartData(){
        }
        chartData.prototype.data = {};
        chartData.prototype.totalSize = 0;
        chartData.prototype.add = function (newObject){
            if(this.data[newObject.key]!=null)
                this.data[newObject.key] += newObject.y;
            else
                this.data[newObject.key] = newObject.y;

            this.totalSize += newObject.y;
        };
        chartData.prototype.getjson = function (){
            var arr =[];
            var keyNames = Object.keys(this.data);

            for (var property in this.data) {
                if (this.data.hasOwnProperty(property)) {
                    arr.push({
                        key: property + " " + this.data[property] + " MB ",
                        y: this.data[property]
                    });
                }
            }
            return arr;
        };

        chartData.prototype.item= function(key,y){
            return {"key":key,"y":y};
            //this.y = y;
        };
        return chartData;
    });

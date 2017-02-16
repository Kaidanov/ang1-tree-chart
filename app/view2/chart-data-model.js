function oneInput(key,y){
  this.key = key;
  this.y = y;
}

function chartData(){
  this.data = {};
}
chartData.prototype.add = function (newObject){
  if(this.data[newObject.key]!=null)
    this.data[newObject.key] += newObject.y;
  else
    this.data[newObject.key] = newObject.y;

}
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
}

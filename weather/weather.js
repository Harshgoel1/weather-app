var request=require('request');


var getWeather = (lat,lng,callback) => {
  request({
    url:'https://api.darksky.net/forecast/93d8427b36d1fb9e1fff4b45e97d54ff/'+lat+','+lng,
    json:true
  },(error,response,body) => {
    if(error)
    {
      callback('Unable to connect to Forecast.io server');
    }
    else
    if(response.statusCode===400)
    {
      callback('Unable to fetch weather');
    }
    else
    if(response.statusCode===200)
    {
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature:body.currently.apparentTemperature
      });
    }
  });

};




module.exports.getWeather=getWeather;

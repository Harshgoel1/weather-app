var yargs=require('yargs');

var geocode=require('./geocode/geocode');
var weather=require('./weather/weather');

var argv=yargs.options({
  a:{
    demand:true,
    alias:'address',
    describe:'Address to get weather info about it',
    string:true
  }
})
.help()
.alias('help','h')
.argv;

var convert = (far) => {
  var cel=(far-32)*(5/9);
  return cel.toPrecision(4) ;
};

geocode.geocodeAddress(argv.address, (errorMessage,results)=>{
  if(errorMessage)
  {
    console.log('errorMessage');
  }
  else
  {
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
      if(errorMessage)
      {
        console.log(errorMessage);
      }
      else
      {
        console.log(`It's currenty ${weatherResults.temperature}F (${convert(weatherResults.temperature)}C). It feels like ${weatherResults.apparentTemperature}F (${convert(weatherResults.apparentTemperature)}C).`);
      }
    });
  }
});

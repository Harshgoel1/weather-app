var yargs=require('yargs');
var axios=require('axios');

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

var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl='https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress+'&key=AIzaSyAJps6F_w59F5PWxWXs9mtMXIzXpxPT1Fc';

axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === 'ZERO_RESULTS')
  {
    throw new Error('Unable to find that address');
  }
  var lat=response.data.results[0].geometry.location.lat;
  var lng=response.data.results[0].geometry.location.lng;
  var weatherUrl = 'https://api.darksky.net/forecast/93d8427b36d1fb9e1fff4b45e97d54ff/'+lat+','+lng;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature=response.data.currently.temperature;
  var apparentTemperature=response.data.currently.apparentTemperature;
  console.log(`It's currenty ${temperature}F (${convert(temperature)}C). It feels like ${apparentTemperature}F (${convert(apparentTemperature)}C).`)
})
.catch((e) => {
  if(e.code==='ENOTFOUND')
  {
    console.log('Unable to connect to API servers');
  }
  else
  {
    console.log(e.message);
  }
});

var lat, long;

setInterval(function() {
	var request = new XMLHttpRequest();
	request.open("GET", "http://api.open-notify.org/iss-now.json");

	request.onload = function() {
		var myData = JSON.parse(request.responseText);
		lat = myData.iss_position.latitude;
		long = myData.iss_position.longitude;
		initMap(lat, long);
		geoLocation(lat, long);
	}

	request.send();

	function initMap(lat, long) {
		var uluru = {lat: parseFloat(lat), lng: parseFloat(long)};
		var map = new google.maps.Map(document.querySelector('.map__main'), {
		  zoom: 4,
		  center: uluru
		});
		var marker = new google.maps.Marker({
		  position: uluru,
		  map: map
		});
	}
	
	
}, 10000);


function geoLocation(lat, long) {
	lat, long;
	var geoRequest = new XMLHttpRequest();
	geoRequest.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=34fb6e34f6b56c480b19f84502d25032");

	geoRequest.onload = function() {
		var geoData = JSON.parse(geoRequest.responseText);
		console.log(geoData);
		additionalInfo(geoData);
	}

	geoRequest.send();
}

function additionalInfo(data) {
	var city = data.name;
	var temp = Math.round(data.main.temp);
	var country = data.sys.country;
	var lat = data.coord.lat;
	var long = data.coord.lon;
	$(".map__params--lat").text("  " + lat);
	$(".map__params--long").text("  " + long);
	if (city !== "") {
		$(".map__params--city").text("  " + city);
	} else {
		$("#params-city").css("display", "none");
	}
	if (country !== undefined) {
		$(".map__params--country").text("  " + country);
	} else if(country === undefined) {
		$("#params-country").css("display", "none");
	}
	$(".map__params--temp").text("  " + temp + " F");
	$(".map__params--on-load").addClass("map__params--on-refresh");
}


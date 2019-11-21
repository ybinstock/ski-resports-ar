window.onload = () => {
	let method = 'dynamic';

	// if you want to statically add places, de-comment following line:
	method = 'static';
	if (method === 'static') {
		let places = staticLoadPlaces();
		return renderPlaces(places);
	}

	if (method !== 'static') {
		// first get current user location
		return navigator.geolocation.getCurrentPosition(function (position) {

				// than use it to load from remote APIs some places nearby
				dynamicLoadPlaces(position.coords)
					.then((places) => {
						renderPlaces(places);
					});
			},
			(err) => console.error('Error in retrieving position', err), {
				enableHighAccuracy: true,
				maximumAge: 0,
				timeout: 27000,
			}
		);
	}
};

function staticLoadPlaces() {
	return [{
			name: "Brekenridge Ski Resort",
			location: {
				lat: 51.542028,
				lng: -0.060905,
				// lat: 39.480665,
				// lng: -106.067793,
			}
		}, {
			name: "Copper Mountain",
			location: {
				lat: 51.542028,
				lng: -0.060905,
				// lat: 39.499651, 
				// lng: -106.15552 ,
			}
		}, {
			name: "Arapahoe Basin",
			location: {
				lat: 51.542028,
				lng: -0.060905,
				// lat: 39.642388,
				// lng: -105.871993,
			}
		}, {
			name: "Keystone Ski Resort",
			location: {
				lat: 51.542028,
				lng: -0.060905,
				// lat: 39.608292, 
				// lng: -105.943819,
				
			}
		}, {
			name: "Vail Summit Resort",
			location: {
				lat: 51.542028,
				lng: -0.060905,
				// lat: 39.606142,
				// lng: -106.355090,
			}
		},

	];
}

function renderPlaces(places) {
	let scene = document.querySelector('a-scene');

	places.forEach((place) => {
		let latitude = place.location.lat;
		let longitude = place.location.lng;

		// add place name
		let text = document.createElement('a-link');
		text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
		text.setAttribute('title', place.name);
		text.setAttribute('scale', '65 65 65');

		text.addEventListener('loaded', () => {
			window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'));
		});

		scene.appendChild(text);
	});
}
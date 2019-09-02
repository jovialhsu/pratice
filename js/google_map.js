function initMap(){
    
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.689104, lng: -74.044599},
            zoom: 16
    })
    // let venueMap;
    // venueMap = new google.maps.Map(document.getElementById('map'),mapOptions);
}



function loadScript(){
    let script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC21brA6awK30Fa7S-T54TUSku3w3QfRqQ&callback=initMap';
    document.body.appendChild(script);
}

window.addEventListener('load',loadScript);
let map;

function initMap(){
    map= new google.maps.Map(document.getElementById("map"),{
        center:{lat:39.767943676509866, lng:-86.16000071202528},
        zoom:13,
    });

}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});

async function handleSubmit(event) {

    event.preventDefault(); // Prevent the default form submission behavior
    
    const formData = new FormData(event.target);
    const city = formData.get('city');
    
    try {
        console.log('button sumbit');
        const response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city: city })
        });

        const restaurants = await response.json();
        displayRestaurants(restaurants);
    } catch (error) {
        console.error('Error:');
    }

    console.log('City' + city);

}

function displayRestaurants(restaurants) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    
    if (restaurants.length === 0) {
        resultsDiv.textContent = 'No restaurants found.';
        return;
    }
    
    const ul = document.createElement('ul');
    restaurants.forEach(restaurant => {
        const li = document.createElement('li');
        li.textContent = restaurant.name;
        ul.appendChild(li);
    });
    
    resultsDiv.appendChild(ul);
}

//Part 1: Create the Earthquake Visualization

//set up the map
//play around with lat and lon coordinates to center over west usa
//lon is north south, lat is east west
the_map = L.map("map", {center: [40, -110], zoom : 5});

//copy paste tile layer from other js file
// adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(the_map);

//set up the url
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//get the data from the url
d3.json(url).then(function(data){

    console.log(data)

    //marker_list = [];

    //note: the data has it lon then lat so reverse it
    dfeatures = data.features;

    // for (i = 0; i < 1500; i++) {

    //     dfgeometry = dfeatures[i].geometry;

    //     if (dfeatures[i].geometry)
    //         //console.log(`Lon: ${indexin[i].geometry[1]}`)
    //         L.marker([dfgeometry.coordinates[1], dfgeometry.coordinates[0]]).addTo(the_map);
    // };

    // smthn = L.choropleth(data, {
    //     valueProperty : "ids", 
    //     scale : ["#ffffb2", "#b10026"], 
    //     steps : 5,
    //     mode : "q",
    //     style : {
    //       // Border color
    //       color: "#fff",
    //       weight: 1,
    //       fillOpacity: 0.8
    //     },
    //     onEachFeature : function(feature, layer){
    //         layer.bindPopup("<strong> Earthquake Magnitude: " + feature.properties.mag + "</strong>" 
    //         + "<br /><br />" + "Located Around: " + feature.properties.place)
    //     }

    // }).addTo(the_map)

        function find_rad(rad){
            new_rad = rad*2000
            return new_rad
        };

        for (i = 0; i < 1500; i++) {

        dfgeometry = dfeatures[i].geometry;

        if (dfeatures[i].geometry)
            L.circle([dfgeometry.coordinates[1], dfgeometry.coordinates[0]], {
                fillOpacity : 0.25,
                radius: find_rad(dfgeometry.coordinates[2])
            }).bindPopup("<strong> Earthquake Magnitude: "+ dfgeometry.coordinates[2] + "</strong>").addTo(the_map)
            //L.marker([dfgeometry.coordinates[1], dfgeometry.coordinates[0]]).addTo(the_map);
    };
});

//need to change color, make a function for color and fillColor
//also add a legend, somehow, can do it!





//Create the Earthquake Visualization

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
    //console.log(data)
    //console.log(data.features.properties)

    //extract coordinates
    coords_array = []
    //extract depth
    depth_array = []
    //extract magnitude
    mag_array = []

    for (j = 0; j < 1500; j++){
        //coords
        lat = data.features[j].geometry.coordinates[1]
        lon = data.features[j].geometry.coordinates[0]
        //push
        coords_array.push([lat, lon])

        //depth
        dep = data.features[j].geometry.coordinates[2]
        //push
        if (dep && dep >= 0){
            depth_array.push(dep)
        } else {
            no_dep = 0
            depth_array.push(no_dep)
        }

        //magnitude
        magtd = data.features[j].properties.mag
        //push
        mag_array.push(magtd)

    }

    //console.log(coords_array)
    //console.log(mag_array)
    // console.log("Max Magnitude")
    // dmax = Math.max(...depth_array) //the ... makes the math.max() take in the array properly, idk
    // console.log(dmax)
    // console.log(depth_array)

    //makes radius size based on magnitude
    function make_rad(rad) {
        new_rad = rad*18000 //adjust this as needed
        return new_rad
    }

    //chooses a fill color based on depth
    function which_fill_color(depth) {
    // https://www.minecraftskins.com/skin-editor/ -> use color wheel
    // google says 0-70 km is shallow, 70-300 intermediate, 300+ deep
    // https://earthguideweb-geology.layeredearth.com/earthguide/lessons/e/e3/e3_2.html
        if (300 <= depth) return "#fd4621"; //red
        else if (150 <= depth && depth < 300) return "#fc9a3b"; //orange
        else if (70 <= depth && depth < 150) return "#f1f901"; //yellow
        else if (0 <= depth && depth < 70) return "#0fe302"; //light green 
        else return "purple"; //in case a mistake, create an else, helped catch issues before and purple is distinct from every other color
    }

    for (m = 0; m < 1500; m++) {
        //create circle markers
        L.circle([coords_array[m][0], coords_array[m][1]], {
            //marker radius based on magnitude of earthquake
            radius : make_rad(mag_array[m]),
            color : "black",
            weight : 0.1,
            //marker color based on depth of the earthquake 
            fillColor : which_fill_color(depth_array[m]),
            fillOpacity : 0.35
        //include popups that provide additional information about the earthquake when clicked
        }).bindPopup("<strong>Magnitude: " + mag_array[m] + "</strong><br></br><strong> Located: " 
                    + data.features[m].properties.place + "</strong><br></br><strong> Depth in km: " 
                    + depth_array[m] + "</strong>").addTo(the_map)

    }

    //create a legend that will provide context for your map data
    //sets position
    legend = L.control({position : "bottomright"})

    //i dont really understand this but it works...
    //copied from one of the activities
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = ["0km to 70km", "70km to 150km", "150km to 300km", "300km or more"];
        let colors = ["#0fe302", "#f1f901", "#fc9a3b", "#fd4621"];
        let labels = [];

        // makes a title(?)
        let legendInfo = "<h1>Earthquake Depth in km</h1>" 
        // +
        //   "<div class=\"labels\">" +
        //     "<div class=\"min\">" + limits[0] + "</div>" +
        //     "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        //   "</div>";
    
        div.innerHTML = legendInfo;
    
        //i think this sets background color and text inside each background color section
        limits.forEach(function(limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"> Depth of " + limits[index] + "</li>");
        });
    
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };
      legend.addTo(the_map)

})







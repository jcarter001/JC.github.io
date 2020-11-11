/**
 * Gets the current time from moodle.converse.edu and puts that into the element
 * with id="time_text".
 */
function getTextTime() {
    updateElement('time_text', 'https://moodle.converse.edu/CSC335/timestamp.php')
}

/**
 * Creates and returns a <table> element holding the values in DATA.
 * 
 * @param {Array[string]} fields - Array holding the field names
 * @param {Array[Object]} data - Array holding the actual data, one Object per
 *           data item.  The values within each Object are keyed by field name.
 */
function makeTable(fields, data) {
        // Make the table itself
        let table = document.createElement('table');

        // Add a header row to the table
        let row = document.createElement('tr');
        for (field of fields) {
            // Capitalize the field names
            displayTitle = field[0].toUpperCase() + field.substring(1).toLowerCase()
            row.appendChild(makeAndFillElt('th', displayTitle))
        }
        table.appendChild(row);

        // Add the actual station data
        for (station of data) {
            row = document.createElement('tr');
            for (field of fields) {
                row.appendChild(makeAndFillElt('td', station[field]));
            }
            table.appendChild(row);
        }

        return table;
}


function makeMap(fields, data) {
    let div = document.createElement('div');

    // Put a heading above the map
    let h3 = document.createElement('h3');
    h3.innerHTML = 'Map of fire stations'
    div.appendChild(h3);

    const mapOptions = {
        center: { lat: 34.86441386, lng: -82.11660648},
        zoom: 10
    }

    let mapDiv = document.createElement('div');
    mapDiv.style.width = "100%";
    mapDiv.style.height = "500px";
    const map = new google.maps.Map(mapDiv, mapOptions);

    for (station of data) {
        const marker = new google.maps.Marker({
            position: { lat: station['latitude'], lng: station['longitude'] },
            title: station['name'],
            map: map
        });
    }

    div.appendChild(mapDiv)

    return div;
}

/**
 * Gets the fire-station CSV from moodle.converse.edu and displays it.
 */
function getFireStations() {
    let fn = function(req) {
        //console.log(req.responseText);
        let stations = Papa.unparse(req.responseText, 
                            { header: true, // Data has a header row for field names
                              dynamicTyping: true, // Convert numbers to actual Numbers
                              skipEmptyLines: true }); // Skip the empty line at the end
        //console.log(stations.meta);

        // Get and empty the element where all this stuff goes
        let div = document.getElementById('fire-stations');
        div.innerHTML = '';

        // Put a heading above the table
        let h3 = document.createElement('h3');
        h3.innerHTML = 'Table of fire stations'
        div.appendChild(h3);

        // Finally, add the table to the div
        div.appendChild(makeTable(stations.meta.fields, stations.data));

        // Add the map to the div
        div.appendChild(makeMap(stations.meta.fields, stations.data));
    };

    handleRequestOnCompletion(fn, 'https://moodle.converse.edu/CSC335/GSP-Fire-Stations.json');
}
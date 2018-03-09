
// Select HTML elements and assign to variables
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#searchBtn");
var $resetBtn = document.querySelector("#resetBtn");

$searchBtn.addEventListener("click", searchButtonClick);
$resetBtn.addEventListener("click", eraseText);

// Initially set filteredUfoData to dataSet to render all of the data within the file on the table.
var filteredUfoData = dataSet;

/* When opening the page, the renderDataTable function loads to load all of the data in the file named 'dataSet'
*/
function rednerTable(){
    $tbody.innerHTML = "";

    for (var i = 0; i < filteredUfoData.length; i++) {
        var dates = filteredUfoData[i];
        var fields = Object.keys(dates);
        var $row = $tbody.insertRow(i);

        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = dates[field];
        }
    }
}
rednerTable();


function searchButtonClick() {

  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  var filterDate = $dateInput.value.trim().toLowerCase()

  filteredUfoData = dataSet.filter(function(data){

    var returnState = data.state.toLowerCase();
    var returnCity = data.city.toLowerCase();
    var returnCountry = data.country.toLowerCase();
    var returnShape = data.shape.toLowerCase();
    var returnDate = data.datetime.toLowerCase();


    return (returnState === filterState || returnCity === filterCity || returnCountry === filterCountry || returnShape === filterShape || returnDate === filterDate)
    });
  renderTable();
}

function eraseText() {
    $stateInput.value = "";
    $cityInput.value = "";
    $countryInput.value = "";
    $shapeInput.value = "";
    $dateInput.value = "";
}
rednerTable();
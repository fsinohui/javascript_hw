
// Select HTML elements and assign to variables
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $clearBtn = document.querySelector("#clear");
var $pager = document.querySelector("#myPager");

$searchBtn.addEventListener("click", searchButtonClick);
$clearBtn.addEventListener("click", clearText);

// Initially set filteredUfoData to dataSet to render all of the data within the file on the table.
var filteredUfoData = dataSet;

// When opening the page, the renderDataTable function loads to load all of the data in the file named 'dataSet'

function renderTable(){
    $tbody.innerHTML = "";
    $pager.innerHTML = "";
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

function searchButtonClick() {
  
  filteredUfoData = dataSet;
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();
  var filterDate = $dateInput.value.trim();
  console.log(filterState)

  if (filterDate != '') {
    filteredUfoData = filteredUfoData.filter(function(data) {
      var dataDate = data.datetime;
      return dataDate === filterDate;
    });
  }

  if (filterShape != '') {
    filteredUfoData = filteredUfoData.filter(function(data) {
      var dataShape = data.shape.toLowerCase();
      return dataShape === filterShape;
    });
  }

  if (filterCountry != '') {
    filteredUfoData = filteredUfoData.filter(function(data) {
      var dataCountry = data.country.toLowerCase();
      return dataCountry === filterCountry;
    });
  }

  if (filterCity != '') {
    filteredUfoData = filteredUfoData.filter(function(data) {
      var dataCity = data.city.toLowerCase();
      return dataCity === filterCity;
    });
  }

  if (filterState != '') {
    filteredUfoData = filteredUfoData.filter(function(data) {
      var dataState = data.state.toLowerCase();
      console.log(dataState)
      return dataState === filterState;
    });
  }
     if (filterDate != '' || filterCity != '' || filterState != '' || filterCountry != '' || filterShape != '') {
      renderTable();
  }
}

function clearText() {
    $stateInput.value = "";
    $cityInput.value = "";
    $countryInput.value = "";
    $shapeInput.value = "";
    $dateInput.value = "";
}



//Render table on first load
renderTable();
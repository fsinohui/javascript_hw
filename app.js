
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

$.fn.pageMe = function(opts){
  var $this = this,
      defaults = {
          perPage: 7,
          showPrevNext: false,
          hidePageNumbers: false
      },
      settings = $.extend(defaults, opts);

  var listElement = $this;
  var perPage = settings.perPage; 
  var children = listElement.children();
  var pager = $('.pager');

  if (typeof settings.childSelector!="undefined") {
      children = listElement.find(settings.childSelector);
  }

  if (typeof settings.pagerSelector!="undefined") {
      pager = $(settings.pagerSelector);
  }

  var numItems = children.size();
  var numPages = Math.ceil(numItems/perPage);

  pager.data("curr",0);

  if (settings.showPrevNext){
      $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
  }

  var curr = 0;
  while(numPages > curr && (settings.hidePageNumbers==false)){
      $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
      curr++;
  }

  if (settings.showPrevNext){
      $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
  }

  pager.find('.page_link:first').addClass('active');
  pager.find('.prev_link').hide();
  if (numPages<=1) {
      pager.find('.next_link').hide();
  }
  pager.children().eq(1).addClass("active");

  children.hide();
  children.slice(0, perPage).show();

  pager.find('li .page_link').click(function(){
      var clickedPage = $(this).html().valueOf()-1;
      goTo(clickedPage,perPage);
      return false;
  });
  pager.find('li .prev_link').click(function(){
      previous();
      return false;
  });
  pager.find('li .next_link').click(function(){
      next();
      return false;
  });

  function previous(){
      var goToPage = parseInt(pager.data("curr")) - 1;
      goTo(goToPage);
  }

  function next(){
      goToPage = parseInt(pager.data("curr")) + 1;
      goTo(goToPage);
  }

  function goTo(page){
      var startAt = page * perPage,
          endOn = startAt + perPage;

      children.css('display','none').slice(startAt, endOn).show();

      if (page>=1) {
          pager.find('.prev_link').show();
      }
      else {
          pager.find('.prev_link').hide();
      }

      if (page<(numPages-1)) {
          pager.find('.next_link').show();
      }
      else {
          pager.find('.next_link').hide();
      }

      pager.data("curr",page);
      pager.children().removeClass("active");
      pager.children().eq(page+1).addClass("active");

  }
};



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
    $('#tBody').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:60});
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
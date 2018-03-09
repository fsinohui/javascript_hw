$(document).ready(function(){
  $.getJS('data.js',function(data){
    var ufo_data = '';
    $.each(data, function(key, value){
      ufo_data += '<tr>';
      ufo_data += '<td>'+ufo_data.datetime+'</td>';
      ufo_data += '<td>'+ufo_data.city+'</td>';
      ufo_data += '<td>'+ufo_data.state+'</td>';
      ufo_data += '<td>'+ufo_data.country+'</td>';
      ufo_data += '<td>'+ufo_data.shape+'</td>';
      ufo_data += '<td>'+ufo_data.durationMinutes+'</td>';
      ufo_data += '<td>'+ufo_data.comments+'</td>';
      ufo_data += '<tr>';
    })
  })
})
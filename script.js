loadJSON(function(response) {
  // Parsing JSON string into object
  var jsondata = JSON.parse(response)
  console.log(Object.keys(jsondata[0]))
  var col = [];
  window.cols = col;
  for (var i = 0; i < jsondata.length; i++) {
      for (var key in jsondata[i]) {
          if (col.indexOf(key) === -1) {
              col.push(key);
          }
      }
      break;
  }
  var pkid = col[0];
  //table pk id for editing or deleting table 
  window.pkid = pkid;
  // col.push("Actons");
  var thead = document.createElement("thead");
  var table = document.createElement("table");
  table.setAttribute('class', 'table blueTable Datagrid');
  table.setAttribute('id', 'Datagrid');


  var tr =table.insertRow(-1);
  for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
  }
  //thead.append(tr);
  for (var i = 0; i < jsondata.length; i++) {
      tr = table.insertRow(-1);
      for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          var checkdata = jsondata[i][col[j]];
              tabCell.innerHTML = jsondata[i][col[j]];
      }
      // var g = window.pkid;
      // var PktableId = jsondata[i][g];
      // tabCell.innerHTML = '<a href="#" onclick="return EditTable(' + PktableId + ')">Edit</a> | <a href="#" onclick="DeleteTable(' + PktableId + ')">Delete</a></td>'
  }
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
  pagination();
           
})  

function pagination()
{
    let options = {
        numberPerPage:20, 
        goBar:true, 
        pageCounter:true, 
    }
    let filterOptions = {
        el:'#searchBox'
    }
    paginate.init('#Datagrid', options, filterOptions)
}

function loadJSON(callback) {   
  var xobj = new XMLHttpRequest()
    xobj.overrideMimeType("application/json")
    xobj.open('GET', 'echo.json', true)
    xobj.onreadystatechange = function () {
      if (xobj.readyState === 4 && xobj.status === "200") {
        callback(xobj.responseText)
    }
  }
  xobj.send(null)
}
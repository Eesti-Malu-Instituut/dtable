
loadJSON(function(response) {
  console.log('foo')
  const jsondata = JSON.parse(response)
  let persons_container = document.getElementById('showData')
  let persons_table = document.createElement('table')
  persons_container.appendChild(persons_table)
  persons_table.id = 'persons_table'
  let table_header = persons_table.createTHead()
  let header_row = table_header.insertRow(0)
  for (label in jsondata[0]) {
    let header_cell = header_row.insertCell(0)
    header_cell.innerText = label
  }
  let table_body = persons_table.createTBody()

  jsondata.forEach(person => {
    console.log(person)
    let person_row = table_body.insertRow(0)
    person_row.id = person.jrk
    // delete(person.jrk)
    for(label in person) {
      let cell = person_row.insertCell(0)
      cell.innerText = person[label]
    }
  })
  return

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
  xobj.open('GET', './echo.json', true)
  xobj.onreadystatechange = function () {
    // console.log(xobj.readyState, xobj.status)
    if (xobj.readyState === 4 && xobj.status === 200) {
      // console.log(xobj.readyState, xobj.status)
      callback(xobj.responseText)
    }
  }
  xobj.send(null)
}
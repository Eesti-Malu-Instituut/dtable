loadJSON(function(response) {
  const jsondata = JSON.parse(response)
  let persons_container = document.getElementById('showData')
  let persons_table = document.createElement('table')
  persons_container.appendChild(persons_table)
  persons_table.id = 'persons_table'
  let table_header = persons_table.createTHead()
  let header_row = table_header.insertRow(0)
  for (label in jsondata[0]) {
    let header_cell = header_row.insertCell()
    header_cell.innerText = label
  }
  let table_body = persons_table.createTBody()

  jsondata.forEach(person => {
    let person_row = table_body.insertRow()
    person_row.id = person.jrk
    for(label in person) {
      let cell = person_row.insertCell()
      cell.innerText = person[label]
    }
  })
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
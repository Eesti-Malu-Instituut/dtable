const query_string = window.location.search
const urlParams = new URLSearchParams(query_string)
const data_name = urlParams.get('data')

Papa.parse('./data/echo_' + data_name + '.csv', {
  header: true,
  download: true,
  dynamicTyping: false,
  complete: function(results) {
    const jsondata = results.data

    let persons_container = document.getElementById('showData')
    let persons_table = document.createElement('table')
    persons_container.appendChild(persons_table)
    persons_table.id = 'persons_table'
    persons_table.className = 'styled-table'
    let table_header = persons_table.createTHead()
    let header_row = table_header.insertRow(0)
    for (label in jsondata[0]) {
      let header_cell = document.createElement("th")
      header_row.appendChild(header_cell)
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
  }
})



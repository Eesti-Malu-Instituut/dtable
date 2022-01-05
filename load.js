const query_string = window.location.search
const urlParams = new URLSearchParams(query_string)
const data_name = urlParams.get('data')

Papa.parse('./data/echo_' + data_name + '.csv', {
  header: false,
  download: true,
  dynamicTyping: false,
  complete: function(results) {
    const jsondata = results.data
    const header_rows = 3

    let persons_container = document.getElementById('showData')
    let description_container = document.getElementById('description')
    description_container.innerText = jsondata[header_rows-1][1]
    let persons_table = document.createElement('table')
    persons_container.appendChild(persons_table)
    persons_table.id = 'persons_table'
    persons_table.className = 'styled-table'
    let table_header = persons_table.createTHead()
    let header_row = table_header.insertRow(0)
    let number_of_cols = 0

    let labels = jsondata[header_rows]
    for (label of labels) {
      if (label.substr(0, 2) === 'i_') {
        continue
      }
      number_of_cols ++
      let header_cell = document.createElement("th")
      header_row.appendChild(header_cell)
      header_cell.innerText = label
    }
    let table_body = persons_table.createTBody()
  
    let header_row_counter = 0
    jsondata.forEach(person => {
      if(header_row_counter <= header_rows) {
        header_row_counter ++
        return
      }

      let person_row = table_body.insertRow()
      person_row.onclick = () => {toggle_row(person.kirjekood)}
      person_row.id = person.kirjekood
      for(label in person) {
        if (label.substr(0, 2) === 'i_') {
          continue
        }
        let cell = person_row.insertCell()
        cell.innerText = person[label]
      }

      table_body.insertRow()
      let info_row = table_body.insertRow()
      info_row.id = `info_${person.kirjekood}`
      info_row.className = 'info-row hidden'
      let cell = info_row.insertCell(0)
      cell.colSpan = number_of_cols
      let cell_el = document.createElement('div')
      cell_el.className = 'info-wrapper'
      cell.appendChild(cell_el)
      for(label in person) {
        if (label.substr(0, 2) === 'i_') {
          let label_el = document.createElement('div')
          label_el.className = 'info-label'
          label_el.innerText = label.split('_')[1]
          cell_el.appendChild(label_el)
          let value_el = document.createElement('div')
          value_el.className = 'info-value'
          value_el.innerText = person[label]
          cell_el.appendChild(value_el)
        }
      }
    })
  }
})

let visible_row_id = ''

function toggle_row(id) {
  if (visible_row_id !== '') {
    document.getElementById(`info_${visible_row_id}`).classList.add('hidden')
    document.getElementById(`${visible_row_id}`).classList.remove('active-row')
  }
  if (visible_row_id === id) {
    visible_row_id = ''
  } else {
    document.getElementById(`${id}`).classList.add('active-row')
    document.getElementById(`info_${id}`).classList.remove('hidden')
    visible_row_id = id
  }
}
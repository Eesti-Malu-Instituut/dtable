const query_string = window.location.search
const urlParams = new URLSearchParams(query_string)
const data_name = urlParams.get('data')
const language = urlParams.get('lang', 'et')

Papa.parse('./data/echo_' + data_name + '.csv', {
  header: false,
  download: true,
  dynamicTyping: false,
  complete: function(results) {
    const jsondata = results.data
    const header_rows = 4

    let persons_container = document.getElementById('showData')
    let description_container = document.getElementById('description')
    let persons_table = document.createElement('table')
    persons_container.appendChild(persons_table)
    persons_table.id = 'persons_table'
    persons_table.className = 'styled-table'
    let table_header = persons_table.createTHead()
    let header_row = table_header.insertRow(0)
    let number_of_cols = 0


    let meta = jsondata.slice(1, header_rows).filter(r => r[0] === language)[0]
    const page_title = meta[1]
    const page_lead = meta[3]
    console.log({language, page_title, page_lead})
    description_container.innerText = page_lead
    document.title = page_title


    let labels = jsondata[header_rows]
    console.log({labels})
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
      person_row.onclick = () => {toggle_row(person[0])}
      person_row.id = person[0]
      for(ix in person) {
        if (labels[ix].substr(0, 2) === 'i_') {
          continue
        }
        let cell = person_row.insertCell()
        cell.innerText = person[ix]
        cell.className = labels[ix]
      }

      table_body.insertRow()
      let info_row = table_body.insertRow()
      info_row.id = `info_${person[0]}`
      info_row.className = 'info-row hidden'
      let cell = info_row.insertCell(0)
      cell.colSpan = number_of_cols
      let cell_el = document.createElement('div')
      cell_el.className = 'info-wrapper'
      cell.appendChild(cell_el)
      for(ix in person) {
        if (labels[ix].substr(0, 2) === 'i_') {
          let label_el = document.createElement('div')
          label_el.className = 'info-label'
          label_el.innerText = labels[ix].split('_')[1]
          cell_el.appendChild(label_el)
          let value_el = document.createElement('div')
          value_el.className = 'info-value'
          value_el.innerText = person[ix]
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
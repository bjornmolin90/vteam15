import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

//installera: npm install react-bootstrap bootstrap@5.1.3 bootstrap
  
function Elscooters(){
  const url = "http://localhost:1338/map?id=";
  const data=[
      {
          "stad":"Malmö",
          "id":"0",
      },
      {
         "stad":"Göteborg",
         "id":"1",
      },
      {
          "stad":"Stockholm",
          "id":"2",
      }
  ]
  const tableRows=data.map(
      (element)=>{
          return( 
              
            <tr key={element.id}>
              <td><a href={url + element.id}>{element.stad}</a></td>
            </tr>
              
          )
      }
  )
  return(
      <div>
          
        <Table hover>
            <thead>
              <tr>    
                <th>Alla städer</th>
              </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </Table>      
            
      </div>
  )
}
export default Elscooters;

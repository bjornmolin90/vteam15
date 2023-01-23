import React from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

//installera: npm install react-bootstrap bootstrap@5.1.3 bootstrap
  
function Elscooters(){
  const data=[
      {
          "Stad":"Malmö",
      },
      {
         "Stad":"Göteborg",
      },
      {
          "Stad":"Stockholm",

      }
  ]
  const tableRows=data.map(
      (element)=>{
          return( 
              
            <tr>
              <td><a href="http://localhost:3000/elscooter">{element.Stad}</a></td>
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

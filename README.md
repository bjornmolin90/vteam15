# vteam15

## Start av alla delar i systemet.

1. Server: startas med kommandot `docker-compose -d server`, innehåller API:t och bike-programmet.
2. Adminweb: startas med kommandot `docker-compose -d adminweb`. Endpoint `http://localhost:1338`
3. Customermobile: startas med kommandot `docker-compose -d customermobile`. Endpoint - `http://localhost:1338`
4. Customerwebb: startas med kommandot `docker-compose -d customerwebb`. Endpoint - `http://localhost:1338`
5. Database: startas med kommandot `docker-compose -d database`. 

Man kan starta alla fem containrarna på en gång genom att använda kommandot `docker-compose -d up`, eller starta dem individuellt genom att använda deras specifika kommandon som nämnts ovan.

## Start av simulering.

1. Systemet startas med kommandot `docker-compose -d up`.
2. För att simulera systemet i drift, kör endpointen `http://localhost:1337/simulation`. Observera att cyklar och användare skapas vid detta endpoint så det kan ta omkring en minut innan cyklarnas rörelser syns på kartan.
3. På admin-sidan kan man se kartan över cyklarnas rörelser på `http://localhost:1338/map?id=2`.

## För varje delsystem, Var ligger koden?
Delsystemen arbetar tillsammans på följande sätt, adminweb, customermobile och customerwebb kommunicerar med servern. 
Servern kommunicerar med databasen.

Servern som finns i mappen [Backend](https://github.com/bjornmolin90/vteam15/tree/dev/backend) har en mappstruktur som är utformad för att fungera på följande sätt: 
- [index.js](https://github.com/bjornmolin90/vteam15/blob/dev/backend/index.js) startar servern och lyssnar på förfrågningar. 
- [Routes](https://github.com/bjornmolin90/vteam15/tree/dev/backend/routes) fångar upp alla förfrågningar, t.ex. `http://localhost:1337/api/v01/user`, och kommunicerar vidare till controllers. 
- [Controller](https://github.com/bjornmolin90/vteam15/tree/dev/backend/controller) hanterar route-förfrågningar och avgör vilka tjänster som ska utföras, t.ex. inloggning och hämtning av alla cyklar. 
- [Services](https://github.com/bjornmolin90/vteam15/tree/dev/backend/services) består av olika metoder och här skickar man förfrågningar till databasen med hjälp av models, i services innehåller även bike-intelligensen i mappen [bikeProgram](https://github.com/bjornmolin90/vteam15/tree/dev/backend/services/bikeProgram).
- I [models](https://github.com/bjornmolin90/vteam15/tree/dev/backend/models) skrivs databasförfrågningar, syftet är att skilja vanlig kod från databaskod här. 
- [Config](https://github.com/bjornmolin90/vteam15/tree/dev/backend/config) består av projektkonfigurationer, t.ex. användarnamn och lösenord till databasen.

## Api dokumentation

Metod | Endpoint | Beskrivning | Exempel på POST & PUT
---|---|---|---
GET | /api/v01/bike | Hämtar information om alla registrerade cyklar. | -
GET | /api/v01/bike/{id} | Hämtar information om en cykel med specificerat ID. | -
POST | /api/v01/bike | Registrerar en ny cykel i systemet. | Json - {"city": "stockholm", "parking": "on-street", "charging_status":"100", "available_status":"ledig", "m_location": "59.338758, 18.052715", "speed": "0"}
DELETE | /api/v01/bike | Tar bort alla registrerade cyklar. | -
DELETE | /api/v01/bike/{id} | Tar bort en cykel med specificerat ID. | -
GET | /api/v01/city/{city} | Hämtar information om alla cyklar och laddstationer i en viss stad. | -
GET | /api/v01/bikeride/bike/{id} | Hämtar alla cykelturer för en specificerad cykel. | -
GET | /api/v01/bikeride/user/{id} | Hämtar alla cykelturer för en specificerad användare. | -
GET | /api/v01/bikeride | Hämtar information om alla registrerade cykelturer. | -
POST | /api/v01/bikeride | Startar en ny cykeltur i systemet. | Json - {"bikeId":7, "userId":1}
PUT | /api/v01/bikeRide/stop | Avslutar och registrerar en pågående cykeltur. | Json - {"bike_id": 7,"startTime": "2023-01-03T15:54:32.788Z","startLocation": "59.42755469191417, 18.080686541663738","user_id": 1}
GET | /api/v01/user/{id} | Hämtar information om en specificerad användare. | -
GET | /api/v01/user | Hämtar information om alla registrerade användare. | -
POST | /api/v01/user | Registrerar en ny användare i systemet. | Json - {"username": "username","u_type": "kund","u_password": "123","firstname": "förnamn","lastname": "efternamn","adress": "adress 1a","postcode": "31123","city": "Stockholm","saldo": 1000}
DELETE | /api/v01/user/ | Tar bort alla registrerade användare. | -


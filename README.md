*********************
Fontos! 
( "react-router-dom": "^6.2.1" ,
    "firebase": "^9.6.7" ,
    "@mui/material": "^5.4.0" )

- Kell készítened egy " env.local " file amiben amiben tároljuk a kapcsolódási adatokat.
- Github az " env.local " file nem tölti fel. 
- Azért szervezzük át ide a kapcsolódási adatokat mert nem akarjuk hogy más lássa őket. (Biztonsági okok miatt) 

*********************
Important!
( "react-router-dom": "^6.2.1" ,
    "firebase": "^9.6.7" ,
    "@mui/material": "^5.4.0" )

- You need to create an "env.local" file in which to store the connection data.
- Github does not upload the "env.local" file.
- Let's reorganize the contact information here because we don't want anyone else to see it. (For security reasons)

*********************
" env.local " -> 

REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_DATABASE_URL=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

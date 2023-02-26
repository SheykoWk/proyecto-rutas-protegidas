const {createNewUser} = require( './users.controllers' )

createNewUser( 
    // {
    //     firstName : 'Pedro',
    //     lastName : 'Sanchez',
    //     email: 'example6@example.com',
    //     password: 'pedro_1123',
    //     phone : '+52 6441 128  '
    // }
    
    {
        id: '280ca98b-3c7e-4a3c-9a5a-0089aca1972f',
        firstName: 'Marco',
        lastName: 'Gonzalez',
        email: 'marquito@gmail.com',
        password: 'root123'
    } )
    .then( data => console.log({password:data.password}) )
    .catch( err => console.log({error:err.message}) )
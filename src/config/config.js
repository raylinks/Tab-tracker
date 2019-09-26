module.exports = {
    port:  process.env.PORT || 8081,
    db:{
        database:process.env.DB_NAME  || 'tabtracker',
        user:process.env.DB_USER || 'tabtracker',
        password:process.env.DB_PASS || 'tabtracker',
        options: {
            host: process.env.HOST || 'localhost',
            dialect: process.env.DIALECT || 'postgres' ,
            dialectOptions: {
                ssl: process.env.DATABASE_SSL || false
              },
              dialectModule: require('pg')
            
           // storage: './tabtracker.sqlite'
        }
    }
}
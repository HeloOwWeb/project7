const env = {
    database: '',
    username: '',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  
  module.exports = env;
  /*
  const mdpAccessAdmin = 'CocoLAsticot0480';
  module.exports = mdpAccessAdmin;
  
  {
    "development": {
      "username": "root",
      "password": null,
      "database": "database_development",
      "host": "localhost",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "localhost",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "localhost",
      "dialect": "mysql"
    }
  }
  */
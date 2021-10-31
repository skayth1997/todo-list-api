# TODO-LIST-APP

## Installation

### Insert DB from ./database.sql
```bash
psql root -d db -f database.sql
```

###Create config file.

Config file example <<default.json>>
```
"jwtSecret": "[@%3xe)dfsdmw9rw8h98wdsk6xib?G38sjj9?",
"postgres": {
    "poolSize": 5,
    "host": "localhost",
    "port": 5432,
    "database": "db",
    "user": "root",
    "password": "password",
    "ssl": false
}
```

### Install node_modules
```bash
npm i
```

### Run project
```bash
node bin/www.js
```

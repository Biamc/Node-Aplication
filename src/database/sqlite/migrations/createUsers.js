const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  users_name VARCHAR, 
  users_email VARCHAR,  
  users_password VARCHAR,
  users_avatar,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  edited_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

module.exports = createUsers
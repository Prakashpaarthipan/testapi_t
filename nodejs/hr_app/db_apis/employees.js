const database = require('../services/database.js');

const baseQuery = 
 'select * from employee_office';

async function find(context) {
  let query = baseQuery;
  const binds = {};

  if (context.id && !context.fname) {
    binds.empcode = context.id;
    query += '\nwhere empcode= :empcode';
  }

  if (context.id==0 && context.fname) {
    binds.empname = context.fname;
    query += "\nwhere empname LIKE :empname || '%'";
  }
  console.log(query);
  const result = await database.simpleExecute(query, binds);

  return result.rows;
}

module.exports.find = find;
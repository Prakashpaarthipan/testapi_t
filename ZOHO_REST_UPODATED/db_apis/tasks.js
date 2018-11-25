const database = require('../services/database.js');



async function get(context)
{ try
  {
    var query="select * from taskdet where taskid= :taskid";
    console.log(query);
    const result = await database.simpleExecute(query,context);
    //console.log(result);, APPRTNG= :RATING, APPRTNG= :RATING
    return result.rows;
  }
  catch (e)
  {
    console.log(e);
    return({
      'error':e
    });
  }
}
async function approve(context)
{ try
  {
    console.log(context);
    var query="update taskdet set APPSTAT= :STATUS,APPRTNG= :RATING,APPDTM= :DATE1 WHERE TASKID= :TASKID";
    console.log(query);
    const result = await database.simpleExecute(query,context);
    return result;
  }
 catch (e)
 {
  console.log(e);
  return({
    'error':e
  });
 }

}
async function multi(context)
 {
   try
   {
     console.log(context);
     var query="update taskdet set APPSTAT= :STATUS,APPRTNG= :RATING,APPDTM= :DATE1 WHERE TASKID= :TASKID";
     console.log(query);
     //console.log()
     const result = await database.multiExecute(query,context);
     return result;
   }catch(e)
   {
      console.log(e);
      return({
        'error':e
      });
   }

}

async function getempTask(context)
{ try
  {
    console.log(context);
    var query="select * from taskdet where OWNNAME= :name and APPSTAT IS NULL order by taskid desc";
    console.log(query);
    const result = await database.simpleExecute(query,context);
    return result;
  }
  catch(e)
  {
    console.log(e);
    return({
      'error':e
    });
  }
}

module.exports.getempTask=getempTask;
module.exports.get = get;
module.exports.approve=approve;
module.exports.multi=multi;

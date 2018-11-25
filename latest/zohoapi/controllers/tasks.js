const tasks = require('../db_apis/tasks.js');
const ignorecase=require('ignore-case');
const promise=require('es6-promise');
const fs=require('fs');
async function get(req, res, next)
{
  try{
        var context ={
          'TASKID' : req.params.id
        };
        url=req.url;
        var from=url.split('/');

        if(ignorecase.equals(from[1],'taskid'))
        {
            const rows=await tasks.get(context);

            if(Object.keys(rows).length !=0)
            {
                res.status(200).send(rows[0]);
                next();
            }
            else{
              res.send({
                'error':"RESOURCE NOT FOUND"
              });
              next();
            }
        }
        else if (ignorecase.equals(from[1],'approve'))
        {
            if(req.query.status!=null&&req.query.rating!=null&&req.query.date)
            {
              context['STATUS']=req.query.status;
              context['RATING']=req.query.rating;
              context['DATE1']=req.query.date;
              const result=await tasks.approve(context);
              console.log(result);
              res.status(200).send(result);
              next();
            }
            else {
              res.send({
                'error':"INSUFFIENT DATA"
              });
              next();
            }

        }
  }
  catch(e){
      console.log(e);
  }
  next();
}
async function multi(req, res, next)
{
      try{
        var context = "";
        context=await getbody(req);
        //console.log(context);
        const result=await tasks.multi(context);
        console.log(result);
        res.status(200).send(result);
        next();
      }
      catch(e){
          console.log(e);
          next();
      }

}
async function getempTask(req, res, next)
{
    var context ={
      'name' : req.params.name
    };
	console.log(req.params.approvedStatus);
	if(req.params.approvedStatus!='-1' && req.params.approvedStatus!='0')
		context['approvedStatus']= req.params.approvedStatus;
    const result=await tasks.getempTask(context,req.params.approvedStatus);
    if(result.rows!=null)
    {
      console.log(result);
      res.status(200).send(result.rows);
    }
    else {
        res.status(200).send({
          'error':"RESOURCE NOT FOUND"
        });
    }

    next();
}
async function getprojects(req, res, next)
{
	 var context ={
      'name' : req.params.name
    };
	const result=await tasks.getprojects(context);
	
	if(result.rows!=null)
    {
      console.log(result);
      res.status(200).send(result.rows);
    }
    else {
        res.status(200).send({
          'error':"RESOURCE NOT FOUND"
        });
    }

    next(); 
}

async function getprojecttasks(req, res, next)
{
    var context ={
      'name' : req.params.name,
	  'projectid': req.params.projectid
    };
	console.log(req.params.approvedStatus);
	
	if(req.params.approvedStatus!='-1' && req.params.approvedStatus!='0')
		context['approvedStatus']= req.params.approvedStatus;
    const result=await tasks.getprojecttasks(context,req.params.approvedStatus);
    if(result.rows!=null)
    {
      console.log(result);
      res.status(200).send(result.rows);
    }
    else {
        res.status(200).send({
          'error':"RESOURCE NOT FOUND"
        });
    }

    next();
}
var strpass;
var pass='';
var k=50;
var len;
async function getuserdetails(req, res, next)
{
    var context ={
      'USRCODE' : req.params.usercode,
	  'USRPASS': req.params.userpass
    };
	
	strpass= req.params.userpass.split('');
	len = strpass.length;
	for (var i = 0; i < len; i++) {
		await getpass(i,k);
		k=k+15;
	}
	console.log(pass);
	context['USRPASS'] = pass; 
	
    const result=await tasks.getuserdetails(context);
    if(result.rows!=null)
    {
      console.log(result);
      res.status(200).send(result.rows);
    }
    else {
        res.status(200).send({
          'error':"USER NOT FOUND"
        });
    }

    next();
}

function getpass(i)
{	return new promise(resolve=>{
			var j =strpass[i].charCodeAt();	
			j = j+k;
			if(j>=255) j=j-200;
			console.log(j);
			pass=pass+String.fromCharCode(j);							
			resolve();
	});
	
}

function getbody(req)
{ return new promise((resolve)=>
  {     var body='';
        req.on('data', function (chunk)
        {
          body += chunk;
        });
        req.on('end', function ()
        {
          var jbody = JSON.parse(body);
          resolve(jbody);
        })
  });
}

module.exports.multi = multi;
module.exports.get = get;
module.exports.getempTask = getempTask;
module.exports.getprojects = getprojects;
module.exports.getprojecttasks = getprojecttasks;
module.exports.getuserdetails = getuserdetails;

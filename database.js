const {createPool}=require('mysql');

const pool=createPool({
    host:'localhost',
    user:'root',
    database:'john',
    password:'John@mdu05',
    connectionLimit:10
})


pool.query(`select * from GNproduction`,(res,err)=>
{
    if (err) {
        console.error(err);
        return pool.end();
    }
    console.log(res)
});
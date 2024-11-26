
import {client} from '../app.js'

async function init(req,res){
    const result = await client.get('user:1')
    res.send(`<h1>${result}</h1>`)
}


export default init
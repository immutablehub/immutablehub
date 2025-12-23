async function CloneNew(folder,pinata,client){

    
    const db = client.db("ihub_db");
    const coll = db.collection("ihub_col");
    const targetManifestId= fs.readFileSync(FILE_TO_STORE_LOGIN,'utf8');
    const doc = await coll.findOne({
        "owner": "system",
        "manifests.id": targetManifestId 
    });
    if(doc) {

        let uploads=null
        let manifests=doc.manifests
    

    for(let obj of  manifests){
        
        let dbfolder=String(obj.folder)

          if(obj.id==targetManifestId && dbfolder==folder){
              console.log(obj.folder)
              uploads=obj.uploads
              fs.mkdirSync(folder)
           }

    

        }
        console.log(uploads)
  
    for(let obj of uploads){

        await getFileNew(folder,obj,pinata)
       
    }

  }}

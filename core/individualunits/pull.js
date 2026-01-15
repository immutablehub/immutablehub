async function Pull(folder,pinata,client,mcp,prompt){

    
     let db = client.db("ihub_db");
     let coll = db.collection("ihub_col");

      if (mcp == true){

            db = client.db("ihub_db");
            coll = db.collection("mcp_registry");

      }
      else if(prompt == true){
            db = client.db("ihub_db");
            coll = db.collection("prompt_comp");
      }


    const targetManifestId= fs.readFileSync(FILE_TO_STORE_LOGIN,'utf8');
    const doc = await coll.findOne({
          "owner": "system",
    });
    if(doc) {

        let uploads=null
        let bundle=null
        let manifests=doc.manifests
    

    for(let obj of  manifests){
        
        let dbfolder=String(obj.folder)

          if(obj.id==targetManifestId && dbfolder==folder){
              console.log(obj.folder)
              uploads=obj.uploads
           }

    

        }
        console.log(uploads)
  
    for(let obj of uploads){

        let name=obj.name
        const isIncluded = name.includes(".history.bundle");
        if(isIncluded) {

                bundle=obj.cid

          }}
       
          await UpdateRepo(bundle,pinata)
    
    }}

async function getFolders(){


    const targetManifestId= fs.readFileSync(FILE_TO_STORE_LOGIN, 'utf8');
    const doc = await coll.findOne({
        "owner": "system",
        "manifests.id": targetManifestId 
    });
    let folders=[]
    let uploads=[]
    if(doc) {

        let manifests=doc.manifests

         for(let obj of  manifests){
        
      
          if(obj.id==targetManifestId){
              console.log(obj.folder)
              folders.push(obj.folder)
          }

        }


    }

  for(let fname of folders){

     let data=await getFiles(fname)
     uploads.push(data)

  }



}

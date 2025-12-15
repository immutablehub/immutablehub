async function getFiles(folder) {

    const targetManifestId= fs.readFileSync(FILE_TO_STORE_LOGIN, 'utf8');
    const doc = await coll.findOne({
        "owner": "system",
        "manifests.id": targetManifestId 
    });
    let uploads=null
     if(doc) {

        
        let manifests=doc.manifests
    

    for(let obj of  manifests){
        
        let dbfolder=String(obj.folder)

          if(obj.id==targetManifestId && dbfolder==folder){
              console.log(obj.folder)
              uploads=obj.uploads
           }

    

        }
        
        
      }


  console.log("docs",uploads)
  const fetchPromises = uploads.map(obj => {
    const url = `IPFSGATEWAY/ipfs/${obj.cid}`;
    
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${obj.name} (CID: ${obj.cid}): ${response.status}`);
        }
        
        return response.text();
      })
      .then(content => {
        return { 
          name: obj.name, 
          cid: obj.cid,
          content: content 
        };
      })
      .catch(error => {
        console.error(`Error processing file ${obj.name}:`, error);
        
        return { 
          name: obj.name, 
          cid:obj.cid,
          content: `ERROR: Could not fetch file content. Details: ${error.message}` 
        };
      });
  });

const structuredResultsArray = await Promise.all(fetchPromises);
  
return structuredResultsArray;
  
}

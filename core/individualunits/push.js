async function Push(FOLDER_TO_UPLOAD,pinata,client,mcp,prompt) {

     try {

        let db = client.db("ihub_db");
        let coll = db.collection("ihub_col");

        if (mcp ==true){

            db = client.db("ihub_db");
            coll = db.collection("mcp_registry");

        }
        else if(prompt ==true){
            db = client.db("ihub_db");
            coll = db.collection("prompt_comp");
        }

        

        //let uploads=[]
        const absolutePath = path.resolve(FOLDER_TO_UPLOAD);
        let files=dirtoFileArray(absolutePath)

/*
        for (let file of files) {

            const upload=await pinata.upload.public.file(file)
            uploads.push(upload)
        }
*/
        


        const limit = pLimit(5); //  5 concurrent uploads
        const uploadPromises = files.map(file =>
          limit(() => pinata.upload.public.file(file))
        );

        const uploads = await Promise.all(uploadPromises);
        console.log(uploads)
        const data = fs.readFileSync(FILE_TO_STORE_LOGIN, 'utf8');
        const lastpath = path.basename(absolutePath);

        let meta={"id":data,"folder":lastpath,"uploads":uploads,"is_latest":true}


        let docalreadyexists=await manifestExists(data,lastpath,client)
        if (docalreadyexists){
             //await deleteManifest(data,lastpath,client,mcp,prompt)
             await deactivateOlderVersions(data,lastpath,mcp,prompt)
        }

        await coll.findOneAndUpdate(
            {"owner":"system"},
            {
            $push: {
            manifests: meta
            }})
     }
     catch(e){

      console.log(e)
      
     }

}

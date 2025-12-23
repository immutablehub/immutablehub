
async function Push(FOLDER_TO_UPLOAD,pinata,client) {

     try {


        const db = client.db("ihub_db");
        const coll = db.collection("ihub_col");

        let uploads=[]
        const absolutePath = path.resolve(FOLDER_TO_UPLOAD);
        let files=dirtoFileArray(absolutePath)

        for (let file of files) {

            const upload=await pinata.upload.public.file(file)
            uploads.push(upload)
        }


        console.log(uploads)
        const data = fs.readFileSync(FILE_TO_STORE_LOGIN, 'utf8');
        const lastpath = path.basename(absolutePath);

        let meta={"id":data,"folder":lastpath,"uploads":uploads,"is_latest":true}


        let docalreadyexists=await manifestExists(data,lastpath,client)
        if (docalreadyexists){
             await deleteManifest(data,lastpath,client)
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

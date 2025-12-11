
async function Push(FOLDER_TO_UPLOAD) {

     try {

          let uploads=[]
          let files=dirtoFileArray(FOLDER_TO_UPLOAD)
          for (let file of files) {
              const upload=await pinata.upload.public.file(file)
              uploads.push(upload)
          }
          console.log(uploads)
          const data = fs.readFileSync(FILE_TO_STORE_LOGIN, 'utf8');
          let meta={"id":data,"folder":FOLDER_TO_UPLOAD,"uploads":uploads}
          await coll.findOneAndUpdate(
              {"owner":"system"},
              { $push: {manifests: meta } })
      }catch(e){
       
       console.log(e)
      
     }

}

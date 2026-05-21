
async function Host(folder,client){

  let token=await getToken()
  const TT = Buffer.from(token.hft, 'base64').toString('utf-8');
  const targetManifestId= fs.readFileSync(FILE_TO_STORE_LOGIN,'utf8');
  const absolutePath = path.resolve(folder);
  const lastName = path.basename(absolutePath);
  console.log(lastName);
  const spaceName = `hostinginfra/${lastName}_${targetManifestId}`;
  const files = [
    {
      path: "Dockerfile",
      content: `
        #Use a slim Node.js image for faster builds
        FROM node:18-slim

        #Create and define the working directory
        WORKDIR /app
    
        #Copy package.json and package-lock.json first for better caching
        COPY package*.json ./
        
        #Install dependencies
        RUN npm install

        #Copy the rest of your application code
        COPY . .

        #Hugging Face Spaces require port 7860
        EXPOSE 7860
        
        #Start the application
        CMD ["node", "index.js"]

      `.trim(),
    },
    {
      path: "README.md",
      content: [
      '---',
      'title: Docker Space',
      'emoji: 🐳',
      'colorFrom: blue',
      'colorTo: blue',
      'sdk: docker',
      'app_port: 7860', // Highly recommended 
      'pinned: false',
      '---'
    ].join('\n')
    },
  ];

console.log("checking space")
let exists=await ensureSpaceExists(spaceName,TT)
if(exists)  {



let rawFiles=dirtoFileArray(absolutePath)
console.log(rawFiles)

const filesToUpload = rawFiles
    .filter(file => {
      // Replicating your "cleanedFiles" logic
      const isIgnored = file.name === "package-lock.json" || file.name.includes(".history.bundle");
      return !isIgnored;
    })
    .map(file => {
      
      return {
        path: file.name,    
        content: file     
      };
    });

    //let allFiles=[...files,...filesToUpload]
    const finalFiles = [...files, ...filesToUpload].map(f => ({
      path: f.path,
      //We wrap in a new Blob to strip the 'File' prototype that is causing the error
      content: new Blob([f.content]) 
    }));



     console.log("now uploading")
      await uploadFiles({
              repo: { type: "space", name: spaceName },
              accessToken: TT,
              files: finalFiles
          });



     let db=client.db("ihub_db")
     let coll=db.collection("hosted")

     
     await coll.insertOne({"id":targetManifestId,"app":folder,"space":`https://huggingface.co/spaces/${spaceName}`})
     console.log(`https://huggingface.co/spaces/${spaceName}`)
    
  
  }
  else{
    console.log("error in hosting")
  }
}


async function HostPython(folder,client){


  let token=await getToken()
  const TT = Buffer.from(token.hft,'base64').toString('utf-8');
  const targetManifestId= fs.readFileSync(FILE_TO_STORE_LOGIN,'utf8');
  const absolutePath = path.resolve(folder);
  const lastName = path.basename(absolutePath);
  console.log(lastName);
  const spaceName = `hostinginfra/${lastName}_${targetManifestId}`;
  const files = [
    {
      path: "Dockerfile",
      content: `
      # Use a slim Python image
      FROM python:3.11-slim

      # Set working directory
      WORKDIR /app

      # Prevent Python from writing .pyc files & enable logs immediately
      ENV PYTHONDONTWRITEBYTECODE=1
      ENV PYTHONUNBUFFERED=1

      # Install system dependencies (optional but useful)
      RUN apt-get update && apt-get install -y build-essential && rm -rf /var/lib/apt/lists/*

    # Copy requirements first (for caching)
      COPY requirements.txt .

    # Install dependencies
      RUN pip install --no-cache-dir -r requirements.txt

    # Copy the rest of the app
      COPY . .

    # Hugging Face Spaces / typical FastAPI port
      EXPOSE 7860

    # Run FastAPI using uvicorn
      CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
      `.trim(),
    },
    {
      path: "README.md",
      content: [
      '---',
      'title: Docker Space',
      'emoji: 🐳',
      'colorFrom: blue',
      'colorTo: blue',
      'sdk: docker',
      'app_port: 7860', // Highly recommended since you EXPOSE 7860
      'pinned: false',
      '---'
    ].join('\n')
    },
  ];

console.log("checking space")
let exists=await ensureSpaceExists(spaceName,TT)
if(exists)  {



let rawFiles=dirtoFileArray(absolutePath)
console.log(rawFiles)

const filesToUpload = rawFiles
    .filter(file => {
      // Replicating your "cleanedFiles" logic
      const isIgnored =  file.name.includes(".history.bundle");
      return !isIgnored;
    })
    .map(file => {
      
      return {
        path: file.name,    
        content: file     
      };
    });

    //let allFiles=[...files,...filesToUpload]
    const finalFiles = [...files, ...filesToUpload].map(f => ({
      path: f.path,
      //We wrap in a new Blob to strip the 'File' prototype that is causing the error
      content: new Blob([f.content]) 
    }));



     console.log("now uploading")
      await uploadFiles({
              repo: { type: "space", name: spaceName },
              accessToken: TT,
              files: finalFiles
          });



     let db=client.db("ihub_db")
     let coll=db.collection("hosted")

     
     await coll.insertOne({"id":targetManifestId,"app":folder,"space":`https://huggingface.co/spaces/${spaceName}`})
     console.log(`https://huggingface.co/spaces/${spaceName}`)
    
  
  }
  else{
    console.log("error in hosting")
  }
}

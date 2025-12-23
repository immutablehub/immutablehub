
async function getFile(folder,cid,pinata) {
  
    const result = await pinata.gateways.public.get(cid)
    const Data = result.data;
    console.log(Data)
    const arrayBuffer = await Data.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer);
    console.log(buffer)

  
    deleteFilesWithExtension(".history.bundle",".")


    let dynamicstring=crypto.randomUUID()
    let shortID = dynamicstring.substring(0, 5)
    let bpath=`${shortID}.history.bundle`

    fs.writeFileSync(`${bpath}`,buffer);

    const absolutePath  = path.resolve(folder);

     if (fs.existsSync(absolutePath)){
      fs.rmSync(absolutePath, { recursive: true, force: true });
     }


    fs.mkdirSync(absolutePath, { recursive: true });

    execSync(`git clone ${bpath} ${absolutePath}`, {
      cwd: ".",
      stdio: 'inherit'
    });
    console.log("cloned successfully")

}

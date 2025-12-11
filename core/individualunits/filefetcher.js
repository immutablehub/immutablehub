//IPFS decentralized immutable storage

async function getFile(cid) {
  
    const result = await pinata.gateways.public.get(cid)
    const Data = result.data;
    console.log(Data)
    const arrayBuffer = await Data.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer);
    console.log(buffer)
    let dynamicstring=crypto.randomUUID()
    let shortID = dynamicstring.substring(0, 5)
    let bpath=`${shortID}.history.bundle`
    fs.writeFileSync(`${bpath}`,buffer);
    execSync(`git clone ${bpath}`, {
      cwd: ".",
      stdio: 'inherit'
    });
    console.log("cloned successfully")

}

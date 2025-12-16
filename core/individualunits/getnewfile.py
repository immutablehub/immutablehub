async function  getFileNew(folder,obj) {

  const result = await pinata.gateways.public.get(obj.cid)
    const Data = result.data;
    
    const filePath = path.join(folder, obj.name);
    fs.writeFileSync(`${filePath}`,Data,"utf-8");
    console.log("successfull")  
}

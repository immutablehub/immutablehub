  async function deleteManifest(targetManifestId, foldername,client) {


    const db = client.db("ihub_db");
    const coll = db.collection("ihub_col");
    await coll.updateOne(
        { owner: "system" },
      {
        $pull: {
          manifests: {
            id: targetManifestId,
            folder: foldername
          }
        }
      }
  );
  
}

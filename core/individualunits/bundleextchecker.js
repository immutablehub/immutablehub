import fs from "fs"

function fileWithExtensionExists(extension) {
  try {
    const files = fs.readdirSync('.');
    const exists = files.some(fileName => 
      fileName.endsWith(extension)
    );

    return exists;
    
  } catch (error) {
    console.error(`Error checking directory: ${error.message}`);
    return false;
  }
}

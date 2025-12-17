function deleteFilesWithExtension(extension, folder) {
  try {
    const files = fs.readdirSync(folder);

    for (const file of files) {
      if (file.endsWith(extension)) {
        const fullPath = path.join(folder, file);
        fs.unlinkSync(fullPath);
        console.log(`🗑️ Deleted old bundle: ${file}`);
      }
    }
  } catch (err) {
    console.error(`Error deleting bundle files: ${err.message}`);
  }
}

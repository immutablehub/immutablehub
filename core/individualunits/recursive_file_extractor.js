import fs from "fs"
import path from "path";
/**
 * Get all files from a directory recursively
 * @param {string} dir - Directory path
 * @param {string[]} fileList - Accumulator for file paths
 * @returns {string[]} Array of file paths
 */
function getAllFiles(dir, fileList = []) {


  const skipDirs = ['node_modules', '.git', 'dist', 'build', '.next', 'coverage'];
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {

    if (skipDirs.includes(file)) return;
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}


/**
 * Get MIME type from file extension
 * @param {string} fileName - File name
 * @returns {string} MIME type
 */
function getMimeType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const types = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.xml': 'application/xml',
    '.csv': 'text/csv',
    '.md': 'text/markdown',
  };
  return types[ext] || 'application/octet-stream';
}

/**
 * Convert file paths to File objects 
 * @param {string} dirPath - Directory path
 * @returns {File[]} Array of File objects
 */
export default function dirToFileArray(dirPath) {
  const filePaths = getAllFiles(dirPath);
  
  return filePaths.map(filePath => {
    const buffer = fs.readFileSync(filePath);
    const fileName = path.relative(dirPath, filePath);
    const mimeType = getMimeType(fileName);
    return new File([buffer], fileName,{type:mimeType});
  });
}

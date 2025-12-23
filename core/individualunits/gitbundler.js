import { execSync } from "child_process";
import * as crypto from "crypto"
import path from "path";



function gitBundler(FOLDER_TO_UPLOAD){


    let dynamicstring=crypto.randomUUID()
    let shortID = dynamicstring.substring(0, 5)
    let bpath=`${shortID}.history.bundle`
    let patternexists=fileWithExtensionExists(".history.bundle",FOLDER_TO_UPLOAD);
    if(patternexists){
        deleteFilesWithExtension(".history.bundle", FOLDER_TO_UPLOAD);
    }

    const bundlePath = path.join(FOLDER_TO_UPLOAD,bpath);
    execSync(`git bundle create ${path.basename(bundlePath)} --all`, {
      cwd: FOLDER_TO_UPLOAD,
      stdio: 'inherit'
    });
    const bundleSize = fs.statSync(bundlePath).size;
    console.log(`✓ Bundle created: ${(bundleSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Location: ${bundlePath}\n`);


  }


import { execSync } from "child_process";
import * as crypto from "crypto"
import path from "path";


function gitBundler(FOLDER){


    let dynamicstring=crypto.randomUUID()
    let bpath=`${dynamicstring}.history.bundle`
    let patternexists=fileWithExtensionExists(".history.bundle");
    if(patternexists) {
        console.log("path already exists")
    }
    else {

      const bundlePath = path.join(FOLDER,bpath);
      execSync(`git bundle create ${path.basename(bundlePath)} --all`, {
          cwd: FOLDER,
          stdio: 'inherit'
        });
      const bundleSize = fs.statSync(bundlePath).size;
      console.log(`✓ Bundle created: ${(bundleSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  Location: ${bundlePath}\n`);
    }
}

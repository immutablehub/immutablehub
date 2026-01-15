async function UpdateRepo(cid,pinata) {
  
  
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

    //const absolutePath  = path.resolve(folder);
    const absoluteBundlePath = path.resolve(bpath);

    execSync(`git fetch  ${absoluteBundlePath} refs/heads/*:refs/remotes/bundle/*`, {
      cwd: `.`,
      stdio: 'inherit'
    });

    const currentBranch = execSync(
          `git branch --show-current`,
      {
        cwd: '.',
        encoding: 'utf8',
        shell: true
      }
      ).trim();

  const bundleBranch = `bundle/${currentBranch}`;

  console.log(`🔀 Merging ${bundleBranch} → ${currentBranch}`);
  execSync(
    `git merge ${bundleBranch} --allow-unrelated-histories --no-edit`,
    {
      cwd: '.',
      stdio: 'inherit',
      shell: true
    }
  );

    console.log("pulled successfully")

  }

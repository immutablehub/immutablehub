const IHUB_DIR = path.join(os.homedir(), ".ihub");
const FILE_TO_STORE_LOGIN = path.join(IHUB_DIR, "login.txt");

function setUp(wallet) {


    if (!fs.existsSync(IHUB_DIR)) {
            fs.mkdirSync(IHUB_DIR, { recursive: true });

    }

    if(fs.existsSync(FILE_TO_STORE_LOGIN)){
        console.log("already loggedin")
    }
    else {
        fs.writeFileSync(FILE_TO_STORE_LOGIN, wallet)
        console.log(`Successfully wrote wallet data to ${FILE_TO_STORE_LOGIN}`);
    }
}

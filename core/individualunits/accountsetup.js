const FILE_TO_STORE_LOGIN="login.txt"

function setUp(wallet) {

    if(fs.existsSync(FILE_TO_STORE_LOGIN)){
        console.log("already loggedin")
    }
    else {
        fs.writeFileSync(FILE_TO_STORE_LOGIN, wallet)
        console.log(`Successfully wrote wallet data to ${FILE_TO_STORE_LOGIN}`);
    }
}

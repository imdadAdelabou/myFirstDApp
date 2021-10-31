var provider = new ethers.providers.Web3Provider(web3.currentProvider, 'ropsten');
var MoodContractAddress = "0x0e2Bc569102B16c64059E633f251ad5850828630";
var MoodContractABI = [{
        "inputs": [{
            "internalType": "string",
            "name": "_mood",
            "type": "string"
        }],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];
var MoodContract;
var signer;

provider.listAccounts().then(function(accounts) {
    signer = provider.getSigner(accounts[0]);
    MoodContract = new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
})

async function getMood() {
    getMoodPromise = MoodContract.getMood();
    console.log("is loading");
    var Mood = await getMoodPromise;
    console.log("terminate");
    console.log(Mood);
    let span = document.getElementById("content");
    let text = document.createTextNode(Mood);
    span.appendChild(text);
}

async function setMood() {
    let mood = document.getElementById("mood").value;
    setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}
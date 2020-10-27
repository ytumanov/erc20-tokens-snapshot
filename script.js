// Steps: 
// 1. install web3 module
// 2. go to https://explore.duneanalytics.com/
// 3. execute needed sql query like: select * from ethereum.logs where topic1 = '\xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' and contract_address = '\x6006fc2a849fedaba8330ce36f5133de01f96189' and block_number < 11030100 order by block_number;
// 4. get response from network in chrome and copy-paste it to query variable
// 5. exetute js script


const query = {}





const web3 = require('web3')
const BN = web3.utils.BN;


toAddresses = {};

//fill addresses
query.query_result.data.rows.forEach(row => {
  const to = '0x' + row.topic3.substring(24);
  if (!toAddresses.hasOwnProperty(to)) {
    toAddresses[to] = '0';
  }

});

// add all to trnasfers
query.query_result.data.rows.forEach(row => {
  const to = '0x' + row.topic3.substring(24);

  const amount = web3.utils.hexToNumberString('0x' + row.data)

  if (toAddresses.hasOwnProperty(to)) {
    toAddresses[to] = (new BN(toAddresses[to]).add(new BN(amount))).toString()
  }
});

// sub from transfers
query.query_result.data.rows.forEach(row => {
  const from = '0x' + row.topic2.substring(24);

  const amount = web3.utils.hexToNumberString('0x' + row.data)

  if (toAddresses.hasOwnProperty(from)) {
    toAddresses[from] = (new BN(toAddresses[from]).sub(new BN(amount))).toString()
  }
});


// remove zero addresses
for (const address of Object.keys(toAddresses)) {
  if (toAddresses[address] == '0' || address == '0x0000000000000000000000000000000000000000') {
    delete toAddresses[address]
  }
}

// 1e18
const baseUnit = new BN('1000000000000000000');

//div baseunit
for (const address of Object.keys(toAddresses)) {
  toAddresses[address] = (new BN(toAddresses[address]).div(baseUnit)).toString()
  if (toAddresses[address] == '0') {
    delete toAddresses[address]
  }
}

console.log(toAddresses)



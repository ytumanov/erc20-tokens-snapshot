# erc20-tokens-snapshot
script to get holder balances on specific block

Steps:

1. install web3 module
2. go to https://explore.duneanalytics.com/
3. execute needed sql query like: select * from ethereum.logs where topic1 = '\xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' and contract_address = '\x6006fc2a849fedaba8330ce36f5133de01f96189' and block_number < 11030100 order by block_number;
4. get response from network in chrome and copy-paste it to query variable
5. exetute js script

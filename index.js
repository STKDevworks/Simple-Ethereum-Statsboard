//init Web3.js and Node.js http server
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || '/YOUR HTTP ENDPOINT HERE/');
var http = require('http');

//init HTML content
var initWrite = '</br><h2 style="vertical-align: middle; text-align: center">Getting data, please wait...</h2>';
var writeVar = initWrite;
var server = http.createServer(function (req, res) {
  res.write('<html><head></head><body>');

//add HTML autorefresh
  res.write('<!doctype html>\n<html lang="en">\n' +
    '\n<meta charset="utf-8" http-equiv="refresh" content="7">\n' +
    '\n<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' +
    '\n<div style="margin: 17% auto auto auto">\n' +
    '\n<h1 style="vertical-align: middle; text-align: center">Ethereum Block Stats</h1>\n');

//write init HTML content & start listening to port 8080
  res.write(writeVar);
  res.write('</br><p style="font-size: 14px; font-style: italic; vertical-align: middle; text-align: center">Fresh data fetched every 7 seconds</p>')
  res.end('</body></html>');
    });
server.listen(8080);

//init block data variables
var latestBlock;
var gasPrice;
var txNumber;

function getData() {

//get latest block
latestBlock = web3.eth.getBlockNumber()
.then(function (blockNumberResponse) {
  latestBlock = JSON.stringify(blockNumberResponse);
  });

//get base gas price
gasPrice = web3.eth.getGasPrice()
    .then(function (gasResponse) {
          gasPrice = JSON.stringify(gasResponse);
          gasGwei = parseInt(web3.utils.fromWei(gasResponse, 'Gwei')) + 'gwei';
      });

//get number of txs in a block
txNumber = web3.eth.getBlockTransactionCount("latest")
    .then(function (txNrResponse) {
          txNumber = JSON.stringify(txNrResponse);
      });
}

//update explorer data
function updateData(){
      getData();
  setTimeout(() => {
    printHTML();
  }, "2500")
}
updateData();

function printHTML(){
    setTimeout(() => {

//remove initial message and print fresh data
writeVar = writeVar - initWrite;
writeVar =
     '<div id="content" style="vertical-align: middle; text-align: center">\n' +
     '\n<strong>Latest Block:</strong>\n' +
     '<p>' + latestBlock + '</p>\n' +
     '\n<strong>Block Transactions:</strong>\n' +
     '<p>' + txNumber + '</p>\n' +
     '\n<strong>Base Gas Fee:</strong>\n' +
     '<p>' + gasGwei + '</p></div></div>';
   }, "2500")
updateData();
}

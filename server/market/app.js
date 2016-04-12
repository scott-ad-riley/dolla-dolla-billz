var getHistData = require('./histData.js');
var stockArray = [];
var update3 = require('./update3.js');

var runSave = function (stockArray) {
  if(stockArray.length === 346) {
  update3(stockArray);
  }
};

var updateMarket = function() {

epics = ['3IN', 'AA', 'AAL', 'ABF', 'ACA', 'ADM', 'ADN', 'AGK', 'AGR', 'AHT', 'ALD', 'ALM', 'AMFW', 'ANTO', 'AO', 'ARM', 'ASHM', 'ASL', 'ATK', 'ATST', 'AUTO', 'AV', 'AVV', 'AZN', 'BA', 'BAB', 'BAG', 'BARC', 'BATS', 'BBA', 'BBOX', 'BBY', 'BDEV', 'BEZ', 'BGEO', 'BHMG', 'BKG', 'BLND', 'BLT', 'BME', 'BNZL', 'BOK', 'BOY', 'BP', 'BRBY', 'BRSN', 'BRW', 'BT', 'BTG', 'BVIC', 'BVS', 'BWNG', 'BWY', 'BYG', 'CAPC', 'CARD', 'CBG', 'CCC', 'CCH', 'CCL', 'CEY', 'CHOO', 'CINE', 'CIR', 'CKN', 'CLDN', 'CLI', 'CLLN', 'CNA', 'CNE', 'COB', 'CPG', 'CPI', 'CRDA', 'CRH', 'CRST', 'CWC', 'CWD', 'CWK', 'DC', 'DCC', 'DCG', 'DEB', 'DFS', 'DGE', 'DJAN', 'DLG', 'DLN', 'DNLM', 'DOM', 'DPH', 'DPLM', 'DRX', 'DTY', 'ECM', 'EDIN', 'ELM', 'ELTA', 'EMG', 'ERM', 'ESNT', 'ESUR', 'ETO', 'EVR', 'EXPN', 'EZJ', 'FCPT', 'FCSS', 'FDSA', 'FEV', 'FGP', 'FGT', 'FRCL', 'FRES', 'GCP', 'GFRD', 'GFS', 'GFTU', 'GKN', 'GLEN', 'GNC', 'GNK', 'GNS', 'GOG', 'GPOR', 'GRG', 'GRI', 'GSK', 'GSS', 'HAS', 'HFD', 'HGG', 'HICL', 'HIK', 'HL', 'HLMA', 'HMSF', 'HMSO', 'HOME', 'HSBA', 'HSTG', 'HSTN', 'HSV', 'HSX', 'HVPE', 'HWDN', 'IAG', 'IAP'];

epics2 = ['IBST', 'ICP', 'IGG', 'IHG', 'III', 'IMB', 'IMI', 'INCH', 'INDV', 'INF', 'INPP', 'INTU', 'INVP', 'IPF', 'IPO', 'IRV', 'ISAT', 'ITRK', 'ITV', 'JAM', 'JD', 'JDW', 'JE', 'JLG', 'JLIF', 'JLT', 'JMAT', 'JMG', 'JRP', 'JUP', 'KAZ', 'KGF', 'KIE', 'KLR', 'KWE', 'LAD', 'LAND', 'LGEN', 'LLOY', 'LMP', 'LOOK', 'LRD', 'LRE', 'LSE', 'MAB', 'MARS', 'MCRO', 'MCS', 'MDC', 'MERL', 'MGAM', 'MGGT', 'MKS', 'MLC', 'MNDI', 'MNKS', 'MONY', 'MPI', 'MRC', 'MRO', 'MRW', 'MSLH', 'MTO', 'MYI', 'NBLS', 'NCC', 'NEX', 'NG', 'NMC', 'NTG', 'NXT', 'OCDO', 'OML', 'OPHR', 'OSB', 'P2P', 'PAG', 'PAY', 'PAYS', 'PCT', 'PDG', 'PETS', 'PFC', 'PFG', 'PHNX', 'PLI', 'PLP', 'PNL', 'PNN', 'POLY'];

epics3 =  ['PPB', 'PRU', 'PSN', 'PSON', 'PTEC', 'PZC', 'QQ', 'RAT', 'RB', 'RBS', 'RCP', 'RDI', 'RDSA', 'RDSB', 'RDW', 'REL', 'REX', 'RGU', 'RIO', 'RMG', 'RMV', 'RNK', 'ROR', 'RPC', 'RR', 'RRS', 'RSA', 'RSE', 'RSW', 'RTN', 'RTO', 'SAB', 'SAFE', 'SAGA', 'SBRY', 'SCIN', 'SCT', 'SDR', 'SGC', 'SGE', 'SGP', 'SGRO', 'SHAW', 'SHB', 'SHI', 'SHP', 'SKY', 'SL', 'SMDS', 'SMIN', 'SMP', 'SMWH', 'SN', 'SNR', 'SOPH', 'SPD', 'SPI', 'SPX', 'SRP', 'SSE', 'SSPG', 'STAN', 'STJ', 'SVI', 'SVS', 'SVT', 'SXS', 'SYNT', 'TALK', 'TATE', 'TCG', 'TED', 'TEM', 'TEP', 'TLPR', 'TLW', 'TMPL', 'TPK', 'TRIG', 'TRY', 'TSCO', 'TUI', 'TW', 'UBM', 'UDG', 'UKCM', 'ULE', 'ULVR', 'UTG', 'UU', 'VCT', 'VEC', 'VED', 'VM', 'VOD', 'VSVS', 'WEIR', 'WG', 'WIZZ', 'WKP', 'WMH', 'WOS', 'WPCT', 'WPG', 'WPP', 'WTAN', 'WTB', 'ZPLA'];

// adds .L to all epics
var epicsNew = [];
for (var i = epics.length - 1; i >= 0; i--) {
  epicsNew.push(epics[i] + '.l');
}

var epicsNew2 = [];
for (var i = epics2.length - 1; i >= 0; i--) {
  epicsNew2.push(epics2[i] + '.l');
}

var epicsNew3 = [];
for (var i = epics3.length - 1; i >= 0; i--) {
  epicsNew3.push(epics3[i] + '.l');
}

// request 1
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var stock = epicsNew.toString();
url = 'http://finance.yahoo.com/webservice/v1/symbols/'+stock+'/quote?format=json&view=detail';
var request = new XMLHttpRequest();
request.open("GET", url);
request.onload = function() {
  if(request.status === 200) {
    var response = JSON.parse(request.responseText).list.resources;
    var pastPrices;
    for (var i = response.length - 1; i >= 0; i--) {
      var data = response[i].resource.fields;
      // gets historical data and saves to database in that file
      getHistData(data, function(stock) {
        stockArray.push(stock);
      });
    }
  }
  request2.send();
};
request.send();

// 200 request max to server so 3 requests needed
var stock2 = epicsNew2.toString();
url2 = 'http://finance.yahoo.com/webservice/v1/symbols/'+stock2+'/quote?format=json&view=detail';
var request2 = new XMLHttpRequest();
request2.open("GET", url2);
request2.onload = function() {
  if(request2.status === 200) {
    var response = JSON.parse(request2.responseText).list.resources;
    var pastPrices;
    for (var i = response.length - 1; i >= 0; i--) {
      var data = response[i].resource.fields;
      getHistData(data, function(stock) {
        stockArray.push(stock);
      });    }
  }
  request3.send();
};


// 200 request max to server so 3 requests needed
var stock3 = epicsNew3.toString();
url3 = 'http://finance.yahoo.com/webservice/v1/symbols/'+stock3+'/quote?format=json&view=detail';
var request3 = new XMLHttpRequest();
request3.open("GET", url3);
request3.onload = function() {
  if(request3.status === 200) {
    var response = JSON.parse(request3.responseText).list.resources;
    var pastPrices;
    for (var i = response.length - 1; i >= 0; i--) {
      var data = response[i].resource.fields;
      getHistData(data, function(stock) {
        stockArray.push(stock);
        runSave(stockArray);
      });    
    }
  }
};


};

module.exports = updateMarket;
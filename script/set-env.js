var replace = require('replace-in-file');
var package = require("../package.json");

var PROD_MODE = process.env.PROD_MODE;
var API_URL = process.env.API_URL;
var API_URL_INV = process.env.API_URL_INV;
var SECRET_KEY = process.env.SECRET_KEY;

const prod_options = {
    files: 'src/environments/environment.prod.ts',
    from: [/API_URL: '(.*)'/g, /API_URL_INV: '(.*)'/g, /SECRET_KEY: '(.*)'/g],
    to: ["API_URL: '"+ API_URL + "'", "API_URL_INV: '"+ API_URL_INV+ "'", "SECRET_KEY: '"+ SECRET_KEY + "'"],
    allowEmptyPaths: false,
};

const dev_options = {
    files: 'src/environments/environment.ts',
    from: [/API_URL: '(.*)'/g, /API_URL_INV: '(.*)'/g, /SECRET_KEY: '(.*)'/g],
    to: ["API_URL: '"+ API_URL + "'", "API_URL_INV: '"+ API_URL_INV+ "'", "SECRET_KEY: '"+ SECRET_KEY + "'"],
    allowEmptyPaths: false,
};

const package_options = {
    files: 'package.json',
    from: /PROD_MODE/g,
    to: (PROD_MODE !== '' && PROD_MODE !== 'undefined' && PROD_MODE === 'true')?'--prod':'PROD_MODE',
    allowEmptyPaths: false,
};

try {
//	let mode = 'dev';

//	if(PROD_MODE !== '' && PROD_MODE !== 'undefined' && PROD_MODE === 'true') {
//		mode = 'prod';
//	}

    let changedFiles = replace.sync(dev_options);
    changedFiles = replace.sync(prod_options);
    //changedFiles = replace.sync(package_options);
    //if (changedFiles == 0) {
    //    throw "Please make sure that file '" + ((mode === 'dev')?dev_options.files:prod_options.files) + "' has the required placeholders";
    //}
    console.log('Environment varibales set: ' + API_URL);
}
catch (error) {
    console.error('Error occurred:', error);
    throw error
}
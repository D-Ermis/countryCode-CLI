#!/usr/bin/env node

const { getCode, getName } = require('country-list');
const axios = require('axios');

// Get current year
const currentYear = new Date().getFullYear();

// Get argument from command line (country name)
process.argv.splice(0, 2);
const name = process.argv.join(' ');

let countryCode = '';

// Check country name validity
if (getCode(name) == null) {
  console.log('Oops, you gave an invalid country name!');
} else {
  countryCode = getCode(name);
  countryName = getName(countryCode);
  axios
    .get('https://date.nager.at/api/v2/publicholidays/' + currentYear + '/' + countryCode)
    .then(function(response) {
      // handle success
      let array = response.data;
      console.log('Holidays in ' + countryName);
      array.forEach(item => {
        console.log(item.date);
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
}

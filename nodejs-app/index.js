const axios = require('axios');
const fs = require('fs');

const sites = require('./sites.json');

function checkSites() {
  sites.forEach(site => {
    axios.get(site.url)
      .then(response => {
        console.log(`${site.name} is online. Status: ${response.status}`);
        // Add status record to history
        site.history.push({ status: 'online', timestamp: new Date() });
        // Keep history length <= 10
        if (site.history.length > 10) site.history.shift();
      })
      .catch(error => {
        console.log(`${site.name} is offline. Error: ${error.message}`);
        // Add status record to history
        site.history.push({ status: 'offline', timestamp: new Date() });
        // Keep history length <= 10
        if (site.history.length > 10) site.history.shift();
      });
  });
}

// Schedule checks every minute
setInterval(checkSites, 60000);
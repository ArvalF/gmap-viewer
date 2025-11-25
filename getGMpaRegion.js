import { JSDOM } from "jsdom";
import * as https from 'https';
import {ProxyAgent} from 'proxy-agent'; // note l'import
import { writeFile } from 'fs/promises';

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
console.log("Using proxy:", proxyUrl);
const agent = new ProxyAgent(proxyUrl);

async function getRegions() {
  const url = "https://developers.google.com/maps/coverage?hl=fr";

  return new Promise((resolve, reject) => {
    https.get(url, { agent }, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const dom = new JSDOM(data);
          const document = dom.window.document;

          const regions = [];
            console.log(document)
          const table = document.querySelector("devsite-filter table");
          if (!table) {
            reject(new Error("Tableau non trouvé"));
            return;
          }

          const rows = table.querySelectorAll("tr");
          rows.forEach((tr, idx) => {
            if (idx === 0) return; // header

            const cells = tr.querySelectorAll("td, th");
            if (cells.length >= 2) {
              const code = cells[0].textContent.trim();
              const region = cells[1].textContent.trim();
              regions.push({ code_regional: code, region });
            }
          });

          resolve(regions);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (e) => {
      reject(e);
    });
  });
}

getRegions()
  .then(regions => {
    let finale = JSON.stringify(regions, null, 2);
    writeFile('./GoogleMapRegion.json', finale, 'utf-8');

  })
  .catch(err => {
    console.error('Erreur:', err);
  });

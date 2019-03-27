const models = require('../models');
const request = require('request');
const cheerio = require('cheerio');

// Routing nomor 1: request GET scraping data dari web dan menambahkan ke dalam database
exports.scrapeKurs = (req, res, next) => {
  let dateNow = new Date();
  let day = String(dateNow.getDate()).padStart(2, '0');
  let month = String(dateNow.getMonth() + 1).padStart(2, '0');
  let year = dateNow.getFullYear();

  dateNow = year + '-' + month + '-' + day;

  try {
    request('https://www.bca.co.id/id/Individu/Sarana/Kurs-dan-Suku-Bunga/Kurs-dan-Kalkulator', (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const kurs = [];

        $('tr', '.table-responsive').each((i, el) => {
          const rows = $(el)
            .find('td')
            .map((i, ele) => {
              return $(ele).text();
            }).get().join(' ');

          kurs[i] = rows.split(' ');

        });

        console.log("Scraping done");

        for (var i = 2; i < kurs.length; i++) {
          console.log(kurs[i]);

          models.Kurs.findOrCreate({
            where: {
              symbol: kurs[i][0],
              date: dateNow,
            },
            defaults : {
              symbol: kurs[i][0],
              erate_jual: kurs[i][1],
              erate_beli: kurs[i][2],
              ttcounter_jual: kurs[i][3],
              ttcounter_beli: kurs[i][4],
              banknotes_jual: kurs[i][5],
              banknotes_beli: kurs[i][6],
              date: dateNow,
            }
          })
          .then(([kurs, created]) => {
            return res.status(200).json([kurs, created]);
          })
          .catch((error) => {
            return next({
              status: 400,
              message: error.message,
            });
          });
        }

      }
    })

    return res.status(200).json(`Scraping berhasil. Apabila Kurs tanggal ${dateNow} telah tersimpan di database sebelumnya, maka data tidak akan ditambahkan.`);

  } catch (err) {
    return next({
      status: 400,
      message: error.message,
    });
  }
};

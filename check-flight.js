'use strict';

var page = require('webpage').create();

// page.onConsoleMessage = function (msg) {
//   console.log(msg);
// }

var handlers = [];
function onLoad(url, callback) {
  handlers.push({
    url: url,
    onLoadFinished: callback
  })
}

page.onNavigationRequested = function (url, type, willNavigate, main) {
  console.log('\npage.onNavigationRequested');
  console.log('Trying to navigate to: ' + url);
  console.log('Caused by: ' + type);
  console.log('Will actually navigate: ' + willNavigate);
  console.log('Sent from the page\'s main frame: ' + main);
}

page.onLoadFinished = function (status) {
  console.log('\npage.onLoadFinished');
    var currentUrl = page.evaluate(function () {
    return window.location.href;
  });
  console.log(currentUrl)
  for (var i = 0; i < handlers.length; i++) {
    if (handlers[i].url === currentUrl) {
      setTimeout(handlers[i].onLoadFinished, 1000);
    }
  }
}

function focus(id) {
  page.evaluate(function (id) {
    $(id).focus();
  }, id)
}

onLoad('https://www.southwest.com/', function (status) {
  focus('#air-city-departure');
  page.sendEvent('keypress', 'SFO');
  // focus('#air-city-arrival');
  page.sendEvent('keypress', page.event.key.Tab);
  page.sendEvent('keypress', 'LAS');
  // focus('#air-date-departure');
  page.sendEvent('keypress', page.event.key.Tab);
  page.sendEvent('keypress', '9/9');
  // focus('#air-date-return');
  page.sendEvent('keypress', page.event.key.Tab);
  page.sendEvent('keypress', '9/11');
  page.sendEvent('keypress', page.event.key.Tab);
  page.evaluate(function () {
    $('#jb-booking-form-submit-button').click();
  });
});

onLoad('https://www.southwest.com/flight/select-flight.html?displayOnly=&int=HOMEQBOMAIR', function (status) {
  page.render('southwest.png');
  var rates = page.evaluate(function () {
    var fares = {
      outbound: [],
      return: []
    };
    $('#faresOutbound tbody tr.bugTableRow').each(function (index, el) {
      var item = [];
      $(this).find('td').each(function (index, el) {
        console.log($(this).text())
      })
      // fares.outbound.push(item);
      console.log(item)
    });
    $('#faresReturn tr').each(function (index, el) {
      var item = [];
      $(this).find('td').each(function (index, el) {
        item.push(el.text())
      })
      fares.return.push(item);
    })
    return fares;
  })
  console.log(rates);
  phantom.exit();
});

page.open('https://www.southwest.com/');

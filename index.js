var express = require('express');
const phantom = require('phantom');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/getPageSource', async function (req, res) {
	res.send(await getPageSource(req.query.url));
});

app.get('/test', function (req, res) {
	res.send('test');
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


async function getPageSource(url) {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        //console.info('Requesting', requestData.url)
    });

    const status = await page.open(url);
    //console.log(status);

    const content = await page.property('content');
    //console.log(content);

    await instance.exit();
	
	return content;
};
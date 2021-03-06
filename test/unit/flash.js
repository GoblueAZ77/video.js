module('Flash');

var streamToPartsAndBack = function(url) {
  var parts = vjs.Flash.streamToParts(url);
  return vjs.Flash.streamFromParts(parts.connection, parts.stream);
};

test('test using both streamToParts and streamFromParts', function() {
  ok('rtmp://myurl.com/&isthis' === streamToPartsAndBack('rtmp://myurl.com/isthis'));
  ok('rtmp://myurl.com/&isthis' === streamToPartsAndBack('rtmp://myurl.com/&isthis'));
  ok('rtmp://myurl.com/isthis/&andthis' === streamToPartsAndBack('rtmp://myurl.com/isthis/andthis'));
});

test('test streamToParts', function() {
  var parts = vjs.Flash.streamToParts('http://myurl.com/streaming&/is/fun');
  ok(parts.connection === 'http://myurl.com/streaming');
  ok(parts.stream === '/is/fun');

  parts = vjs.Flash.streamToParts('http://myurl.com/&streaming&/is/fun');
  ok(parts.connection === 'http://myurl.com/');
  ok(parts.stream === 'streaming&/is/fun');

  parts = vjs.Flash.streamToParts('http://myurl.com/streaming/is/fun');
  ok(parts.connection === 'http://myurl.com/streaming/is/');
  ok(parts.stream === 'fun');

  parts = vjs.Flash.streamToParts('whatisgoingonhere');
  ok(parts.connection === 'whatisgoingonhere');
  ok(parts.stream === '');

  parts = vjs.Flash.streamToParts();
  ok(parts.connection === '');
  ok(parts.stream === '');
});

test('test isStreamingSrc', function() {
  var isStreamingSrc = vjs.Flash.isStreamingSrc;
  ok(isStreamingSrc('rtmp://streaming.is/fun'));
  ok(isStreamingSrc('rtmps://streaming.is/fun'));
  ok(isStreamingSrc('rtmpe://streaming.is/fun'));
  ok(isStreamingSrc('rtmpt://streaming.is/fun'));
  // test invalid protocols
  ok(!isStreamingSrc('rtmp:streaming.is/fun'));
  ok(!isStreamingSrc('rtmpz://streaming.is/fun'));
  ok(!isStreamingSrc('http://streaming.is/fun'));
  ok(!isStreamingSrc('https://streaming.is/fun'));
  ok(!isStreamingSrc('file://streaming.is/fun'));
});
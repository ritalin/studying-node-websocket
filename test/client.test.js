//
// mochaによるテスト
//

// ↓ socket.io-clientの使用により、不要になった
//XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
//var cli = require('../client/js/socket.io'); // Socket.ioクライアントモジュール

var cli = require('socket.io-client'); // Socket.ioクライアントモジュール

var should = require('should');

// pathまで指定すると、timeoutになる。なぜぇ？
var page = "http://127.0.0.1:8888";

// global.locationがないと怒られます
// -> socket.io-clientの場合は不要だった
//global.location = require('url').parse(page);

describe("クライアントサイドのテスト", function() {
	var server;

	before(function(){
		server = require('../server/server').start(8888, __dirname + "/test.fixtures");
	});

	describe("Socket.IOでサーバーに接続する", function() {
		it ("接続の確立が確認されること", function(defferal) {
			var socket = cli.connect(page);

			socket.on("test", function(data) {
				data.hello.should.equal("world");

				defferal();
			})

			server.socket.on("connection", function(c) {
				c.manager.connected[c.id].should.be.true;

				c.emit("test", {hello: "world"});
			});

			socket.should.be.ok;
			socket.name.should.equal("");
		});
	});
});

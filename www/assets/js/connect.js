/**
 * Connection / Communications with server
 */
let Connect = {
    connection: null,
    connection_status: false,
    ip_address: '192.168.100.198', // edit by yours
    port: '3030', // port

    start: function () {
        this.connection = new WebSocket('ws://' + this.ip_address + ':' + this.port);

        this.connection.onopen = function (e) {
            Connect.connection_status = true;
            console.log("Connection established!");

            $('.window .title').html('Connected.');
        };

        // callback messages
        this.connection.onmessage = function (e) {
            var data = JSON.parse(e.data);
            console.log(data);
        };

        // Closed window
        this.connection.onclose = function (e) {
            console.log("Connection closed!");
            this.connection_status = false;
        };

        // Error window
        this.connection.onerror = function (e) {
            console.log("Connection error!");
            this.connection_status = false;
        };

    },

    sendMessage: function (data) {
        if (this.connection_status === false) return;

        var data = JSON.stringify(data);
        this.connection.send(data);
    },

};

module.exports = {
    'start': function(client) {
        client.url('http://localhost:8080/')
    },

    'test KPlayer': function(client) {
        client.expect.element('h1').to.be.visible;
    },

    'end': function(client) {
        client.end();
    }
};


$(function () {
   Connect.start();
});

$('.window .js-send-action').click(function (e) {
    e.preventDefault();

    Connect.sendMessage({
        'test': 'test data send!'
    });
});
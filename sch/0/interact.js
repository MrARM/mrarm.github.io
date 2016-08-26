$('#term').terminal(function(command, term) {
    if (command == 'getmein') {
        term.echo("Please wait, Jordan Bush...");
    } else {
        term.echo('unknown command');
    }
}, { prompt: 'vault>', name: 'sch0' });

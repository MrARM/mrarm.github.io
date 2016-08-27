jQuery(document).ready(function($) {
            $('body').terminal(function(command, term) {
                if (command == 'getmein') {
                    term.echo("Please wait, Jordan Bush...");
                } else if(command == 'help'){
                            term.echo('exit - Exit the app\n');
                            term.echo('getmein - Achieve access\n');
                } else {
                    term.echo('unknown command, use help');
                }
            }, { prompt: 'vault>', name: 'sch0',  });
        });

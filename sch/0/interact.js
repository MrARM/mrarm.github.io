var grt = atob("ICBfICAgICAgXyAgX18gICAgICAgXyAgIF8gICAgICAgICAgICAgICAgXyBfICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8gXyAgIA0KIHwgfCAgICAoXykvIF98ICAgICB8IHwgKF8pICAgICAgICAgICAgICB8IChfKSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCB8IHwgIA0KIHwgfCAgICAgX3wgfF8gX19fICB8IHxfIF8gXyBfXyBfX18gICBfX198IHxfIF8gX18gICBfX18gIF9fICAgX19fXyBfIF8gICBffCB8IHxfIA0KIHwgfCAgICB8IHwgIF8vIF8gXCB8IF9ffCB8ICdfIGAgXyBcIC8gXyBcIHwgfCAnXyBcIC8gXyBcIFwgXCAvIC8gX2AgfCB8IHwgfCB8IF9ffA0KIHwgfF9fX198IHwgfHwgIF9fLyB8IHxffCB8IHwgfCB8IHwgfCAgX18vIHwgfCB8IHwgfCAgX18vICBcIFYgLyAoX3wgfCB8X3wgfCB8IHxfIA0KIHxfX19fX198X3xffCBcX19ffCAgXF9ffF98X3wgfF98IHxffFxfX198X3xffF98IHxffFxfX198ICAgXF8vIFxfXyxffFxfXyxffF98XF9ffA0KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA0KICAgVmVyc2lvbiAxLjEuIENvcHlyaWdodCAoYykgTXJBUk0gMjAxNgkJCQkJCQkJCQkgIA0KCQkJCQkJCQkJCQkJCQkJCQkJCQkgIA0K");
jQuery(document).ready(function($) {
            $('body').terminal(function(command, term) {
                if (command == 'getmein') {
                    term.echo("Please wait, Jordan Bush...");
                    sleep(500).then(() => {
                        term.echo("=------------");
                    })
                    sleep(767).then(() => {
                        term.echo("==-----------");        
                    })
                    sleep(1467).then(() => {
                        term.echo("==-----------");   
                    })
                    sleep(9867).then(() => {
                        term.echo("============-");        
                    })
                    sleep(10067).then(() => {
                        term.echo("=============");
                        term.echo("Done!");
                        term.echo(makeid());      
                    })
                    sleep(10093).then(() => {
                        term.echo(makeid());
                    })
                    sleep(10145).then(() => {
                        term.echo(makeid());
                    })
                    sleep(10171).then(() => {
                        term.echo(makeid());
                    })
                    sleep(10197).then(() => {
                        term.echo(makeid());
                    })
                    sleep(10223).then(() => {
                        term.echo(makeid());
                    })
                    sleep(11053).then(() => {
                        window.location = "http://mrarm.github.io/sch/0/time.html";
                    })
                } else if(command == 'help'){
                            term.echo('exit - Exit the app\n');
                            term.echo('getmein - Achieve access\n');
                } else {
                    term.echo('unknown command, use help');
                }
            }, { prompt: 'vault>', name: 'sch0', greetings: grt });
        });

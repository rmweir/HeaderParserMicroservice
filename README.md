Header Parser Microservice

Hosted @ https://productive-trader.glitch.me/

Description:	The Header Parser Microservice accepts the GET request containing "/whoami" appended to the hosting address, then the Header Parser Microservice outputs the user's IPv4 address, their computer's language, and their operating system information(user agent info). This is accomplished by parsing the header of the GET request.

How to Use:	Append your "/whoami" to the end of the current url, like so: https://productive-trainer.glitch.me/whoami 

This can either be done in your address bar or by using the http GET protocol.

Example output: {"ipaddress":"12.222.222.222", "natural":"en-US","software":"Windows NT 10.0; Win64; x64"}

How to Dev/test:	This was developed in the Glitch environment. I recommend using the terminal which can be accessed by pressing ctrl-shift-x.

Changes can be previewed by returning to terminal and entering "refresh", then refreshing the hosted address.

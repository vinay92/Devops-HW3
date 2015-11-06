# HW #3 Proxies, Queues, Cache Fluency.

## Setting up the Repository:
In order to set up the repository execute the following steps:

a. Clone this repository.

b. cd into the directory.

c. Run the following command to download the required modules:
```
npm install

```
This sets up the required modules in the folder.

## Executing the program:
a. Start the redis instance on your system. Be sure to start redis on the port 6379 for the program to work correctly.

b. In a new terminal execute the following command:
```
node main.js 3000
```
c. Repeat the same for port 3001 in a different terminal.

Note: you can do this in the same terminal as well. Use '&' at the end of the command:
```
node main.js 3000 &
```
This runs the process as a daemon.

d. Now run the proxy server via the following command:
```
sudo node proxy.js
```
e. The main.js can also be run from inside the proxy script itself. If the main servers also need to be started from the script, run the "proxy-exec.js" file instead of starting the servers manually and running the "proxy.js". Execute the following command if you want to start all the servers using just one command:
```
sudo node proxy-exec.js
```
Note: Do not execute both proxy.js and proxy-exec.js. That will throw an error since servers will already be running on ports 80, 3000 and 3001. Choose one of the two options.

f. Navigate to localhost on your browser.
You should be able to see the following message on your web page.
(ServerImage)

g. The port number keeps varying for each request since each requests are alternated between ports 3000 and 3001. This can be extended for any number of servers. 

h. Opening the URL "localhost/set" sets the key in redis. 

i. Opening the URL "localhost/get" shows the key for 10 seconds after which refreshing the URL will not show the key since it has expired in redis.

j. Navigating to the URL "localhost/recent" shows the recent 5 URL's visited.

k. Upload a picture to "localhost/upload" and navigate to "localhost/meow" to view the the picture.

## [Screencast](https://youtu.be/Zbb3eYiEoL8)


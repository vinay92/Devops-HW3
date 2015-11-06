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
e. Navigate to localhost on your browser.
You should be able to see the following message on your web page.

f. The port number keeps varying for each request since each requests are alternated between ports 3000 and 3001. This can be extended for any number of servers. 

g. Opening the URL localhost/set sets the key in redis. 

h. Opening the URL localhost/get shows the key for 10 seconds after which refreshing the URL will not show the key since it has expired in redis.

i. Navigating to the URL localhost/recent shows the recent 5 URL's visited.

j. Upload a picture to localhost/upload and navigate to localhost/meow to view the the picture.

[Screencast](https://youtu.be/Zbb3eYiEoL8)


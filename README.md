# HW #3 Proxies, Queues, Cache Fluency.

## Setting up the Repository:
In order to set up the repository execute the following steps:
1. Clone this repository. 
2. cd into the directory
3. Run the following command to download the required modules:
```
npm install

```
This sets up the required modules in the folder.

## Executing the program
1. Start the redis instance on your system
2. In a new terminal execute the following command:
```
node main.js 3000

```
3. Repeat the same for port 3001 in a different terminal
Note: you can do this in the same terminal as well. Use '&' at the end of the command:
```
node main.js 3000 &
```
This runs this as a daemon

4. Now run the proxy server via the following command:
```
sudo node proxy.js
```
5. Navigate to localhost on your browser.
6. You should be able to see the following message on your web page.
7. The port number keeps varying for each request since each requests are alternated between ports 3000 and 3001. This can be extended for any number of servers. 
8. Opening the URL localhost/set sets the key in redis. 
9. Opening the URL localhost/get shows the key for 10 seconds after which refreshing the URL will not show the key since it has expired in redis.
10. Navigating to the URL localhost/recent shows the recent 5 URL's visited


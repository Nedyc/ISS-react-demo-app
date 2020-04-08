# About the app
This app is only a demo made with react to test its functionalities; All it does is to display the ISS station position in real time (the api call refreshes each 5 seconds).<br />
Moreover it lets the user click on the map returning the next ISS passages (comprehensive of the forecast) over that point.<br />
Everything is also mobile friendly thanks to the bootstrap 4 library.

<br />

# How to install
In order to use this app you need to download the latest versions of:<br />
**NodeJS:** [https://nodejs.org/](https://nodejs.org/)<br />
**Git:** [https://git-scm.com/](https://git-scm.com/)<br /><br />

After the installation open gitbash and clone the project running this command:
```
git clone https://github.com/Nedyc/ISS-react-demo-app.git iss-app
```

Then access the folder
```
cd iss-app
```

And install all the dependences with npm
```
npm install
```

Finally you can run the app
```
npm start
```

<br />

# Libraries
This web app is made using:
- React 16.13.1
- Bootstrap 4 
- Fontawesome 5
- Leaflet map

<br />

# API
To track down the position and the prediction of the ISS station the app uses the official api found at [http://open-notify.org/Open-Notify-API/](http://open-notify.org/Open-Notify-API/).<br />
For what concerns the weather api and forecast I used the metaweather api [https://www.metaweather.com](https://www.metaweather.com).<br />
Due to a problem with cors during localhost testing I decided to temporarely wrap the api calls inside a my amazon ws host space in order to avoid the cors rejection.<br />
You can foind the ISS api defined inside the **/src/iss.js** class and the weather ones inside the **/src/weahter.js** class.

<br />

# Component structure
Components are placed in the **/components** folder and are structured as described below:

## App.js
![ScreenShot-1](http://www.shamancake.com/github/1.jpg)
Is obviously where all the components are rendered, you can find it on the **/src** root

## header.jsx
![ScreenShot-1](http://www.shamancake.com/github/2.jpg)
Placed at the top of the screen, it is declared inside the **/components/header.jsx** file

## footer.jsx
![ScreenShot-1](http://www.shamancake.com/github/3.jpg)
On the bottom part you can find the footer, **/components/footer.jsx**

## iss-container.jsx
![ScreenShot-1](http://www.shamancake.com/github/4.jpg)
The main section comprehensive of all the main subcomponents: **/components/iss-container.jsx**

## iss-map.jsx
![ScreenShot-1](http://www.shamancake.com/github/5.jpg) <br />
The leaflet map: **/components/iss-map.jsx**

## info-block.jsx
![ScreenShot-1](http://www.shamancake.com/github/6.jpg) <br />
Only a div with the map instructions: **/components/info-block.jsx**

## iss-positions.jsx
![ScreenShot-1](http://www.shamancake.com/github/7.jpg) <br />
The card containing all the info about the iss position, a short description and the list of prediction positions: **/components/iss-positions.jsx**

## iss-position.jsx
![ScreenShot-1](http://www.shamancake.com/github/8.jpg) <br />
The single prediction position template row: **/components/iss-position.jsx**

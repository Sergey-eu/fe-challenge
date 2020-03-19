# Plexus Frontend Challenge
### Built with ReactJS v16.3
[![N|Solid](https://blobs.gitbook.com/spaces%2F-LC0OOaYNhLAKEG18CVO%2Favatar.png?generation=1525813064181835&alt=media)](https://reactjs.org/)
##### Features
According to the requirements, the entered data must be saved when the user navigates between pages. 

Since the “Clear button" was not required, saving data after refreshing the page can be inconvenient. Therefore, data is not saved anywhere except for the state

The application consists of a home page and two form pages.

The first step is available at the following URL: `localhost:3000/form/step1`.
If the user goes to `localhost:3000/form`, he will be redirected to `localhost:3000/form/step1`.

If the user goes to `localhost:3000/form/step2` without completed step 1, he will be redirected to `localhost:3000/form/step1`.

If the user goes to `localhost:3000/form/{any-text}`, he will receive an error page with links to the first step and home page.

##### Tech
* [React-scripts](https://github.com/jaredpalmer/formik ) - StarterKit with HMR, web-server an building tool
* [Formik](https://github.com/jaredpalmer/formik ) - Form engine
* [Yup](https://github.com/jquense/yup ) - Form validation
* [Material-UI](https://github.com/mui-org/material-ui ) - ReactJS material components
* [MUI](https://github.com/mui-org/material-ui ) - Pure CSS material components

The tasks set do not require state managers
Simple API does not require special libraries

##### Installation 
Application requires Node v10+ to run. 
To start development, just install the dependencies and start the server
```sh
$ npm install
$ npm start
```

##### Notes 
Form data submitted to: [webhook.site](https://webhook.site/76c989af-0b79-419d-ab0e-508ac1b93b44 )
Existing users fetched from: [randomuser.me](https://randomuser.me/api/?results=50&nat=au&exc=login )
The project contains a folder **data** with available configurations and data.
Frontend Unit test are not included into this progect.

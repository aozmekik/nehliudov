# Color of Favor Mobile Application





<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#deploy">Deploy</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
It is a React Native mobile project that we made for Color of Favor association to ensure coordination among members.


### Built With

* Nodejs (Package Manager)
* React Native
* Expo


<!-- GETTING STARTED -->
## Getting Started

Since the project uses NPM, package management and dependencies are relatively easy here.
### Prerequisites

First you need to install Nodejs. (6.14.x)


### Installation

After installing Nodejs, we can now download the packages and build the project. `cd` to project directory. Run the commands.

```sh
npm install
```

Next, we need to download the expo globally so that we can run the expo in the shell, even though we have added it to the developer dependency. For this run the code below.

```sh
npm install -g expo-cli
``` 


<!-- USAGE EXAMPLES -->
## Usage

### Android

It can be run in two ways: You either set up a virtual android machine on your machine or you can do it with a real android phone.

Either way, we start with the following command.

```sh
expo start
``` 

From this point on, we are on the expo cli. We will open the application for android by pressing the `a` key.

#### For Virtual Machine
Download the Android Studio SDK. My personal recommendation is download Android Studio directly. Thanks to this, we will create a virtual machine with an AVD tool. Then with AVD manager, create a virtual machine.

Then a few more configurations need to be done. The error that Expo gives will redirect you to a page in Android Studio. As a result of the process, your application will run in the virtual machine.

#### For Real Device
Again you need to download Android Studio. Next, you will need to turn on some USB Debugging options on your phone. Then connect your phone with USB and run Android in expo.

### IOS
<!-- TODO. -->
*It will be filled soon.*



## Deploy

### Android
```sh
expo build:android
``` 

### IOS
```sh
expo build:ios
``` 

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- CONTACT -->
## Contact

E-Mail: ahmed-semih@outlook.com





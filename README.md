# Salmon run stats tracker app

[![Latest Version of Project](https://img.shields.io/badge/Version-2.0.0-blue)]()
[![Laravel](https://img.shields.io/badge/Laravel-10-red)](https://www.python.org/downloads/)
[![php](https://img.shields.io/badge/php-8.3-8368bb)](https://www.pygame.org/news)
[![react](https://img.shields.io/badge/react-18.2.0-0099ff)](https://legacy.reactjs.org/docs/getting-started.html)
[![Downloads](https://img.shields.io/badge/Downloads-0-brightgreen)]()

This is a project i build for one of my most played and favourite game of 2023.
Its about the side mode in splatoon 3 called Salmon run.

```bash
    git clone https://github.com/Xander172006/track-app.git
```
<br />

## About this project

<center align="left">
    <img align="right" style="margin-top: 5px;" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe8e6ab4-bc07-4932-bca4-17e2d7594645/dff1cfc-2ea35c3b-d8d7-44a8-adc0-4af191e4a979.png/v1/fill/w_622,h_350/splatoon_3_salmon_run_next_wave__logo__by_rubychu96_dff1cfc-350t.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmU4ZTZhYjQtYmMwNy00OTMyLWJjYTQtMTdlMmQ3NTk0NjQ1XC9kZmYxY2ZjLTJlYTM1YzNiLWQ4ZDctNDRhOC1hZGMwLTRhZjE5MWU0YTk3OS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.qp5h2kVO-RhjxPnMMzrP15JU_SKrv7nbLONuZzjCDs0" width="400px"/>
    <div style="width: 450px" align="left">
        <p>
            Salmon run is a zombie type survival mode based on team strategizing and objectives.
            The mode can get increasingly harder the higher you end up and can be played for an endless amount.
        </p>
        <p>
            My goal was to make a tracking app to tack all of the bosses, badges and achievements that nintendo
            does not give to the player in game. I spent 3 weeks on building a user interface with a dashboard that analysis the data.
            In my project i also builded a self made api to track this and make relations with the database models.
        </p>
    </div>
</center>

<br />

## Installation

The following libraries are required to run the application:
- [Composer](https://getcomposer.org/doc/) for managing dependencies
- [Laravel](https://laravel.com/) for the backend and API
- [npm](https://www.npmjs.com/) for managing frontend dependencies
- [React](https://react.dev/) for the frontend and user interface
<br />

### a. Composer
Install [`Composer`](https://getcomposer.org/doc/) using the following command:
```bash
    composer install
```

### b. npm
Install [`npm`](https://www.npmjs.com/) using the following command:
```bash
    npm install
```
<br />


## Usage
### Creating the interactive dashboard
Make sure you are in the correct directory and run the following command to migrate the database as well as seed the database with the necessary data:
```bash
    cd path/to/track-app
    php artisan migrate
    php artisan db:seed
```

Once the connection is stable and you have registered or created an account you can use view the dashboard as wel as the upcoming rotations.
<br />

<div style="display: flex; gap: 20px;">
    <img src="./docs/images/dashboard_image.jpeg" width="350px" height="450px" />
    <img src="./docs/images/rotations_image.png" width="450px" height="300px" />
</div>

<br />

## Implementation & Customization

[<img src="./docs/images/game_stats_image.jpeg" width="500px" height="400px" />](./docs/images/game_stats_image.jpeg)
<br />

You can customize your ingame stats as well as the badges you have to replicate your real game stats as perfectly as can be.
There is a settings page for personal account, and game account using a generated UUID to track the data.

If there are points or details that are missing, then feel free to contact me on my email or on my github page.


## Contributors

![Xander Poggenklaas](https://img.shields.io/badge/Xander_Poggenklaas-Developer-blue)

[<img src="https://github.com/Xander172006.png" width="65px" height="65px" style="border-radius: 50px"/>](Xander172006)

**Location:** Bit Academy, Amsterdam
</br>
**Email:** xanderpoggenklaas@gmail.com
</br>
**Twitter:** [@XPoggenklaas](https://twitter.com/XPoggenklaas)
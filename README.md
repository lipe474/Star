# Versão dos pacotes utilizados<br>

- bcrypt: 5.0.1,<br>
- cors: 2.8.5,<br>
- dayjs: 1.11.2,<br>
- dotenv: 16.0.1,<br>
- express: 4.18.1,<br>
- express-async-errors: 3.1.1,<br>
- jsonwebtoken: 8.5.1,<br>
- pg: 8.7.3,<br>
- reflect-metadata: 0.1.13,<br>
- tsyringe: 4.6.0,<br>
- typeorm: 0.2.44,<br>
- uuid: 8.3.2<br>

# Star

## Introduction

O projeto trata-se de um sistema de gestão hospitalar. Realiza a gestão de pacientes, médicos, docentes e residentes, além da gestão de exames e pedidos de exames.

## Requirements

- Node.js
- Yarn
- PostgreSQL 4

## Installation

Clone the project

        gitclone https://github.com/lipe474/Star.git

Install requirements in the back-end folder and front-end folder

        yarn install

Create the database only in the back-end

        yarn typeorm migration:run

Create a file "ormconfig.json" by utilizing the "ormconfig.example.json" as example

Create a medic in database for run system, only in the back-end

        yarn seed:medic

## Run project

Use the command in the back-end and front-end

        yarn start

## Contributors

[![felipe-rocha](https://img.shields.io/badge/felipe--rocha-github-black?colorA=808080&colorB=000000&style=for-the-badge)](https://www.github.com/lipe474)

## License

License:<a href="http://www.gnu.org/licenses/gpl.html" target="blank"> GNU GPL v3</a><br>
Content License: <a href="https://creativecommons.org/licenses/by/3.0/" target = "blank">Creative Commons 3.0 BY</a>

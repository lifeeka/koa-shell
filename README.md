<p><img src="https://raw.githubusercontent.com/lifeeka/koa-shell/master/logo.png" alt=""></p>


## Koa shell.js
Structured sample skeleton application for microservices and api development with Koa 2.X

### Installation

Clone the project using git clone
```
git clone https://github.com/lifeeka/koa-shell.js.git
```

### Start
`yarn start` or `npm run start`

### Usage
Create Service <br/>
`./shell make:service test`<br/>

Create Model<br/>
`./shell make:model test`<br/>

Create Repository<br/>
`./shell make:repository test`<br/>

Create Type<br/>
`./shell make:type test` <br/>

Create Error<br/>
`./shell make:error test`<br/>


Database migration<br/>
  `./shell migrate init`         initialize a new migration project<br/>
  `./shell migrate create [options] [description]`  create a new database migration with the
                                  provided description<br/>
  `./shell migrate up [options]`                    run all pending database migrations<br/>
  `./shell migrate down [options]`                  undo the last applied database migration<br/>
  `./shell migrate status [options]`                print the changelog of the database<br/>
  `./shell migrate help [command]`                  display help for command<br/>




### Stack
- Koa 2.x
- MongoDB with mongoose
- Flow Types
- ESLint with airbnb style guide 

### License

This project is under the MIT License

<p><img src="https://raw.githubusercontent.com/lifeeka/koa-shell/master/logo.png" alt=""></p>


## Koa shell
Structured sample skeleton application for microservices and api development with Koa 2.X

### Installation

Clone the project using git clone
```
git clone https://github.com/lifeeka/koa-shell.git
```

### Start
`yarn start` or `npm run start`

### Usage
Create Service <br/>
`node shell make:service test`<br/>

Create Model<br/>
`node shell make:model test`<br/>

Create Repository<br/>
`node shell make:repository test`<br/>

Create Type<br/>
`node shell make:type test` <br/>

Create Error<br/>
`node shell make:error test`<br/>


Database migrate help<br/>
  `node shell migrate`<br/>
  `node shell migrate init`         initialize a new migration project<br/>
  `node shell migrate create [options] [description]`  create a new database migration with the
                                  provided description<br/>
  `node shell migrate up [options]`                    run all pending database migrations<br/>
  `node shell migrate down [options]`                  undo the last applied database migration<br/>
  `node shell migrate status [options]`                print the changelog of the database<br/>
  `node shell migrate help [command]`                  display help for command<br/>




### Stack
- Koa 2.x
- MongoDB with mongoose
- Flow Types
- ESLint with airbnb style guide 

### License

This project is under the MIT License

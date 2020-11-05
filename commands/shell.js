/* eslint no-console: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint flowtype/require-parameter-type: 0 */

import dotenv from 'dotenv';
import type { SeederInterface } from '../src/seeder/seeder.interface';

const write = require('write');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const { program } = require('commander');
const RepositorySample = require('./repository.sample');
const TypeSample = require('./type.sample');
const ServiceSample = require('./service.sample');
const ModelSample = require('./model.sample');
const ErrorSample = require('./error.sample');
const SeederSample = require('./seeder.sample');

const seeder = require('../src/seeder');

dotenv.config();
global.config = require('../config/app').default;

program.version('0.0.1', '-v, --vers', 'output the current version');

console.log(
  chalk.hex('#009688').bold(
    figlet.textSync('Koa Shell', { horizontalLayout: 'full' }),
  ),
);

const typeQuestions = [
  {
    name: 'service',
    type: 'list',
    message: 'What do you want to create:',
    choices: ['service', 'error', 'model', 'type'],
    default: ['service'],
  },
];
const nameQuestions = [
  {
    name: 'service',
    type: 'text',
    message: 'What do you want to call it:',
  },
];

// Make
program
  .command('make [type] [name]')
  .description('Make service')
  .action(async (type, name) => {
    let actionType = type;
    let actionName = name;

    if (!type) {
      await inquirer.prompt(typeQuestions).then((answer) => {
        actionType = answer.service;
      });
    }

    if (!actionName) {
      await inquirer.prompt(nameQuestions).then((answer) => {
        actionName = answer.service;
      });
    }

    switch (actionType) {
      case 'error':
        write.sync(`src/error/${actionName}.${actionType}.js`, ErrorSample(actionName), { newline: true });
        console.log(chalk.green.bold(`src/${actionType}/${actionName}.${actionType}.js has been created!`));
        break;
      case 'service':
        write.sync(`src/service/${actionName}.${actionType}.js`, ServiceSample(actionName), { newline: true });
        console.log(chalk.green.bold(`src/${actionType}/${actionName}.${actionType}.js has been created!`));
        break;
      case 'model':
        write.sync(`src/model/${actionName}.${actionType}.js`, ModelSample(actionName), { newline: true });
        console.log(chalk.green.bold(`src/${actionType}/${actionName}.${actionType}.js has been created!`));
        break;
      case 'repository':
        write.sync(`src/repository/${actionName}.${actionType}.js`, RepositorySample(actionName), { newline: true });
        console.log(chalk.green.bold(`src/${actionType}/${actionName}.${actionType}.js has been created!`));
        break;
      case 'type':
        write.sync(`src/type/${actionName}.${actionType}.js`, TypeSample(actionName), { newline: true });
        console.log(chalk.green.bold(`src/${actionType}/${actionName}.${actionType}.js has been created!`));
        break;
      case 'seed':
        write.sync(`src/seeder/${actionName}.${actionType}.js`, SeederSample(actionName), { newline: true });
        console.log(chalk.green.bold(`src/seeder/${actionName}.seeder.js has been created!`));
        break;
      default:
        console.log(chalk.red.bold('Invalid Task!'));
        break;
    }
  });

// Seed
program
  .command('seed [seeder]')
  .description('Run Seeder')
  .action(async (name) => {
    const seederName = name;
    if (seederName) {
      try {
        const Seeder = seeder(seederName);
        const seederItem: SeederInterface = new Seeder();
        await seederItem.seed(100);
        console.log(chalk.green.bold('Success!'));
      } catch (error) {
        console.log(chalk.red.bold('Invalid Seed!', error));
      } finally {
        process.exit(0);
      }
    }
  });
program.parse(process.argv);

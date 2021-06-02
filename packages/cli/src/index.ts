#!/usr/bin/env node
import {program} from 'commander'
import {serveCommand } from './commands/serve'

// add serve command file to commander
program.addCommand(serveCommand);

// tells commander what cli command is being run and what action needs to be executed
program.parse(process.argv)
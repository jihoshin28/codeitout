import path from 'path';
import { Command } from 'commander';
import { serve } from '@code.it/local-api';

let isProduction = 'production' === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    //path.cwd() checks what directy user is in and joins with path.dirname() to provide dir arg
    //path.basename() looks for target file to provide filename arg
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `Server running on http://localhost:${options.port} and loading cells from file ${filename}`
      );
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        console.error(
          `Port ${err.port} is in use. Try running on a different port`
        );
      } else {
        console.log(err.message);
      }
      process.exit(1);
    }
  });

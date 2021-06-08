import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root entry index.js file
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        console.log('onBuild');
        return { path: 'index.js', namespace: 'a' };
      });

      // handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        console.log('onBuild', args);
        return {
          namespace: 'a',
          // create new url with relative path and resolveDir statement, which is the path based on the relative 
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      //handle main file in a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onBuild', args);
        // create url with args.path which is the name of the module
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};

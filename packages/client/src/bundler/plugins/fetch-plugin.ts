import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache',
});

console.log(fileCache)

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
          // for loading index.js file
          build.onLoad({ filter: /(^index\.js$)/ }, () => {
              return {
              loader: 'jsx',
              contents: inputCode,
              };
          });
          // load up cached results if pathname matches up with a certain file
          build.onLoad({filter: /.*/}, async (args: any) => {
            console.log('Returned results from a cache')
              // console.log('I ran and got cached results')
              const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
          
              if(cachedResult){
                  return cachedResult
              }
          })
        
          // for loading css files
          build.onLoad({ filter: /.css$/ }, async (args: any) => {
            
            const { data, request } = await axios.get(args.path);

            // escaped variable is returned css file without the quotes and double quotes so that string doesn't terminate early 
            const escaped = data
            .replace(/\n/g, '')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");
            console.log(request, data, escaped, "FOR CSS")

            // create new style element and appended to document using Javascript
            const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style);
            `;
    
            const result: esbuild.OnLoadResult = {
            loader: 'jsx',
            contents,
            resolveDir: new URL('./', request.responseURL).pathname,
            };
            // set cached item for args.path
            await fileCache.setItem(args.path, result);
    
            return result;
          });
          
          // for loading all files besides css files 
          build.onLoad({ filter: /.*/ }, async (args: any) => {
            
            // use args.path in axios request
            const { data, request } = await axios.get(args.path);
            console.log(request, data, 'FOR ALL IMPORTS BESIDES CSS')
            const result: esbuild.OnLoadResult = {
              loader: 'jsx',
              contents: data,
              // detects when the url we received was a redirect, and the responseURL is different from the one that was provided 
              resolveDir: new URL('./', request.responseURL).pathname,
            };
            // set cached item for args.path 
            await fileCache.setItem(args.path, result);
    
            return result;
          });
        },
      };
}



// return{
//     name: 'fetch-plugin',
//     setup(build: esbuild.PluginBuild){

//         build.onLoad({filter: /(^index\.js$)/}, () => {
//             return {
//                 loader: 'jsx',
//                 contents: inputCode
//             }
//         })

//         build.onLoad({filter: /.css$/}, async(args: any) => {
//             console.log('onLoad', args, 'this');

//             const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        
//             if(cachedResult){
//                 return cachedResult
//             }
        
//             const { data, request } = await axios.get(args.path)

//             const escaped = data
//                 .replace(/\n/g, '')
//                 .replace(/"/g, '\\"')
//                 .replace(/'/g, "\\'");

//             const contents = `
//                 const style = document.createElement('style');
//                 style.innerText = '${escaped}';
//                 document.head.appendChild(style);
//             `
                        
//             const result: esbuild.OnLoadResult = {
//                 loader: 'jsx',
//                 contents,
//                 resolveDir: new URL('./', request.responseURL).pathname,
//             }
//             await fileCache.setItem(args.path, result)
        
//             return result;
//         })

//         build.onLoad({ filter: /.*/ }, async (args: any) => {
//             console.log('onLoad', args);
        
//             const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
        
//             if(cachedResult){
//                 return cachedResult
//             }
        
//             const { data, request } = await axios.get(args.path)
                        
//             const result: esbuild.OnLoadResult = {
//                 loader: 'jsx',
//                 contents: data,
//                 resolveDir: new URL('./', request.responseURL).pathname,
//             }
//             await fileCache.setItem(args.path, result)
        
//             return result;
        
//         });
//     }
// }
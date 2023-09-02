import { Injectable } from '@angular/core';

interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
  { name: 'vendors', src: './bower_components/materialize/js/vendors.min.js' },
  { name: 'plugins', src: './bower_components/materialize/js/plugins.min.js' },
  { name: 'search', src: './bower_components/materialize/js/search.min.js' },
  { name: 'custom-script', src: './bower_components/materialize/js/custom-script.min.js' },
  { name: 'jquery.dataTables', src: './bower_components/materialize/js/jquery.dataTables.min.js' },
  { name: 'dataTables.responsive', src: './bower_components/materialize/js/dataTables.responsive.min.js' },
  { name: 'dataTables.select', src: './bower_components/materialize/js/dataTables.select.min.js' },
  // { name: 'jquery.nestable', src: '../../bower_components/materialize/js/jquery.nestable.js' },
];

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      if (!this.scripts[name].loaded) {
        //load script
        let script = document.createElement('script');
        script.id = 'id_'+name;
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({script: name, loaded: true, status: 'Loaded'});
        };
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: 'Loaded'});
        document.getElementsByTagName('head')[0].appendChild(script);
      } else {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
    });
  }

  loadAll(){
    ScriptStore.forEach(script => {
      this.loadScript(script.name);
    });
  }

  clearAll(){
    ScriptStore.forEach(script => {
      this.scripts[script.name].loaded = false;
      let element = document.getElementById('id_' + script.name);
      if(element)
        element!.parentNode!.removeChild(element);
    });
  }

  clear(...names){
    names.forEach(name => {
      this.scripts[name].loaded = false;
      let element = document.getElementById('id_' + name);
      if(element)
        element!.parentNode!.removeChild(element);
    })
  }
}

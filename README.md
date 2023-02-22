# Demo Widget for Cumulocity Project [<img width="35" src="https://user-images.githubusercontent.com/67993842/97668428-f360cc80-1aa7-11eb-8801-da578bda4334.png"/>](https://github.com/SoftwareAG/cumulocity-demo-widget/releases/download/2.0.0/demo-runtime-widget-2.0.0.zip)

This Demo Widget created using Angular Library and later deploy it in App Builder as cumulocity widget. It fetches Inventory data based on the device id and displays the same in a widget.

### Please choose Demo Widget release based on Cumulocity/Application builder version:

|APPLICATION BUILDER | CUMULOCITY | DEMO WIDGET         |
|--------------------|------------|---------------------|
| 1.3.x              | >= 1011.x.x| 2.x.x               |
| 1.2.x              | 1010.x.x   | 1.x.x               | 

## Prerequisites:
   Angular CLI version 11.
    (for example: npm i @angular/cli@11.1.2 in your workspace or execute  npm i -g  @angular/cli@11.1.2 for global installation)


## Create Angular Library Project
Execute below commands to setup New Angular Library Project for widget developement.

  1. Create new Angular Project. (All Global Presales project should start with 'gp' as prefix. example: gp-demo-widget).
   
        ng new Project-Name
       
  2. Create Library project for our widget (All Global Presales project should start with 'gp' as prefix. example: gp-demo-widget).
       ```cmd
        cd Project-Name
        ng generate library gp-demo-widget
        ```
       
  3. Install Cumulocity Libraries(Mandatory for widget development)
       ```cmd
        npm install @c8y/client@1011.0.12
        npm install @c8y/ngx-components@1011.0.12
       ```
  4. Add below script command in Project-Name/package.json file in script section to create shortcut for build and serve(Optional).

        "buildPatch": "cd projects/Library-Name && npm version patch && ng build Library-Name && cd ../../dist/Library-Name && npm pack && move *.tgz ../",

        "buildMinor": "cd projects/Library-Name && npm version minor && ng build Library-Name && cd ../../dist/Library-Name && npm pack && move *.tgz ../",

        "buildMajor": "cd projects/Library-Name && npm version major && ng build Library-Name && cd ../../dist/Library-Name && npm pack && move *.tgz ../",

        "serve": "ng build Library-Name && npm i dist/Library-Name && ng s"
        
        Note: Please replace "Library-Name" with your library name(e.g. gp-demo-widget)

## Configure Proxy for Cumulocity API calls
Here are steps to setup proxy for Cumulocity API. This will help to develop and test widget locally without using cumulocity platform.
If your widget is not using any cumulocity api then you can ignore this step.

  1. Create new file "proxy-conf.json" in Project-Name/src location
  2. Copy below json in proxy-conf.json file and modify target based on your cumulocity server:
       
       ```
        {
        "/": {
        "target": "http://tenant.cumulocity.com",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "info"
            }
        }
       ```
  3. Add proxy-conf.json file path in your angular.json file. We need to add it in "Serve" section. 
        See "ProxyConfig" entry in below "Serve" section.
       ```
       "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "DemoApplication:build",
            "proxyConfig": "src/proxy.conf.json"
          },
          "configurations": {
            "production": {
              "browserTarget": "DemoApplication:build:production"
            }
          }
        },
       ```

  4. Create "fetchClient" object by adding below code in your Project-Name/src/app/app.module.ts file.
      
      ```
        import { Client, BasicAuth } from '@c8y/client';
        const auth = new BasicAuth({
        user: 'demo@democenter.com',
        password: '#####',
        tenant: 't00001'
        });
        const client = new Client(auth, 'http://localhost:4200');
        client.setAuth(auth);
        const fetchClient = client.core;
       ```

  5. Intialize provider for your cumulocity api in Project-Name/src/app.module.ts file.
        
        ``` 
        providers: [
        {
        provide: InventoryService,
        useFactory: () => {
            return new InventoryService(fetchClient);
            }
        }]
       ```
Note: We need to initialize provider for each service and also import necessary providers
     for example:
        import { InventoryService} from '@c8y/client';

## Widget Development
  - Design and develop your widget in Project-Name/projects/Library-Name/src/lib folder
  - Please note that Angular CLI may generate .spec.ts file automatically for Unit Testing purpose.
  - Add your widget hook in library module at Project-Name/projects/Library-Name/src/lib/your-module.ts. See  below example:

    ``` 
    providers: [
    {
        provide:  HOOK_COMPONENTS,
        multi: true,
        useValue: {
            id: 'demo.widget',
            label: 'Demo Widget',
            description: 'Demo Widget',
            previewImage: preview.previewImage,
            component: GpDemoWidgetComponent,
            configComponent: GpDemoWidgetConfig,
            data : {
                ng1 : {
                    options: { noDeviceTarget: false,
                    noNewWidgets: false,
                    deviceTargetNotRequired: false,
                    groupsSelectable: true
                    },
                }
            }
        }
    }]
    ```
    
  - For more details about widget developement, please refer  [Cumulocity Guide](https://cumulocity.com/guides/web/how-to/#add-a-custom-widget)
  - Add your component selector in <Project Name>src/app.component.html
    for example:
    ```
    <lib-gp-demo-widget></lib-gp-demo-widget>
    ```

  - Import your widget module in <Project Name>/src/app.module.ts and add the imported module under `@NgModule`.
    For example:
      
      ```
      import { Your-Library-Module } from 'projects/Library-Name/src/lib/Library-Module-Name.module';
      
      @NgModule({

        imports: [
                  Library-Module-Name
                 ]
      })
      ```
  
  - Import CoreModule.forRoot() in <Project Name>/src/app.module.ts and add the imported module under `@NgModule`.
  
      ```
      import { CoreModule } from '@c8y/ngx-components';
      
      @NgModule({

        imports: [
                  CoreModule.forRoot()
                 ]
      })
      ```

## Local development server
Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Installation

1.  Create a Minorbuild binary file from the source code.

       Follow the below-specified command to create a Minorbuild binary file

      i) run npm i command to install all library files specified in source code

      ```npm i ``` 

      ii) run npm run buildMinor command to create a binary file under dist folder

     ```npm run buildMinor ``` 

      iii) Copy the binary file **gp-demo-widget-2.x.x.tgz** the latest one from the dist folder and Place the binary file under any folder.

2. This could be used in conjunction with the application builder.

## Deployment Of Demo widget In App Builder

##### 1. Install the binary file in App Builder

To Install the binary file in App Builder, run the following command.

```npm i <binary file path> ``` 

Example:

```cmd 
npm i <binary file path>\gp-demo-widget-2.0.0.tgz
 ``` 

After installation see that your App Builder  has following entry in `package.json `.

```cmd 
"gp-demo-widget": "file:../commonLibrary/gp-demo-widget-2.0.0.tgz",
 ``` 

##### 2. Import Demo Widget Module

Import GpDemoWidgetModule in cumulocity-app-builder\custom-widgets\custom-widgets.module.ts  and also place the imported Module under `@NgModule`.

```
import { GpDemoWidgetModule } from 'gp-demo-widget';

@NgModule({

  imports: [

    GpDemoWidgetModule

      ]

  })
```

##### 3. Development server

1. Using `package.json Scripts`

run ``` npm i ```

Update package.json start script 

```
"scripts": {

  "start": "c8ycli server --env.extraWebpackConfig=./extra-webpack.config.js  -u <http://cumulocity_tenant>",

  },
```

Run `npm run start ` for a dev server. Navigate to `http://localhost:9000/apps/app-builder/`. The app will automatically reload if you change any of the source files.

##### 4. Build

1. Using `package.json Scripts`

Update package.json start script 

```
"scripts": {

  "build": "c8ycli build --env.extraWebpackConfig=./extra-webpack.config.js",

  },
```

Run `npm run build ` 

##### 5. Deploy widget to the App Builder

1. Using `package.json Scripts`

Update package.json start script 

```
"scripts": {

  "deploy": "c8ycli build --env.extraWebpackConfig=./extra-webpack.config.js -u <http://cumulocity_tenant>",

  },
``` 

## Want to create runtime loading widget? (Optional)


#### Follow the below steps to convert library widget into runtime 

1. Add below script command in the script section of package.json( the one in the root folder) to create shortcut for runtime.

  "scripts":{
        "runtime": "gulp --gulpfile ./runtime/gulpfile.js"
  }

2. Install the following libararies(as dev dependencies) by executing below command.

```
npm i gulp-inject-string@1.1.2 ng-packagr@11.0.0 css-loader@3.5.3 del@5.1.0 delay@4.3.0 fs-extra@9.0.0 gulp@4.0.2 gulp-filter@6.0.0 gulp-replace@1.0.0 gulp-zip@5.0.1 url-loader@4.1.0 webpack@4.43.0 webpack-cli@3.3.11 webpack-external-import@2.2.3 gulp-json-modify@1.0.2 --save-dev
```
3. Copy the runtime folder from this project into your angular project.
4. Edit the name and interleave values in the runtime/package.json to include the new contextPath:
Important: Leave the -CustomWidget on the interleave option, and don't edit the dist/bundle-src/custom-widget.js part

```
{
  "name": "demo-runtime-widget",
  "interleave": {
    "dist\\bundle-src\\custom-widget.js": "demo-runtime-widget-CustomWidget",
    "dist/bundle-src/custom-widget.js": "demo-runtime-widget-CustomWidget"
  },
}
```

5. Edit the contextPath and applicationKey values in the runtime/cumulocity.json file to include the contextPath (Feel free to edit the name and icon):

```
{
  "name": "Demo Runtime Widget",
  "contextPath": "demo-runtime-widget",
  "key": "demo-runtime-widget-application-key",
  "contentSecurityPolicy": "default-src 'self'",
  "icon": {
    "class": "fa fa-delicious"
  },
  "manifest": {
    "noAppSwitcher": true
  }
}
```
6. Edit the entry file in the runtime/ng-package.json file. Update the entry file path, so that it points to public-api.ts of your library project.

```

{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "assets": [
    "styles/**/*"
  ],
  "lib": {
    "entryFile": "../projects/gp-demo-widget/src/public-api.ts",
    "umdModuleIds": {
      "@c8y/ngx-components": "@c8y/ngx-components"
    },
    "flatModuleFile": "custom-widget"
  },
  "whitelistedNonPeerDependencies": ["."],
  "dest": "dist/widget-library"
}

```

7. Add the custom css in runtime/styles/index.css file in runtime folder.

8. Build the widget

```cmd
  npm run runtime
```

9. After the build completes the runtime/dist folder will contain a zip file, this is your deployable widget

10. Use Application Builder to install your runtime widget. Download the Demo Runtime Widget [from here](https://github.com/SoftwareAG/cumulocity-demo-widget/releases/download/2.0.0/demo-runtime-widget-2.0.0.zip)


On the successful deployment of the widget, login to cumulocity tenant URL and basic login credentials

1. Open the Application Builder from the app switcher (Next to your username in the top right)

2. Click Add application

3. Enter the application details and click Save

4. Select Add dashboard

5. Click Blank Dashboard

6. Enter the dashboard details and click Save

7. Select the dashboard from the navigation

8. Check for your widget and test it out.

## User Guide

Click on Add Widget and select Demo Widget as a widget. In the configuration, you only need to select the device.


------------------------------
  
This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
_____________________
For more information you can Ask a Question in the [TECHcommunity Forums](https://tech.forums.softwareag.com/tags/c/forum/1/Cumulocity-IoT).
  
You can find additional information in the [Software AG TECHcommunity](https://tech.forums.softwareag.com/tag/Cumulocity-IoT).

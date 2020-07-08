/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { NgModule } from '@angular/core';
import { GpDemoWidgetComponent } from './gp-demo-widget.component';
import {CoreModule, HOOK_COMPONENTS} from '@c8y/ngx-components';
import { GpDemoWidgetConfig } from './gp-demo-widget.config';
import * as preview from './preview-image';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    GpDemoWidgetComponent,
    GpDemoWidgetConfig
],
exports: [GpDemoWidgetComponent, GpDemoWidgetConfig],
entryComponents: [GpDemoWidgetComponent, GpDemoWidgetConfig],
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
}],
})
export class GpDemoWidgetModule { }




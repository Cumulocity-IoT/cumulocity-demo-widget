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

import { Component, OnInit, Input } from '@angular/core';
import { InventoryService } from '@c8y/client';

@Component({
  selector: 'lib-gp-demo-widget',
  templateUrl: './gp-demo-widget.component.html',
  styleUrls: ['./gp-demo-widget.component.css']
})
export class GpDemoWidgetComponent implements OnInit {
  @Input() config;
  dataLoaded: Promise<boolean>;
  /** stores inventory data */
  data: any;
    constructor(public inventory: InventoryService) {}
    ngOnInit() {
        this.fetchDeviceData();
    }

    /** Fetches the Inventory data based on device id selected in config */
    async fetchDeviceData() {
        const inventory = await this.inventory.detail(this.config.device.id);
        this.data = inventory.data;
        this.dataLoaded =  Promise.resolve(true);
    }

}

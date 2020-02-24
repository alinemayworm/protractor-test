import { browser } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const Path = require('path');


export class MockBackend {
    private server: any;
    private n = 0;
    private response: any = { title: '' };

    constructor() {
        this.server = Hapi.server({
            port: browser.params.backendPort,
            host: browser.params.backendHostName,
            routes: {
                cors: true,
                files: {
                    relativeTo: Path.join(__dirname, 'public')
                }
            }
        });
    }

    checkOrigin = (origin) => {
        if (origin === 'http://localhost:3201') {
            return true;
        } else {
            return false;
        }
    }

    public start(): Promise<any> {

        return new Promise<any>(async (resolve, reject) => {
            await this.server.register({
                plugin: require('hapi-cors'),
                options: {
                    checkOrigin: this.checkOrigin
                }
            });
            this.setRoutes();
            this.server
                .start()
                .then(async () => {
                    console.log(`Mock Server running at: ${this.server.info.uri}`);

                    // tslint:disable-next-line:max-line-length

                    resolve();
                })
                .catch(e => {
                    console.error('Mock server could not be started');
                    console.error(e);
                    reject();
                });
        });

    }

    public stop(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.server
                .stop()
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    console.error('Error stopping Mock Server');
                    reject();
                });
        });
    }

    private async setRoutes() {
        await this.server.route([{
            method: '*',
            path: '/lang',
            handler: () => {
                return this.response;
            }
        }]);
        console.log('finished setting routes');
    }

    public async updateMockEnd(titleSt: string) {
        this.response = { title: titleSt };
    }
}

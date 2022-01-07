import express from 'express';

import path from 'path';
import { Routes } from './routes';

class App
{
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {

    // Create a new express application instance and add middleware
    this.app = express();
    this.routePrv.routes(this.app);
  }

}

export default new App().app;

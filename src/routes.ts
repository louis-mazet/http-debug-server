import { Request, Response, Application } from "express";
import bodyParser from 'body-parser';
import fs from 'fs';


export class Routes {

  public routes(app: Application): void {

    bodyParser.json()
    app.route("/inventory").get(bodyParser.json(), this.mockInventory.bind(this));
    app.route("/inventory/action/*").get(bodyParser.json(), this.mockActionVersion.bind(this));
    app.route("/inventory/action").post(bodyParser.raw({limit: '50Mb', type: '*/*'}), this.mockActionPost.bind(this));
    app.route("/inventory/available-workspaces").get(this.mockAvailableWorkspaces.bind(this));

    app.route("*").get(bodyParser.json(), this.debugRequest.bind(this));
    app.route("*").post(bodyParser.json(), this.debugRequestPost.bind(this));
  }

  public debugRequest(req: Request, res: Response) {
    console.log('Routes.debugRequest');
    this.logEverything(req, res);
    res.json({});
  }
  
  public debugRequestPost(req: Request, res: Response) {
    console.log('Routes.debugRequestPost');
    this.logEverything(req, res);
    res.json({});
  }

  public mockInventory(req: Request, res: Response) {
    console.log('Routes.mockInventory');
    this.logEverything(req, res);
    res.json({
      "WORKSPACE_SERVICE": true,
      "ARTIFACT_MANAGER": true,
      "ACCOUNT_MANAGER": true
    });
  }

  public mockActionVersion(req: Request, res: Response) {
    console.log('Routes.mockActionVersion');
    this.logEverything(req, res);
    res.type('text/plain');
    res.send("1.2.3");
  }

  public mockActionPost(req: Request, res: Response) {
    console.log('Routes.mockActionPost');
    this.logEverything(req, res);
    fs.writeFile('test.buffer', req.body, "binary",function(err) {
      if(err) {
          console.log(err);
      } else {
          console.log("The file was saved!");
      }
    });
    console.log('Files :');
    console.log(req.files);
    console.log('File :');
    console.log(req.file);
    res.type('text/plain');
    res.send("thisisatest");
  }

  public mockAvailableWorkspaces(req: Request, res: Response) {
    console.log('Routes.mockAvailableWorkspaces');
    this.logEverything(req, res);
    res.json([
      {
          "id": "xxxxx",
          "name": "Personal",
          "owner": "xxxxx",
          "ownerFullName": "xxxxx",
          "type": "Personal",
          "environmentId": "xxxxx",
          "environmentName": "<default>"
      },
      {
          "id": "xxxxx",
          "name": "xxxxx",
          "owner": "xxxxx",
          "ownerFullName": "xxxxx",
          "type": "Custom",
          "environmentId": "xxxxx",
          "environmentName": "staging"
      }
    ]);
  }

  public logEverything(req: Request, res: Response) {
    console.log('Url :');
    console.log(req.url);
    console.log('Headers :');
    console.log(req.headers);
    console.log('Body :');
    console.log(req.body);
  }
}
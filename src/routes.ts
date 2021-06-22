import { Request, Response, Application } from "express";

export class Routes {

  public routes(app: Application): void {
    app.route("*").post(this.debugRequest);
    app.route("*").get(this.debugRequest);
  }

  public debugRequest(req: Request, res: Response) {
    console.clear();
    console.log('Routes.debugRequest');
    console.log('Url :');
    console.log(req.url);
    console.log('Headers :');
    console.log(req.headers);
    console.log('Body :');
    console.log(req.body);
    res.json({});
  }
}
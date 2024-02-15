import { inject, injectable } from "inversify";
import { BaseController } from "../../libs/rest/controller/base-controller.abstract.js";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../../libs/logger/index.js";
import { Label } from "../../libs/label/label.js";
import { Component } from "../../types/index.js";
import { HttpMethod } from "../../libs/rest/types/http-methods.enum.js";

@injectable()
export class UserController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.usersControllerRegisterRoutes'));

    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.createNewUser});
    this.addRoute({ path: '/:userId/active', method: HttpMethod.GET, handler: this.checkIfUserAuthorized});
    this.addRoute({ path: '/login', method: HttpMethod.POST, handler: this.login});
    this.addRoute({ path: '/logout', method: HttpMethod.GET, handler: this.logout});
  }

  public createNewUser(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public checkIfUserAuthorized(_reques: Request, _response: Response, _next: NextFunction) {

  }
  public login(_reques: Request, _response: Response, _next: NextFunction) {
    return _response.send('login');
  }
  public logout(_reques: Request, _response: Response, _next: NextFunction) {
    return _response.send('logout');
  }
}

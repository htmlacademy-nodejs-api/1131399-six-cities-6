import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/controller/base-controller.abstract.js';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../libs/logger/index.js';
import { Label } from '../../libs/label/label.js';
import { Component } from '../../types/index.js';
import { HttpMethod } from '../../libs/rest/types/http-methods.enum.js';
import { IUserService } from './user.service.interface.js';
import { IMiddlewares } from '../../libs/middleware/middleware.interface.js';

@injectable()
export class UserController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Label) protected readonly labels: Label,
    @inject(Component.UserService) protected readonly userService: IUserService,
    @inject(Component.Middlewares) protected readonly middlewares: IMiddlewares,
  ){
    super(logger, labels);
    this.logger.info(this.labels.get('router.usersControllerRegisterRoutes'));

    this.addRoute({ path: '/:userId/selected', method: HttpMethod.GET, handler: this.getAllSelectedOffers});
    this.addRoute({ path: '/', method: HttpMethod.POST, handler: this.createNewUser});
    this.addRoute({ path: '/:userId/active', method: HttpMethod.GET, handler: this.checkIfUserAuthorized});
    this.addRoute({ path: '/login', method: HttpMethod.POST, handler: this.login});
    this.addRoute({ path: '/logout', method: HttpMethod.GET, handler: this.logout});
  }

  public async createNewUser(request: Request, response: Response, _next: NextFunction) {
    const userDto = request.body;
    const user = await this.userService.findOrCreate(userDto);
    if (user) {
      this.ok(response, user);
    } else {
      this.noContent(response, {});
    }
  }

  public checkIfUserAuthorized(_request: Request, _response: Response, _next: NextFunction) {

  }

  public login(_request: Request, _response: Response, _next: NextFunction) {
    return _response.send('login');
  }

  public logout(_request: Request, _response: Response, _next: NextFunction) {
    return _response.send('logout');
  }

  public async getAllSelectedOffers(request: Request, response: Response, _next: NextFunction) {
    const { params } = request;
    const { userId } = params;
    const selected = await this.userService.getSelectedOffersOnUser(userId);
    if (selected) {
      this.ok(response, selected);
    } else {
      this.noContent(response, []);
    }
  }
}

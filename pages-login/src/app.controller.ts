import { Get, Controller, Render, Body, Post, Request, Redirect } from '@nestjs/common';
import { url } from 'inspector';
import { AppService } from './app.service';

@Controller('/controller')
export class AppController {

  constructor(private readonly appService: AppService) {

  }
}

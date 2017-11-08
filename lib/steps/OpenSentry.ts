import { Answers } from 'inquirer';
import * as request from 'request-promise';
import { BottomBar, dim, green, l, nl } from '../Helper';
import { BaseStep } from './Step';
const open = require('open');

export class OpenSentry extends BaseStep {
  public async emit(answers: Answers) {
    const baseUrl = this.argv.url;

    BottomBar.show('Loading wizard...');
    this.debug(`Loading wizard for ${baseUrl}`);

    try {
      const data = JSON.parse(await request.get(`${baseUrl}api/0/wizard`));

      BottomBar.hide();

      const urlToOpen = `${baseUrl}account/settings/wizard/${data.hash}/`;

      open(urlToOpen);
      nl();
      l('Please open');
      green(urlToOpen);
      l("in your browser (if it's not open already)");
      nl();

      return { hash: data.hash };
    } catch (e) {
      throw new Error(`Could not connect to wizard @ ${baseUrl}`);
    }
  }
}
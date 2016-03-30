import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class NavbarViewControl extends BaseViewControl {
    templateString: string = require('./navbar.vc.html');

    context: any = {};
}

register.viewControl('navbar-vc', NavbarViewControl);

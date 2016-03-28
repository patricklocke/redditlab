import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import getRedditListRepository from '../../repositories/getredditlist/getredditlist.repo'

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    constructor(private getPosts: getRedditListRepository){
        super();
    };
        context = {
        posts: <models.IRedditPost>{}
    };
    navigatedTo(){
        this.getPosts.getRedditList().then((success) => {
            console.log(this)
        }, (err) => {
            console.log("nope, that didn't work")
        })
    };
}

register.viewControl('home-vc', HomeViewControl, [getRedditListRepository]);

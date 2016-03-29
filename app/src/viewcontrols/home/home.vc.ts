import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import getRedditListRepository from '../../repositories/getredditlist/getredditlist.repo'

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');
    constructor(private getPosts: getRedditListRepository){
        super();
    };
        context: any = {
        posts: <models.IRedditPost>{},
        filteredData: <Array<any>>[]
    };
    navigatedTo(){
        console.log("have navigated to calles getRedditPosts()")
        this.getPosts.getRedditPosts()
        .then((success) => {
            this.context.filteredData = success;
            console.log('wohoo!');
        });
    };
    // toggleView(){
    //     this.("fullzoom","gifbox")
    // }
    
       

}

register.viewControl('home-vc', HomeViewControl, [getRedditListRepository]);

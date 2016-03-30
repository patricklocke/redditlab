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
        filteredData: <Array<any>>[],
        giffyModal: false,
        carouselItems: <Array<any>>[],
        modalPost: <models.IRedditPost>{
            title: '',
            author: '',
            url: '',
            id: '',
            upvotes: ''
        }
        
       
    };
    navigatedTo(){
        console.log("have navigated to calles getRedditPosts()")
        this.getPosts.getRedditPosts()
        .then((success) => {
            this.context.filteredData = success;
            this.context.carouselItems =  this.context.filteredData.slice(0,3);
          
            console.log(this.context.carouselItems);
        });
    };
    showModal(index: number){
        this.context.modalPost = this.context.filteredData[index];
        this.context.giffyModal = true;
    }
    
    dismissModal(): void {
        this.context.giffyModal = false;
    }
    

}


register.viewControl('home-vc', HomeViewControl, [getRedditListRepository]);

import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class GetRedditListService extends BaseService {

//Parent: data{children{data{...}}
// needs: id, author, url,  preview{{images{source{url,width,height}}}
// title, created_utc, ups. 
    constructor(){
        super()
    }
    
    GetRedditPosts():async.IThenable<Array<any>>{
       return this.http.json ({
           url: this.host,
           method: "GET"
       }).then((success => {
           console.log("Woooo!");
           return success.response;
       }, (err) => {
           console.log("Oops...");
       });
        
    }
    
    
    
    
}




register.injectable('getredditlist-svc', GetRedditListService);

import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class GetRedditListService extends BaseService {

//Parent: data{children{data{...}}
// needs: id, author, url,  preview{{images{source{url,width,height}}}
// title, created_utc, ups. 
    constructor(){
        super()
    }
    
    getRedditLists():async.IThenable<any>{
        console.log('getRedditLists is called by getRedditPosts()')
       return this.http.json ({
           url: this.host,
           method: 'GET'
        }).then((success:any ) => {
            return success.response.data.children;
        }, (err) =>{
            throw err;
        });     
    }
}
    
    
    
    





register.injectable('getredditlist-svc', GetRedditListService);

import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import GetRedditListService from '../../services/getredditlist/getredditlist.svc';

export default class GetRedditListRepository extends BaseRepository {
    constructor(private GetRedditListService: any){
        super();
    }
    getRedditPosts(): async.IAjaxThenable<Array<models.IRedditPost>>{
            return this.GetRedditListService.getRedditList({
               data:{
                   children: {
                       data: {
                        url:'url',
                        author: 'author',
                        title: 'title',
                        created_utc: 'createdAt',
                        ups: 'upvotes',
                        preview:{
                            images:{
                                source:{
                                        url:'previewUrl',
                                        width: 'previeWidth',
                                        height: 'previewHeight'
                        }}}
                        } 
                                          
                       }
                   }
            });
            //Parent: data{children{data{...}}
// needs: id, author, url,  preview{{images{source{url,width,height}}}
// title, created_utc, ups. 
}
}

register.injectable('getredditlist-repo', GetRedditListRepository,[GetRedditListService]);

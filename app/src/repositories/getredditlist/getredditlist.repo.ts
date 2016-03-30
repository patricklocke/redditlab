import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import GetRedditListService from '../../services/getredditlist/getredditlist.svc';

export default class GetRedditListRepository extends BaseRepository {
    constructor(private GetRedditListService: any){
        super();
    }
    getRedditPosts(): async.IThenable<Array<models.IRedditPost>>{
            let filteredData: any = [];
            let urlarray: any = []
            return this.GetRedditListService.getRedditLists().then((posts: any) => {
                
                for (let i = 0; i < posts.length; i++){
                    
                    var urlFixed = function() {
                        let url = posts[i].data.url
                        let giant = 'giant.';
                        let giffy = '.gif';
                        let find = url.indexOf('gfycat');
                        let fixer = '';
                        
                        if (url.slice(-4) == 'gifv') {
                             fixer = url.slice(0, -1); 
                             return fixer;       
                        } else if (url.indexOf('gfycat') >= 0) {
                            fixer =  (url.slice(0, find) + giant + url.slice(find) + giffy);
                            return fixer;
                        } else {
                            fixer = url;
                            return  fixer
                        }
                    }
                   
                  
                   
                    let newPost = {
                        author: posts[i].data.author,
                        createdAt: posts[i].data.created_utc,
                        title: posts[i].data.title,
                        upvotes: posts[i].data.ups,
                        preview: posts[i].data.preview,
                        width: posts[i].data.media_embed.width,
                        height: posts[i].data.media_embed.height,
                        url: urlFixed(),
                        id: posts[i].data.id
                        

                    }
                    filteredData.push(newPost);
                    
                }
                console.log(filteredData);
                return filteredData;
            });
    }       
}


register.injectable('getredditlist-repo', GetRedditListRepository,[GetRedditListService]);


     //Parent: data{children{data{...}}
// needs: id, author, url,  preview{{images{source{url,width,height}}}
// title, created_utc, ups. 
            
            
            // return this.GetRedditListService.getRedditLists({
            //    data:{
            //        children: {
            //            data: {
            //             url:'url',
            //             author: 'author',
            //             title: 'title',
            //             created_utc: 'createdAt',
            //             ups: 'upvotes',
            //             preview:{
            //                 images:{
            //                     source:{
            //                             url:'previewUrl',
            //                             width: 'previeWidth',
            //                             height: 'previewHeight'
            //             }}}
            //             } 
                                          
            //            }
            //        }
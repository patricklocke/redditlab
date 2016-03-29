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
                for(let k = 0; k < posts.length; k++) {    
                    
                    let url = posts[k].data.url
                    let giant = 'giant.';
                    let giffy = '.gif';
                    let find = url.indexOf('gfycat')
                    
                    if (url.slice(-4) == 'gifv'){
                        let fixedurl = url.slice(0,-1);
                        let stringy = String(fixedurl)
                        urlarray.push(stringy);
                        
                    } else if (url.indexOf('gfycat') >= 0) {
                        let newUrl = (url.slice(0,find) + giant + url.slice(find)+ giffy);
                        urlarray.push(newUrl);   
                    } else {
                        urlarray.push(url);
                    }
                }
                
                for (let i = 0; i < posts.length; i++){
                    let newPost = {
                        author: posts[i].data.author,
                        createdAt: posts[i].data.created_utc,
                        title: posts[i].data.title,
                        upvotes: posts[i].data.ups,
                        preview: posts[i].data.preview,
                        url: urlarray[i]
                    };
                    
                    filteredData.push(newPost);
                    console.log(urlarray[i]);
                };;
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
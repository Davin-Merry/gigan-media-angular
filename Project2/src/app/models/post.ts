import { User } from './user';

export class Post {
    constructor(private postId:number, private creator:User, private text:string,
                private images:string[], private time:number, private likes:User[]) {}
    
    set postText(text:string) {
        this.text = text;
    }
}

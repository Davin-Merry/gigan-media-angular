import { User } from './user';

export class Post {
    constructor(private postId:number, private creator:User, private text:string,
                private images:string[], private time:number, private likes:User[]) {}
    
    set postText(text:string) {
        this.text = text;
    }

    get postCreator():User {
        return this.creator;
    }

    get profilePicture():string {
        return this.creator._profile._profileImage;
    }
}

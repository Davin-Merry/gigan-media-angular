import { User } from './user';

export class Post {
    constructor(private postId:number, private blogger:User, private text:string,
                private images:string[], private time:number, private likes:User[]) {}

    get postCreator():User {
        return this.blogger;
    }

    get postText(): string {
        return this.text;
    }

    get postImages(): string[] {
        return this.images;
    }

    get postTime(): Date {
        return new Date(this.time);
    }

    get profilePicture():string {
        return this.blogger._profile._profileImage;
    }
}

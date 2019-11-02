import { Profile } from './profile';

export class User {
    constructor(private firstName:string, private lastName:string, private email:string,
                private password:string, private salt:string, private profile?:Profile) {}
    get _email() {
        return this.email;
    }

    get _profile() {
        return this.profile;
    }
}
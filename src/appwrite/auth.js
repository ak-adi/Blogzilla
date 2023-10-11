import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    //this will call first when object is created
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    //We can create a wrapper so that under the hood what service are used, we don't have to worry about, bcz in future we've to change our database, backend
    //we re using asyn await bcz until completion of account.create() we don't want to proceed
    async createAccount({ email, password, name }) {
        //destructuring object bcz when method pass object in which these value will be there
        try {
            //first we have to await for account creation
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            //now checking if account is created or not
            if (userAccount) {
                //call another method - if account created then login
                return this.login({email,password})
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
            throw error
        }
    }

    //if user exist or not , suppose if sometries to enter home directly, in that case this function will help
    async getCurrentUser(){
        try {
           return await this.account.get()

        } catch (error) {
           console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        //if user not found, we can do this using if-else also
        //if in try-catch any error occur then null returns 
        return null
    }

    async logout(){
        try {
               await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
     
    }

}
/* In future if we have to change our backend, then change constructor and defination of createAccount function but parameter remain same in most backend*/



//why not lets create an object and then export, so then we can import object and then use methods in it
const authService = new AuthService()


export default authService
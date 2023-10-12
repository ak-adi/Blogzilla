import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //as a document id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
            
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

    //we have document id seprate, to find which document should be update
    async updatePost(slug, {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status  
                }
            )
        } catch (error) {
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            //to confirm document is deleted
            return true
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    //suppose we want to get one post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    //when we want to get all posts, but we want only those value whose status is active, we pass default parameter to get active post(key,value), we can pass enum also , we have to create indexes in appwrite to run queries
    async getAllPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                //we already declared queries, we can declare here also in this []
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            //if none value found
            return false
        }
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                //unique id
                ID.unique(),
                //file
                file
                )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error); 
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error); 
            return false
        }
    }

    //preview file , we can declare it without async bcz there is no promise in previewfile function in appwrite so the loading of data is already fast
    getPreviewFile(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service()

export default service
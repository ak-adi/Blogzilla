import React, { useCallback, useEffect } from 'react'
import { Button, InputForPost, Select, RTE } from '../index'
import { useForm } from 'react-hook-form'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    //if we have to watch continuously monitor some form then we use watch
    //if we want to set value in the form then we have to use setValue
    //if we want control of the form then we use control, this control we pass to RTE- so then we get the control of that function
    //if we want to grap the values of the form then we use getValues
    //we can also pass object also in the form , so if we have to give value we can give
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            //for default value we want some information, and this information comes from in case user comes to add value or edit value, if come here to edit so we have to give default value
            //whoever call this form will pass these values
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    //getting user data
    const userData = useSelector((state) => state.auth.userData)

    //now, when user submit the form, the data should be passed
    //now two cases: the post value is already there, if yes then update it
    //second, if the post value is not there, then add a new entry
    const submit = async (data) => {
        if (post) {
            //for update , first we need to handle file
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            //now delete the old image
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            //updating the post
            //we have to pass slug -which is the id for the post and other parameters
            const dbPost = await appwriteService.updatePost(
                post.$id, {
                //all the other data will be spread like this
                ...data,
                //we have to override the image bcz we uploaded the image and we get the data 
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
            //now if post is not there
        } else {
            //first upload the file(image)
            const file = await appwriteService.uploadFile(data.image[0])
            //now if we have have
            if (file) {
                //getting the id of the file
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    //we spread the data, bcz when the form build- then there will be no userData
                    ...data, userId: userData.$id });
                    //there is field of userId, then we have to give that from userData

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    //we have to watch title and simultaneously generate slug value, and if user gives space then convert it into dash
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                //^ - negate => means not match this, - means range, \d means digits, \s means spaces, at the end + means apart from this add all
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                //gloabally look spaces and replace that with -
                .replace(/\s/g, "-")
        return "";
        //In register, watch will be inserted in the title value    
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        })

        return () => {
            //(memory management), in useeffect you call method, then how you will optimize that , so there store it in a variable , then in return in the callback unsubscribe that so that wo apne aap mai ghum kr na reh jaye
            subscription.unsubscribe()
        }
        //In register, watch will be inserted in the title value    
    }, [watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <InputForPost
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <InputForPost
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <InputForPost
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
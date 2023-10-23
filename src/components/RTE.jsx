import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

//control : this will pass control from this component to another whoever call this function
export default function RTE({ name, control, label, defaultValue = "" }) {

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name || "content"}
                // parent which call this , this pass control from here to that parent, so that parent should event ,state, value, data in this 
                control={control}
                //now how to render elements
                //now tracking on field is done like this, if change in this field so inform me with render
                render={({ field: { onChange } }) => (
                    //now here we insert , which we want to render
                    <Editor
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        // when the change in editor, this will be govern by onChange
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    )
}

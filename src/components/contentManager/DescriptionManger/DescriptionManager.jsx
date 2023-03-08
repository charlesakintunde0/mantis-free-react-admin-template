import MainCard from 'components/MainCard'
import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Input, Form } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


import { UploadOutlined } from '@ant-design/icons';

//custom styles
import './DescriptionManager.css'

// api
import { useCreatePestInfoDescriptionMutation, useUpdatePestInfoDescriptionMutation } from '../../../api/pestApi'

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// reducers
import { closeDescriptionModal } from 'store/reducers/descriptionModal';

const DescriptionManager = () => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createPestInfoDescription, { isLoading }] = useCreatePestInfoDescriptionMutation();
    const [updatePestInfoDescription] = useUpdatePestInfoDescriptionMutation();
    const { isOpen, componentData, pestId } = useSelector(state => state.descriptionModal);
    const [open, setOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);
    const [addedImages, setAddedImages] = useState([]);





    // helper functions 

    const getImage = async (imageUrl, imgId) => {
        try {
            const afterSlash = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const imageName = afterSlash.substring(0, afterSlash.lastIndexOf('.')).replace(/[^a-zA-Z]/, '');
            const urlObject = new URL(imageUrl);
            const ext = urlObject.pathname.split('.').pop();
            const format = ext === 'png' ? 'png' : ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : 'jfif';

            const response = await axios.get('https://localhost:44361/api/pests/getImageFile?url=' + imageUrl, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const fileUid = uuidv4();
            const file = new File([blob], `${imageName}.${ext}`, { type: `image/${format}` });
            const thumbUrl = URL.createObjectURL(file);

            return {
                uid: fileUid,
                originFileObj: file,
                thumbUrl,
                name: imageName,
                imgId: imgId
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        if (isOpen) {
            const fetchImages = async () => {
                const imagePromises = componentData.peiPestInfoDescriptionImages.map(async img => {
                    const imgId = img.id;
                    const imageUrl = img.peiPestDescriptionInfoImageUrl;
                    const imageFile = await getImage(imageUrl, imgId);
                    return imageFile;
                });
                const images = await Promise.all(imagePromises);
                return images;
                // form.setFieldsValue({ image_upload: componentData ? { fileList: defaultImages } : [] })
            };

            fetchImages().then(images => setFileList([images]));
            form.setFieldsValue({ title: componentData ? componentData.descriptionTitle : '' })
            form.setFieldsValue({ description: componentData ? componentData.peiPestInfoDescriptionContent : '' })
        }

    }, [componentData])








    const handleDescriptionCardManagerSubmit = () => {
        form.validateFields().then(values => {
            setLoading(true);


            const formData = new FormData();
            formData.append('descriptionTitle', values.title);
            formData.append('peiPestInfoDescriptionContent', values.description);
            formData.append('peiPestInfoId', pestId);



            values.image_upload.fileList.forEach(file => {
                formData.append('files', file.originFileObj);
            });

            axios.post('https://localhost:44361/api/pests/createDescription', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).
                then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                })
                .catch(error => {
                    console.log(error);
                });
        }).catch(error => {
            console.log(error);
        });
    };


    const handleDescriptionCardManagerEdit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            const formData = new FormData();
            formData.append('descriptionTitle', values.title);
            formData.append('peiPestInfoDescriptionContent', values.description);
            formData.append('Id', componentData.id);
            addedImages.forEach(fileObj => {
                formData.append('files', fileObj);

            });

            axios.put('https://localhost:44361/api/pests/updateDescription', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
                .then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                })
                .catch(error => {
                    console.log(error);
                });
        }).catch(error => {
            console.log(error);
        });
    };

    const handleCancel = () => {
        dispatch(closeDescriptionModal());
        form.resetFields();
        setFileList([]);
    };

    // const handleUpload = (file) => {
    //     // Process the uploaded file here, e.g. send it to the server
    //     console.log('Uploaded file:', file);

    //     // Add the uploaded file to the list of files
    //     setDefaultImages([...defaultImages, file]);

    //     // Add the file list to the Form instance
    //     form.setFieldsValue({ image_upload: defaultImages });
    // };

    const handleImageRemove = (file) => {
        const newFileList = fileList.filter((f) => f.uid !== file.uid);

        form.setFieldsValue({ image_upload: newFileList });

        axios.delete(`https://localhost:44361/api/pests/deleteUploadedImage/${file.imgId}`, {
        })
            .then(() => {
                setLoading(false);
                setOpen(false);
                handleCancel();
            })
            .catch(error => {
                console.log(error);
            }).catch(error => {
                console.log(error);
            });
    }

    const handleImageChange = (info) => {
        // if (!info.file.status) {

        setFileList(fileList);
        form.setFieldsValue({ image_upload: { fileList: fileList } })
        // }



    }
    return (

        <Modal
            open={isOpen}
            fileList={fileList}
            title={componentData ? 'Edit Description' : 'Add Description'}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <>{componentData ?
                    <Button key="submit" type="primary" loading={loading} onClick={handleDescriptionCardManagerEdit}>
                        Edit
                    </Button>
                    : <Button key="submit" type="primary" loading={loading} onClick={handleDescriptionCardManagerSubmit}>
                        Submit
                    </Button>}</>,
            ]}
        >
            <Form
                encType="multipart/form-data"
                form={form}
                layout={'vertical'}
                ref={formRef}
                initialValues={{ image_upload: defaultImages }}
                name="control-ref"
                onFinish={handleDescriptionCardManagerSubmit}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input value={form.getFieldValue('title')} onChange={(e) => form.setFieldsValue({ title: e.target.value })} placeholder={'Enter Description Title'} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <TextArea value={form.getFieldValue('description')} onChange={(e) => form.setFieldsValue({ description: e.target.value })} rows={4} placeholder="maxLength is 600" maxLength={600} />
                </Form.Item>

                <Form.Item
                    name="image_upload"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Upload
                        onRemove={handleImageRemove}
                        onChange={handleImageChange}
                        limit={1}
                        accept=".jpg,.jpeg,.png"
                        beforeUpload={false}
                        multiple
                        listType="picture"
                        fileList={fileList}
                        defaultFileList={defaultImages}
                        className="upload-list-inline"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>


                </Form.Item>


            </Form>





        </Modal>

    )
}

export default DescriptionManager


//
// import { Button, Modal } from 'antd';


//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setOpen(false);
//     }, 3000);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button type="primary" onClick={showModal}>
//         Open Modal with customized footer
//       </Button>
//
//     </>
//   );
// };

// export default App;
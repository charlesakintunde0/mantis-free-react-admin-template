import MainCard from 'components/MainCard'
import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Input, Form } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';




import { UploadOutlined } from '@ant-design/icons';

//custom styles
import './DescriptionManager.css'

// api
import { useCreatePestInfoDescriptionMutation, useUpdatePestInfoDescriptionMutation, useDeleteUploadedImageMutation } from '../../../api/pestApi'

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// reducers
import { closeDescriptionModal } from 'store/reducers/descriptionModal';


// notification
import { Notification } from 'components/Notifications/Notification';

const DescriptionManager = () => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createPestInfoDescription, { isLoading }] = useCreatePestInfoDescriptionMutation();
    const [updatePestInfoDescription] = useUpdatePestInfoDescriptionMutation();
    const [deleteUploadedImage] = useDeleteUploadedImageMutation();
    const { isOpen, componentData, pestId } = useSelector(state => state.descriptionModal);
    const [open, setOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);
    const [addedImages, setAddedImages] = useState([]);





    // helper functions 

    const getImage = async (imageUrl, imgId) => {
        try {
            const afterSlash = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const imageName = afterSlash.substring(0, afterSlash.lastIndexOf('.'));
            const urlObject = new URL(imageUrl);
            const ext = urlObject.pathname.split('.').pop();
            const format = ext === 'png' ? 'png' : ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : 'jfif';

            const response = await axios.get('https://localhost:44361/api/pests/getImageFile?url=' + imageUrl, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const fileUid = uuidv4();
            const file = new File([blob], `${imageName}.${ext}`, { type: `image/${format}` });
            const thumbUrl = URL.createObjectURL(file);
            console.log(imageName)
            return {
                uid: fileUid,
                originFileObj: file,
                thumbUrl,
                name: imageName,
                imgId: imgId,
                imageUrl: imageUrl
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
                    const images = await getImage(imageUrl, imgId);
                    return images;
                });

                const images = await Promise.all(imagePromises);
                return images;
            };

            fetchImages().then(images => setFileList(images));
            form.setFieldsValue({ title: componentData ? componentData.descriptionTitle : '' })
            form.setFieldsValue({ description: componentData ? componentData.peiPestInfoDescriptionContent : '' })

        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })
    const handleDescriptionCardManagerSubmit = () => {
        form.validateFields().then(values => {
            setLoading(true);
            const formData = new FormData();
            formData.append('descriptionTitle', values.title);
            formData.append('peiPestInfoDescriptionContent', values.description);
            formData.append('peiPestInfoId', pestId);
            formData.append('id', pestId);


            values.image_upload.fileList.forEach(file => {
                formData.append('files', file.originFileObj);
            });

            createPestInfoDescription(formData).
                then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation successful', 'Description Added Successfully');
                })
                .catch(error => {
                    Notification('error', 'Operation Failed', error);
                });
        }).catch(error => {
            Notification('error', 'Operation Failed', error);
        });
    };


    const handleDescriptionCardManagerEdit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            const formData = new FormData();
            formData.append('descriptionTitle', values.title);
            formData.append('peiPestInfoDescriptionContent', values.description);
            formData.append('Id', componentData.id);


            values.image_upload.fileList.forEach(file => {
                formData.append('files', file.originFileObj);
            });


            updatePestInfoDescription(formData)
                .then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation successful', 'Your changes have been saved.');
                })
                .catch(error => {
                    Notification('error', 'Operation Failed', error);
                });
        }).catch(error => {
            Notification('error', 'Operation Failed', error);
        });
    };

    const handleCancel = () => {
        const values = form.getFieldsValue();

        if (values.description && values.title && values.image_upload.fileList.length === 0) {
            // Show an error message or prevent the modal from closing
            Notification('warning', 'Warning', "Image upload field is empty!");

        } else {
            // Allow the modal to close
            dispatch(closeDescriptionModal());
            form.resetFields();
            setFileList([]);
            setLoading(false);
        }


    };


    const handleImageRemove = (file) => {
        if (fileList.length > 1) {
            const newFileList = fileList.filter((f) => f.uid !== file.uid);
            form.setFieldsValue({ image_upload: newFileList });
            deleteUploadedImage(file.imgId)
                .then(() => {
                    Notification('success', 'Operation successful', "Image deleted successfully");
                })
                .catch(error => {
                    Notification('error', 'Operation failed', error.message);
                }).catch(error => {
                    console.log(error);
                });
        } else {
            Notification('error', 'Operation failed', 'At least one image must be uploaded!');
        }

    }


    const handleImageChange = ({ fileList }) => {

        // Check if the fileList has only one file
        if (fileList.length === 1) {
            // Set showRemoveIcon to false to prevent deletion
            fileList[0].showRemoveIcon = false;
        }

        if (fileList.length > 5) {
            fileList.splice(5);
        }

        setFileList(fileList);
        form.setFieldsValue({ image_upload: { fileList: fileList } })



    }
    return (

        <Modal
            open={isOpen}
            fileList={fileList}
            title={componentData ? 'Edit Description' : 'Add Description'}
            onCancel={handleCancel}
            maskClosable={false}
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
                        accept=".jpg,.jpeg,.png"
                        multiple
                        listType="picture"
                        fileList={fileList}
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
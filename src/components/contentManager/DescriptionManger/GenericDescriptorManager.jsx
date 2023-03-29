import MainCard from 'components/MainCard'
import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

//custom styles
import './DescriptionManager.css'

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// helper function
import { getImage } from 'Helper/Utils';



// notification
import { Notification } from 'components/Notifications/Notification';

const DescriptionManager = ({ isOpen, Id, componentData, closeDescriptionModal, useUpdateInfoDescriptionMutation, useCreateInfoDescriptionMutation, useDeleteUploadedImageMutation }) => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createInfoDescription, { isLoading }] = useCreateInfoDescriptionMutation();
    const [updateInfoDescription] = useUpdateInfoDescriptionMutation();
    const [deleteUploadedImage] = useDeleteUploadedImageMutation();
    const [fileList, setFileList] = useState([]);
    const [open, setOpen] = useState(null);

    useEffect(() => {
        if (isOpen) {
            const fetchImages = async () => {
                const imagePromises = componentData.peiInfoDescriptionImages.map(async img => {
                    const imgId = img.id;
                    const imageUrl = img.peiDescriptionInfoImageUrl;
                    const images = await getImage(imageUrl, imgId);
                    return images;
                });

                const images = await Promise.all(imagePromises);
                return images;
            };

            fetchImages().then(images => setFileList(images));
            form.setFieldsValue({ title: componentData ? componentData.descriptionTitle : '' })
            form.setFieldsValue({ description: componentData ? componentData.peiInfoDescriptionContent : '' })

        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })
    const handleDescriptionCardManagerSubmit = () => {
        try {
            form.validateFields().then(values => {
                setLoading(true);
                const formData = new FormData();
                formData.append('descriptionTitle', values.title);
                formData.append('peiInfoDescriptionContent', values.description);
                formData.append('peiInfoId', Id);
                formData.append('id', Id);

                console.log(values)


                values.image_upload.fileList.forEach(file => {
                    formData.append('files', file.originFileObj);
                });

                createInfoDescription(formData).
                    then(() => {
                        setLoading(false);
                        setOpen(false);
                        handleCancel();

                    })
                    .catch(error => {
                        Notification('error', 'Operation Failed', error);
                    });
            }).catch(error => {
                Notification('error', 'Operation Failed', error);
            });
            Notification('success', 'Operation Successful', 'Description has been added');
        } catch (error) {
            Notification('error', 'Operation Failed', error);
        }
    };


    const handleDescriptionCardManagerEdit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            const formData = new FormData();
            formData.append('descriptionTitle', values.title);
            formData.append('peiInfoDescriptionContent', values.description);
            formData.append('Id', componentData.id);



            console.log(values)

            values.image_upload.fileList.forEach(file => {
                formData.append('files', file.originFileObj);
            });


            updateInfoDescription(formData)
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
                initialValues={{ image_upload: fileList }}
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


import React, { useState, useEffect } from 'react';
import './CropManager.css'

import { Button, Modal, Upload, Input, Form, message } from 'antd';


// antd
import { UploadOutlined } from '@ant-design/icons';

// componenets
import { Notification } from 'components/Notifications/Notification';

// utils
import { getImage, handleImageChange, handleImageRemove } from 'Helper/Utils';

// api
import { useCreateCropsMutation, useUpdateCropMutation, useDeleteUploadedImageMutation } from 'api/cropApi';
// react-redux
import { useSelector, useDispatch } from 'react-redux';

// reducers
import { closeCropModal } from 'store/reducers/cropModal';

const CropManager = () => {
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createCreateCrops] = useCreateCropsMutation();
    const [updateCrops] = useUpdateCropMutation();
    const [deleteUploadedImage] = useDeleteUploadedImageMutation()
    const { isOpen, componentData, cropId } = useSelector(state => state.cropModal);
    const [open, setOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);

    useEffect(() => {
        if (isOpen) {
            const fetchImages = async () => {

                const img = componentData;
                const imgId = img.id;
                const imageUrl = img.image;
                const images = await getImage(imageUrl, imgId);
                return images;

            };

            fetchImages().then(images => setFileList([images]));
            form.setFieldsValue({ crop_name: componentData ? componentData.crop : '' })
        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })


    const handleCropCardManagerSubmit = () => {
        form.validateFields().then(values => {



            const formData = new FormData();



            formData.append('CName', values.crop_name);
            formData.append('CImageFile', values.image_upload.file.originFileObj);

            createCreateCrops(formData).
                then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation suceessful', 'Crops created successfully')
                })
                .catch(error => {
                    Notification('error', 'Operation failed', 'An error occured, Unable to create crop!')
                });
        }).catch(error => {
            Notification('error', 'Operation failed', 'An error occured, Unable to create crop!')
        });
    };


    const handleCropCardManagerEdit = () => {
        form.validateFields().then(values => {


            console.log(componentData)
            console.log(cropId);

            const formData = new FormData();
            formData.append('CName', values.crop_name);
            formData.append('CId', componentData.id)
            console.log(values);
            values.image_upload.fileList.forEach(fileObj => {
                formData.append('CImageFile', fileObj.originFileObj);

            });

            updateCrops(formData)
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
        dispatch(closeCropModal());
        form.resetFields();
        setFileList([]);
    };
    const handleImageRemove = (file) => {
        try {
            if (fileList.length === 1) {
                Notification('warning', 'You cannot remove last image!', 'Click the upload button to replace it instead')
                return false;

            }

            const newFileList = fileList.filter((f) => f.uid !== file.uid);

            form.setFieldsValue({ image_upload: { fileList: newFileList } })
            setFileList(newFileList);
            deleteUploadedImage(file.imgId)
                .then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation successful', 'Image deleted sucessfully');
                })
                .catch(error => {
                    Notification('error', 'Operation failed', error.message)
                }).catch(error => {
                    Notification('error', 'Operation failed', error.message)
                });

        } catch (error) {
            Notification('error', 'Operation failed', error.message)
        }

    }


    const handleImageChange = ({ fileList }) => {
        if (fileList.length > 1) {
            const newFileList = [fileList[fileList.length - 1]];
            setFileList(newFileList);
            form.setFieldsValue({ image_upload: { fileList: newFileList } })
        } else {
            setFileList(fileList);
            form.setFieldsValue({ image_upload: { fileList: fileList } })
        }


    }

    return (
        <Modal
            open={isOpen}
            fileList={fileList}
            title={componentData ? 'Edit Crop' : 'Add Crop'}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <>{componentData ?
                    <Button key="submit" type="primary" loading={loading} onClick={handleCropCardManagerEdit}>
                        Edit
                    </Button>
                    : <Button key="submit" type="primary" loading={loading} onClick={handleCropCardManagerSubmit}>
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
                onFinish={handleCropCardManagerSubmit}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="crop_name"
                    label="Crop"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input value={form.getFieldValue('crop_name')} onChange={(e) => form.setFieldsValue({ crop_name: e.target.value })} placeholder={'Enter Crop Name'} />
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
                        multiple={false}
                        listType="picture"
                        defaultFileList={defaultImages}
                        fileList={fileList}
                        removeIcon={false}
                        className="upload-list-inline"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>


                </Form.Item>


            </Form>





        </Modal>

    )
}



export default CropManager
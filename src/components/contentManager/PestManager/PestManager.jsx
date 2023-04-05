import React, { useState, useEffect } from 'react';

//antd
import { Button, Modal, Upload, Input, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// utils 
import { getImage } from 'Helper/Utils';
// api
import { useDeleteUploadedImageMutation, useCreatePestMutation, useUpdatePestMutation, } from '../../../api/pestApi'
// react-redux
import { useSelector, useDispatch } from 'react-redux';
// reducers
import { closePestModal } from 'store/reducers/pestModal';
import { Notification } from 'components/Notifications/Notification';

const PestManager = () => {
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [createPest] = useCreatePestMutation();
    const [updatePest] = useUpdatePestMutation();
    const [deleteUploadedImage] = useDeleteUploadedImageMutation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { isOpen, componentData, cropId, pestId } = useSelector(state => state.pestModal);
    const [open, setOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);



    useEffect(() => {
        if (isOpen) {
            const fetchImages = async () => {

                const data = componentData;
                const imgId = data.pId;
                const imageUrl = data.image;
                const images = await getImage(imageUrl, imgId); // util
                return images;

            };

            fetchImages().then(images => setFileList([images]));
            form.setFieldsValue({ pest_name: componentData ? componentData.pName : '' })
        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })
    console.log(fileList);

    const handlePestCardManagerSubmit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            const formData = new FormData();

            console.log(values)

            formData.append('PName', values.pest_name);
            formData.append('PImageFile', values.image_upload.file.originFileObj);
            formData.append('CrId', cropId);

            createPest(formData).
                then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation successful', 'Crops created successfully')
                })
                .catch(error => {
                    Notification('error', 'Operation failed', 'Unable to creat new pest')
                });
        }).catch(error => {
            Notification('error', 'Operation failed', 'Unable to creat new pest')
        });

    };


    const handlePestCardManagerEdit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            console.log(pestId)
            const formData = new FormData();
            formData.append('PName', values.pest_name);
            formData.append('PId', pestId);
            console.log(values);
            values.image_upload.fileList.forEach(fileObj => {
                formData.append('PImageFile', fileObj.originFileObj);

            });

            updatePest(formData)
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
        dispatch(closePestModal());
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
            title={componentData ? 'Edit Pest' : 'Add Pest'}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <>{componentData ?
                    <Button key="submit" type="primary" loading={loading} onClick={handlePestCardManagerEdit}>
                        Edit
                    </Button>
                    : <Button key="submit" type="primary" loading={loading} onClick={handlePestCardManagerSubmit}>
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
                onFinish={handlePestCardManagerSubmit}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="pest_name"
                    label="Pest"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input value={form.getFieldValue('pest_name')} onChange={(e) => form.setFieldsValue({ pest_name: e.target.value })} placeholder={'Enter Pest Name'} />
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
                        multiple={false}
                        listType="picture"
                        defaultFileList={defaultImages}
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



export default PestManager
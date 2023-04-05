import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Input, Form, notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

// antd
import { UploadOutlined } from '@ant-design/icons';
// componenets
import { Notification } from 'components/Notifications/Notification';
// api
import { useCreateCropsMutation, useUpdateCropMutation, useDeleteUploadedImageMutation } from 'api/cropApi';
import { useCreateDiseaseMutation, useUpdateDiseaseMutation, useDeleteDiseaseMutation } from 'api/diseasesApi';
// react-redux
import { useSelector, useDispatch } from 'react-redux';
// reducers
import { closeDiseaseModal } from 'store/reducers/diseaseModal';

const DiseaseManager = () => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createCropDiseases] = useCreateDiseaseMutation();
    const [updateDisease] = useUpdateDiseaseMutation();
    const [deleteUploadedImage] = useDeleteUploadedImageMutation();
    const { isOpen, componentData, diseaseId, cropId } = useSelector(state => state.diseaseModal);
    const [open, setOpen] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [defaultImages, setDefaultImages] = useState([]);
    const [api, contextHolder] = notification.useNotification();

    const [addedImages, setAddedImages] = useState([]);

    // helper functions 

    const getImage = async (imageUrl, imgId) => {
        try {
            const afterSlash = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
            const imageName = afterSlash.substring(0, afterSlash.lastIndexOf('.')).replace(/\d+/g, '');
            const urlObject = new URL(imageUrl);
            const ext = urlObject.pathname.split('.').pop();
            const format = ext === 'png' ? 'png' : ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : 'jfif';

            const response = await axios.get('https://localhost:44361/api/pests/getImageFile?url=' + imageUrl, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const fileUid = uuidv4();
            const file = new File([blob], `${imageName}.${ext}`, { type: `image/${format}` });
            const thumbUrl = URL.createObjectURL(file);
            console.log(thumbUrl);
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

                const img = componentData;
                const imgId = img.id;
                const imageUrl = img.image;
                const images = await getImage(imageUrl, imgId);
                return images;

            };

            fetchImages().then(images => setFileList([images]));
            form.setFieldsValue({ disease_name: componentData ? componentData.dName : '' })

            console.log(componentData)
        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })
    console.log(fileList);

    const handleDiseaseCardManagerSubmit = () => {
        form.validateFields().then(values => {

            const formData = new FormData();
            formData.append('DName', values.disease_name);
            formData.append('DImageFile', values.image_upload.file.originFileObj);
            formData.append('CId', cropId);
            createCropDiseases(formData).
                then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation suceessful', 'Disease created successfully')
                })
                .catch(error => {
                    Notification('error', 'Operation failed', 'An error occured, Unable to create crop!')
                });
        }).catch(error => {
            Notification('error', 'Operation failed', 'An error occured, Unable to create crop!')
        });
    };


    const handleDiseaseCardManagerEdit = () => {
        form.validateFields().then(values => {
            const formData = new FormData();
            formData.append('DName', values.disease_name);
            formData.append('DId', componentData.dId)
            values.image_upload.fileList.forEach(fileObj => {
                formData.append('DImageFile', fileObj.originFileObj);
            });
            updateDisease(formData)
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
        dispatch(closeDiseaseModal());
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
            title={componentData ? 'Edit Disease' : 'Add Disease'}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <>{componentData ?
                    <Button key="submit" type="primary" loading={loading} onClick={handleDiseaseCardManagerEdit}>
                        Edit
                    </Button>
                    : <Button key="submit" type="primary" loading={loading} onClick={handleDiseaseCardManagerSubmit}>
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
                onFinish={handleDiseaseCardManagerSubmit}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="disease_name"
                    label="Disease"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input value={form.getFieldValue('disease_name')} onChange={(e) => form.setFieldsValue({ disease_name: e.target.value })} placeholder={'Enter Diseasee Name'} />
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

export default DiseaseManager
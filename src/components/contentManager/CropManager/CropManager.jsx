import React, { useState, useEffect } from 'react';
import './CropManager.css'

import MainCard from 'components/MainCard'

import { Button, Modal, Upload, Input, Form } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


import { UploadOutlined } from '@ant-design/icons';


// api
import { useCreatePestInfoDescriptionMutation, useUpdatePestInfoDescriptionMutation } from '../../../api/pestApi'

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// reducers
import { closeCropModal } from 'store/reducers/cropModal';

const CropManager = () => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createPestInfoDescription, { isLoading }] = useCreatePestInfoDescriptionMutation();
    const [updatePestInfoDescription] = useUpdatePestInfoDescriptionMutation();
    const { isOpen, componentData, cropId } = useSelector(state => state.cropModal);
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
            form.setFieldsValue({ crop_name: componentData ? componentData.crop : '' })
        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })
    console.log(fileList);

    const handleCropCardManagerSubmit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            const formData = new FormData();



            formData.append('CName', values.crop_name);
            formData.append('CImageFile', values.image_upload.file.originFileObj);


            axios.post('https://localhost:44361/api/crops/Create', formData, {
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


    const handleCropCardManagerEdit = () => {
        form.validateFields().then(values => {
            // setLoading(true);


            console.log(componentData)
            console.log(cropId);

            const formData = new FormData();
            formData.append('CName', values.crop_name);
            formData.append('CId', cropId)
            console.log(values);
            values.image_upload.fileList.forEach(fileObj => {
                formData.append('CImageFile', fileObj.originFileObj);

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
        dispatch(closeCropModal());
        form.resetFields();
        setFileList([]);
    };
    const handleImageRemove = (file) => {
        console.log(file);
        const newFileList = fileList.filter((f) => f.uid !== file.uid);

        form.setFieldsValue({ image_upload: { fileList: newFileList } })
        setFileList(newFileList);

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

    const handleImageChange = ({ fileList }) => {

        if (fileList.length > 1) {
            fileList.splice(1);
        }

        setFileList(fileList);
        form.setFieldsValue({ image_upload: { fileList: fileList } })

    }
    return (
        <Modal
            open={isOpen}
            fileList={fileList}
            title={componentData ? 'Edit Crop' : 'Add Crop'}
            onCancel={handleCancel}
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



export default CropManager
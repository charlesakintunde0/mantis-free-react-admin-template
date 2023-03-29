import React, { useState, useEffect } from 'react';
import { Button, Modal, Upload, Input, Form, notification } from 'antd';

//utils
import { getImage } from 'Helper/Utils';

// antd
import { UploadOutlined } from '@ant-design/icons';

// componenets
import { Notification } from 'components/Notifications/Notification';

// api
import { useCreateWeedMutation, useUpdateWeedMutation, useDeleteWeedMutation, useDeleteUploadedImageMutation } from 'api/weedApi';

// react-redux
import { useSelector, useDispatch } from 'react-redux';

// reducers
import { closeWeedModal } from 'store/reducers/weedModal';

const WeedManager = () => {
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [createCropWeeds] = useCreateWeedMutation();
    const [updateWeed, { error }] = useUpdateWeedMutation();
    const [deleteUploadedImage] = useDeleteUploadedImageMutation();
    const { isOpen, componentData, weed } = useSelector(state => state.weedModal);
    const [open, setOpen] = useState(false);
    const [fileList, setFileList] = useState([]);


    // helper functions 

    // const getImage = async (imageUrl, imgId) => {
    //     try {
    //         const afterSlash = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    //         const imageName = afterSlash.substring(0, afterSlash.lastIndexOf('.')).replace(/\d+/g, '');
    //         const urlObject = new URL(imageUrl);
    //         const ext = urlObject.pathname.split('.').pop();
    //         const format = ext === 'png' ? 'png' : ext === 'jpg' || ext === 'jpeg' ? 'jpeg' : 'jfif';

    //         const response = await axios.get('https://localhost:44361/api/pests/getImageFile?url=' + imageUrl, { responseType: 'arraybuffer' });
    //         const blob = new Blob([response.data], { type: response.headers['content-type'] });
    //         const fileUid = uuidv4();
    //         const file = new File([blob], `${imageName}.${ext}`, { type: `image/${format}` });
    //         const thumbUrl = URL.createObjectURL(file);
    //         console.log(thumbUrl);
    //         return {
    //             uid: fileUid,
    //             originFileObj: file,
    //             thumbUrl,
    //             name: imageName,
    //             imgId: imgId
    //         };


    //     } catch (error) {
    //         console.error(error);
    //         return null;
    //     }
    // };

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
            form.setFieldsValue({ weed_name: componentData ? componentData.weed : '' })

            console.log(componentData)
        }

    }, [componentData])
    form.setFieldsValue({ image_upload: { fileList: fileList } })
    console.log(fileList);

    const handleWeedCardManagerSubmit = () => {
        form.validateFields().then(values => {

            const formData = new FormData();
            formData.append('WName', values.weed_name);
            formData.append('WImageFile', values.image_upload.file.originFileObj);
            createCropWeeds(formData).
                then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    Notification('success', 'Operation suceessful', 'Weed created successfully')
                })
                .catch(error => {
                    Notification('error', 'Operation failed', 'An error occured, Unable to create crop!')
                });
        }).catch(error => {
            Notification('error', 'Operation failed', 'An error occured, Unable to create crop!')
        });
    };


    const handleWeedCardManagerEdit = () => {
        form.validateFields().then(values => {
            const formData = new FormData();
            formData.append('WName', values.weed_name);
            formData.append('WId', componentData.id)
            values.image_upload.fileList.forEach(fileObj => {
                formData.append('WImageFile', fileObj.originFileObj);
            });


            updateWeed(formData)
                .then(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                })
                .catch(error => {
                    Notification('error', 'Operation failed', error)
                    console.log(error)
                });
        }).catch(error => {
            Notification('error', 'Operation failed', error)
            console.log(error)
        });

        console.log(error);
    };



    const handleCancel = () => {
        dispatch(closeWeedModal());
        form.resetFields();
        setFileList([]);
    };

    const handleImageRemove = (file) => {
        // try {

        //     const newFileList = fileList.filter((f) => f.uid !== file.uid);

        //     form.setFieldsValue({ image_upload: { fileList: newFileList } })
        //     setFileList(newFileList);
        //     deleteUploadedImage(file.imgId)
        //         .then(() => {
        //             setLoading(false);
        //             setOpen(false);
        //             Notification('success', 'Operation successful', 'Image deleted sucessfully');
        //         })
        //         .catch(error => {
        //             Notification('error', 'Operation failed', error.message)
        //         }).catch(error => {
        //             Notification('error', 'Operation failed', error.message)
        //         });

        // } catch (error) {
        //     Notification('error', 'Operation failed', error.message)
        // }

    }

    const handleImageChange = ({ fileList }) => {

        if (fileList.length > 1) {
            fileList.splice(0);
        }

        setFileList(fileList);
        form.setFieldsValue({ image_upload: { fileList: fileList } })

    }
    return (
        <Modal
            open={isOpen}
            fileList={fileList}
            title={componentData ? 'Edit Weed' : 'Add Weed'}
            onCancel={handleCancel}
            maskClosable={false}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <>{componentData ?
                    <Button key="submit" type="primary" loading={loading} onClick={handleWeedCardManagerEdit}>
                        Edit
                    </Button>
                    : <Button key="submit" type="primary" loading={loading} onClick={handleWeedCardManagerSubmit}>
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
                onFinish={handleWeedCardManagerSubmit}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="weed_name"
                    label="Weed"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input value={form.getFieldValue('weed_name')} onChange={(e) => form.setFieldsValue({ weed_name: e.target.value })} placeholder={'Enter Diseasee Name'} />
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

export default WeedManager
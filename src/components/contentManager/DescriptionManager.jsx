import MainCard from 'components/MainCard'
import React, { useState } from 'react';
import { Button, Modal, Upload, Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';

//custom styles
import './DescriptionManager.css'


// api

import { useCreatePestInfoDescriptionMutation } from '../../api/pestApi'

// reducers
import { closeDescriptionModal } from 'store/reducers/descriptionModal';

const DescriptionManager = () => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const formRef = React.useRef(null);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [createPestInfoDescription, { isLoading }] = useCreatePestInfoDescriptionMutation();
    const { isOpen, storedDescriptionCardData, pestId } = useSelector(state => state.descriptionModal);
    const [defaultImages, setDefaultImages] = useState([
        {
            uid: '-1',
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ])
    const [open, setOpen] = useState(false);



    const handleDescriptionCardManagerSubmit = () => {

        console.log(form)
        form.validateFields().then(values => {
            setLoading(true);

            if (!isLoading) {
                setTimeout(() => {
                    setLoading(false);
                    setOpen(false);
                    handleCancel();
                    form.resetFields();
                }, 3000);
            }



            console.log(values);
            createPestInfoDescription({
                title: values.title,
                description: values.description,
                images: values.images,
                pestId: pestId

            })

        }).catch(error => {
            form.submit();
            console.log('Error: ', error);
        });
    };








    const handleCancel = () => {
        dispatch(closeDescriptionModal());
    };
    return (

        <Modal
            open={isOpen}
            title={storedDescriptionCardData ? 'Edit Description' : 'Add Description'}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Return
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleDescriptionCardManagerSubmit}>
                    Submit
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout={'vertical'}
                ref={formRef}
                name="control-ref"
                initialValues={{ images: defaultImages }}
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
                    name="images"
                >
                    <Upload
                        // {...uploadImagesProps}
                        name="images"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        beforeUpload={() => false}
                        action="/upload"
                        listType="picture"
                        defaultFileList={[...defaultImages]}
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
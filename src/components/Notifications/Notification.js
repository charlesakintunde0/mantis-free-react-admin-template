import React from 'react'

// import notification
import { notification, Button } from 'antd';

const notificationStyle = {
    marginTop: '54px', // change this value to adjust the distance from the top
};

const closeConfirmationNotification = (deleteFunction) => {
    deleteFunction()
    // notification.close('deleteConfirmation');
}

export const Notification = (type, message, description) => {
    notification[type]({
        message,
        description,
        placement: 'topRight',
        duration: 2,
        style: notificationStyle,
    });
};

export const handleDeleteWithIdConfirmation = (deleteFunction, Id) => {
    notification.warning({
        message: 'Are you sure you want to delete this item?',
        description: 'This action cannot be undone.',
        duration: null,
        onClose: () => { },
        onClick: () => { },
        style: notificationStyle,
        key: 'deleteConfirmation',
        btn: (
            <Button onClick={() => { notification.destroy('deleteConfirmation'); deleteFunction(Id) }} type="primary" ghost danger>
                Delete
            </Button>
        ),
    });
};

export const handleDeleteConfirmation = (deleteFunction) => {
    notification.warning({
        message: 'Are you sure you want to delete this item?',
        description: 'This action cannot be undone.',
        duration: null,
        onClose: () => { },
        onClick: () => { },
        style: notificationStyle,
        key: 'deleteConfirmation',
        btn: (
            <Button onClick={() => { notification.destroy('deleteConfirmation'); deleteFunction() }} type="primary" ghost danger>
                Delete
            </Button>
        ),
    });
}








import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

//antd
import { Button, Modal } from 'antd';

//redux
import { useSelector, useDispatch } from 'react-redux';

//reducer
import { closeUserModal } from 'store/reducers/usersModal';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party

// project import


// ant design 
import { DeleteFilled } from '@ant-design/icons';
import { Select, Space } from 'antd';




// api import
import { useGetAllUsersQuery } from 'api/userApi';
import { useChangeUserRoleMutation, useDeleteUserMutation } from 'api/userApi';

function createData(id, firstname, lastname, email, role) {
    return { id, firstname, lastname, email, role };
}




function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);

}

export default function UsersTable() {
    const { data } = useGetAllUsersQuery();
    const [changeRoles] = useChangeUserRoleMutation();
    const [deleteUser] = useDeleteUserMutation();
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.usersModal.isOpen);

    const rows = data ? data.map((row) => createData(row.uId, row.uFirstName, row.uLastName, row.uEmail, row.uRole)) : [];

    const handleChange = (newRole, id, firstname, lastname, email) => {
        changeRoles({
            UEmail: email,
            UFirstName: firstname,
            UId: id,
            ULastName: lastname,
            URole: newRole,
        });

    };


    const handleCancel = () => {
        dispatch(closeUserModal());
    };

    const handleUserDelete = (id) => {
        deleteUser(id);

    }
    return (
        <Modal
            title={'EDIT USERS'}
            open={isOpen}
            onCancel={handleCancel}
            width={800}
            footer={null}
            maskable>
            <Box>
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
                    }}
                >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left"> ID</TableCell>
                                <TableCell align="left">{'FIRSTNAME'}</TableCell>
                                <TableCell align="left">{'LASTNAME'}</TableCell>
                                <TableCell align="left">{'EMAIL'}</TableCell>
                                <TableCell align="left">{'ROLE'}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        {rows.length > 0 ?
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >   <TableCell align="left">{row.id}</TableCell>
                                        <TableCell align="left">{row.firstname}</TableCell>
                                        <TableCell align="left">{row.lastname}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left"> <Space wrap>

                                            <Select
                                                defaultValue={row.role}
                                                style={{ width: 120 }}
                                                onChange={(value) => handleChange(value, row.id, row.firstname, row.lastname, row.email)}
                                                options={[
                                                    { value: 'User', label: 'User' },
                                                    { value: 'Moderator', label: 'Moderator' },
                                                    { value: 'Admin', label: 'Admin' },
                                                ]}
                                            />
                                        </Space></TableCell>
                                        <TableCell align="right" onClick={() => handleUserDelete(row.id)}>
                                            <Button danger ghost icon={<DeleteFilled />} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            : <Typography align='center'>No registered user as of now...</Typography>}
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );
}




import React from "react";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";
import MainCard from "components/MainCard";
import { HomeOutlined } from "@ant-design/icons";


const NotFoundPage = () => {
    return (
        <MainCard>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" shape="round" icon={<HomeOutlined />}>
                        <Link style={{ marginLeft: "8px" }} to="/">Back Home</Link>
                    </Button>
                }
            />
        </MainCard>
    );
};

export default NotFoundPage;
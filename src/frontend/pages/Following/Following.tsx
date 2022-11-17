import React from 'react'
import _axios from "frontend/api/axios";
import { useEffect, useState } from "react";
import { Avatar, Box, CardHeader, Typography } from "@mui/material";

const listWrapper = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    p: "10px",
    "& .listInnerWrapper": {
        mr: "10px",
        ml: "10px",
        mb: "15px",
        border: "1px solid #000",
        borderRadius: "50px",
        "& > .MuiCardHeader-root": {
            p: "7px 20px",
            "& img": { width: "100%", height: "100%" },
        },
    },
};
const Following = () => {
    const [allFollowing, setAllFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await _axios.get("api/connection/get-following-list/");
            if (data.code === 200) {
                setAllFollowing(data.data);
            }
        } catch (err: any) {
            console.error("err ===>", err.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Box sx={listWrapper}>
            {allFollowing.map((list: any, ind) => {
                    return (
                        <Box
                            className="listInnerWrapper"

                    key={ind}
                    >
                    <CardHeader
                        avatar={
                    <Avatar>
                    <Typography
                        component={"img"}
                    src={list.profile_image}
                    alt=""
                        />
                        </Avatar>
                }
                    title={list.display_name}
                    subheader={list.custom_username}
                    />
                    </Box>
                );
                })}
            </Box>
    )
}

export default Following
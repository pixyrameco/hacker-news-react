import {useCallback, useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const NewsInfo = (props: any) => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        title: undefined,
        url: undefined,
        score: undefined,
        descendants: undefined,
        by: undefined,
        time: 0
    })
    const timeConverter = useCallback((UNIX_timestamp: number): string =>{
        let date = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = date.getFullYear();
        let month = months[date.getMonth()];
        let day = date.getDate();
        let hour:number | string = date.getHours();
        hour = hour < 10 ? "0" + hour : hour
        let min: string | number = date.getMinutes();
        min = min < 10 ? "0" + min : min
        return day + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    }, [])

    useEffect(()=>{
        fetch("https://hacker-news.firebaseio.com/v0/item/" + props.id + ".json?print=pretty")
            .then(data => data.json())
            .then(json => {
                setData(json)
            })
    }, [props.id])

    // console.log("single data: ", data)
    return (
        <div>
            {
                data !== null && data.url !== undefined ?
                    <div>
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                            <Button onClick={e=>{
                                navigate("/site/" + props.id, {replace: true})
                            }}>{data.title}
                            </Button>
                            <Typography variant={"body2"}>Rating: {data.score} Comments: {data.descendants}</Typography>

                        </Stack>
                        <Typography style={{color: "#a2a2a2"}}>Published: {timeConverter(data.time)} </Typography>
                    </div>
                    :
                    null
            }

        </div>
    )
}
export default NewsInfo
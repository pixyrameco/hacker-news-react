import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {ArrowBack, Sync} from "@mui/icons-material";
import Comments from "./Comments";

const SingleNewsPage = (props = { }) =>{

    const navigate = useNavigate();
    const id = useParams<string>()
    console.log("id: ", id.id)
    const [newsData, setNewsData] = useState({
        title: undefined,
        by: undefined,
        descendants: undefined,
        score: undefined,
        url: undefined,
        kids: [],
        time: 0
    });

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
        let sec: number | string = date.getSeconds();
        sec = sec < 10 ? "0" + sec : sec
        return day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    }, [])
    const fetchData = useCallback((): void =>{
        fetch("https://hacker-news.firebaseio.com/v0/item/" + id.id + ".json?print=pretty")
            .then(data => data.json())
            .then(json => {
                // console.log("js: ", json)
                setNewsData(json)
            })
    }, [id.id])


    useEffect(()=>{
        fetchData()
    }, [fetchData])

    return(
        <div>
            <Button style={{marginTop: 50}} onClick={e=>{
                navigate("/", {replace: true})
            }}>
                <ArrowBack/>
            </Button>
            <Typography variant={"h2"}>
                {newsData.title}
            </Typography>
            <Button onClick={e=>{
                window.open(newsData.url, "_blank");
            }}>
                Original source
            </Button>
            <Stack direction={"row"}
                   justifyContent={"center"}
                   spacing={2}
                   alignItems={"center"}
            >
                <Typography variant={"h6"}>Date: {timeConverter(newsData.time)}</Typography>
                <Typography variant={"h6"}>By: {newsData.by}</Typography>
                <Button onClick={e=>{
                    fetchData()
                }}>
                    Comments: {newsData.descendants}

                    <Sync/>
                </Button>
            </Stack>


            {newsData.kids ?
                <Comments kids={newsData.kids} />
                :
                null
            }
        </div>
    )
}
export default SingleNewsPage;
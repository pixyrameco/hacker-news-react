import {useCallback, useEffect, useRef, useState} from "react";
import NewsInfo from "./NewsInfo";
import {Button} from "@mui/material";
import {Cached} from "@mui/icons-material";
import Divider from "@mui/material/Divider"
import './MainPage.css'
import {useNavigate} from "react-router-dom";

export default function MainPage(props= {}){

    const MAX_NUM = 100
    const navigate = useNavigate();
    const [storyType, ] = useState<"newstories" | "topstories">("newstories")
    const [lastNews, setLastNews] = useState<number[]>([]);
    const interval = useRef<NodeJS.Timer | undefined>(undefined);

    const fetchGlobalData = useCallback((): void =>{
        console.log("fetch call")
        fetch("https://hacker-news.firebaseio.com/v0/"+ storyType + ".json?print=pretty")
        // fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
            .then(data => data.json())
            .then(json => {
                setLastNews(json)
            })
    }, [storyType])

    useEffect(()=>{
        fetchGlobalData()
    }, [fetchGlobalData])

    useEffect(()=>{
        setInterval(()=>{}, )
        interval.current = setInterval(()=>{
            fetchGlobalData()
        }, 60000)
        return () => {
            clearInterval(interval.current)
        }
    },[fetchGlobalData])

    return(
        <div>
            <Button style={{marginTop: 50, marginBottom: 10}} onClick={()=>{
                fetchGlobalData()
            }}>
                <Cached/>
            </Button>
            {
                lastNews
                    .filter((news, index) => index <= MAX_NUM)
                    .map(news =>
                            <div
                                onClick={()=>{
                                    console.log("click: ", news)
                                    navigate("/site/" + news, {replace: true})
                                }}
                                key={news}
                                className={"news-info"}
                            >

                                <NewsInfo key={news} id={news}/>
                                <Divider/>
                            </div>

                    )

            }
            {/*<Divider/>*/}
        </div>
    )
}
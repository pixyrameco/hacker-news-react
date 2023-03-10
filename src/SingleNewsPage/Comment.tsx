import {useCallback, useEffect, useState} from "react";
import {Button, Stack, Typography} from "@mui/material";
import {ArrowDropDown, ArrowLeft} from "@mui/icons-material";
import CircularProgress from '@mui/material/CircularProgress';
import * as DOMPurify from "dompurify"
import Divider from "@mui/material/Divider";
const Comment = (props: any) => {

    const [openNode, setOpenNode] = useState(false)
    const [littleComments, setLittleComments] = useState<object[]>([])


    const fetchLittleComments = useCallback((ids: number[]): void => {
        if(ids === undefined){
            let noComment = {text: "no comments yet"}
            setLittleComments([noComment])
            return
        }
        Promise.all(
            ids.map(
                id=>fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty")
            ))
            .then(data => Promise.all(data.map(datum => datum.json())))
            .then(json=>{
                setLittleComments(json)
                // console.log("litle: ", json )
            })
    }, [])

    useEffect(()=>{
        if(openNode){
            fetchLittleComments(props.node.kids)
        }
        // if (props.node.kids === undefined){
            // setOpenNode(false)
        // }
    }, [fetchLittleComments, openNode, props.node.kids])
    // console.log("lit: ", props.node )
    return(
        <div style={{marginTop: 10}}>
            {
                props.node.deleted ?
                    <Typography style={{marginLeft: 65, color: "#949494"}} variant={"body2"} align={"left"}>
                        Deleted
                    </Typography>
                    :
                    <div>
                        <Typography style={{marginLeft: 0, color: "#757575"}} variant={"overline"} align={"left"}>
                            {props.node.by}
                        </Typography>
                        <Stack direction={"row"}>
                            <Button onClick={e => {
                                setOpenNode(!openNode)
                            }}>
                                {!openNode ? <ArrowLeft/> : <ArrowDropDown/>}
                            </Button>

                            <Typography variant={"body2"} align={"left"}
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.node.text)}}>
                                {/*{DOMPurify.sanitize(props.node.text)}*/}
                            </Typography>
                        </Stack>
                    </div>


            }
            {
                openNode ? littleComments.length > 0 ?
                        littleComments.map((littleComment:any, index:number) => {
                            // @ts-ignore
                            return (
                                <div style={{marginLeft: 50}}>
                                    {littleComment.kids && littleComment.kids.length > 0
                                        ?
                                        <Comment node={littleComment}/>
                                        :
                                        littleComment.deleted
                                            ?
                                            <Typography style={{marginLeft: 65, color: "#949494"}} variant={"body2"} align={"left"}>
                                                Deleted
                                            </Typography>
                                            :
                                            <div>
                                                <Typography style={{marginLeft: 0, color: "#757575"}} variant={"overline"} align={"left"}>
                                                    {littleComment.by}
                                                </Typography>
                                                <Typography style={{marginLeft: 65}}
                                                            variant={"body2"}
                                                            align={"left"}
                                                            dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(littleComment.text)}}
                                                >
                                                </Typography>
                                            </div>

                                    }
                                    {index !== littleComments.length - 1
                                        ?
                                        <Divider/>
                                        :
                                        null
                                    }
                                </div>
                            )
                        })
                        : <CircularProgress/>
                    : null
            }
            <Divider/>

        </div>
    )
}
export default Comment
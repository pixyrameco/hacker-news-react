import {useCallback, useEffect, useState} from "react";
import Comment from "./Comment";
const Comments = (props: any) => {

    const [nodes, setNodes] = useState<object[]>([{kids: []}])

    const fetchComments = useCallback((ids: number[]): void => {
        Promise.all(
            ids.map(
                id=>fetch("https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty")
            ))
            .then(data => Promise.all(data.map(datum => datum.json())))
            .then(json=>{
                // console.log("json: ", json)
                setNodes(json)
            })
    }, [])

    useEffect(()=>{
        fetchComments(props.kids)
    }, [fetchComments, props.kids])

    return(
        <div>
            {/*{nodes.length > 1 ?*/}
            {/*    <Comment node={nodes[0]}/>*/}
            {/*    :*/}
            {/*    null*/}
            {/*}*/}
            {nodes.map((node:any) => {
                return <Comment node={node}/>
            })}
        </div>
    )
}
export default Comments
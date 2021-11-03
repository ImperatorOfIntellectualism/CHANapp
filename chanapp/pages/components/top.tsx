import type {NextPage} from 'next'
import React, {FC, useEffect, useState} from 'react'
import { useMutation, useQuery } from 'urql';

const TodosMutation = `
mutation Mutation($text: String!, $postId: Float!, $updateThreadId: Float!) {
  createPost(text: $text) {
    id
    text
    createdAt
  }
  updateThread(postId: $postId, id: $updateThreadId) {
    id
    createdAt
    title
    op
    posts {
      id
      createdAt
      text
    }
  }
}
`;

const TodosQuery = `
query Query {
  posts {
    id
    createdAt
    text
  }
}
`;

interface Props {
  boardName: string;
  threadNumber: number;
}

  const Top: FC<Props> = ({boardName, threadNumber}) => {
    const [result, reexecuteQuery] = useQuery({
      query: TodosQuery,
    });
    const { data, fetching, error } = result;

    const [updateTodoResult, updateTodo] = useMutation(TodosMutation);
    const [postText, setPostText] = useState('')

    if(fetching) return (<div></div>)
  return (
    <div>
    <div className="boardTitle">
      {boardName}
    </div>
    <div className="postEnter">
    <textarea  className="textInput" onChange={(event)=>{setPostText(event.target.value)}} placeholder="Enter your post"/>
    <input type="submit" onClick={()=>{const post = data.posts.at(-1).id + 1;updateTodo({text: postText, postId: post, updateThreadId: threadNumber}).then(result => {
    });}}/>
    </div>
    </div>
      )
  }
  export default Top
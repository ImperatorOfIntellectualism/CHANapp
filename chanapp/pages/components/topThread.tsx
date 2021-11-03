import type {NextPage} from 'next'
import React, {FC, useEffect, useState} from 'react'
import { useMutation, useQuery } from 'urql';

const TodosMutation = `
mutation CreateThreadMutation($title: String!, $op: String!, $threadId: Float!, $updateBoardId: Float!) {
  createThread(title: $title, op: $op) {
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
  updateBoard(threadId: $threadId, id: $updateBoardId) {
    id
    title
    threads {
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
}
`;

const TodosQuery = `
query Query {
  threads {
    id
    createdAt
    title
    op
    posts {
      text
      createdAt
      id
    }
  }
}
`;

interface Props {
  boardName: string;
}

  const TopThread: FC<Props> = ({boardName}) => {
    const [result, reexecuteQuery] = useQuery({
      query: TodosQuery,
      variables: {boardId: 1}
    });
    const { data, fetching, error } = result;
    const [updateTodoResult, updateTodo] = useMutation(TodosMutation);
    const [threadText, setThreadText] = useState('')
    const [OP, setOP] = useState('')
    if(fetching) return (<div></div>)
  return (
    <div className="top">
    <div className="boardTitle">
      {boardName}
    </div>
    <div className="postEnter">
    <input placeholder="Enter the name of the thread" onChange={(event)=>{setOP(event.target.value)}} type="text" className="textInput"/>
    <textarea className="textInput" onChange={(event)=>{setThreadText(event.target.value)}} placeholder="Enter your thread"/>
    <input type="submit" onClick={()=>{const thread = data.threads.at(-1).id + 1;updateTodo({title: threadText, op: OP, updateBoardId: 1, threadId: thread}).then(result => {
  });}}/>
  </div>
    </div>
      )
  }
  export default TopThread

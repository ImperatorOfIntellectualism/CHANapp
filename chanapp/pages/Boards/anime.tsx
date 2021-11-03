import type {NextPage} from 'next'
import { FC, useEffect } from 'react'
import Top from '../components/top'
import Link from 'next/link'
import { useMutation, useQuery } from 'urql';
import TopThread from '../components/topThread';

const TodosMutation = `mutation Mutation($deleteThreadId: Float!) {
  deleteThread(id: $deleteThreadId) {
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
}`

const TodosQuery=`query Query($boardId: Int!) {
  board(id: $boardId) {
    id
    title
    threads {
      createdAt
      title
      op
      posts {
        id
        createdAt
        text
      }
      id
    }
  }
}`;

interface Props {
  op: string;
  title: string;
  id: number;
}

const Thread: FC<Props> = ({op, title, id}) => {
  return (
    <div className="thread">
        <img width={100} height={100} src="https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1634736220/sample.jpg" />
        <span className="threadDescription">{op}</span>
        <Link href={{
            pathname: '/thread',
            query: { thread: id },
          }}><a style={{fontWeight: 'bold'}}>{title}</a></Link>
      </div>
      )
  }

  const Anime: NextPage = () => {
    const [updateTodoResult, updateTodo] = useMutation(TodosMutation);
    const [result, reexecuteQuery] = useQuery({
      query: TodosQuery,
      variables: {boardId: 1}
    });
    const { data, fetching, error } = result;
    useEffect(()=>{
      if(!!data){
        console.log(data.board.threads.length)
      if(data.board.threads.length >= 8){updateTodo({deleteThreadId: data.board.threads[0].id})}
      }
    }, [fetching])
    if (fetching) return (<p>Loading...</p>)
  return (
    <div>
      <TopThread boardName="Anime"/>
    <div className="boardRow">
    {data.board.threads.map(data => (
        <Thread key={data.id} op={data.op} title={data.title} id={data.id}></Thread>
      ))}
  </div>
</div>


      )
  }
  export default Anime

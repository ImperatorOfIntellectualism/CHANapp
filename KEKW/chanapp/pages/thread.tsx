import type { NextPage } from "next";
import Top from "./components/top";
import { useRouter } from 'next/router'
import { FC, useEffect } from "react";
import { useQuery } from "urql";

const TodosQuery = `
query Query($threadId: Int!) {
  thread(id: $threadId) {
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

interface Props {
  post: string;
}

const Post: FC<Props> = ({post}) => {
  return (
    <div className="post">
        <img width={100} height={100} src="https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1634736220/sample.jpg" />
        {post}
      </div>
      )
  }

const Thread: NextPage = () => {
  const router = useRouter()

  const [result, reexecuteQuery] = useQuery({
    query: TodosQuery,
    variables: { threadId: Number(router.query.thread) }
  });
  const { data, fetching, error } = result;
  useEffect(()=>{
    console.log(data)
  }, [fetching])
  if (fetching) return (<div></div>)
  return (
    <div>
      <Top boardName="Anime" threadNumber={Number(router.query.thread)}></Top>
  <div className="innerThread">
    <div className="OP">
      <img width={100} height={100} src="https://res.cloudinary.com/imperatorofintellectualism/image/upload/v1634736220/sample.jpg" />
      {data.thread.op}
    </div>
    <div className="posts">
    {data.thread.posts.map(post => (
        <Post key={post.id} post={post.text}></Post>
      ))}
    </div>
  </div>
</div>
  );
};
export default Thread;

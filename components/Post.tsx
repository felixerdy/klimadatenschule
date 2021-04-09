import React from 'react';
import Router from 'next/router';

export type DatasetProps = {
  id: number;
  title: string;
  publisher: {
    name: string;
    email: string;
  } | null;
  filepath: string;
  data: any;
};

const Post: React.FC<{ post: DatasetProps }> = ({ post }) => {
  return (
    <div onClick={() => Router.push('/post/[id]', `/post/${post.id}`)}></div>
  );
};

export default Post;

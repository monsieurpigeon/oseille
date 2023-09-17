import { Button, Input, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Post, addPost, getPosts, onPostsChange } from '../../backend/service/publicDatabase';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MySide } from '../../component/layout/page-layout/MySide';
import { SignUpModal } from '../../component/modal/SignupModal';
import { MyH1 } from '../../component/typography/MyFont';

export function BackOffice() {
  const [value, setValue] = useState('');
  const [posts, setPosts] = useState() as Post[];
  const { isOpen: showSignup, onOpen: openSignup, onClose: closeSignUp } = useDisclosure();

  const refreshPosts = () => getPosts().then(setPosts);
  useEffect(() => {
    refreshPosts();

    const observer = onPostsChange(refreshPosts);
    return () => {
      observer.cancel();
    };
  }, []);

  const onSubmit = () => {
    console.log(value);
    addPost({ title: value }).catch(console.error);
    setValue('');
  };

  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Back Office</MyH1>
          <Button onClick={openSignup}>SignUp</Button>
          <SignUpModal
            isOpen={showSignup}
            onClose={closeSignUp}
          />
          <Button>Login</Button>
        </MyHeader>
        <Input
          placeholder="Basic usage"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={onSubmit}>Enregistrer</Button>
        <div>
          {posts?.map((post, index) => {
            return <div key={index}>{post.title}</div>;
          })}
        </div>
      </MySide>
    </MyPage>
  );
}

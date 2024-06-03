import { Container, Text, VStack, Heading, Button, Box } from "@chakra-ui/react";
import { usePosts, useAddPost } from '../integrations/supabase/index.js';

const Index = () => {
  const { data: posts, error, isLoading } = usePosts();
  const addPostMutation = useAddPost();

  const handleAddPost = () => {
    addPostMutation.mutate({ name: 'New Post', body: 'This is a new post.' });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Our Website</Heading>
        <Text fontSize="xl">This is your starting point. Let's build something amazing together.</Text>
        <Button colorScheme="teal" size="lg" onClick={handleAddPost}>Add Post</Button>
        {posts && posts.map(post => (
          <Box key={post.id} p={4} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{post.name}</Heading>
            <Text mt={4}>{post.body}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
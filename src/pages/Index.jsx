import { useState, useEffect } from "react";
import { Container, VStack, HStack, Box, Text, Textarea, Button, IconButton, Heading } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: posts, isLoading, error } = usePosts({
    queryFn: () => fromSupabase(supabase.from('posts').select('*, reactions(*)')),
  });
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    if (error) {
      console.error("Error fetching posts:", error);
    }
  }, [error]);

  const addPost = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: "Post", body: newPost, author_id: "user-id-placeholder" });
      setNewPost("");
    }
  };

  return (
    <Container maxW="container.md" py={4}>
      <Heading as="h1" mb={6} textAlign="center">Public Postboard</Heading>
      <Box mb={6}>
        <Textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
          size="sm"
          mb={2}
        />
        <Button onClick={addPost} colorScheme="blue">Post</Button>
      </Box>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {posts.map((post, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md">
              <Text mb={4}>{post.body}</Text>
              <HStack spacing={4}>
                <HStack>
                  <IconButton
                    icon={<FaThumbsUp />}
                    aria-label="Thumbs Up"
                    isDisabled
                  />
                  <Text>{post.reactions?.thumbsUp || 0}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    icon={<FaHeart />}
                    aria-label="Heart"
                    isDisabled
                  />
                  <Text>{post.reactions?.heart || 0}</Text>
                </HStack>
                <HStack>
                  <IconButton
                    icon={<FaLaugh />}
                    aria-label="Laugh"
                    isDisabled
                  />
                  <Text>{post.reactions?.laugh || 0}</Text>
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default Index;
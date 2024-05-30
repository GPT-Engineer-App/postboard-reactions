import { useState } from "react";
import { Container, VStack, HStack, Box, Text, Textarea, Button, IconButton, Heading } from "@chakra-ui/react";
import { FaThumbsUp, FaHeart, FaLaugh } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [userReactions, setUserReactions] = useState({});

  const addPost = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, { content: newPost, reactions: { thumbsUp: 0, heart: 0, laugh: 0 } }]);
      setNewPost("");
    }
  };

  const addReaction = (index, reaction) => {
    const userId = "currentUser"; // Replace with actual user identification logic
    const postReactions = userReactions[index] || {};

    if (postReactions[userId] && postReactions[userId].count >= 2) {
      return; // User has already reacted twice to this post
    }

    const updatedPosts = [...posts];
    updatedPosts[index].reactions[reaction]++;
    setPosts(updatedPosts);

    setUserReactions({
      ...userReactions,
      [index]: {
        ...postReactions,
        [userId]: {
          count: (postReactions[userId]?.count || 0) + 1,
        },
      },
    });
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
      <VStack spacing={4} align="stretch">
        {posts.map((post, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md">
            <Text mb={4}>{post.content}</Text>
            <HStack spacing={4}>
              <HStack>
                <IconButton
                icon={<FaThumbsUp />}
                onClick={() => addReaction(index, "thumbsUp")}
                aria-label="Thumbs Up"
              />
              <Text>{post.reactions.thumbsUp}</Text>
            </HStack>
            <HStack>
              <IconButton
                icon={<FaHeart />}
                onClick={() => addReaction(index, "heart")}
                aria-label="Heart"
              />
              <Text>{post.reactions.heart}</Text>
            </HStack>
            <HStack>
              <IconButton
                icon={<FaLaugh />}
                onClick={() => addReaction(index, "laugh")}
                aria-label="Laugh"
              />
              <Text>{post.reactions.laugh}</Text>
            </HStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
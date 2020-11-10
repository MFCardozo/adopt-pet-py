import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
} from "@chakra-ui/core";
import Link from "next/link";
import React, { useState } from "react";
import {
  useCurrentUserLoginQuery,
  useDeleteAnimalPostMutation,
} from "../generated/graphql";

interface EditDeletePostsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePosts: React.FC<EditDeletePostsProps> = ({
  id,
  creatorId,
}) => {
  //set alert dialog for delete
  const [isOpen, setIsOpen] = useState<boolean>();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef<HTMLElement | null>();

  //delete post
  const { data } = useCurrentUserLoginQuery();
  const [deleteAnimalPost] = useDeleteAnimalPostMutation();

  if (data?.currentUserLogin?.id !== creatorId) {
    return null;
  }

  return (
    <>
      <Link href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          size="sm"
          variant="outline"
          aria-label="Edit Post"
          icon="edit"
        />
      </Link>
      <IconButton
        size="sm"
        variant="outline"
        aria-label="Delete Post"
        icon="delete"
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Post?
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variantColor="red"
              ml={3}
              onClick={() => {
                deleteAnimalPost({
                  variables: { id },
                  update: (cache) => {
                    cache.evict({ id: `Animal:${id}` });
                  },
                });
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

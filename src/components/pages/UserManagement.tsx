import { memo, useCallback, useEffect, VFC } from "react";
import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { UserCard } from "../ordanisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../ordanisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, loading, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();
  console.log("111",loginUser)

  useEffect(() => getUsers(), [getUsers]);

  const onClickUser = useCallback((id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner color="teal.200" />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((obj) => (
            <WrapItem key={obj.id} mx="auto">
              <UserCard
                id={obj.id}
                imageUrl="https://source.unsplash.com/random"
                userName={obj.username}
                fullName={obj.name}
                onClick={onClickUser}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModal
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
        user={selectedUser}
      />
    </>
  );
});

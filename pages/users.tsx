import { initializeStore } from "@/src/app/store";
import { UsersPage, usersThunk } from "@/src/flat_pages/users";
import { userApi } from "@/src/shared/api/user";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
const Users = () => {
  return <UsersPage />;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const page = (ctx.query?.page as number | undefined) || 1;
  const users = await userApi.usersQuery({ page: page });
  const store = initializeStore({});
  store.dispatch(usersThunk(users));
  return {
    props: {
      initialReduxState: store.getState(),
    },
  };
};
export default Users;

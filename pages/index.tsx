import Link from "next/link";

const Home = () => {
  return (
    <div className="text-white px-5">
      <header className="mb-5">
        <nav>
          <ul className="w-full flex font-bold gap-x-5">
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>home page for convenience</main>
    </div>
  );
};

export default Home;

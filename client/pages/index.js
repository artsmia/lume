import Link from 'next/link'


export default () => (
  <div>
    <p>This is the home page</p>
    <Link
      href={{
        pathname: "/group",
        query: {
          groupTitle: "main",
        }
      }}
      as={`/main`}
    >
      <a>
        main
      </a>
    </Link>
  </div>
)

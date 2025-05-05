// Absolute minimal placeholder with no dependencies
export default function SignupPage() {
  return <div>Redirect page...</div>;
}

// This ensures the page is statically generated and doesn't cause build errors
export async function getStaticProps() {
  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
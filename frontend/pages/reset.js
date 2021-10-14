import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ token }) {
  console.log(token);

  if (!token) {
    return (
      <div>
        <p>Sorry you must supply token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset your password {token}</p>
      <Reset token={token} />
    </div>
  );
}

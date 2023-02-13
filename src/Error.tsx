export default function Error({ status }: { status?: number }) {
  const message = status == 404 ? 'Not Found' : 'Sorry, an unexpected error has occurred.';

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>{message}</p>
    </div>
  );
}

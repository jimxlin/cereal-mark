type Props = {
  error: string;
};

function ErrorView({ error }: Props) {
  return (
    <h3 style={{ color: "#f00", position: "relative", zIndex: 10 }}>
      ERROR: {error}
    </h3>
  );
}

export default ErrorView;

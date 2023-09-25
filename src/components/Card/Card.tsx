type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div data-testid="card-element">
      <div className="bg-white min-w-[600px] mx-auto w-full max-w-3xl px-4 py-6 p-4 shadow-md rounded-lg">
      <div data-testid="child-element">{children}</div>
      </div>
    </div>
  );
};

export default Card;

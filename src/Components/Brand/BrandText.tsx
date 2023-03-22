const BrandText = ({ onClickHandler }: { onClickHandler?: () => void }) => {
  return (
    <p className="brand-text logo" onClick={onClickHandler}>
      Spin Cycle
    </p>
  );
};

export default BrandText;

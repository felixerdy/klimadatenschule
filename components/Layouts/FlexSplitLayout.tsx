type Props = {
  children?: React.ReactChild | React.ReactChild[];
};

const FlexSplitLayout = ({ children }: Props) => {
  return (
    <div className="w-full flex items-center mb-8 flex-col md:flex-row">
      {children}
    </div>
  );
};

export default FlexSplitLayout;

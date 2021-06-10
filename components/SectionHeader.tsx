type SectionHeaderProps = {
  color: string;
  text: string;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ color, text }) => (
  <div
    className={`p-10 md:p-20 rounded-2xl shadow-lg bg-gradient-to-br from-${color}-100 to-${color}-300`}
  >
    <h1 className={`text-4xl text-${color}-900 font-semibold`}>{text}</h1>
  </div>
);

export default SectionHeader;
